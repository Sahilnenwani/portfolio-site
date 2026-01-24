import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import FloatingShapes from '@/components/FloatingShapes';
import ClientWrapper from '@/components/ClientWrapper';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sahil Nenwani | Full Stack Developer',
  description: 'Full Stack Developer specializing in backend systems, distributed architectures, and cloud solutions. Expert in Node.js, NestJS, Go, AWS, Kafka, and Kubernetes.',
  keywords: [
    'Sahil Nenwani',
    'Full Stack Developer',
    'Backend Developer',
    'Software Engineer',
    'Node.js',
    'NestJS',
    'Go',
    'TypeScript',
    'AWS',
    'Kafka',
    'Microservices',
    'Distributed Systems',
  ],
  authors: [{ name: 'Sahil Nenwani' }],
  creator: 'Sahil Nenwani',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sahilnenwani.dev',
    title: 'Sahil Nenwani | Full Stack Developer',
    description: 'Full Stack Developer specializing in backend systems, distributed architectures, and cloud solutions.',
    siteName: 'Sahil Nenwani Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahil Nenwani | Full Stack Developer',
    description: 'Full Stack Developer specializing in backend systems, distributed architectures, and cloud solutions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fafbfc" />
      </head>
      <body className="bg-background text-slate-900 antialiased">
        <FloatingShapes />
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
