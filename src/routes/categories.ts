import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/categories/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const decodedSlug = decodeURIComponent(slug).toLowerCase();
    const category = await prisma.category.findFirst({
      where: {
        OR: [
          { slug: decodedSlug },
          { slug: slug },
        ],
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const articles = await prisma.article.findMany({
      where: { categoryId: category.id, status: 'PUBLISHED' },
      include: { category: true, author: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ category, articles });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
