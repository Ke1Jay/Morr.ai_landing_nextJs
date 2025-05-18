import { ReactNode } from 'react'

interface ProductLayoutProps {
  children: ReactNode
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
