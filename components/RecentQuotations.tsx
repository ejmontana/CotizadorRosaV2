"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const recentQuotations = [
  { id: 1, date: "2023-04-23", client: "Florería Luna", total: 1250.00, status: "Aprobada" },
  { id: 2, date: "2023-04-22", client: "Eventos Rosales", total: 2100.50, status: "Pendiente" },
  { id: 3, date: "2023-04-21", client: "Decoraciones Pétalo", total: 1800.75, status: "Rechazada" },
  { id: 4, date: "2023-04-20", client: "Bodas Elegantes", total: 3200.00, status: "Aprobada" },
  { id: 5, date: "2023-04-19", client: "Jardín Botánico", total: 950.25, status: "Pendiente" },
]

export default function RecentQuotations() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentQuotations.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell>{quote.date}</TableCell>
              <TableCell>{quote.client}</TableCell>
              <TableCell>${quote.total.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  quote.status === 'Aprobada' ? 'bg-green-100 text-green-800' :
                  quote.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {quote.status}
                </span>
              </TableCell>
              <TableCell>
                <Link href={`/quotation/${quote.id}`}>
                  <Button variant="ghost" size="sm">
                    Ver <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-right">
        <Link href="/quotations">
          <Button variant="outline">
            Ver todas las cotizaciones
          </Button>
        </Link>
      </div>
    </div>
  )
}