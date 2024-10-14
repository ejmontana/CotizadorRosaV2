"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, DollarSign, PieChart, Users, Settings, FileText, BarChart } from 'lucide-react';

const modules = [
  {
    category: "Finanzas",
    icon: <DollarSign className="h-6 w-6" />,
    color: "from-green-400/80 to-emerald-600/80",
    items: [
      { name: "Cotización", path: "/quotation", icon: <FileText className="h-4 w-4" /> },
      { name: "Facturación", path: "/invoicing", icon: <FileText className="h-4 w-4" /> },
      { name: "Gastos", path: "/expenses", icon: <FileText className="h-4 w-4" /> },
    ]
  },
  {
    category: "Análisis",
    icon: <PieChart className="h-6 w-6" />,
    color: "from-blue-400/80 to-indigo-600/80",
    items: [
      { name: "Reporte de Ventas", path: "/sales-report", icon: <BarChart className="h-4 w-4" /> },
      { name: "Rendimiento", path: "/performance", icon: <BarChart className="h-4 w-4" /> },
    ]
  },
  {
    category: "Recursos Humanos",
    icon: <Users className="h-6 w-6" />,
    color: "from-yellow-400/80 to-orange-600/80",
    items: [
      { name: "Directorio de Empleados", path: "/employees", icon: <Users className="h-4 w-4" /> },
      { name: "Seguimiento de Tiempo", path: "/time-tracking", icon: <Users className="h-4 w-4" /> },
    ]
  },
  {
    category: "Configuración",
    icon: <Settings className="h-6 w-6" />,
    color: "from-purple-400/80 to-pink-600/80",
    items: [
      { name: "Configuración General", path: "/settings", icon: <Settings className="h-4 w-4" /> },
      { name: "Gestión de Usuarios", path: "/user-management", icon: <Users className="h-4 w-4" /> },
    ]
  },
];

export default function ModuleMenu() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {modules.map((module) => (
        <Card key={module.category} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className={`w-full flex items-center justify-between p-4 text-left bg-gradient-to-r ${module.color} text-white`}
              onClick={() => toggleCategory(module.category)}
            >
              <div className="flex items-center">
                {module.icon}
                <span className="ml-3 text-lg font-medium">{module.category}</span>
              </div>
              {expandedCategories.includes(module.category) ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
            {expandedCategories.includes(module.category) && (
              <div className="bg-card px-4 py-2 space-y-2">
                {module.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="flex items-center py-2 px-4 hover:bg-accent rounded transition-colors duration-200"
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}