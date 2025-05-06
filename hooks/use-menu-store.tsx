"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface MenuState {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      activeCategory: "platos-recomendados", // Cambiado para que inicie en platos recomendados
      setActiveCategory: (category) => set({ activeCategory: category }),
    }),
    {
      name: "menu-store",
    },
  ),
)
