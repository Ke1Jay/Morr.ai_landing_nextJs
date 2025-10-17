import { ReactNode } from 'react'

interface SecurityLayoutProps {
  children: ReactNode
}

export default function SecurityLayout({ children }: SecurityLayoutProps) {
  return <>{children}</>
}

