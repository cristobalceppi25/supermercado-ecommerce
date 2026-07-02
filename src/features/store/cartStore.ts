import { create } from "zustand"
import type { Product, CartProduct } from "../products/types/product.types"

type CartStore = {
  cart: CartProduct[]
  productQuantity: { [key: number]: number }
  isCartOpen: boolean
  toggleCart: () => void
  closeCart: () => void
  addToCart: (product: Product) => void
  addToQuantity: (product: Product) => void
  removeFromQuantity: (product: Product) => void
  removeFromCart: (product: CartProduct) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  productQuantity: {},



  closeCart: () => set({ isCartOpen: false }),
  addToCart: (product) => {
    const { cart, productQuantity } = get()
    const exists = cart.find(p => p.id === product.id)
    const quantity = productQuantity[product.id] || 1
    if (!exists) {
      set({
        cart: [...cart, { ...product, quantity }],
        productQuantity: {
          ...productQuantity,
          [product.id]: quantity
        }
      })
    }
  },

  addToQuantity: (product) => {
    const { productQuantity } = get()

    set({
      productQuantity: {
        ...productQuantity,
        [product.id]: (productQuantity[product.id] || 0) + 1
      }
    })
  },

  removeFromQuantity: (product) => {
    const { productQuantity, cart } = get()
    const newQty = (productQuantity[product.id] || 0) - 1

    if (newQty <= 0) {
      set({
        productQuantity: {
          ...productQuantity,
          [product.id]: 0
        },
        cart: cart.filter(p => p.id !== product.id)
      })
      return
    }

    set({
      productQuantity: {
        ...productQuantity,
        [product.id]: newQty
      }
    })
  },

  removeFromCart: (product) => {
    const { cart, productQuantity } = get()

    const newQty = { ...productQuantity }
    delete newQty[product.id]

    set({
      cart: cart.filter(p => p.id !== product.id),
      productQuantity: newQty
    })
  },
  isCartOpen: false,

  toggleCart: () => set(state => ({
    isCartOpen: !state.isCartOpen
  })),
}))

