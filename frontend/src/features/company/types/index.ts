import { z } from 'zod';

export interface Model {
  id: string;
  firstName: string;
  whatsappPhone: string;
  photos: { id: string; url: string }[];
}

export const createModelSchema = z.object({
  firstName: z.string().min(2, 'Ad çok kısa'),
  whatsappPhone: z.string().min(10, 'Telefon geçersiz')
});

export type CreateModelFormValues = z.infer<typeof createModelSchema>;
