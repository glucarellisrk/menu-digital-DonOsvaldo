"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Define la estructura de los datos del menú
interface MenuItem {
  name: string;
  description?: string;
  price: string;
  category?: string; // Para identificar la categoría original del plato
}

interface MenuData {
  platosRecomendados: MenuItem[];
  rollsClasicos: MenuItem[];
  makiSushi: MenuItem[];
  nigiris: MenuItem[];
  sashimi: MenuItem[];
  rollsEspeciales: MenuItem[];
  tablas: MenuItem[];
  carnes: MenuItem[];
  pescados: MenuItem[];
  pastas: MenuItem[];
  pizzas: MenuItem[];
  minutas: MenuItem[];
  wok: MenuItem[];
  postres: MenuItem[];
  bebidas: MenuItem[];
  tragos: MenuItem[];
  extras: MenuItem[];
}

// Datos iniciales del menú
const initialMenuData: MenuData = {
  platosRecomendados: [],
  rollsClasicos: [],
  makiSushi: [],
  nigiris: [],
  sashimi: [],
  rollsEspeciales: [],
  tablas: [],
  carnes: [],
  pescados: [],
  pastas: [],
  pizzas: [],
  minutas: [],
  wok: [],
  postres: [],
  bebidas: [],
  tragos: [],
  extras: [],
};

// Crear el contexto
interface MenuContextType {
  menuData: MenuData;
  setMenuData: React.Dispatch<React.SetStateAction<MenuData>>;
  updateMenuItem: (category: keyof MenuData, index: number, newPrice: string) => void;
  saveChanges: () => void;
  addToRecommended: (item: MenuItem, sourceCategory: keyof MenuData) => void;
  removeFromRecommended: (index: number) => void;
  getAllItems: () => { item: MenuItem; category: string }[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Proveedor del contexto
export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuData, setMenuData] = useState<MenuData>(initialMenuData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar datos del menú desde un endpoint remoto
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        // Obtener los datos del menú desde el servidor
        const response = await fetch("/api/menu");
        if (!response.ok) throw new Error("Error al obtener menú desde servidor");

        const remoteData = await response.json();
        setMenuData({
          ...initialMenuData,
          ...remoteData,
        });
      } catch (error) {
        console.error("Error al cargar datos del menú:", error);
      }
      setIsLoaded(true);
    };

    loadMenuData();
  }, []);

  // Guardar automáticamente en localStorage cuando cambian los datos
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("menuData", JSON.stringify(menuData));
    }
  }, [menuData, isLoaded]);

  return (
    <MenuContext.Provider
      value={{
        menuData,
        setMenuData,
        updateMenuItem: (category, index, newPrice) => {
          setMenuData((prevData) => {
            const updatedCategory = [...prevData[category]];
            updatedCategory[index] = { ...updatedCategory[index], price: newPrice };
            return { ...prevData, [category]: updatedCategory };
          });
        },
        saveChanges: async () => {
          try {
            const response = await fetch("/api/menu", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(menuData), // Enviar todo el menú actualizado
            });
        
            if (!response.ok) {
              throw new Error("Error al guardar los cambios en el servidor");
            }
        
            console.log("Menú actualizado correctamente en el servidor");
          } catch (error) {
            console.error("Error al guardar los cambios:", error);
          }
        },
        addToRecommended: (item, sourceCategory) => {
          setMenuData((prevData) => ({
            ...prevData,
            platosRecomendados: [...prevData.platosRecomendados, { ...item, category: sourceCategory }],
          }));
        },
        removeFromRecommended: (index) => {
          setMenuData((prevData) => {
            const updatedRecommended = [...prevData.platosRecomendados];
            updatedRecommended.splice(index, 1);
            return { ...prevData, platosRecomendados: updatedRecommended };
          });
        },
        getAllItems: () => {
          return Object.entries(menuData).flatMap(([category, items]) =>
            items.map((item: any) => ({ item, category }))
          );
        },
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useMenuData() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenuData debe ser usado dentro de un MenuProvider");
  }
  return context;
}
