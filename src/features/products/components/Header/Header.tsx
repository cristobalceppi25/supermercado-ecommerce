import "./Header.css"
import { Link, useSearchParams } from "react-router-dom"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { InstagramLogo, FacebookLogo, TwitterLogo } from "../Logos"
import { useCartStore } from "../../../store/cartStore"
import { Cart } from "../Cart"
import { Filters } from '../Filters'
import type { Category } from "../../types/product.types"
import { fetchCategories } from "../../hooks/useProducts"

export function Header() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchFromUrl = searchParams.get("search") ?? ""
  const category = searchParams.get("category") ?? ""
  const [inputValue, setInputValue] = useState(searchFromUrl)
  const [categories, setCategories] = useState<Category[]>([])

  const cart = useCartStore(state => state.cart)
  const toggleCart = useCartStore(state => state.toggleCart)
  const isCartOpen = useCartStore(state => state.isCartOpen)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    setInputValue(searchFromUrl)
  }, [searchFromUrl])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSearchParams({
      search: inputValue,
      page: "1"
    })
  }

  const handleCartClick = () => {
    if (cart.length === 0) return
    toggleCart()
  }
  const handleCategorySelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParams(({
      category: event.target.value,
      page: "1"
    })
    )
  }

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(data))
  }, [])
  return (
    <header className="header">
      <div className="left">
        <Link to="/" className="logo">
          Supermercado
        </Link>

        <Filters
          category={category}
          categories={categories}
          handleCategorySelect={handleCategorySelect}
        />
      </div>

      <form onSubmit={handleSubmit} className="search">
        <input value={inputValue} onChange={handleInputChange} />
        <button>🔍</button>
      </form>

      <div className="right">
        <div className="social">
          <InstagramLogo width={24} height={24} />
          <FacebookLogo width={24} height={24} />
          <TwitterLogo width={24} height={24} />
        </div>

        <div className="cart" onClick={handleCartClick}>
          🛒 {cart.length}
        </div>

      </div>
      {isCartOpen && cart.length > 0 && (
        <div
          className="cartContainer"
          onClick={(e) => e.stopPropagation()}
        >
          <Cart />
        </div>
      )}

    </header>
  )
}