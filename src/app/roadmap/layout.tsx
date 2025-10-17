import { ReactNode } from 'react'

interface RoadmapLayoutProps {
  children: ReactNode
}

export default function RoadmapLayout({ children }: RoadmapLayoutProps) {
  return <>{children}</>
}

