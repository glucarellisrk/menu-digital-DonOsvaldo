import type React from "react"
import "@/app/globals.css"
import { MenuProvider } from "@/hooks/use-menu-data"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <title>Menú Digital - Don Osvaldo</title>
        <meta name="description" content="Menú digital para Don Osvaldo Sushi & Cocina Internacional" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#eb7919" />
      </head>
      <body>
        <MenuProvider>{children}</MenuProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
