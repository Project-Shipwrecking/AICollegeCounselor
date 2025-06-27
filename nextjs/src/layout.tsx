import 'bootstrap/dist/css/bootstrap.css';
import '@atlaskit/css-reset';
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from '@/components/Header';
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Next.js Authentication",
  description: "Example using NextAuth.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
