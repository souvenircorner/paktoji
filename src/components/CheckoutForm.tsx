'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, CheckoutFormData } from '@/utils/validation'
import { generateWhatsAppMessage, openWhatsAppChat } from '@/utils/whatsapp'
import { Product } from '@/types/product'

const BUSINESS_PHONE = '6281223235666'

interface CheckoutFormProps {
  product: Product
}

export default function CheckoutForm({ product }: CheckoutFormProps) {
  const [totalPrice, setTotalPrice] = useState<number>(product.price)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  })

  const quantity = watch('quantity')

  useEffect(() => {
    const qty = Number(quantity)
    if (qty && !isNaN(qty) && qty > 0) {
      setTotalPrice(product.price * qty)
    } else {
      setTotalPrice(product.price)
    }
  }, [quantity, product.price])

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true)
    try {
      const message = generateWhatsAppMessage({
        productName: product.name,
        quantity: data.quantity,
        totalPrice,
        phone: data.phone,
        email: data.email,
      })

      openWhatsAppChat({ businessPhone: BUSINESS_PHONE, message })
      setSubmitted(true)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-stone-800 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Pesanan Terkirim!
        </h3>
        <p className="text-stone-500 text-sm">
          WhatsApp sudah terbuka. Selesaikan konfirmasi pembayaran dengan admin kami.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Jumlah <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          {...register('quantity')}
          min="1"
          placeholder="1"
          className={`input-field ${errors.quantity ? 'input-error' : ''}`}
        />
        {errors.quantity && (
          <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
        )}
      </div>

      {/* Total Price Display */}
      <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
        <p className="text-xs text-stone-500 mb-1">Total Harga</p>
        <p className="text-2xl font-bold text-orange-600">
          Rp {totalPrice.toLocaleString('id-ID')}
        </p>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Nomor Telepon <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          {...register('phone')}
          placeholder="08xx-xxxx-xxxx"
          className={`input-field ${errors.phone ? 'input-error' : ''}`}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register('email')}
          placeholder="contoh@email.com"
          className={`input-field ${errors.email ? 'input-error' : ''}`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 ${
          isValid && !isLoading
            ? 'bg-orange-600 hover:bg-orange-700 hover:shadow-lg active:scale-95 cursor-pointer'
            : 'bg-stone-300 cursor-not-allowed'
        }`}
      >
        {isLoading ? 'Memproses...' : '💬 Konfirmasi via WhatsApp'}
      </button>

      <p className="text-xs text-stone-400 text-center">
        Tombol aktif setelah semua field terisi dengan benar
      </p>
    </form>
  )
}
