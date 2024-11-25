import './globals.css';
import ClientProvider from './ClientProvider'; // A new client component for SessionProvider

export const metadata = {
  title: 'Netflix Clone',
  description: 'A Netflix-inspired streaming app.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
