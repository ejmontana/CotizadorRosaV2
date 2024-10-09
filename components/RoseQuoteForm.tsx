"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert"

const MAX_MATERIALES = 10;
const MAX_GASTOS_FIJOS = 10;

export default function RoseQuoteForm() {
  const [formData, setFormData] = useState({
    manualidad: '',
    fecha: '',
    horasTrabajadas: 0,
    materiales: [
      { nombre: 'cinta', precio: 3.50 },
      { nombre: 'silicon', precio: 1.00 },
      { nombre: 'palitos de altura', precio: 0.50 }
    ],
    manoDeObra: 1000,
    gastosFijos: [
      { nombre: 'luz', valor: 20 },
      { nombre: 'celular', valor: 20 },
      { nombre: 'alquiler', valor: 200 }
    ],
  });

  const [totalCost, setTotalCost] = useState({
    materiaPrima: 0,
    manoDeObra: 0,
    gastosFijos: 0,
    sueldosAdministrativos: 0,
    totalSinUtilidad: 0,
    utilidad: 0,
    total: 0
  });
  const [materialesWarning, setMaterialesWarning] = useState('');
  const [gastosFijosWarning, setGastosFijosWarning] = useState('');
  const [utilidadPorcentaje, setUtilidadPorcentaje] = useState(40);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleMaterialChange = (index, field, value) => {
    const updatedMateriales = [...formData.materiales];
    updatedMateriales[index][field] = value;
    setFormData(prevData => ({
      ...prevData,
      materiales: updatedMateriales
    }));
  };

  const addMaterial = () => {
    if (formData.materiales.length >= MAX_MATERIALES) {
      setMaterialesWarning('No se pueden agregar más materiales.');
      return;
    }
    const lastMaterial = formData.materiales[formData.materiales.length - 1];
    if (!lastMaterial.nombre || !lastMaterial.precio) {
      setMaterialesWarning('Por favor, complete el material anterior antes de agregar uno nuevo.');
      return;
    }
    setFormData(prevData => ({
      ...prevData,
      materiales: [...prevData.materiales, { nombre: '', precio: 0 }]
    }));
    setMaterialesWarning('');
  };

  const removeMaterial = (index) => {
    setFormData(prevData => ({
      ...prevData,
      materiales: prevData.materiales.filter((_, i) => i !== index)
    }));
    setMaterialesWarning('');
  };

  const handleGastoFijoChange = (index, field, value) => {
    const updatedGastosFijos = [...formData.gastosFijos];
    updatedGastosFijos[index][field] = value;
    setFormData(prevData => ({
      ...prevData,
      gastosFijos: updatedGastosFijos
    }));
  };

  const addGastoFijo = () => {
    if (formData.gastosFijos.length >= MAX_GASTOS_FIJOS) {
      setGastosFijosWarning('No se pueden agregar más gastos fijos.');
      return;
    }
    const lastGastoFijo = formData.gastosFijos[formData.gastosFijos.length - 1];
    if (!lastGastoFijo.nombre || !lastGastoFijo.valor) {
      setGastosFijosWarning('Por favor, complete el gasto fijo anterior antes de agregar uno nuevo.');
      return;
    }
    setFormData(prevData => ({
      ...prevData,
      gastosFijos: [...prevData.gastosFijos, { nombre: '', valor: 0 }]
    }));
    setGastosFijosWarning('');
  };

  const removeGastoFijo = (index) => {
    setFormData(prevData => ({
      ...prevData,
      gastosFijos: prevData.gastosFijos.filter((_, i) => i !== index)
    }));
    setGastosFijosWarning('');
  };

  const calculateTotal = () => {
    const materiaPrima = formData.materiales.reduce((acc, mat) => acc + parseFloat(mat.precio), 0);
    const manoDeObra = parseFloat(formData.manoDeObra);
    const gastosFijos = formData.gastosFijos.reduce((acc, gasto) => acc + parseFloat(gasto.valor), 0);
    const sueldosAdministrativos = 0; // Asumimos que no hay sueldos administrativos por ahora
    
    const totalSinUtilidad = materiaPrima + manoDeObra + gastosFijos + sueldosAdministrativos;
    const utilidad = totalSinUtilidad * (utilidadPorcentaje / 100);
    const total = totalSinUtilidad + utilidad;

    setTotalCost({
      materiaPrima,
      manoDeObra,
      gastosFijos,
      sueldosAdministrativos,
      totalSinUtilidad,
      utilidad,
      total
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Cotizador de Arreglos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="manualidad">Manualidad</Label>
            <Input
              id="manualidad"
              name="manualidad"
              value={formData.manualidad}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="horasTrabajadas">Horas trabajadas</Label>
              <Input
                id="horasTrabajadas"
                name="horasTrabajadas"
                type="number"
                value={formData.horasTrabajadas}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="utilidad">Utilidad (%)</Label>
              <Input
                id="utilidad"
                name="utilidad"
                type="number"
                value={utilidadPorcentaje}
                onChange={(e) => setUtilidadPorcentaje(parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label>Materiales</Label>
            {formData.materiales.map((material, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input
                  placeholder="Nombre"
                  value={material.nombre}
                  onChange={(e) => handleMaterialChange(index, 'nombre', e.target.value)}
                />
                <Input
                  placeholder="Precio"
                  type="number"
                  value={material.precio}
                  onChange={(e) => handleMaterialChange(index, 'precio', e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMaterial(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={addMaterial}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar Material
            </Button>
            {materialesWarning && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{materialesWarning}</AlertDescription>
              </Alert>
            )}
          </div>

          <div>
            <Label htmlFor="manoDeObra">Mano de obra</Label>
            <Input
              id="manoDeObra"
              name="manoDeObra"
              type="number"
              value={formData.manoDeObra}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Gastos Fijos</Label>
            {formData.gastosFijos.map((gasto, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input
                  placeholder="Nombre"
                  value={gasto.nombre}
                  onChange={(e) => handleGastoFijoChange(index, 'nombre', e.target.value)}
                />
                <Input
                  placeholder="Valor"
                  type="number"
                  value={gasto.valor}
                  onChange={(e) => handleGastoFijoChange(index, 'valor', e.target.value)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeGastoFijo(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={addGastoFijo}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Agregar Gasto Fijo
            </Button>
            {gastosFijosWarning && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{gastosFijosWarning}</AlertDescription>
              </Alert>
            )}
          </div>

          <Button className="w-full" onClick={calculateTotal}>
            Calcular Total
          </Button>

          {totalCost.total > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold mb-3">COSTO TOTAL POR PIEZA</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>MATERIA PRIMA</div>
                <div className="text-right">${totalCost.materiaPrima.toFixed(2)}</div>
                <div>MANO DE OBRA</div>
                <div className="text-right">${totalCost.manoDeObra.toFixed(2)}</div>
                <div>GASTOS FIJOS</div>
                <div className="text-right">${totalCost.gastosFijos.toFixed(2)}</div>
                <div>SUELDOS ADMINISTRATIVOS</div>
                <div className="text-right">${totalCost.sueldosAdministrativos.toFixed(2)}</div>
                <div className="font-semibold">TOTAL SIN UTILIDAD</div>
                <div className="text-right font-semibold">${totalCost.totalSinUtilidad.toFixed(2)}</div>
                <div className="font-semibold">UTILIDAD</div>
                <div className="text-right font-semibold">${totalCost.utilidad.toFixed(2)}</div>
                <div className="font-bold text-lg">TOTAL:</div>
                <div className="text-right font-bold text-lg">${totalCost.total.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}