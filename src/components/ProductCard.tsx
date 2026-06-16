'use client'

import Link from 'next/link'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const thumbnail = product.images?.[0] || '/products/placeholder.jpg'

  return (
    <div className="card group">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-60 bg-stone-100 overflow-hidden cursor-pointer">
          <img
            src={thumbnail}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://placehold.co/400x300/fff7ed/ea580c?text=${encodeURIComponent(product.name)}`
            }}
          />
          {product.images?.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
              +{product.images.length - 1} foto
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            product.type === 'digital'
              ? 'bg-blue-50 text-blue-600'
              : 'bg-amber-50 text-amber-600'
          }`}>
            {product.type === 'digital' ? '💾 Digital' : '📦 Fisik'}
          </span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-semibold text-stone-800 hover:text-orange-600 cursor-pointer mb-2 line-clamp-2 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-stone-500 mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <p className="text-xl font-bold text-orange-600 mb-4">
          Rp {product.price.toLocaleString('id-ID')}
        </p>
        <div className="flex gap-2">
          <Link href={`/checkout/${product.id}`} className="flex-1">
            <button className="btn-primary w-full text-sm py-2">
              Beli Sekarang
            </button>
          </Link>
          <Link href={`/product/${product.id}`}>
            <button className="btn-secondary text-sm py-2 px-4">
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
