'use client'

import React from 'react'
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { People, Magnet, MissingPuzzle } from "@/components/icons/ui-icons"

// Props interfaces
interface ScenarioCardProps {
  Icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  className?: string
  titleColor?: string
  descriptionColor?: string
}

interface SectionHeaderProps {
  label: string
  title: React.ReactNode
  description: string
}

// Background pattern and gradient component
function BackgroundEffect() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.2)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,75,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,75,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
    </div>
  )
}

// Section header with label, title and description
function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <header className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2 max-w-7xl">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary/80 shadow-[0_0_15px_-3px_rgba(37,99,75,0.2)]">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" aria-hidden="true" />
          <span className="font-medium tracking-wide">{label}</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-text-primary text-center mx-auto">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground/90 text-center mx-auto font-medium">
          {description}
        </p>
      </div>
    </header>
  )
}

// Individual feature card component
function ScenarioCard({ 
  Icon, 
  title, 
  description, 
  className,
  titleColor = "text-primary",
  descriptionColor = "text-muted-foreground/80"
}: ScenarioCardProps) {
  return (
    <Card 
      className={cn(
        "group relative grid h-full p-8 sm:p-10 rounded-2xl border border-primary/10",
        "bg-gradient-to-b from-black/40 via-black/40 to-black/30 backdrop-blur-xl",
        "hover:border-primary/20 hover:bg-black/80 transition-all duration-300",
        "hover:shadow-[0_0_30px_-5px_rgba(37,99,75,0.3)]",
        "cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
      role="article"
      tabIndex={0}
    >
      {/* Hover gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        aria-hidden="true"
      />
      
      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className={cn(
            "p-3 rounded-xl bg-primary/10 text-primary w-12 h-12",
            "flex items-center justify-center",
            "group-hover:bg-primary/15 group-hover:scale-110",
            "transition-all duration-300 shadow-[0_0_15px_-3px_rgba(37,99,75,0.3)]",
            "relative z-10"
          )} aria-hidden="true">
            <Icon size={24} className="w-6 h-6" />
            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h3 className={cn("text-xl font-bold leading-none", titleColor)}>
            {title}
          </h3>
        </div>
        <p className={cn("text-base leading-relaxed text-muted-foreground/80", descriptionColor)}>
          {description}
        </p>
      </div>
    </Card>
  )
}

// Feature scenarios data
const SCENARIOS = [
  {
    Icon: People,
    title: "Got a client meeting?",
    description: "Morr.ai already sent the brief, highlighted critical points, and attached essential documents.",
    titleColor: "text-primary",
    descriptionColor: "text-muted-foreground/80"
  },
  {
    Icon: Magnet,
    title: "Need insights on your sales performance?",
    description: "Morr.ai provides live analytics, uncovers trends, and recommends next steps instantly.",
    titleColor: "text-primary",
    descriptionColor: "text-muted-foreground/80"
  },
  {
    Icon: MissingPuzzle,
    title: "Feeling overwhelmed by tool chaos?",
    description: "Morr.ai centralizes data from your apps into a single, intuitive interface.",
    titleColor: "text-primary",
    descriptionColor: "text-muted-foreground/80"
  }
] as const

// Main section component
export function WhatItDoesSection() {
  return (
    <section 
      className="w-full min-h-[40vh] flex items-center justify-center bg-background pt-24 lg:pt-16 pb-24 md:pb-32 lg:pb-40"
      aria-labelledby="what-it-does-title"
    >
      <div className="container px-4 md:px-6">
        {/* Main content container with glass effect */}
        <div className="relative w-full max-w-7xl mx-auto rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-primary/10 overflow-hidden shadow-[0_0_50px_-12px_rgba(37,99,75,0.2)]">
          <BackgroundEffect />
          
          <div className="relative px-6 py-24 md:px-12 md:py-32">
            <SectionHeader 
              label="Proactive AI Assistant"
              title={<>The First AI Assistant That Works{' '}<span className="text-primary inline-block">Before You Even Ask</span></>}
              description="Experience the future of work with an AI that anticipates your needs and streamlines your workflow before you even have to ask."
            />

            {/* Responsive grid for feature cards */}
            <div className="mx-auto grid max-w-xl xl:max-w-6xl items-start gap-6 sm:gap-8 sm:grid-cols-1 xl:grid-cols-3 pt-20">
              {SCENARIOS.map((scenario) => (
                <ScenarioCard
                  key={scenario.title}
                  {...scenario}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 