import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

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
    <html lang="en" className={`dark ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body className="bg-background text-zinc-100 antialiased">
        <div className="noise-overlay">
          {children}
        </div>
      </body>
    </html>
  );
}
