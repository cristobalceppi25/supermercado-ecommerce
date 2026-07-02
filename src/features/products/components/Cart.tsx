import type { CartProduct } from "../types/product.types"
import { Link } from 'react-router-dom'
import { useCartStore } from "../../store/cartStore"
import './cart.css'

export function Cart() {
  const {
    cart,
    addToQuantity,
    removeFromQuantity,
    productQuantity,
    closeCart
  } = useCartStore()

  if (cart.length === 0) return null

  const total = cart.reduce((acc, product) => {
    return (Math.round(acc + product.price * 900 * (productQuantity[product.id] || 0)))
  }, 0)

  return (
    <div className="cart">
      {cart.map((product: CartProduct) => (
        <div key={product.id} className="cartItem">

          <img src={product.image} alt={product.title} />

          <div className="cartInfo">
            <h4>{product.title}</h4>

            <div className="cartControls">
              <button onClick={() => removeFromQuantity(product)}>-</button>
              <span>{productQuantity[product.id] || 1}</span>
              <button onClick={() => addToQuantity(product)}>+</button>
            </div>

            <p>$ {Math.round(product.price * 900 * productQuantity[product.id])}</p>
          </div>

        </div>
      ))}

      <div>
        <p><strong>Total:</strong> $ {total}</p>
        <Link to="/checkout" className="checkoutButton" onClick={closeCart}>
          Pagar
        </Link>
      </div>
    </div>
  )
}