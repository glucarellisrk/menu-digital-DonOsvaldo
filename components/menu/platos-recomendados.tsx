"use client"

import { MenuItem } from "@/components/menu-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMenuData } from "@/hooks/use-menu-data"
import { ThumbsUp } from "lucide-react"

export function PlatosRecomendados() {
  const { menuData } = useMenuData()
  const platosRecomendados = menuData.platosRecomendados || []

  if (platosRecomendados.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <ThumbsUp className="w-12 h-12 text-[#eb7919] mb-4" />
        <h3 className="text-xl font-medium text-[#eb7919]">No hay platos recomendados</h3>
        <p className="text-gray-500 mt-2">El chef aún no ha seleccionado sus recomendaciones</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-none bg-[#eb7919]/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-[#eb7919] flex items-center">
            <ThumbsUp className="w-5 h-5 mr-2" />
            Platos Recomendados
          </CardTitle>
          <p className="text-sm text-gray-500">Selección especial del chef</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {platosRecomendados.map((item, index) => (
            <MenuItem key={index} name={item.name} description={item.description} price={item.price} highlight={true} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
