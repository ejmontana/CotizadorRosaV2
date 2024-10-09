import { Flower } from 'lucide-react';
import RoseQuoteForm from '../components/RoseQuoteForm';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <Flower className="inline-block text-pink-500 w-16 h-16 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800">Cotizador de Rosas</h1>
        <p className="text-xl text-gray-600 mt-2">Calcula el precio de tus arreglos florales</p>
      </header>
      <main>
        <RoseQuoteForm />
      </main>
    </div>
  );
}