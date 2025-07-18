import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Poppins } from 'next/font/google';
import { Chatbot } from '@/components/chatbot';
import { ScrollToTop } from '@/components/scroll-to-top';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'), // Replace with your actual domain
  title: 'Kishan Sondagar - Portfolio',
  description: 'Portfolio of Kishan Sondagar, a developer skilled in HTML, CSS, JavaScript, and Python.',
  openGraph: {
    title: 'Kishan Sondagar - Portfolio',
    description: 'A passionate developer specializing in creating elegant and efficient web solutions.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Kishan Sondagar Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kishan Sondagar - Portfolio',
    description: 'A passionate developer specializing in creating elegant and efficient web solutions.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Kishan Sondagar",
        "url": "https://example.com", // Replace with your actual domain
        "jobTitle": "Developer",
        "knowsAbout": ["HTML", "CSS", "JavaScript", "Python", "Next.js", "React", "Tailwind CSS"],
        "image": "https://example.com/opengraph-image", // Replace with your actual domain
        "sameAs": [
          "https://github.com/your-username", // Replace with your GitHub URL
          "https://linkedin.com/in/your-username" // Replace with your LinkedIn URL
        ]
      },
      {
        "@type": "WebSite",
        "url": "https://example.com", // Replace with your actual domain
        "name": "Kishan Sondagar Portfolio",
        "author": {
          "@type": "Person",
          "name": "Kishan Sondagar"
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          {children}
          <Chatbot />
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
