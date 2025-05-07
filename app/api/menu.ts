import { NextApiRequest, NextApiResponse } from 'next'

const menuData = {
  dashboard: { open: false },
  incidencias: { open: false },
  pedidos: { open: false },
  stock: { open: false },
  productos: { open: false },
  clientes: { open: false },
  reportes: { open: false },
  configuracion: { open: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(menuData)
}
