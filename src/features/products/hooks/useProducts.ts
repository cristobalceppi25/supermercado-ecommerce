import { useEffect, useState } from "react";
import { type Product, type Category } from "../types/product.types";
import { fetchProducts } from "../services/product.services";



type UseProductsProps = {
  initialSearch: string
  category: string
  limit: number
  currentPage: number
}

export function useProducts({ initialSearch, category, limit, currentPage }: UseProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const skip = (currentPage - 1) * limit
  useEffect(() => {
    const gettingProducts = async () => {
      try {
        setError(null)
        setLoading(true)
        const newProduct = await fetchProducts({ search: initialSearch, limit, category, skip, })
        setTotal(newProduct.total)
        setProducts(newProduct.products)
      } catch (e) {
        setError('Error al hacer el fetching de datos')
      } finally {
        setLoading(false)
      }
    }
    gettingProducts()
  }, [initialSearch, category, limit, currentPage])


  return { products, loading, error, total }
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(
    'https://dummyjson.com/products/categories'
  )

  return response.json()
}