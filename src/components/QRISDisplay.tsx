'use client'

export default function QRISDisplay() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sticky top-28">
      <h3 className="text-lg font-semibold text-stone-800 mb-4 text-center" style={{ fontFamily: 'var(--font-display)' }}>
        Scan QRIS untuk Bayar
      </h3>

      <div className="flex justify-center mb-4">
        <div className="bg-stone-50 p-3 rounded-xl border-2 border-dashed border-stone-200">
          <img
            src="/qris-code.png"
            alt="QRIS Code"
            className="w-48 h-48 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://placehold.co/200x200/f5f5f4/ea580c?text=QRIS+Code'
            }}
          />
        </div>
      </div>

      <p className="text-xs text-stone-500 text-center leading-relaxed">
        Scan menggunakan aplikasi pembayaran digital
        <br />
        (GoPay, OVO, Dana, ShopeePay, dll)
      </p>

      <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
        <p className="text-xs text-orange-700 text-center font-medium">
          ⚡ Pembayaran langsung dikonfirmasi otomatis
        </p>
      </div>
    </div>
  )
}
