"use client"

import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuthStore } from '@/lib/store';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      login(username);
      onLogin();
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-gray-700">
          Usuario
        </Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Checkbox id="remember" className="text-pink-500 focus:ring-pink-500" />
          <Label htmlFor="remember" className="ml-2 text-sm text-gray-600">
            Recordarme
          </Label>
        </div>
        <a href="#" className="text-sm text-pink-600 hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
      <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md transition duration-300">
        Iniciar Sesión
      </Button>
    </form>
  );
}