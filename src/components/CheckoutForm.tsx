'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  digitalCheckoutSchema,
  physicalCheckoutSchema,
  DigitalCheckoutFormData,
  PhysicalCheckoutFormData,
  SHIPPING_ZONES,
} from '@/utils/validation'
import { generateWhatsAppMessage, openWhatsAppChat } from '@/utils/whatsapp'
import { Product } from '@/types/product'

const BUSINESS_PHONE = '6281223235666'

interface CheckoutFormProps {
  product: Product
}

type FormData = DigitalCheckoutFormData | PhysicalCheckoutFormData

export default function CheckoutForm({ product }: CheckoutFormProps) {
  const isPhysical = product.type === 'physical'
  const [totalPrice, setTotalPrice] = useState<number>(product.price)
  const [shippingCost, setShippingCost] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const schema = isPhysical ? physicalCheckoutSchema : digitalCheckoutSchema

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<any>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const quantity = watch('quantity')
  const selectedZone = watch('shippingZone')

  useEffect(() => {
    const qty = Number(quantity)
    const base = qty && !isNaN(qty) && qty > 0 ? product.price * qty : product.price
    setTotalPrice(base + shippingCost)
  }, [quantity, product.price, shippingCost])

  useEffect(() => {
    if (selectedZone) {
      const zone = SHIPPING_ZONES.find((z) => z.id === selectedZone)
      const cost = zone ? zone.cost : 0
      setShippingCost(cost)
    }
  }, [selectedZone])

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    try {
      const zoneName = isPhysical
        ? SHIPPING_ZONES.find((z) => z.id === data.shippingZone)?.label || ''
        : ''

      const message = generateWhatsAppMessage({
        productName: product.name,
        productType: product.type,
        quantity: data.quantity,
        totalPrice,
        shippingCost: isPhysical ? shippingCost : 0,
        shippingZone: zoneName,
        address: isPhysical ? data.address : '',
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

      {/* Badge tipe produk */}
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
        isPhysical
          ? 'bg-amber-100 text-amber-700'
          : 'bg-blue-100 text-blue-700'
      }`}>
        {isPhysical ? '📦 Produk Fisik' : '💾 Produk Digital'}
      </div>

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
          <p className="text-red-500 text-xs mt-1">{String(errors.quantity.message)}</p>
        )}
      </div>

      {/* Shipping Zone - hanya produk fisik */}
      {isPhysical && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Zona Pengiriman <span className="text-red-500">*</span>
          </label>
          <select
            {...register('shippingZone')}
            className={`input-field bg-white ${errors.shippingZone ? 'input-error' : ''}`}
          >
            <option value="">-- Pilih zona pengiriman --</option>
            {SHIPPING_ZONES.map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.label} — Rp {zone.cost.toLocaleString('id-ID')}
              </option>
            ))}
          </select>
          {errors.shippingZone && (
            <p className="text-red-500 text-xs mt-1">{String(errors.shippingZone.message)}</p>
          )}
        </div>
      )}

      {/* Total Harga */}
      <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
        <div className="flex justify-between text-xs text-stone-500 mb-1">
          <span>Harga produk</span>
          <span>Rp {(product.price * (Number(quantity) || 1)).toLocaleString('id-ID')}</span>
        </div>
        {isPhysical && shippingCost > 0 && (
          <div className="flex justify-between text-xs text-stone-500 mb-2">
            <span>Ongkir</span>
            <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
          </div>
        )}
        <div className="flex justify-between items-center border-t border-orange-200 pt-2 mt-1">
          <span className="text-xs text-stone-500 font-medium">Total</span>
          <span className="text-2xl font-bold text-orange-600">
            Rp {totalPrice.toLocaleString('id-ID')}
          </span>
        </div>
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
          <p className="text-red-500 text-xs mt-1">{String(errors.phone.message)}</p>
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
          <p className="text-red-500 text-xs mt-1">{String(errors.email.message)}</p>
        )}
      </div>

      {/* Alamat - hanya produk fisik */}
      {isPhysical && (
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Alamat Lengkap <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('address')}
            placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota, kode pos"
            rows={3}
            className={`input-field resize-none ${errors.address ? 'input-error' : ''}`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{String(errors.address.message)}</p>
          )}
        </div>
      )}

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
