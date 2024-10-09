import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cotizador de Rosas',
  description: 'Calcula el precio de tus arreglos florales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gradient-to-br from-pink-100 to-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}