import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata = {
  title: 'RecipeHub - Premium Recipes & Culinary Community',
  description: 'Discover and share professional culinary recipes. Elevate your cooking journey with Michelin-star inspirations and community favorites.'
}

export default function RootLayout ({ children }) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
