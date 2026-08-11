import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { translateArticleToAllLanguages } from '../lib/translate';

const router = Router();

// GET /api/articles
router.get('/', async (req: Request, res: Response) => {
  try {
    const categorySlug = req.query.category as string;
    const status = (req.query.status as string) || 'PUBLISHED';
    const limit = parseInt((req.query.limit as string) || '20');
    const lang = req.query.lang as string; // 'en' or 'ar'

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
        translations: lang && lang !== 'id'
          ? { where: { language: lang } }
          : false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // If lang specified, merge translated fields into the article object
    if (lang && lang !== 'id') {
      const merged = articles.map((article: any) => {
        const translation = article.translations?.[0];
        if (translation) {
          return {
            ...article,
            title: translation.title,
            excerpt: translation.excerpt,
            content: translation.content,
            _originalTitle: article.title,
            _originalExcerpt: article.excerpt,
            _isTranslated: true,
          };
        }
        return { ...article, _isTranslated: false };
      });
      return res.json(merged);
    }

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/articles/headline
router.get('/headline', async (req: Request, res: Response) => {
  try {
    const lang = req.query.lang as string;
    const includeTranslations = lang && lang !== 'id'
      ? { translations: { where: { language: lang } } }
      : {};

    const headline = await prisma.article.findFirst({
      where: { isHeadline: true, status: 'PUBLISHED' },
      include: { category: true, author: true, ...includeTranslations },
    }) || await prisma.article.findFirst({
      where: { status: 'PUBLISHED' },
      include: { category: true, author: true, ...includeTranslations },
    });

    if (headline && lang && lang !== 'id') {
      const translation = (headline as any).translations?.[0];
      if (translation) {
        return res.json({
          ...headline,
          title: translation.title,
          excerpt: translation.excerpt,
          content: translation.content,
          _originalTitle: headline.title,
          _originalExcerpt: headline.excerpt,
          _isTranslated: true,
        });
      }
    }

    res.json(headline);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/articles/fixed-advice
router.get('/fixed-advice', async (req: Request, res: Response) => {
  try {
    const lang = req.query.lang as string;
    const includeTranslations = lang && lang !== 'id'
      ? { translations: { where: { language: lang } } }
      : {};

    const advice = await prisma.article.findFirst({
      where: { isFixedAdvice: true, status: 'PUBLISHED' },
      include: { category: true, author: true, ...includeTranslations },
    });

    if (advice && lang && lang !== 'id') {
      const translation = (advice as any).translations?.[0];
      if (translation) {
        return res.json({
          ...advice,
          title: translation.title,
          excerpt: translation.excerpt,
          content: translation.content,
          _originalTitle: advice.title,
          _isTranslated: true,
        });
      }
    }

    res.json(advice);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/articles/popular
router.get('/popular', async (req: Request, res: Response) => {
  try {
    const lang = req.query.lang as string;
    const includeTranslations = lang && lang !== 'id'
      ? { translations: { where: { language: lang } } }
      : {};

    const popular = await prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      take: 5,
      include: { category: true, ...includeTranslations },
      orderBy: { views: 'desc' },
    });

    if (lang && lang !== 'id') {
      const merged = popular.map((article: any) => {
        const translation = article.translations?.[0];
        if (translation) {
          return {
            ...article,
            title: translation.title,
            excerpt: translation.excerpt,
            _isTranslated: true,
          };
        }
        return { ...article, _isTranslated: false };
      });
      return res.json(merged);
    }

    res.json(popular);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/articles/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const lang = req.query.lang as string;
    const decodedSlug = decodeURIComponent(slug).toLowerCase();

    const includeTranslations = lang && lang !== 'id'
      ? { translations: { where: { language: lang } } }
      : {};

    const article = await prisma.article.findFirst({
      where: {
        OR: [
          { slug: decodedSlug },
          { slug: slug },
        ],
      },
      include: { category: true, author: true, ...includeTranslations },
    });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Increment views
    await prisma.article.update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    });

    if (lang && lang !== 'id') {
      const translation = (article as any).translations?.[0];
      if (translation) {
        return res.json({
          ...article,
          title: translation.title,
          excerpt: translation.excerpt,
          content: translation.content,
          _originalTitle: article.title,
          _originalExcerpt: article.excerpt,
          _originalContent: article.content,
          _isTranslated: true,
        });
      }
    }

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

    // Auto-translate to EN & AR (async, non-blocking)
    if (article.status === 'PUBLISHED') {
      translateArticleToAllLanguages(article.id).catch((err) => {
        console.error(`[Auto-Translate] Failed for new article ${article.id}:`, err);
      });
    }

    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
