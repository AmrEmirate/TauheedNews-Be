import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/search?q=...
router.get('/', async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || '';

    if (!query.trim()) {
      return res.json([]);
    }

    const articles = await prisma.article.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: query } },
          { excerpt: { contains: query } },
          { content: { contains: query } },
        ],
      },
      take: 8,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
