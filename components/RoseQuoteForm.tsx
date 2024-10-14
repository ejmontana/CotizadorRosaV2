"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { PlusCircle, X, AlertCircle, DollarSign, Calendar, Clock, Percent } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatCurrency } from '@/lib/utils';

const MAX_MATERIALES = 10;
const MAX_GASTOS_FIJOS = 10;

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
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-pink-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6 rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center">
          <DollarSign className="mr-2 h-6 w-6" />
          Cotizador de Arreglos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="manualidad" className="text-lg font-medium text-gray-700 dark:text-gray-300">Manualidad</Label>
            <Input
              id="manualidad"
              name="manualidad"
              value={formData.manualidad}
              onChange={handleInputChange}
              className="mt-1 bg-white dark:bg-gray-700"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fecha" className="text-lg font-medium text-gray-700 dark:text-gray-300">Fecha</Label>
              <div className="relative mt-1">
                <Input
                  id="fecha"
                  name="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={handleInputChange}
                  className="pl-10 bg-white dark:bg-gray-700"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div>
              <Label htmlFor="horasTrabajadas" className="text-lg font-medium text-gray-700 dark:text-gray-300">Horas trabajadas</Label>
              <div className="relative mt-1">
                <Input
                  id="horasTrabajadas"
                  name="horasTrabajadas"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.horasTrabajadas}
                  onChange={handleInputChange}
                  className="pl-10 bg-white dark:bg-gray-700"
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            <div>
              <Label htmlFor="utilidad" className="text-lg font-medium text-gray-700 dark:text-gray-300">Utilidad (%)</Label>
              <div className="relative mt-1">
                <Input
                  id="utilidad"
                  name="utilidad"
                  type="number"
                  min="0"
                  max="100"
                  value={utilidadPorcentaje}
                  onChange={(e) => setUtilidadPorcentaje(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-700"
                />
                <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-lg font-medium text-gray-700 dark:text-gray-300">Materiales</Label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              <div className="col-span-3">Nombre</div>
              <div>Precio</div>
            </div>
            {formData.materiales.map((material, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 items-center mt-2">
                <Input
                  className="col-span-3 bg-white dark:bg-gray-700"
                  placeholder="Nombre"
                  value={material.nombre}
                  onChange={(e) => handleMaterialChange(index, 'nombre', e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <Input
                    className="w-full bg-white dark:bg-gray-700"
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
            <Label htmlFor="manoDeObra" className="text-lg font-medium text-gray-700 dark:text-gray-300">Mano de obra</Label>
            <Input
              id="manoDeObra"
              name="manoDeObra"
              type="number"
              min="0"
              step="0.01"
              value={formData.manoDeObra}
              onChange={handleInputChange}
              className="mt-1 bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <Label className="text-lg font-medium text-gray-700 dark:text-gray-300">Gastos Fijos</Label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              <div className="col-span-3">Nombre</div>
              <div>Valor</div>
            </div>
            {formData.gastosFijos.map((gasto, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 items-center mt-2">
                <Input
                  className="col-span-3 bg-white dark:bg-gray-700"
                  placeholder="Nombre"
                  value={gasto.nombre}
                  onChange={(e) => handleGastoFijoChange(index, 'nombre', e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <Input
                    className="w-full bg-white dark:bg-gray-700"
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

          <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white" onClick={calculateTotal}>
            <DollarSign className="mr-2 h-5 w-5" />
            Calcular Total
          </Button>

          {totalCost.total > 0 && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-bold mb-3 text-pink-600 dark:text-pink-400">COSTO TOTAL POR PIEZA</h3>
              <div className="grid grid-cols-2 gap-2 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 dark:text-gray-300">MATERIA PRIMA</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({formData.materiales.length} items)</span>
                </div>
                <div className="text-right font-medium text-gray-800 dark:text-gray-200">{formatCurrency(totalCost.materiaPrima)}</div>
                <div className="font-medium text-gray-700 dark:text-gray-300">MANO DE OBRA</div>
                <div className="text-right font-medium text-gray-800 dark:text-gray-200">{formatCurrency(totalCost.manoDeObra)}</div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700 dark:text-gray-300">GASTOS FIJOS</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({formData.gastosFijos.length} items)</span>
                </div>
                <div className="text-right font-medium text-gray-800 dark:text-gray-200">{formatCurrency(totalCost.gastosFijos)}</div>
                <div className="font-medium text-gray-700 dark:text-gray-300">SUELDOS ADMINISTRATIVOS</div>
                <div className="text-right font-medium text-gray-800 dark:text-gray-200">{formatCurrency(totalCost.sueldosAdministrativos)}</div>
                <div className="font-semibold text-lg text-gray-800 dark:text-gray-200">TOTAL SIN UTILIDAD</div>
                <div className="text-right font-semibold text-lg text-gray-800 dark:text-gray-200">{formatCurrency(totalCost.totalSinUtilidad)}</div>
                <div className="font-semibold text-lg text-gray-800 dark:text-gray-200">UTILIDAD ({utilidadPorcentaje}%)</div>
                <div className="text-right font-semibold text-lg text-gray-800 dark:text-gray-200">{formatCurrency(totalCost.utilidad)}</div>
                <div className="font-bold text-xl text-pink-600 dark:text-pink-400">TOTAL:</div>
                <div className="text-right font-bold text-xl text-pink-600 dark:text-pink-400">{formatCurrency(totalCost.total)}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}