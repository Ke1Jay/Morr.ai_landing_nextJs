import { ReactNode } from 'react'

interface HowItWorksLayoutProps {
  children: ReactNode
}

export default function HowItWorksLayout({ children }: HowItWorksLayoutProps) {
  return <>{children}</>
}

