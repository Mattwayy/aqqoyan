import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "./context/ModalContext";
import AuthModal from "./components/AuthModal";
import ScrollToHash from './components/scrollToHash'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Islamic Finance and Business Forum 2026",
  description: "Международная площадка для диалога в сфере исламских финансов и бизнеса",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ModalProvider>
          {children}
          <AuthModal />
          <ScrollToHash /> {/* 👈 добавьте компонент сюда */}
        </ModalProvider>
      </body>
    </html>
  );
}