'use client'

import Link from 'next/link'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card group">
      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-full bg-stone-100 overflow-hidden cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://placehold.co/400x300/fff7ed/ea580c?text=${encodeURIComponent(product.name)}`
            }}
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-5">
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
