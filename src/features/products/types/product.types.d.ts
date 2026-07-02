export interface ApiProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
}

export interface ApiProductsResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: string;
}

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  image: string;
}




export type ProductQueryParams = {
  search?: string
  category?: string
  page?: number
  limit?: number
  skip?: number
}

export type CartProduct = Product & {
  quantity: number
}

export type Category = {
  slug: string
  name: string
  url: string
}