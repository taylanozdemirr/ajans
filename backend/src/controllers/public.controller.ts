import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getAllModels = async (req: Request, res: Response, next: any): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const allModels = await prisma.model.findMany({
      include: {
        company: { select: { name: true } }
      }
    });

    const total = allModels.length;

    // Fisher-Yates Shuffle
    for (let i = allModels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allModels[i], allModels[j]] = [allModels[j], allModels[i]];
    }

    const models = allModels.slice(skip, skip + limit);

    res.json({
      data: models,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};
