import { useProducts } from '../hooks/useProducts'
import { ProductCard } from './ProductCard'
import { useSearchParams } from 'react-router-dom'
import { Pagination } from './Pagination'
import { useCartStore } from '../../store/cartStore'


export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchFromUrl = searchParams.get("search") ?? ""
  const {
    cart,
    addToCart,
    addToQuantity,
    removeFromQuantity,
    productQuantity
  } = useCartStore()
  const category = searchParams.get("category") ?? ""
  const limit = Number(searchParams.get("limit")) || 8
  let currentPage = Number(searchParams.get("page")) || 1



  const { products, loading, total } = useProducts({
    initialSearch: searchFromUrl,
    category: category,
    limit,
    currentPage
  })

  const totalPages = Math.ceil(total / limit)


  const buildParams = (changes: Record<string, string>) => {
    const params: Record<string, string> = {}

    if (searchFromUrl.trim() !== "") {
      params.search = searchFromUrl
    }

    if (category.trim() !== "") {
      params.category = category
    }

    if (limit) {
      params.limit = String(limit)
    }

    if (currentPage) {
      params.page = String(currentPage)
    }

    Object.assign(params, changes)

    return params
  }

  return (
    <>
      <div className="container">
        {
          loading ?
            <p>Buscando...</p>
            :
            <ProductCard products={products}
              addToCart={addToCart}
              addToQuantity={addToQuantity}
              removeFromQuantity={removeFromQuantity}
              productQuantity={productQuantity}
              cart={cart}
            />
        }

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          buildParams={buildParams}
          setSearchParams={setSearchParams}
        />
      </div>

    </>
  )
}