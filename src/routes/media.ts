import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/media
router.get('/', async (req: Request, res: Response) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
