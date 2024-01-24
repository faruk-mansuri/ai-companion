import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import ThemeProvider from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import ProModal from '@/components/ProModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI Companion',
  description: 'Chat with AI companion',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={cn('bg-secondary', inter.className)}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ProModal />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
