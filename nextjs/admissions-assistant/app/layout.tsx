import 'bootstrap/dist/css/bootstrap.css';
import '@atlaskit/css-reset';
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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
