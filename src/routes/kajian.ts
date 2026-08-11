import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/kajian
router.get('/', async (req: Request, res: Response) => {
  try {
    const kajian = await prisma.kajian.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(kajian);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
