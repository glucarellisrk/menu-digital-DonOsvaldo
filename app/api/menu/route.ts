import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "menu.json");
    console.log("Ruta del archivo:", filePath);
    const fileContents = await fs.readFile(filePath, "utf-8");
    const menuData = JSON.parse(fileContents);
    return NextResponse.json(menuData);
  } catch (error) {
    console.error("Error al leer el archivo menu.json:", error);
    return NextResponse.json({ error: "No se pudo cargar el menú" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const filePath = path.join(process.cwd(), "data", "menu.json");
    console.log("Ruta del archivo:", filePath);

    const newMenuData = await request.json();
    console.log("Datos recibidos:", newMenuData);

    // Escribir los nuevos datos en el archivo menu.json
    await fs.writeFile(filePath, JSON.stringify(newMenuData, null, 2), "utf-8");
    console.log("Archivo actualizado correctamente");

    return NextResponse.json({ message: "Menú actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el archivo menu.json:", error);
    return NextResponse.json({ error: "No se pudo actualizar el menú" }, { status: 500 });
  }
}