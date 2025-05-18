// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import CustomCursor from '@/components/ui/custom-cursor';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ChatBot from '@/components/chatbot/chat-bot';
import './globals.css';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Rushabh Gandhi | Senior Software Developer',
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}