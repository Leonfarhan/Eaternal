import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eaternal',
  description: 'Dashboard for Eaternal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="h-screen flex bg-base text-black">
            <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0">
              <Sidebar />
            </div>
            <main className="md:pl-72 flex-1 h-full overflow-y-auto text-foreground">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}