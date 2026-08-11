import { Router, Request, Response } from 'express';
import {
  translateText,
  translateArticleToAllLanguages,
  translateAllUntranslated,
  getTranslationStatus,
} from '../lib/translate';
import { prisma } from '../lib/prisma';

const router = Router();

/**
 * POST /api/translate/article/:id
 * Trigger translation for a single article to all supported languages.
 */
router.post('/article/:id', async (req: Request, res: Response) => {
  try {
    const articleId = parseInt(req.params.id);
    if (isNaN(articleId)) {
      return res.status(400).json({ error: 'Invalid article ID' });
    }

    // Run translation asynchronously
    translateArticleToAllLanguages(articleId).catch((err) => {
      console.error(`[Translate Route] Background translation failed for article ${articleId}:`, err);
    });

    res.json({
      message: `Translation started for article ${articleId}`,
      articleId,
    });
  } catch (error) {
    console.error('[Translate Route] Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /api/translate/all
 * Trigger translation for all published articles that don't have translations yet.
 * This runs synchronously and returns the result when done.
 */
router.post('/all', async (req: Request, res: Response) => {
  try {
    console.log('[Translate Route] Starting bulk translation of all untranslated articles...');
    const result = await translateAllUntranslated();
    console.log('[Translate Route] Bulk translation complete:', result);
    res.json({
      message: 'Bulk translation complete',
      ...result,
    });
  } catch (error) {
    console.error('[Translate Route] Bulk translation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/translate/status
 * Get translation status — how many articles have been translated.
 */
router.get('/status', async (req: Request, res: Response) => {
  try {
    const status = await getTranslationStatus();
    res.json(status);
  } catch (error) {
    console.error('[Translate Route] Status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/translate/lookup?text=...&lang=en|ar
 * Look up a pre-stored translation for a given text.
 * Searches article translations for matching title, excerpt, or content.
 * Falls back to dynamic translateText if no DB record found.
 */
router.get('/lookup', async (req: Request, res: Response) => {
  try {
    const text = (req.query.text as string) || '';
    const lang = (req.query.lang as string) || 'en';

    if (!text.trim() || lang === 'id') {
      return res.json({ translatedText: text });
    }

    const cleanText = text.trim();
    const targetLang = (lang === 'ar' || lang === 'en') ? lang : 'en';

    // 1. Search for exact or contains text match in original articles (title, excerpt)
    const article = await prisma.article.findFirst({
      where: {
        OR: [
          { title: { equals: cleanText, mode: 'insensitive' } },
          { excerpt: { equals: cleanText, mode: 'insensitive' } },
        ],
      },
      include: {
        translations: {
          where: { language: targetLang },
        },
      },
    });

    if (article && article.translations.length > 0) {
      const translation = article.translations[0];
      if (article.title.toLowerCase() === cleanText.toLowerCase()) {
        return res.json({ translatedText: translation.title });
      }
      if (article.excerpt.toLowerCase() === cleanText.toLowerCase()) {
        return res.json({ translatedText: translation.excerpt });
      }
    }

    // 2. Fallback: Translate dynamically via Google GTX server-side
    const translated = await translateText(cleanText, targetLang);
    return res.json({ translatedText: translated || cleanText });
  } catch (error) {
    console.error('[Translate Route] Lookup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

