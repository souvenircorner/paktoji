'use client'

import Link from 'next/link'
import productsData from '@/data/products.json'
import { Product } from '@/types/product'

const products = productsData as Product[]

interface ProductDetailPageProps {
  params: { id: string }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
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
        <span className="text-stone-800">{product.name}</span>
      </div>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl p-8 shadow-sm border border-stone-100">
        {/* Image */}
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-auto object-cover rounded-xl shadow-sm"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://placehold.co/500x400/fff7ed/ea580c?text=${encodeURIComponent(product.name)}`
            }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-orange-600 mb-6">
              Rp {product.price.toLocaleString('id-ID')}
              <span className="text-base font-normal text-stone-400 ml-2">/ unit</span>
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Deskripsi Produk
              </h3>
              <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">
                {product.detail}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Link href={`/checkout/${product.id}`} className="flex-1">
              <button className="btn-primary w-full text-base py-4">
                🛒 Beli Sekarang
              </button>
            </Link>
            <Link href="/">
              <button className="btn-secondary py-4 px-6">
                ← Kembali
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
