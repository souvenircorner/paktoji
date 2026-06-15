'use client'

import { useState } from 'react'

export default function QRISDisplay() {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sticky top-28">
        <h3 className="text-lg font-semibold text-stone-800 mb-4 text-center" style={{ fontFamily: 'var(--font-display)' }}>
          Scan QRIS untuk Bayar
        </h3>

        {/* QRIS Image - klik untuk zoom */}
        <div className="flex justify-center mb-4">
          <div
            className="bg-white p-3 rounded-xl border-2 border-dashed border-stone-200 cursor-zoom-in hover:border-orange-300 transition-colors"
            onClick={() => setIsZoomed(true)}
            title="Klik untuk perbesar"
          >
            <img
              src="/qris-code.png"
              alt="QRIS Code"
              className="w-48 h-48 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://placehold.co/200x200/ffffff/ea580c?text=QRIS+Code'
              }}
            />
          </div>
        </div>

        <p className="text-xs text-stone-400 text-center mb-3">
          🔍 Klik gambar untuk perbesar
        </p>

        <p className="text-xs text-stone-500 text-center leading-relaxed mb-3">
          Scan menggunakan aplikasi pembayaran digital
          <br />
          (GoPay, OVO, Dana, ShopeePay, dll)
        </p>

        {/* Tombol Download */}
        <a
          href="/qris-code.png"
          download="QRIS-PAKTOJI.png"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border-2 border-orange-500 text-orange-600 font-semibold text-sm rounded-lg hover:bg-orange-50 transition-colors mb-3"
        >
          ⬇️ Download QRIS
        </a>

        <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
          <p className="text-xs text-orange-700 text-center font-medium">
            ⚡ Jangan lupa lakukan konfirmasi pembayaran setelah transfer
          </p>
        </div>
      </div>

      {/* Modal Zoom */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol tutup */}
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold transition-colors"
            >
              ✕
            </button>

            <h3 className="text-center font-semibold text-stone-800 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              QRIS PAKTOJI
            </h3>

            <div className="bg-white p-2 rounded-xl border-2 border-dashed border-stone-200 mb-4">
              <img
                src="/qris-code.png"
                alt="QRIS Code"
                className="w-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://placehold.co/400x400/ffffff/ea580c?text=QRIS+Code'
                }}
              />
            </div>

            <a
              href="/qris-code.png"
              download="QRIS-PAKTOJI.png"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border-2 border-orange-500 text-orange-600 font-semibold text-sm rounded-lg hover:bg-orange-50 transition-colors"
            >
              ⬇️ Download QRIS
            </a>

            <p className="text-xs text-stone-400 text-center mt-3">
              Klik di luar untuk menutup
            </p>
          </div>
        </div>
      )}
    </>
  )
}
