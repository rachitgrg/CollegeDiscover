import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CompareTray } from '@/components/compare/CompareTray'

export const metadata: Metadata = {
  title: {
    default: 'CollegeDiscover — Find Your Perfect College in India',
    template: '%s | CollegeDiscover',
  },
  description:
    'Discover, compare, and save top Indian colleges. Search by category, location, fees, and ratings to find the right college for you.',
  keywords: ['college', 'university', 'India', 'engineering', 'medical', 'MBA', 'admission'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <CompareTray />
        </Providers>
      </body>
    </html>
  )
}
