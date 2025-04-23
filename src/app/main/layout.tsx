import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Web3Provider from '@/contexts/Web3Context';
import PostsProvider from '@/contexts/PostsContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ToldYouNotToTell',
  description: 'Anonymous confessions platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Web3Provider>
            <PostsProvider>
              {children}
            </PostsProvider>
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}