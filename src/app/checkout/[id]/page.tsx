'use client'

import Link from 'next/link'
import products from '@/data/products.json'
import CheckoutForm from '@/components/CheckoutForm'
import QRISDisplay from '@/components/QRISDisplay'

interface CheckoutPageProps {
  params: { id: string }
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const product = products.find((p) => p.id === parseInt(params.id))

  if (!product) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-stone-800 mb-4">Produk tidak ditemukan</h1>
        <Link href="/">
          <button className="btn-primary">Kembali ke Beranda</button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
        <span>/</span>
        <Link href={`/product/${product.id}`} className="hover:text-orange-600 transition-colors">
          {product.name}
        </Link>
        <span>/</span>
        <span className="text-stone-800">Pembayaran</span>
      </div>

      <h1 className="text-3xl font-bold text-stone-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
        Pembayaran Pesanan
      </h1>

      {/* Layout: 2/3 content + 1/3 QRIS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Product summary + form */}
        <div className="lg:col-span-2 space-y-6">

          {/* Product Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
            <h2 className="text-lg font-semibold text-stone-800 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Ringkasan Pesanan
            </h2>
            <div className="flex gap-4 items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `https://placehold.co/80x80/fff7ed/ea580c?text=IMG`
                }}
              />
              <div>
                <p className="font-semibold text-stone-800">{product.name}</p>
                <p className="text-sm text-stone-500 mt-1">
                  Rp {product.price.toLocaleString('id-ID')} / unit
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
            <h2 className="text-lg font-semibold text-stone-800 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Informasi Pembeli
            </h2>
            <CheckoutForm product={product} />
          </div>
        </div>

        {/* Right: QRIS */}
        <div className="lg:col-span-1">
          <QRISDisplay />
        </div>
      </div>
    </div>
  )
}
