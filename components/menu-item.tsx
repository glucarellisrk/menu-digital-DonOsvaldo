import { Card, CardContent, CardDescription } from "@/components/ui/card"

export interface MenuItemProps {
  name: string
  description?: string
  price: string
  highlight?: boolean
}

export function MenuItem({ name, description, price, highlight = false }: MenuItemProps) {
  return (
    <Card className={`border-2 border-gray-300 shadow-I ${highlight ? "bg-[#eb7919]/5" : ""}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-medium text-gray-800">{name}</h3>
            {description && <CardDescription className="mt-1 text-sm">{description}</CardDescription>}
          </div>
          <span className="font-bold whitespace-nowrap text-[#eb99999]">${price}</span>
        </div>
      </CardContent>
    </Card>
  )
}
