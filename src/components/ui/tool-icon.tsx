'use client'

import React from 'react'
import { cn } from "@/lib/utils"

export interface ToolIconProps {
  icon: React.ComponentType<{ className?: string }>
  delay?: number
  className?: string
}

export function ToolIcon({ icon: Icon, delay = 0, className }: ToolIconProps) {
  return (
    <div 
      className={cn(
        "p-2 sm:p-2.5 md:p-3 rounded-lg bg-black/40 backdrop-blur-xl",
        "border border-primary/20 shadow-lg shadow-primary/5 hover:border-primary/40 transition-colors",
        "transform-gpu transition-transform hover:scale-105",
        delay ? `animate-delay-${delay}` : "",
        className
      )}
      style={{ 
        animationDelay: delay ? `${delay}ms` : undefined,
        transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
      }}
    >
      {/* Wrapper to keep icon upright while parent rotates */}
      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 [transform:rotate(var(--rotation))]">
        <Icon className="w-full h-full text-primary/80" />
      </div>
    </div>
  )
}