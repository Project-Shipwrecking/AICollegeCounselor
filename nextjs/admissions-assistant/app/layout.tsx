import 'bootstrap/dist/css/bootstrap.css';
import "./globals.css";
import Header from '@/components/Header';

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
    <html lang="en">
      <Header />
      <body>{children}</body>
    </html>
  );
}
