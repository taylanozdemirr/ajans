import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/db';

export const createCompany = async (req: Request, res: Response, next: any): Promise<void> => {
  const { email, password, name, totalLimit } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'COMPANY',
        company: {
          create: {
            name,
            totalLimit: Number(totalLimit) || 0
          }
        }
      },
      include: { company: true }
    });

    res.status(201).json(user.company);
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (req: Request, res: Response, next: any): Promise<void> => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 20));
    const skip = (page - 1) * limit;

    const [companies, total] = await Promise.all([
      prisma.company.findMany({
        skip,
        take: limit,
        include: { user: { select: { email: true } } }
      }),
      prisma.company.count()
    ]);

    res.json({
      data: companies,
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

export const updateCompanyLimit = async (req: Request, res: Response, next: any): Promise<void> => {
  const id = req.params.id as string;
  const { totalLimit } = req.body;

  try {
    const company = await prisma.company.update({
      where: { id },
      data: { totalLimit: Number(totalLimit) }
    });
    res.json(company);
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (req: Request, res: Response, next: any): Promise<void> => {
  const id = req.params.id as string;

  try {
    const company = await prisma.company.findUnique({ where: { id } });
    if (!company) {
      res.status(404).json({ error: 'Company not found' });
      return;
    }

    // This will cascade delete models and we also want to delete user
    await prisma.user.delete({ where: { id: company.userId } });
    
    res.json({ message: 'Company deleted' });
  } catch (error) {
    next(error);
  }
};
