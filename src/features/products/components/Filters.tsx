import { type ChangeEvent } from "react"
import { type Category } from "../types/product.types"

type UseFiltersProps = {
  category: string
  categories: Category[]
  handleCategorySelect: (
    event: ChangeEvent<HTMLSelectElement>
  ) => void
}
export function Filters({ category, categories, handleCategorySelect }: UseFiltersProps) {


  return (
    <>
      <select value={category} onChange={handleCategorySelect}>
        <option value="">Categorías</option>

        {categories.map(category => (
          <option
            key={category.slug}
            value={category.slug}
          >
            {category.name}
          </option>
        ))}
      </select>
    </>
  )
}