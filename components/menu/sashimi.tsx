"use client"

import { MenuItem } from "@/components/menu-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMenuData } from "@/hooks/use-menu-data"

export function Sashimi() {
  const { menuData } = useMenuData()
  const sashimi = menuData.sashimi || []
  const extras = menuData.extras || []

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-none bg-[#eb7919]/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-[#eb7919]">Sashimi</CardTitle>
          <p className="text-sm text-gray-500">X 6 Piezas</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {sashimi.map((item, index) => (
            <MenuItem key={index} name={item.name} price={item.price} />
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-[#eb7919]">Adicionales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {extras.map((item, index) => (
            <MenuItem key={index} name={item.name} price={item.price} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
