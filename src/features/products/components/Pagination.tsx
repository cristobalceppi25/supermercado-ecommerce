import { useEffect, useState } from "react"
import { type SetURLSearchParams } from "react-router-dom"
import "./Pagination.css"

type UsePaginationProps = {
  currentPage: number,
  totalPages: number,
  buildParams: (changes: Record<string, string>) => Record<string, string>,
  setSearchParams: SetURLSearchParams
}

export function Pagination({
  currentPage,
  totalPages,
  buildParams,
  setSearchParams
}: UsePaginationProps) {

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 600px)")

    const update = () => setIsMobile(media.matches)

    update()
    media.addEventListener("change", update)

    return () => media.removeEventListener("change", update)
  }, [])

  // =========================
  // DESKTOP (tu lógica original)
  // =========================
  const getDesktopPages = () => {
    const pages = []

    const blockSize = 4

    // Determina en qué bloque estás
    const currentBlock = Math.floor((currentPage - 1) / blockSize)

    const start = currentBlock * blockSize + 1
    const end = Math.min(start + blockSize, totalPages)

    // Siempre primera página
    pages.push(1)

    // Páginas del bloque (evitando repetir el 1)
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    // Agregar "..." si no estás cerca del final
    if (end < totalPages - 1) {
      pages.push("...")
    }

    // Siempre última página
    if (totalPages !== 1) {
      pages.push(totalPages)
    }

    return pages
  }

  // =========================
  // MOBILE (nuevo comportamiento)
  // =========================
  const getMobilePages = () => {
    const pages = []

    pages.push(1)

    if (currentPage > 2) {
      pages.push("...")
    }

    if (currentPage !== 1 && currentPage !== totalPages) {
      pages.push(currentPage)
    }

    if (currentPage < totalPages - 1) {
      pages.push("...")
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  // =========================
  // SELECTOR FINAL
  // =========================
  const getVisiblePages = () => {
    return isMobile ? getMobilePages() : getDesktopPages()
  }

  const handleForwardPage = () => {
    setSearchParams(
      buildParams({
        page: String(currentPage + 1)
      })
    )
  }

  const handleBackwardPage = () => {
    setSearchParams(
      buildParams({
        page: String(currentPage - 1)
      })
    )
  }

  return (
    <nav className="pagination">

      {/* BACK */}
      <a
        onClick={handleBackwardPage}
        className={currentPage === 1 ? "finish" : ""}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>

      {/* PAGES */}
      {getVisiblePages().map((page, index) => {
        if (page === "...") {
          return <span key={`dots-${index}`}>...</span>
        }

        return (
          <a
            key={page}
            onClick={() =>
              setSearchParams(
                buildParams({
                  page: String(page)
                })
              )
            }
            className={currentPage === page ? "is-active" : ""}
          >
            {page}
          </a>
        )
      })}

      {/* NEXT */}
      <a
        onClick={handleForwardPage}
        className={currentPage === totalPages ? "finish" : ""}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>

    </nav>
  )
}