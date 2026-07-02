import type { CartProduct } from "../types/product.types"
import { useCartStore } from "../../store/cartStore"
import './CartCheckOut.css'
import { useState } from "react"

export function CartCheckOut() {
  const {
    cart,
    productQuantity
  } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)
  if (cart.length === 0) return null

  const total = cart.reduce((acc, product) => {
    return (Math.round(acc + product.price * 900 * (productQuantity[product.id] || 0)))
  }, 0)

  return (
    <div className="cartCheckOut">
      <div className="summaryHeader">
        <h2>Resumen del pedido</h2>

        <button
          className="summaryToggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Ocultar productos ▲" : "Ver productos ▼"}
        </button>
      </div>

      <div className={`summaryProducts ${isOpen ? "open" : ""}`}>
        {cart.map((product: CartProduct) => (
          <div key={product.id} className="cartCheckOutItem">
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <h3>Cantidad: {productQuantity[product.id] || 1}</h3>
            <p>$ {Math.round(product.price * 900 * productQuantity[product.id])}</p>
          </div>
        ))}
      </div>


      <div>
        <p><strong>Total:</strong> $ {total}</p>
      </div>
    </div>
  )
}