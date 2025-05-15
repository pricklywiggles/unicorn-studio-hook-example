import type { Metadata } from 'next';
import './globals.css';
import { Montserrat } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Unicorn Studio Hook Example',
  description:
    'A simple example of using a hook to manage the loading state of a Unicorn Studio scene using JSON.'
};

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300', '400', '700', '900']
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat.variable} bg-neutral-bg text-neutral-text font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
