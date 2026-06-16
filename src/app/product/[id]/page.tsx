'use client'

import { useState } from 'react'
import Link from 'next/link'
import productsData from '@/data/products.json'
import { Product } from '@/types/product'

const products = productsData as Product[]

interface ProductDetailPageProps {
  params: { id: string }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find((p) => p.id === parseInt(params.id))
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

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

  const images = product.images || []
  const currentImage = images[activeIndex] || ''

  const prevImage = () => setActiveIndex((i) => (i - 1 + images.length) % images.length)
  const nextImage = () => setActiveIndex((i) => (i + 1) % images.length)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-orange-600 transition-colors">Beranda</Link>
        <span>/</span>
        <span className="text-stone-800">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-2xl p-8 shadow-sm border border-stone-100">

        {/* Kolom kiri: slider foto */}
        <div>
          {/* Foto utama */}
          <div
            className="relative w-full rounded-xl overflow-hidden bg-stone-50 mb-3 cursor-zoom-in"
            style={{ aspectRatio: '4/3' }}
            onClick={() => setIsZoomed(true)}
          >
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://placehold.co/600x450/fff7ed/ea580c?text=${encodeURIComponent(product.name)}`
              }}
            />

            {/* Tombol prev/next — hanya muncul kalau > 1 foto */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all text-stone-700 font-bold"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all text-stone-700 font-bold"
                >
                  ›
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full">
                  {activeIndex + 1} / {images.length}
                </div>
              </>
            )}

            <div className="absolute top-2 right-2 text-xs bg-black/30 text-white px-2 py-0.5 rounded-full">
              🔍 Klik untuk perbesar
            </div>
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === activeIndex
                      ? 'border-orange-500'
                      : 'border-stone-200 hover:border-orange-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Foto ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://placehold.co/64x64/fff7ed/ea580c?text=${idx + 1}`
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Kolom kanan: info produk */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="mb-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                product.type === 'digital'
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-amber-50 text-amber-600'
              }`}>
                {product.type === 'digital' ? '💾 Produk Digital' : '📦 Produk Fisik'}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-stone-900 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-orange-600 mb-6">
              Rp {product.price.toLocaleString('id-ID')}
              <span className="text-base font-normal text-stone-400 ml-2">/ unit</span>
            </p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-3">Deskripsi Produk</h3>
              <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">
                {product.detail}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link href={`/checkout/${product.id}`} className="flex-1">
              <button className="btn-primary w-full text-base py-4">
                🛒 Beli Sekarang
              </button>
            </Link>
            <Link href="/">
              <button className="btn-secondary py-4 px-6">← Kembali</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal zoom */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute -top-10 right-0 text-white text-sm hover:text-orange-300 transition-colors"
            >
              ✕ Tutup
            </button>
            <img
              src={currentImage}
              alt={product.name}
              className="w-full rounded-xl object-contain max-h-[80vh]"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://placehold.co/800x600/fff7ed/ea580c?text=${encodeURIComponent(product.name)}`
              }}
            />
            {images.length > 1 && (
              <div className="flex justify-center gap-3 mt-4">
                <button onClick={prevImage} className="text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">‹ Prev</button>
                <span className="text-white/70 text-sm self-center">{activeIndex + 1} / {images.length}</span>
                <button onClick={nextImage} className="text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">Next ›</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
