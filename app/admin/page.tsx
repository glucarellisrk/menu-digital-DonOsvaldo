"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMenuData } from "@/hooks/use-menu-data"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, ChevronLeft, ChevronRight, Check, ThumbsUp, X, Plus } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Actualizar el mapeo de categorías para que coincida con las claves en menuData
const categories = [
  { id: "platosRecomendados", name: "Platos Recomendados" },
  { id: "rollsClasicos", name: "Rolls Clásicos" },
  { id: "makiSushi", name: "Maki Sushi" },
  { id: "nigiris", name: "Nigiris" },
  { id: "sashimi", name: "Sashimi" },
  { id: "rollsEspeciales", name: "Rolls Especiales" },
  { id: "rollsGourmet", name: "Rolls Gourmet" },
  { id: "tablas", name: "Tablas" },
  { id: "carnes", name: "Carnes" },
  { id: "pescados", name: "Pescados" },
  { id: "pastas", name: "Pastas" },
  { id: "pizzas", name: "Pizzas" },
  { id: "minutas", name: "Minutas" },
  { id: "wok", name: "Wok" },
  { id: "postres", name: "Postres" },
  { id: "bebidas", name: "Bebidas" },
  { id: "tragos", name: "Tragos" },
  { id: "extras", name: "Extras" },
]

// Mapeo de categorías para mostrar nombres amigables
const categoryNames: Record<string, string> = {
  rollsClasicos: "Rolls Clásicos",
  makiSushi: "Maki Sushi",
  nigiris: "Nigiris",
  sashimi: "Sashimi",
  rollsEspeciales: "Rolls Especiales",
  rollsGourmet: "Rolls Gourmet",
  tablas: "Tablas",
  carnes: "Carnes",
  pescados: "Pescados",
  pastas: "Pastas",
  pizzas: "Pizzas",
  minutas: "Minutas",
  wok: "Wok",
  postres: "Postres",
  bebidas: "Bebidas",
  tragos: "Tragos",
  extras: "Extras",
}

export default function AdminPage() {
  const { menuData, updateMenuItem, saveChanges, addToRecommended, removeFromRecommended, getAllItems, setMenuData } = useMenuData()
  const router = useRouter()
  const [editedPrices, setEditedPrices] = useState<Record<string, Record<number, string>>>({})
  const [activeTab, setActiveTab] = useState("platosRecomendados")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [selectedItem, setSelectedItem] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [newDish, setNewDish] = useState({ name: "", description: "", price: "", category: "" })
  const [manualDish, setManualDish] = useState({ name: "", description: "", price: "" })

  // Función para manejar cambios en los precios
  const handlePriceChange = (category: string, index: number, newPrice: string) => {
    setEditedPrices((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [index]: newPrice,
      },
    }))
  }

  // Función para guardar los cambios
  const handleSaveChanges = (category: keyof typeof menuData) => {
    if (editedPrices[category]) {
      Object.entries(editedPrices[category]).forEach(([indexStr, price]) => {
        const index = Number.parseInt(indexStr)
        updateMenuItem(category, index, price)
      })

      // Guardar todos los cambios en localStorage
      saveChanges(category)

      // Mostrar notificación de éxito
      toast({
        title: "Cambios guardados",
        description: "Los precios han sido actualizados correctamente.",
        action: (
          <ToastAction altText="Ok">
            <Check className="h-4 w-4" />
          </ToastAction>
        ),
      })

      // Limpiar los precios editados para esta categoría
      setEditedPrices((prev) => {
        const newState = { ...prev }
        delete newState[category]
        return newState
      })
    }
  }

  // Función para añadir un plato a recomendados
  const handleAddToRecommended = () => {
    if (manualDish.name) {
      // Agregar plato manualmente a "Platos Recomendados"
      setMenuData((prevData) => ({
        ...prevData,
        platosRecomendados: Array.isArray(prevData.platosRecomendados)
          ? [...prevData.platosRecomendados, { name: manualDish.name, description: manualDish.description, price: manualDish.price }]
          : [{ name: manualDish.name, description: manualDish.description, price: manualDish.price }],
      }))
      alert(`Plato "${manualDish.name}" añadido a los recomendados.`)
      setManualDish({ name: "", description: "", price: "" }) // Limpiar el formulario
    } else if (selectedItem && selectedCategory) {
      // Agregar plato seleccionado de otra categoría
      const [categoryId, itemIndex] = selectedItem.split("-")
      const category = categoryId as keyof typeof menuData
      const index = Number.parseInt(itemIndex)

      if (menuData[category] && menuData[category][index]) {
        const item = menuData[category][index]
        setMenuData((prevData) => ({
          ...prevData,
          platosRecomendados: Array.isArray(prevData.platosRecomendados)
            ? [...prevData.platosRecomendados, item]
            : [item],
        }))
        alert(`Plato "${item.name}" añadido a los recomendados.`)
        setSelectedItem("")
        setSelectedCategory("")
      }
    }
  }

  // Función para eliminar un plato de recomendados
  const handleRemoveFromRecommended = (index: number) => {
    const itemName = menuData.platosRecomendados[index].name
    removeFromRecommended(index)

    toast({
      title: "Plato eliminado de recomendados",
      description: `${itemName} ha sido eliminado de los platos recomendados.`,
    })
  }

  // Controlar la navegación con flechas
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
  }, [])

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

  // Desplazar a la categoría activa cuando cambia
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector(`[data-value="${activeTab}"]`)
      if (activeElement) {
        const containerRect = scrollContainerRef.current.getBoundingClientRect()
        const activeRect = activeElement.getBoundingClientRect()

        // Calcular la posición para centrar el elemento
        const scrollLeft = activeRect.left - containerRect.left - containerRect.width / 2 + activeRect.width / 2

        scrollContainerRef.current.scrollBy({
          left: scrollLeft,
          behavior: "smooth",
        })
      }
    }
  }, [activeTab])

  // Obtener todos los platos para el selector
  const allItems = getAllItems()

  const handleAddDish = () => {
    if (!newDish.name || !newDish.price || !newDish.category) {
      alert("Por favor, complete todos los campos obligatorios.")
      return
    }

    setMenuData((prevData) => ({
      ...prevData,
      [newDish.category]: [
        ...(prevData[newDish.category as keyof typeof menuData] || []),
        { name: newDish.name, description: newDish.description, price: newDish.price },
      ],
    }))

    alert(`Plato "${newDish.name}" añadido a la categoría "${newDish.category}".`)
    setNewDish({ name: "", description: "", price: "", category: "" }) // Limpiar el formulario
  }

  const handleRemoveDish = (category: string, index: number) => {
    setMenuData((prevData) => ({
      ...prevData,
      [category]: prevData[category as keyof typeof menuData]?.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="min-h-screen bg-[#fffefe] flex flex-col">
      <header className="bg-[#eb7919] text-[#fffefe] py-4 sticky top-0 z-10">
        <div className="container px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-[#fffefe]">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Panel de Administración</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <Card className="border-[#eb7919]/20 mb-6">
          <CardHeader>
            <CardTitle className="text-[#eb7919] flex items-center">
              <ThumbsUp className="h-5 w-5 mr-2" />
              Platos Recomendados
            </CardTitle>
            <CardDescription>Gestione los platos recomendados que aparecerán destacados en el menú</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-[#eb7919]">Platos Recomendados Actuales</h3>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#eb7919] hover:bg-[#eb7919]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir Recomendado
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Añadir Plato Recomendado</DialogTitle>
                      <DialogDescription>
                        Puede seleccionar un plato existente o agregar uno manualmente.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                      {/* Agregar plato manualmente */}
                      <div className="grid gap-2">
                        <Label htmlFor="manual-name">Nombre del Plato</Label>
                        <Input
                          id="manual-name"
                          placeholder="Ejemplo: Milanesa Napolitana"
                          value={manualDish.name}
                          onChange={(e) => setManualDish({ ...manualDish, name: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="manual-description">Descripción (opcional)</Label>
                        <Input
                          id="manual-description"
                          placeholder="Ejemplo: Con papas fritas"
                          value={manualDish.description}
                          onChange={(e) => setManualDish({ ...manualDish, description: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="manual-price">Precio</Label>
                        <Input
                          id="manual-price"
                          placeholder="Ejemplo: 10.000"
                          value={manualDish.price}
                          onChange={(e) => setManualDish({ ...manualDish, price: e.target.value })}
                        />
                      </div>

                      {/* Seleccionar plato existente */}
                      <div className="grid gap-2">
                        <Label htmlFor="category">Categoría</Label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(
                              (category) =>
                                category.id !== "platosRecomendados" && (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {selectedCategory && (
                        <div className="grid gap-2">
                          <Label htmlFor="item">Plato</Label>
                          <Select value={selectedItem} onValueChange={setSelectedItem}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione un plato" />
                            </SelectTrigger>
                            <SelectContent>
                              {menuData[selectedCategory as keyof typeof menuData]?.map((item, index) => (
                                <SelectItem key={`${selectedCategory}-${index}`} value={`${selectedCategory}-${index}`}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          className="bg-[#eb7919] hover:bg-[#eb7919]/90"
                          onClick={handleAddToRecommended}
                          disabled={!manualDish.name && (!selectedItem || !selectedCategory)}
                        >
                          Añadir
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {menuData.platosRecomendados && menuData.platosRecomendados.length === 0 ? (
                <div className="text-center py-8 border rounded-md border-dashed border-[#eb7919]/30">
                  <ThumbsUp className="h-10 w-10 text-[#eb7919]/40 mx-auto mb-2" />
                  <p className="text-gray-500">
                    No hay platos recomendados. Añada algunos para destacarlos en el menú.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {menuData.platosRecomendados?.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start p-3 border rounded-md border-[#eb7919]/20"
                    >
                      <div className="flex-1 pr-4">
                        <p className="font-medium">{item.name}</p>
                        {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                        <p className="text-xs text-[#eb7919]">
                          Precio: ${item.price || "No especificado"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveDish("platosRecomendados", index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#eb7919]/20">
          <CardHeader>
            <CardTitle className="text-[#eb7919]">Administrar Precios</CardTitle>
            <CardDescription>Actualice los precios de los productos del menú</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="relative">
                {showLeftArrow && (
                  <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 bg-[#fffefe] shadow-md rounded-full text-[#eb7919]"
                    aria-label="Desplazar a la izquierda"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                <div
                  ref={scrollContainerRef}
                  className="overflow-x-auto py-2 px-8 no-scrollbar scroll-smooth"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <TabsList className="flex mb-6 pb-1 w-max">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        data-value={category.id}
                        className="text-[#eb7919] whitespace-nowrap"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {showRightArrow && (
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-8 h-8 bg-[#fffefe] shadow-md rounded-full text-[#eb7919]"
                    aria-label="Desplazar a la derecha"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Contenido de las pestañas */}
              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-[#eb7919]">{category.name}</h3>
                      <Button
                        onClick={() => handleSaveChanges(category.id as keyof typeof menuData)}
                        disabled={!editedPrices[category.id]}
                        className="bg-[#eb7919] hover:bg-[#eb7919]/90"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Guardar
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {menuData[category.id as keyof typeof menuData]?.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-start p-3 border rounded-md border-[#eb7919]/20"
                        >
                          <div className="flex-1 pr-4">
                            <p className="font-medium">{item.name}</p>
                            {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`price-${category.id}-${index}`} className="sr-only">
                              Precio
                            </Label>
                            <Input
                              id={`price-${category.id}-${index}`}
                              value={
                                editedPrices[category.id]?.[index] !== undefined
                                  ? editedPrices[category.id][index]
                                  : item.price
                              }
                              onChange={(e) => handlePriceChange(category.id, index, e.target.value)}
                              className="max-w-[100px]"
                              inputMode="decimal"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveDish(category.id, index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

       
      </main>
      <Toaster />
    </div>
  )
}
