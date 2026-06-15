export interface OrderMessage {
  productName: string
  productType: 'digital' | 'physical'
  quantity: number
  totalPrice: number
  shippingCost: number
  shippingZone: string
  address: string
  phone: string
  email: string
}

export const generateWhatsAppMessage = ({
  productName,
  productType,
  quantity,
  totalPrice,
  shippingCost,
  shippingZone,
  address,
  phone,
  email,
}: OrderMessage): string => {
  const isPhysical = productType === 'physical'
  const productPrice = totalPrice - shippingCost

  let message = `
*Konfirmasi Pembayaran Pesanan*
━━━━━━━━━━━━━━━━━━━━

*Detail Produk:*
Produk: ${productName}
Tipe: ${isPhysical ? '📦 Produk Fisik' : '💾 Produk Digital'}
Jumlah: ${quantity} unit
Harga Produk: Rp ${productPrice.toLocaleString('id-ID')}`.trim()

  if (isPhysical && shippingCost > 0) {
    message += `
Ongkir (${shippingZone}): Rp ${shippingCost.toLocaleString('id-ID')}`
  }

  message += `
*Total: Rp ${totalPrice.toLocaleString('id-ID')}*

*Data Pembeli:*
Nomor Telp: ${phone}
Email: ${email}`

  if (isPhysical && address) {
    message += `
Alamat: ${address}`
  }

  message += `

_Menunggu konfirmasi pembayaran dari admin._`

  return message.trim()
}

export const createWhatsAppLink = ({
  businessPhone,
  message,
}: {
  businessPhone: string
  message: string
}): string => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${businessPhone}?text=${encodedMessage}`
}

export const openWhatsAppChat = ({
  businessPhone,
  message,
}: {
  businessPhone: string
  message: string
}): void => {
  const link = createWhatsAppLink({ businessPhone, message })
  window.open(link, '_blank')
}
