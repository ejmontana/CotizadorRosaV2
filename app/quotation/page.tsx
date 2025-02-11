"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoseQuoteForm from '@/components/RoseQuoteForm';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/lib/store';
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuotationPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Cotizador de Rosas</h1>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Dashboard
              </Button>
            </Link>
          </div>
          <RoseQuoteForm />
        </div>
      </div>
    </div>
  );
}