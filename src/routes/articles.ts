import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/articles
router.get('/', async (req: Request, res: Response) => {
  try {
    const categorySlug = req.query.category as string;
    const status = (req.query.status as string) || 'PUBLISHED';
    const limit = parseInt((req.query.limit as string) || '20');

    const where: any = {};
    if (status !== 'ALL') {
      where.status = status;
    }
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    const articles = await prisma.article.findMany({
      where,
      take: limit,
      include: {
        category: true,
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/articles/headline
router.get('/headline', async (req: Request, res: Response) => {
  try {
    const headline = await prisma.article.findFirst({
      where: { isHeadline: true, status: 'PUBLISHED' },
      include: { category: true, author: true },
    }) || await prisma.article.findFirst({
      where: { status: 'PUBLISHED' },
      include: { category: true, author: true },
    });

    res.json(headline);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/articles/fixed-advice
router.get('/fixed-advice', async (req: Request, res: Response) => {
  try {
    const advice = await prisma.article.findFirst({
      where: { isFixedAdvice: true, status: 'PUBLISHED' },
      include: { category: true, author: true },
    });

    res.json(advice);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/articles/popular
router.get('/popular', async (req: Request, res: Response) => {
  try {
    const popular = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      take: 5,
      include: { category: true },
      orderBy: { views: 'desc' },
    });

    res.json(popular);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/articles/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const decodedSlug = decodeURIComponent(slug).toLowerCase();

    const article = await prisma.article.findFirst({
      where: {
        OR: [
          { slug: decodedSlug },
          { slug: slug },
        ],
      },
      include: { category: true, author: true },
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Increment views
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    });

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/articles (CMS create)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, categoryId, authorId, coverImage, isHeadline, isFeature, isFixedAdvice, status } = req.body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4);

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        isHeadline: !!isHeadline,
        isFeature: !!isFeature,
        isFixedAdvice: !!isFixedAdvice,
        status: status || 'DRAFT',
        authorId: authorId ? parseInt(authorId) : 1,
        categoryId: parseInt(categoryId),
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    });

    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
