"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Lock, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Loader } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      // Credenciales de ejemplo (en una aplicación real, esto se verificaría en el servidor)
      if (username === "admin" && password === "admin123") {
        router.push("/admin")
      } else {
        setError("Credenciales incorrectas")
      }
      setLoading(false)
    }, 1000) // Delay de 1 segundo
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffefe]">
      <header className="bg-[#eb7919] text-[#fffefe] py-4">
        <div className="container px-4 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-[#fffefe] mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Acceso Administrador</h1>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-[#eb7919]/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-bold text-center text-[#eb7919]">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Ingrese sus credenciales para acceder al panel de administración
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuario</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="admin"
                    className="pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {error && <div className="text-sm text-red-500 text-center">{error}</div>}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-[#eb7919] hover:bg-[#eb7919]/90"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="animate-spin h-5 w-5 mx-auto" />
                ) : (
                  "Ingresar"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
