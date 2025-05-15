'use client'

import React from 'react'
import { cn } from "@/lib/utils"

export interface ToolIconProps {
  name: string
  icon: React.ComponentType<{ className?: string }>
  delay?: number
}

export function ToolIcon({ name, icon: Icon, delay = 0 }: ToolIconProps) {
  return (
    <div 
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black/40 backdrop-blur-xl",
        "border border-primary/20 shadow-lg shadow-primary/5 hover:border-primary/40 transition-colors",
        "transform-gpu transition-transform hover:scale-105",
        delay ? `animate-delay-${delay}` : ""
      )}
      style={{ 
        animationDelay: delay ? `${delay}ms` : undefined,
        transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
      }}
    >
      <div className="flex items-center justify-center w-6 h-6 shrink-0">
        <Icon className="w-full h-full text-primary/80" />
      </div>
      <span className="text-sm font-medium text-primary/80">{name}</span>
    </div>
  )
}