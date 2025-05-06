"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Define la estructura de los datos del menú
interface MenuItem {
  name: string
  description?: string
  price: string
  category?: string // Para identificar la categoría original del plato
}

interface MenuData {
  platosRecomendados: MenuItem[]
  rollsClasicos: MenuItem[]
  makiSushi: MenuItem[]
  nigiris: MenuItem[]
  sashimi: MenuItem[]
  rollsEspeciales: MenuItem[] // Combina Rolls Gourmet y Rolls Especiales aquí
  tablas: MenuItem[]
  carnes: MenuItem[]
  pescados: MenuItem[]
  pastas: MenuItem[]
  pizzas: MenuItem[]
  minutas: MenuItem[]
  wok: MenuItem[]
  postres: MenuItem[]
  bebidas: MenuItem[]
  tragos: MenuItem[]
  extras: MenuItem[]
}

// Datos iniciales del menú
const initialMenuData: MenuData = {
  platosRecomendados: [],
  rollsClasicos: [],
  makiSushi: [],
  nigiris: [
    { name: "Salmon", price: "11.000" },
    { name: "Salmon Ahumado", price: "11.000" },
  ],
  sashimi: [
    { name: "Salmon", price: "14.500" },
    { name: "Salmon Ahumado", price: "15.000" },
    { name: "Langostinos", price: "14.000" },
  ],
  rollsEspeciales: [
    // Combina Rolls Especiales y Rolls Gourmet aquí
    { name: "Ebi Fried", description: "Langostinos, Palta y Queso Philadelphia, Rebozados y Fritos", price: "13.000" },
    { name: "Won Ton Roll", description: "Langostinos, Palta y Queso Philadelphia, Envuelto en Masa", price: "13.000" },
    {
      name: "Roll Shitake",
      description: "Langostinos, Palta, Queso Philadelphia, coronados con Hongos Shitake y Caviar rojo",
      price: "12.500",
    },
    { name: "Crazy Ahumado", description: "Langostinos, Palta y Queso envuelto en Salmón ahumado", price: "12.500" },
    { name: "Geishas", description: "Cono de Salmon relleno de Queso Philadelphia y Palta", price: "13.500" },
    {
      name: "Roll de Pulpo",
      description: "Pulpo, Palta, Phila, envuelto en Salmon y Salsa Togarashi",
      price: "13.500",
    },
    {
      name: "Tamago Skere",
      description: "Kanikama, Palta, Queso, Coronado con Remolacha pai en almíbar de Jengibre y Salsa Togarashi",
      price: "12.500",
    },
    // Agrega más elementos de Rolls Gourmet y Rolls Especiales aquí
  ],
  tablas: [
    { name: "Tabla 1 (12 piezas Clásicas)", price: "30.000" },
    { name: "Tabla 2 (20 piezas Clásicas)", price: "50.000" },
  ],
  carnes: [
    { name: "Bondiola con Papas al Horno", price: "23.000" },
    { name: "Muslo relleno de Espinacas y Queso Brie con mil hojas de Papa y Salsa de Eneldo", price: "19.000" },
  ],
  pescados: [
    { name: "Salmone in Crosta di Sésamo con Souflee de Vegetales y Salsa Cremosa Asiática", price: "25.000" },
  ],
  pastas: [
    { name: "Raviolis di Vittello con Salsa Scroffa", price: "18.000" },
    { name: "Sorrentinos de Salmon con Salsa Cremosa de Cúrcuma y Ciboulette", price: "18.000" },
  ],
  pizzas: [
    { name: "Pizza Individual", price: "5.000" },
    { name: "Pizza Grande", price: "11.000" },
  ],
  minutas: [
    { name: "Milanesa Napolitana Para 1 c/Fritas", price: "10.000" },
    { name: "Milanesa Napolitana Para 2 c/Fritas", price: "19.000" },
  ],
  wok: [
    { name: "Wok de Lomo", price: "18.000" },
    { name: "Wok de Pollo", price: "18.000" },
  ],
  postres: [
    { name: "Tiramisú", price: "7.000" },
    { name: "Panna Cotta Casera", price: "7.500" },
  ],
  bebidas: [
    { name: "Gaseosa 500cc", price: "2.500" },
    { name: "Gaseosa 1 L", price: "3.000" },
  ],
  tragos: [
    { name: "Mojito Jäger", description: "Jägermeister, lima, azúcar, menta, hielo", price: "10.500" },
  ],
  extras: [
    { name: "Salsas (Maracuyá, Teriyaki, Mango)", price: "1.500" },
  ],
}

// Crear el contexto
interface MenuContextType {
  menuData: MenuData
  setMenuData: React.Dispatch<React.SetStateAction<MenuData>>
  updateMenuItem: (category: keyof MenuData, index: number, newPrice: string) => void
  saveChanges: (category: keyof MenuData) => void
  addToRecommended: (item: MenuItem, sourceCategory: keyof MenuData) => void
  removeFromRecommended: (index: number) => void
  getAllItems: () => { item: MenuItem; category: string }[]
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

// Proveedor del contexto
export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuData, setMenuData] = useState<MenuData>(initialMenuData)
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem("menuData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setMenuData({
          ...initialMenuData,
          ...parsedData,
          platosRecomendados: parsedData.platosRecomendados || [], // Asegúrate de que sea un arreglo
        })
      } catch (error) {
        console.error("Error al cargar datos del menú:", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Actualizar un elemento del menú
  const updateMenuItem = (category: keyof MenuData, index: number, newPrice: string) => {
    setMenuData((prevData) => {
      const newData = { ...prevData }
      const items = [...newData[category]]
      items[index] = { ...items[index], price: newPrice }
      newData[category] = items
      return newData
    })
  }

  // Guardar cambios en localStorage
  const saveChanges = (category: keyof MenuData) => {
    localStorage.setItem("menuData", JSON.stringify(menuData))
  }

  // Añadir un plato a recomendados
  const addToRecommended = (item: MenuItem, sourceCategory: keyof MenuData) => {
    setMenuData((prevData) => {
      // Verificar si el plato ya está en recomendados
      const isAlreadyRecommended = prevData.platosRecomendados.some(
        (recommendedItem) => recommendedItem.name === item.name && recommendedItem.category === sourceCategory,
      )

      if (isAlreadyRecommended) {
        return prevData
      }

      // Añadir el plato a recomendados con referencia a su categoría original
      const newRecommended = [...prevData.platosRecomendados, { ...item, category: sourceCategory }]

      return {
        ...prevData,
        platosRecomendados: newRecommended,
      }
    })
  }

  // Eliminar un plato de recomendados
  const removeFromRecommended = (index: number) => {
    setMenuData((prevData) => {
      const newRecommended = [...prevData.platosRecomendados]
      newRecommended.splice(index, 1)
      return {
        ...prevData,
        platosRecomendados: newRecommended,
      }
    })
  }

  // Obtener todos los platos para seleccionar en el panel de administración
  const getAllItems = () => {
    const allItems: { item: MenuItem; category: string }[] = []

    Object.entries(menuData).forEach(([category, items]) => {
      if (category !== "platosRecomendados") {
        items.forEach((item: any) => {
          allItems.push({
            item,
            category,
          })
        })
      }
    })

    return allItems
  }

  // Guardar automáticamente cuando cambian los datos y ya se ha cargado
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("menuData", JSON.stringify(menuData))
    }
  }, [menuData, isLoaded])

  return (
    <MenuContext.Provider
      value={{
        menuData,
        setMenuData,
        updateMenuItem,
        saveChanges,
        addToRecommended,
        removeFromRecommended,
        getAllItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useMenuData() {
  const context = useContext(MenuContext)
  if (context === undefined) {
    throw new Error("useMenuData debe ser usado dentro de un MenuProvider")
  }
  return context
}
