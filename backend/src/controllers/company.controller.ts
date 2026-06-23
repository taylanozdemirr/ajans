import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { prisma } from '../config/db';

export const createModel = async (req: AuthRequest, res: Response, next: any): Promise<void> => {
  const companyId = req.user?.companyId;
  if (!companyId) {
    res.status(403).json({ error: 'Not a company' });
    return;
  }

  const { firstName, lastName, height, weight, age, city, whatsappPhone } = req.body;
  const files = req.files as Express.Multer.File[];
  const photosData = files ? files.map(file => ({ url: `/uploads/${file.filename}` })) : [];

  try {
    const company = await prisma.company.findUnique({ where: { id: companyId } });
    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    if (company.usedLimit >= company.totalLimit) {
      res.status(403).json({ error: 'İlan limitiniz dolmuştur.' });
      return;
    }

    const model = await prisma.$transaction(async (tx) => {
      const newModel = await tx.model.create({
        data: {
          companyId,
          firstName,
          lastName,
          height: Number(height),
          weight: Number(weight),
          age: Number(age),
          city,
          whatsappPhone,
          photos: {
            create: photosData
          }
        },
        include: {
          photos: true
        }
      });

      await tx.company.update({
        where: { id: companyId },
        data: { usedLimit: { increment: 1 } }
      });

      return newModel;
    });

    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
};

export const getMyModels = async (req: AuthRequest, res: Response, next: any): Promise<void> => {
  const companyId = req.user?.companyId;
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const [models, total] = await Promise.all([
      prisma.model.findMany({
        where: { companyId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { photos: true }
      }),
      prisma.model.count({ where: { companyId } })
    ]);

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

export const deleteModel = async (req: AuthRequest, res: Response, next: any): Promise<void> => {
  const id = req.params.id as string;
  const companyId = req.user?.companyId;

  try {
    const model = await prisma.model.findUnique({ where: { id } });
    if (!model || model.companyId !== companyId) {
      res.status(404).json({ error: 'Model not found or access denied' });
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.model.delete({ where: { id } });
      await tx.company.update({
        where: { id: companyId },
        data: { usedLimit: { decrement: 1 } }
      });
    });

    res.json({ message: 'Model deleted' });
  } catch (error) {
    next(error);
  }
};
