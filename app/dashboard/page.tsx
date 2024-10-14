"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RoseQuoteForm from '@/components/RoseQuoteForm';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/lib/store';

export default function DashboardPage() {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">Cotizador de Rosas</h1>
        <RoseQuoteForm />
      </div>
    </div>
  );
}