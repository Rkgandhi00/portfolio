// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/theme/theme-provider';
import Navbar from '../components/layout/navbar';
import ChatBot from '../components/chatbot/chat-bot';
import Footer from '../components/layout/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Rushabh Gandhi | Human',
  description: 'Portfolio website showcasing the work and skills of Rushabh Gandhi, a Senior Software Developer specializing in React, .NET, and Azure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Cosmic Navigation component */}
          <Navbar />
          
          {/* Main content */}
          <main className="min-h-screen">
            {children}
          </main>
          <ChatBot />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}