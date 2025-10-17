import { ReactNode } from 'react'

interface TeamsLayoutProps {
  children: ReactNode
}

export default function TeamsLayout({ children }: TeamsLayoutProps) {
  return <>{children}</>
}

