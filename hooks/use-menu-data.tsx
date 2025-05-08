"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "@/src/firebase"; // Ajusta la ruta según la ubicación real del archivo firebase.ts

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
  saveChanges: (dataToSave?: MenuData) => void;
  addToRecommended: (item: MenuItem, sourceCategory: keyof MenuData) => void;
  removeFromRecommended: (index: number) => void;
  getAllItems: () => { item: MenuItem; category: string }[];
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Proveedor del contexto
export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menuData, setMenuData] = useState<MenuData>(initialMenuData);
  const [isLoaded, setIsLoaded] = useState(false);

  // Leer menú en tiempo real desde Firebase
  useEffect(() => {
    const menuRef = ref(db, "menu");
    const unsubscribe = onValue(menuRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setMenuData({ ...initialMenuData, ...data });
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, []);

  // Guardar menú en Firebase cada vez que cambia
  useEffect(() => {
    if (isLoaded) {
      set(ref(db, "menu"), menuData);
    }
    // eslint-disable-next-line
  }, [menuData]);

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
          await set(ref(db, "menu"), menuData);
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


