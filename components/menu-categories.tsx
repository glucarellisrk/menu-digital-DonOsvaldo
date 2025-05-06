"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMenuStore } from "@/hooks/use-menu-store"
import {
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  Fish,
  Pizza,
  Coffee,
  Cake,
  Shell,
  Wine,
  Utensils,
  Leaf,
  Drumstick,
} from "lucide-react"

const categories = [
  { id: "platos-recomendados", name: "Platos Recomendados", icon: <ThumbsUp className="w-4 h-4 mr-1" /> },
  { id: "rolls-clasicos", name: "Rolls Clásicos", icon: <Shell className="w-4 h-4 mr-1" /> },
  { id: "maki-sushi", name: "Maki Sushi", icon: <Fish className="w-4 h-4 mr-1" /> },
  { id: "nigiris", name: "Nigiris", icon: <Fish className="w-4 h-4 mr-1" /> },
  { id: "sashimi", name: "Sashimi", icon: <Fish className="w-4 h-4 mr-1" /> },
  { id: "rolls-especiales", name: "Rolls Especiales", icon: <Shell className="w-4 h-4 mr-1" /> },
  { id: "rolls-gourmet", name: "Rolls Gourmet", icon: <Shell className="w-4 h-4 mr-1" /> },
  { id: "tablas", name: "Tablas", icon: <Utensils className="w-4 h-4 mr-1" /> },
  { id: "carnes", name: "Carnes", icon: <Drumstick className="w-4 h-4 mr-1" /> },
  { id: "pescados", name: "Pescados", icon: <Fish className="w-4 h-4 mr-1" /> },
  { id: "pastas", name: "Pastas", icon: <Utensils className="w-4 h-4 mr-1" /> },
  { id: "pizzas", name: "Pizzas", icon: <Pizza className="w-4 h-4 mr-1" /> },
  { id: "minutas", name: "Minutas", icon: <Utensils className="w-4 h-4 mr-1" /> },
  { id: "wok", name: "Wok", icon: <Leaf className="w-4 h-4 mr-1" /> },
  { id: "postres", name: "Postres", icon: <Cake className="w-4 h-4 mr-1" /> },
  { id: "bebidas", name: "Bebidas", icon: <Coffee className="w-4 h-4 mr-1" /> },
  { id: "tragos", name: "Tragos", icon: <Wine className="w-4 h-4 mr-1" /> },
]

export function MenuCategories() {
  const { activeCategory, setActiveCategory } = useMenuStore()
  const [mounted, setMounted] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll)
      // Verificar inicialmente
      checkScroll()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScroll)
      }
    }
  }, [mounted])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="relative flex items-center bg-[#fffefe] z-10 border-b border-[#eb7919]/20 py-2">
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 bg-[#fffefe] shadow-md rounded-full text-[#eb7919]"
          aria-label="Desplazar a la izquierda"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto py-2 px-8 gap-2 no-scrollbar w-full scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "whitespace-nowrap rounded-full text-sm px-4 py-2 h-auto flex-shrink-0 flex items-center",
              activeCategory === category.id
                ? "bg-[#eb7919] text-[#fffefe] hover:bg-[#eb7919]/90 hover:text-[#fffefe]"
                : "text-[#eb7919] hover:bg-[#eb7919]/10 hover:text-[#eb7919]",
            )}
          >
            {category.icon}
            {category.name}
          </Button>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 flex items-center justify-center w-8 h-8 bg-[#fffefe] shadow-md rounded-full text-[#eb7919]"
          aria-label="Desplazar a la derecha"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
