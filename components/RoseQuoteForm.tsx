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

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value).replace('ARS', '').trim();
};

export default function RoseQuoteForm() {
  const [formData, setFormData] = useState({
    manualidad: '',
    fecha: '',
    horasTrabajadas: '0',
    materiales: [
      { nombre: 'cinta', precio: '3.50' },
      { nombre: 'silicon', precio: '1.00' },
      { nombre: 'palitos de altura', precio: '0.50' }
    ],
    manoDeObra: '1000',
    gastosFijos: [
      { nombre: 'luz', valor: '20' },
      { nombre: 'celular', valor: '20' },
      { nombre: 'alquiler', valor: '200' }
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
  const [utilidadPorcentaje, setUtilidadPorcentaje] = useState('40');

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
    if (formData.materiales.length > 0) {
      const lastMaterial = formData.materiales[formData.materiales.length - 1];
      if (!lastMaterial.nombre || !lastMaterial.precio) {
        setMaterialesWarning('Por favor, complete el material anterior antes de agregar uno nuevo.');
        return;
      }
    }
    setFormData(prevData => ({
      ...prevData,
      materiales: [...prevData.materiales, { nombre: '', precio: '' }]
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
    if (formData.gastosFijos.length > 0) {
      const lastGastoFijo = formData.gastosFijos[formData.gastosFijos.length - 1];
      if (!lastGastoFijo.nombre || !lastGastoFijo.valor) {
        setGastosFijosWarning('Por favor, complete el gasto fijo anterior antes de agregar uno nuevo.');
        return;
      }
    }
    setFormData(prevData => ({
      ...prevData,
      gastosFijos: [...prevData.gastosFijos, { nombre: '', valor: '' }]
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
    const materiaPrima = formData.materiales.reduce((acc, mat) => acc + parseFloat(mat.precio || '0'), 0);
    const manoDeObra = parseFloat(formData.manoDeObra || '0');
    const gastosFijos = formData.gastosFijos.reduce((acc, gasto) => acc + parseFloat(gasto.valor || '0'), 0);
    const sueldosAdministrativos = 0;
    
    const totalSinUtilidad = materiaPrima + manoDeObra + gastosFijos + sueldosAdministrativos;
    const utilidad = totalSinUtilidad * (parseFloat(utilidadPorcentaje) / 100);
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
                min="0"
                step="0.5"
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
                min="0"
                max="100"
                value={utilidadPorcentaje}
                onChange={(e) => setUtilidadPorcentaje(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Materiales</Label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              <div className="col-span-3">Nombre</div>
              <div>Precio</div>
            </div>
            {formData.materiales.map((material, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 items-center mt-2">
                <Input
                  className="col-span-3"
                  placeholder="Nombre"
                  value={material.nombre}
                  onChange={(e) => handleMaterialChange(index, 'nombre', e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <Input
                    className="w-full"
                    type="number"
                    min="0"
                    step="0.01"
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
              min="0"
              step="0.01"
              value={formData.manoDeObra}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Gastos Fijos</Label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              <div className="col-span-3">Nombre</div>
              <div>Valor</div>
            </div>
            {formData.gastosFijos.map((gasto, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 items-center mt-2">
                <Input
                  className="col-span-3"
                  placeholder="Nombre"
                  value={gasto.nombre}
                  onChange={(e) => handleGastoFijoChange(index, 'nombre', e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <Input
                    className="w-full"
                    type="number"
                    min="0"
                    step="0.01"
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
                <div className="flex flex-col">
                  <span>MATERIA PRIMA</span>
                  <span className="text-xs text-gray-500">({formData.materiales.length} items)</span>
                </div>
                <div className="text-right">{formatCurrency(totalCost.materiaPrima)}</div>
                <div>MANO DE OBRA</div>
                <div className="text-right">{formatCurrency(totalCost.manoDeObra)}</div>
                <div className="flex flex-col">
                  <span>GASTOS FIJOS</span>
                  <span className="text-xs text-gray-500">({formData.gastosFijos.length} items)</span>
                </div>
                <div className="text-right">{formatCurrency(totalCost.gastosFijos)}</div>
                <div>SUELDOS ADMINISTRATIVOS</div>
                <div className="text-right">{formatCurrency(totalCost.sueldosAdministrativos)}</div>
                <div className="font-semibold">TOTAL SIN UTILIDAD</div>
                <div className="text-right font-semibold">{formatCurrency(totalCost.totalSinUtilidad)}</div>
                <div className="font-semibold">UTILIDAD ({utilidadPorcentaje}%)</div>
                <div className="text-right font-semibold">{formatCurrency(totalCost.utilidad)}</div>
                <div className="font-bold text-lg">TOTAL:</div>
                <div className="text-right font-bold text-lg">{formatCurrency(totalCost.total)}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}