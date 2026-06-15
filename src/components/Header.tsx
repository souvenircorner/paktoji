'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-stone-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-orange-600 cursor-pointer tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            TOKO PAKTOJI
          </h1>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-stone-600 hover:text-orange-600 font-medium transition-colors text-sm">
            Beranda
          </Link>
          <a href="#products" className="text-stone-600 hover:text-orange-600 font-medium transition-colors text-sm">
            Produk
          </a>
          <a
            href="https://wa.me/6281223235666"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Hubungi Kami
          </a>
        </nav>
      </div>
    </header>
  )
}
