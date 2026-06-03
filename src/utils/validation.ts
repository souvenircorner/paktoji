import { z } from 'zod'

export const checkoutSchema = z.object({
  quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Jumlah harus angka positif',
    })
    .transform(Number),
  phone: z
    .string()
    .min(10, 'Nomor telp minimal 10 digit')
    .regex(/^[\d\s+()\-]+$/, 'Nomor telp tidak valid'),
  email: z.string().email('Email tidak valid'),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
