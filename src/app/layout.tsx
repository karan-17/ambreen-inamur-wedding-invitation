import type { Metadata } from 'next'
import { Playfair_Display, Inter, Dancing_Script, Cormorant_Garamond } from 'next/font/google'
import '../styles/globals.css'
import { cn } from '@/utils'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dancing = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-elegant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: 'Wedding Invitation - Join Us for Our Special Day',
  description: 'You are cordially invited to celebrate our wedding. Join us for a day filled with love, joy, and unforgettable memories.',
  keywords: ['wedding', 'invitation', 'celebration', 'love', 'marriage', 'ceremony'],
  authors: [{ name: 'Wedding Couple' }],
  creator: 'Wedding Invitation App',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-wedding-site.com',
    title: 'Wedding Invitation - Join Us for Our Special Day',
    description: 'You are cordially invited to celebrate our wedding. Join us for a day filled with love, joy, and unforgettable memories.',
    siteName: 'Wedding Invitation',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wedding Invitation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Invitation - Join Us for Our Special Day',
    description: 'You are cordially invited to celebrate our wedding.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: false, // Typically you don't want wedding invitations indexed
    follow: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={cn(
        playfair.variable,
        inter.variable, 
        dancing.variable,
        cormorant.variable,
        'scroll-smooth'
      )}
    >
      <body className={cn(
        'font-sans antialiased',
        'bg-gradient-to-br from-rose-50 via-white to-pink-50',
        'text-gray-800 selection:bg-primary-200 selection:text-primary-900'
      )}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}