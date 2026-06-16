'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-stone-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-3 text-orange-400" style={{ fontFamily: 'var(--font-display)' }}>TOKO PAKTOJI</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Digital Products For Daily Life
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Hubungi Kami</h3>
            <div className="text-stone-400 text-sm space-y-2">
              <p>WhatsApp: 0899-896-7434</p>
              <p>Email: pak.toji.fushiguro@gmail.com</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Tautan</h3>
            <div className="text-stone-400 text-sm space-y-2">
              <p className="hover:text-white cursor-pointer transition-colors">Kebijakan Privasi</p>
              <p className="hover:text-white cursor-pointer transition-colors">Syarat & Ketentuan</p>
            </div>
          </div>
        </div>
        <div className="border-t border-stone-700 pt-6">
          <p className="text-center text-stone-500 text-sm">
            © {currentYear} TOKO PAKTOJI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
