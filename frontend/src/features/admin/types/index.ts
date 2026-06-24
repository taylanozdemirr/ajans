import { z } from 'zod';

export interface Company {
  id: string;
  name: string;
  totalLimit: number;
  usedLimit: number;
  user: {
    email: string;
  };
  tier: 'MEGA' | 'GOLD';
}

export const createCompanySchema = z.object({
  name: z.string().min(2, 'Firma adı çok kısa'),
  email: z.string().email('Geçerli e-posta girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
  totalLimit: z.number({ invalid_type_error: "Limit sayı olmalı" }).min(1, 'Limit en az 1 olmalı'),
  tier: z.enum(['MEGA', 'GOLD']).default('GOLD')
});

export type CreateCompanyFormValues = z.infer<typeof createCompanySchema>;

export const updateLimitSchema = z.object({
  totalLimit: z.number({ invalid_type_error: "Limit sayı olmalı" }).min(1, 'Limit en az 1 olmalı'),
  tier: z.enum(['MEGA', 'GOLD']).default('GOLD')
});

export type UpdateLimitFormValues = z.infer<typeof updateLimitSchema>;
