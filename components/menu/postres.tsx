"use client"

import { MenuItem } from "@/components/menu-item"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMenuData } from "@/hooks/use-menu-data"

export function Postres() {
  const { menuData } = useMenuData()
  const postres = menuData.postres || []

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-none bg-[#eb7919]/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-[#eb7919]">Postres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {postres.map((item, index) => (
            <MenuItem key={index} name={item.name} price={item.price} />
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-none">
        <CardContent className="text-center text-sm text-gray-500">Servicio de Mesa $1.500</CardContent>
      </Card>
    </div>
  )
}
