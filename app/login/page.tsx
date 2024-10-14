"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import { Flower } from 'lucide-react';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    router.push('/dashboard');
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-white">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="relative h-48">
            <Image
              src="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="Roses"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
            <div className="absolute inset-0 bg-pink-500 bg-opacity-30 flex items-center justify-center">
              <Flower className="text-white w-16 h-16" />
            </div>
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Bienvenido</h2>
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}