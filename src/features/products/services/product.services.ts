import { type ApiProductsResponse, type Product, type ApiProduct, type ProductQueryParams } from "../types/product.types"


function mapApiToProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    title: apiProduct.title,
    category: apiProduct.category,
    price: apiProduct.price,
    rating: apiProduct.rating,
    image: apiProduct.thumbnail
  }
}
export async function fetchProducts({ search, limit, category, skip }: ProductQueryParams): Promise<{
  products: Product[]
  total: number
}> {
  let url = ''

  if (search && search.trim() !== '') {
    url = `https://dummyjson.com/products/search?q=${search}`
  } else if (category && category.trim() !== '') {
    url = `https://dummyjson.com/products/category/${category}`
  } else {
    url = `https://dummyjson.com/products`
  }

  if (limit) {
    if (url.includes("?")) {
      url += `&limit=${limit}`
    } else {
      url += `?limit=${limit}`
    }
  }

  if (skip !== undefined) {
    if (url.includes("?")) {
      url += `&skip=${skip}`
    } else {
      url += `?skip=${skip}`
    }
  }


  const response = await fetch(url)

  const data: ApiProductsResponse = await response.json()


  return {
    products: data.products.map(mapApiToProduct),
    total: data.total
  }
}

