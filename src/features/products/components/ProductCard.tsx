import type { Product } from "../types/product.types"
import type { CartProduct } from "../types/product.types"
import "./ProductCard.css"
type ProductCardProps = {
  products: Product[],
  addToCart: (product: Product) => void,
  addToQuantity: (product: Product) => void,
  removeFromQuantity: (product: Product) => void,
  productQuantity: { [key: number]: number },
  cart: CartProduct[]
}
export function ProductCard({ products, addToCart, addToQuantity, removeFromQuantity, productQuantity, cart }: ProductCardProps) {

  return (
    <>
      <ul className="product-grid">
        {products.map((product) => {
          const isInCart = cart.some(item => item.id === product.id)
          return (
            <li key={product.id} className="product-card">
              <img className="product-image" src={product.image} alt={product.title} />
              <h3 className="product-title">{product.title}</h3>
              <div className="product-addtoCartButton">
                <button disabled={productQuantity[product.id] === undefined} onClick={() => removeFromQuantity(product)}>-</button>
                <button
                  onClick={() => addToCart(product)}
                >
                  {isInCart ? "Actualizar carro" : "Añadir al carro"}
                </button>

                <button onClick={() => addToQuantity(product)}>+</button>

              </div>
              {
                productQuantity[product.id] >= 1 && (
                  <p>Cantidad: <strong>{productQuantity[product.id] || 0}</strong></p>
                )
              }
              {
                productQuantity[product.id] > 0
                  ? <p className="product-price">$ {Math.round(product.price * 900 * productQuantity[product.id])}</p>
                  : <p className="product-price">$ {Math.round(product.price * 900)}</p>
              }

            </li>
          )
        })}

      </ul>
    </>
  )
}