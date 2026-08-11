import { prisma } from './prisma';

const SUPPORTED_LANGUAGES = ['en', 'ar'] as const;
type TargetLanguage = typeof SUPPORTED_LANGUAGES[number];

// Delay helper for rate limiting
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Translate a single text string using Google GTX API (free, no API key needed).
 * Handles chunking for long texts automatically.
 */
async function translateText(
  text: string,
  targetLang: TargetLanguage,
  sourceLang: string = 'id'
): Promise<string> {
  if (!text || text.trim() === '') return text;

  const cleanText = text.trim();

  // Google GTX has ~5000 char limit per request; chunk if needed
  const MAX_CHUNK = 4500;
  if (cleanText.length > MAX_CHUNK) {
    return translateLongText(cleanText, targetLang, sourceLang);
  }

  return translateChunk(cleanText, targetLang, sourceLang);
}

/**
 * Translate a single chunk of text via Google GTX
 */
async function translateChunk(
  text: string,
  targetLang: string,
  sourceLang: string,
  retries: number = 3
): Promise<string> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

      const response = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && Array.isArray(data[0])) {
          const translatedParts = data[0]
            .map((item: any) => item[0])
            .filter(Boolean);
          const result = translatedParts.join('');
          if (result && result.trim() !== '') {
            return result;
          }
        }
      }

      // If response is 429 (rate limited), wait and retry
      if (response.status === 429) {
        console.warn(`[Translate] Rate limited, retrying in ${(attempt + 1) * 2}s...`);
        await delay((attempt + 1) * 2000);
        continue;
      }
    } catch (error) {
      console.error(`[Translate] Attempt ${attempt + 1} failed:`, error);
      if (attempt < retries - 1) {
        await delay((attempt + 1) * 1000);
      }
    }
  }

  // Return original text if all retries fail
  return text;
}

/**
 * Translate long text by splitting into chunks at paragraph/sentence boundaries
 */
async function translateLongText(
  text: string,
  targetLang: string,
  sourceLang: string
): Promise<string> {
  // Try to split by paragraphs first (double newline or <p> tags)
  const isHtml = /<[^>]+>/.test(text);

  let chunks: string[];
  if (isHtml) {
    chunks = splitHtmlIntoChunks(text, 4500);
  } else {
    chunks = splitTextIntoChunks(text, 4500);
  }

  const translatedChunks: string[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const translated = await translateChunk(chunks[i], targetLang, sourceLang);
    translatedChunks.push(translated);
    // Small delay between chunks to avoid rate limiting
    if (i < chunks.length - 1) {
      await delay(500);
    }
  }

  return translatedChunks.join('');
}

/**
 * Split plain text into chunks at paragraph/sentence boundaries
 */
function splitTextIntoChunks(text: string, maxLen: number): string[] {
  const chunks: string[] = [];
  const paragraphs = text.split(/\n\n+/);
  let current = '';

  for (const para of paragraphs) {
    if ((current + '\n\n' + para).length > maxLen && current.length > 0) {
      chunks.push(current.trim());
      current = para;
    } else {
      current = current ? current + '\n\n' + para : para;
    }
  }
  if (current.trim()) {
    chunks.push(current.trim());
  }

  return chunks.length > 0 ? chunks : [text];
}

/**
 * Split HTML content into chunks, preserving tag structure
 */
function splitHtmlIntoChunks(html: string, maxLen: number): string[] {
  const chunks: string[] = [];
  // Split by block-level tags
  const blockPattern = /(<(?:p|div|h[1-6]|ul|ol|li|blockquote|table|tr|td|th|section|article|header|footer|br\s*\/?)(?:\s[^>]*)?>)/gi;
  const parts = html.split(blockPattern);

  let current = '';
  for (const part of parts) {
    if ((current + part).length > maxLen && current.length > 0) {
      chunks.push(current);
      current = part;
    } else {
      current += part;
    }
  }
  if (current) {
    chunks.push(current);
  }

  return chunks.length > 0 ? chunks : [html];
}

/**
 * Translate an article's title, excerpt, and content to a specific language
 * and save to ArticleTranslation table.
 */
async function translateAndSaveArticle(
  articleId: number,
  targetLang: TargetLanguage
): Promise<boolean> {
  try {
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      console.error(`[Translate] Article ${articleId} not found`);
      return false;
    }

    console.log(`[Translate] Translating article ${articleId} "${article.title}" → ${targetLang}...`);

    // Translate all fields
    const [translatedTitle, translatedExcerpt, translatedContent] = await Promise.all([
      translateText(article.title, targetLang),
      translateText(article.excerpt, targetLang),
      translateText(article.content, targetLang),
    ]);

    // Upsert: create or update translation
    await prisma.articleTranslation.upsert({
      where: {
        articleId_language: {
          articleId: article.id,
          language: targetLang,
        },
      },
      update: {
        title: translatedTitle,
        excerpt: translatedExcerpt,
        content: translatedContent,
      },
      create: {
        articleId: article.id,
        language: targetLang,
        title: translatedTitle,
        excerpt: translatedExcerpt,
        content: translatedContent,
      },
    });

    console.log(`[Translate] ✅ Article ${articleId} → ${targetLang} done.`);
    return true;
  } catch (error) {
    console.error(`[Translate] ❌ Failed article ${articleId} → ${targetLang}:`, error);
    return false;
  }
}

/**
 * Translate an article to all supported languages (EN & AR).
 * Runs asynchronously (fire-and-forget).
 */
export async function translateArticleToAllLanguages(articleId: number): Promise<void> {
  for (const lang of SUPPORTED_LANGUAGES) {
    await translateAndSaveArticle(articleId, lang);
    // Small delay between languages
    await delay(1000);
  }
}

/**
 * Translate all articles that don't have translations yet.
 * Returns count of translated articles.
 */
export async function translateAllUntranslated(): Promise<{
  total: number;
  translated: number;
  failed: number;
}> {
  // Find articles without translations
  const articles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: { id: true, title: true },
    orderBy: { createdAt: 'desc' },
  });

  let translated = 0;
  let failed = 0;

  for (const article of articles) {
    // Check if translations exist for both languages
    const existingTranslations = await prisma.articleTranslation.findMany({
      where: { articleId: article.id },
      select: { language: true },
    });

    const existingLangs = existingTranslations.map((t) => t.language);
    const missingLangs = SUPPORTED_LANGUAGES.filter((l) => !existingLangs.includes(l));

    if (missingLangs.length === 0) {
      // Already fully translated
      translated++;
      continue;
    }

    console.log(`[Translate] Processing: "${article.title}" (missing: ${missingLangs.join(', ')})`);

    for (const lang of missingLangs) {
      const success = await translateAndSaveArticle(article.id, lang as TargetLanguage);
      if (success) {
        translated++;
      } else {
        failed++;
      }
      // Rate limit protection: wait between translations
      await delay(1500);
    }
  }

  return { total: articles.length, translated, failed };
}

/**
 * Get translation status — how many articles have translations
 */
export async function getTranslationStatus(): Promise<{
  totalArticles: number;
  fullyTranslated: number;
  partiallyTranslated: number;
  untranslated: number;
}> {
  const totalArticles = await prisma.article.count({
    where: { status: 'PUBLISHED' },
  });

  const articlesWithTranslations = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: {
      id: true,
      _count: { select: { translations: true } },
    },
  });

  let fullyTranslated = 0;
  let partiallyTranslated = 0;
  let untranslated = 0;

  for (const article of articlesWithTranslations) {
    const count = article._count.translations;
    if (count >= SUPPORTED_LANGUAGES.length) {
      fullyTranslated++;
    } else if (count > 0) {
      partiallyTranslated++;
    } else {
      untranslated++;
    }
  }

  return { totalArticles, fullyTranslated, partiallyTranslated, untranslated };
}
