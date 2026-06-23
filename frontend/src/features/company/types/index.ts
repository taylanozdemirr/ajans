import { z } from 'zod';

export interface Model {
  id: string;
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  age: number;
  city: string;
  whatsappPhone: string;
  photoUrl: string | null;
}

export const createModelSchema = z.object({
  firstName: z.string().min(2, 'Ad çok kısa'),
  lastName: z.string().min(2, 'Soyad çok kısa'),
  height: z.number({ invalid_type_error: "Sayı girin" }).min(50, 'Boy çok kısa').max(250, 'Boy çok uzun'),
  weight: z.number({ invalid_type_error: "Sayı girin" }).min(20, 'Kilo çok az').max(200, 'Kilo çok fazla'),
  age: z.number({ invalid_type_error: "Sayı girin" }).min(1, 'Geçersiz yaş'),
  city: z.string().min(2, 'Şehir çok kısa'),
  whatsappPhone: z.string().min(10, 'Telefon geçersiz')
});

export type CreateModelFormValues = z.infer<typeof createModelSchema>;
