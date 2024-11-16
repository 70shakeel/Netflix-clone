import Navbar from '@/components/NavBar';
import './globals.css';

export const metadata = {
  title: 'Netflix Clone',
  description: 'A Netflix-inspired streaming app.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
