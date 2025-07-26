"use client";

import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from '@/components/Header';
import { SessionProvider } from "next-auth/react";
import { useEffect } from 'react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
