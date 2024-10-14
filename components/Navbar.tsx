"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Flower, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="bg-gradient-to-r from-pink-200 to-purple-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
              <Flower className="h-8 w-8 text-pink-600" />
              <span className="ml-2 text-xl font-semibold text-pink-800">Cotizador Rosa</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <span className="text-sm font-medium text-pink-800">
              Hola, {user}
            </span>
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="text-pink-800 hover:text-pink-600"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-pink-800 border-pink-800 hover:bg-pink-300 hover:text-pink-900"
            >
              Salir
            </Button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-pink-800 hover:text-pink-600 hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-pink-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <span className="block px-3 py-2 rounded-md text-sm font-medium text-pink-800">
              Hola, {user}
            </span>
            <Link
              href="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-pink-800 hover:bg-pink-300"
            >
              Dashboard
            </Link>
            <button
              onClick={toggleTheme}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-pink-800 hover:bg-pink-300 flex items-center"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5 mr-2" /> Modo Claro
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 mr-2" /> Modo Oscuro
                </>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-pink-800 hover:bg-pink-300"
            >
              Salir
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}