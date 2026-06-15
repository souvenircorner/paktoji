'use client'

export default function QRISDisplay() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sticky top-28">
      <h3 className="text-lg font-semibold text-stone-800 mb-4 text-center" style={{ fontFamily: 'var(--font-display)' }}>
        Scan QRIS untuk Bayar
      </h3>

      <div className="flex justify-center mb-4">
        <div className="bg-white p-3 rounded-xl border-2 border-dashed border-stone-200">
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

      <p className="text-xs text-stone-500 text-center leading-relaxed mb-3">
        Scan menggunakan aplikasi pembayaran digital
        <br />
        (GoPay, OVO, Dana, ShopeePay, dll)
      </p>

      {/* Download Button */}
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
  )
}
