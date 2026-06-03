'use client'

import products from '@/data/products.json'
import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-stone-100 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Souvenir & Custom Products
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Selamat Datang di
            <span className="text-orange-600 block">PAKTOJI</span>
          </h1>
          <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Temukan souvenir dan produk custom berkualitas tinggi untuk membuat momen spesial Anda tak terlupakan.
          </p>
          <a href="#products">
            <button className="btn-primary text-base px-8 py-4">
              Lihat Produk ↓
            </button>
          </a>
        </div>
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full opacity-20 -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200 rounded-full opacity-30 translate-y-24 -translate-x-24" />
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Produk Kami
          </h2>
          <p className="text-stone-500">Pilih produk yang sesuai kebutuhan Anda</p>
        </div>
        <ProductGrid products={products} />
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 py-16 px-4 text-white text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
          Ada pertanyaan?
        </h2>
        <p className="text-orange-100 mb-6 text-lg">
          Hubungi kami langsung via WhatsApp untuk konsultasi gratis
        </p>
        <a
          href="https://wa.me/6281223235666"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-colors text-base">
            💬 Chat WhatsApp
          </button>
        </a>
      </section>
    </div>
  )
}
