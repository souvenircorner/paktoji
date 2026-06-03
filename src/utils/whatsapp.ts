export interface OrderMessage {
  productName: string
  quantity: number
  totalPrice: number
  phone: string
  email: string
}

export const generateWhatsAppMessage = ({
  productName,
  quantity,
  totalPrice,
  phone,
  email,
}: OrderMessage): string => {
  const message = `
*Konfirmasi Pembayaran Pesanan*
━━━━━━━━━━━━━━━━━━━━

Produk: ${productName}
Jumlah: ${quantity} unit
Total: Rp ${totalPrice.toLocaleString('id-ID')}

*Data Pembeli:*
Nomor Telp: ${phone}
Email: ${email}

_Menunggu konfirmasi pembayaran dari admin._
`.trim()

  return message
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
