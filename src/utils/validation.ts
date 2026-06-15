import { z } from 'zod'

export const SHIPPING_ZONES = [
  { id: 'jabodetabek', label: 'Jabodetabek', cost: 10000 },
  { id: 'jawa_bali', label: 'Jawa & Bali (luar Jabodetabek)', cost: 20000 },
  { id: 'luar_jawa', label: 'Luar Jawa & Bali', cost: 45000 },
]

export const digitalCheckoutSchema = z.object({
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

export const physicalCheckoutSchema = z.object({
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
  address: z.string().min(10, 'Alamat minimal 10 karakter'),
  shippingZone: z.string().min(1, 'Pilih zona pengiriman'),
})

export type DigitalCheckoutFormData = z.infer<typeof digitalCheckoutSchema>
export type PhysicalCheckoutFormData = z.infer<typeof physicalCheckoutSchema>

// Legacy export untuk kompatibilitas
export const checkoutSchema = digitalCheckoutSchema
export type CheckoutFormData = DigitalCheckoutFormData
