"use client"

import { useMenuStore } from "@/hooks/use-menu-store"
import { RollsClasicos } from "@/components/menu/rolls-clasicos"
import { MakiSushi } from "@/components/menu/maki-sushi"
import { Nigiris } from "@/components/menu/nigiris"
import { Sashimi } from "@/components/menu/sashimi"
import { RollsEspeciales } from "@/components/menu/rolls-especiales"
import { RollsGourmet } from "@/components/menu/rolls-gourmet"
import { Tablas } from "@/components/menu/tablas"
import { Carnes } from "@/components/menu/carnes"
import { Pescados } from "@/components/menu/pescados"
import { Pastas } from "@/components/menu/pastas"
import { Pizzas } from "@/components/menu/pizzas"
import { Minutas } from "@/components/menu/minutas"
import { Wok } from "@/components/menu/wok"
import { Postres } from "@/components/menu/postres"
import { Bebidas } from "@/components/menu/bebidas"
import { Tragos } from "@/components/menu/tragos"
import { PlatosRecomendados } from "@/components/menu/platos-recomendados"
import { useEffect, useState } from "react"

export function MenuContent() {
  const { activeCategory } = useMenuStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="py-4">
      {activeCategory === "platos-recomendados" && <PlatosRecomendados />}
      {activeCategory === "rolls-clasicos" && <RollsClasicos />}
      {activeCategory === "maki-sushi" && <MakiSushi />}
      {activeCategory === "nigiris" && <Nigiris />}
      {activeCategory === "sashimi" && <Sashimi />}
      {activeCategory === "rolls-especiales" && <RollsEspeciales />}
      {activeCategory === "rolls-gourmet" && <RollsGourmet />}
      {activeCategory === "tablas" && <Tablas />}
      {activeCategory === "carnes" && <Carnes />}
      {activeCategory === "pescados" && <Pescados />}
      {activeCategory === "pastas" && <Pastas />}
      {activeCategory === "pizzas" && <Pizzas />}
      {activeCategory === "minutas" && <Minutas />}
      {activeCategory === "wok" && <Wok />}
      {activeCategory === "postres" && <Postres />}
      {activeCategory === "bebidas" && <Bebidas />}
      {activeCategory === "tragos" && <Tragos />}
    </div>
  )
}
