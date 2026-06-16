export interface Product {
  id: number
  name: string
  price: number
  images: string[]
  description: string
  detail: string
  type: 'digital' | 'physical'
}

export interface CheckoutData {
  productId: number
  quantity: number
  totalPrice: number
  phone: string
  email: string
}
