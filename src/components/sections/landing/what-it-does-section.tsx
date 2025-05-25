import React from 'react'
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

// Props interfaces
interface ScenarioCardProps {
  emoji: string
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
const BackgroundEffect = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_65%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,75,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,75,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
  </div>
)

// Section header with label, title and description
const SectionHeader = ({ label, title, description }: SectionHeaderProps) => (
  <div className="flex flex-col items-center justify-center space-y-4 text-center">
    <div className="space-y-2 max-w-[900px]">
      {/* Pill label with animated dot */}
      <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary/80 mb-4">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
        <span>{label}</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-text-primary text-center mx-auto">
        {title}
      </h2>
      <p className="mt-6 sm:max-w-xs lg:max-w-lg sm:text-lg md:text-xl text-muted-foreground/80 text-center mx-auto">
        {description}
      </p>
    </div>
  </div>
)

// Individual feature card component
const ScenarioCard = ({ 
  emoji, 
  title, 
  description, 
  className,
  titleColor = "text-primary",
  descriptionColor = "text-muted-foreground/80"
}: ScenarioCardProps) => (
  <Card 
    className={cn(
      "group relative grid h-full p-8 rounded-xl border border-primary/10 bg-black/40 backdrop-blur-xl",
      "hover:border-primary/20 hover:bg-black/50 transition-all duration-300",
      "cursor-pointer overflow-hidden",
      className
    )}
  >
    {/* Hover gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Card content */}
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{emoji}</span>
        <h3 className={cn("text-lg font-bold", titleColor)}>
          {title}
        </h3>
      </div>
      <p className={cn("text-base leading-relaxed", descriptionColor)}>
        {description}
      </p>
    </div>

    {/* Decorative corner accent */}
    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </Card>
)

// Feature scenarios data
const SCENARIOS = [
  {
    emoji: "🙋‍♂️",
    title: "Got a client meeting?",
    description: "Morr.ai already sent the brief, highlighted critical points, and attached essential documents.",
    titleColor: "text-primary",
    descriptionColor: "text-muted-foreground/80"
  },
  {
    emoji: "📈",
    title: "Need insights on your sales performance?",
    description: "Morr.ai provides live analytics, uncovers trends, and recommends next steps instantly.",
    titleColor: "text-primary",
    descriptionColor: "text-muted-foreground/80"
  },
  {
    emoji: "🧩",
    title: "Feeling overwhelmed by tool chaos?",
    description: "Morr.ai centralizes data from your apps into a single, intuitive interface.",
    titleColor: "text-primary",
    descriptionColor: "text-muted-foreground/80"
  }
] as const

// Main section component
export function WhatItDoesSection() {
  return (
    <section className="w-full min-h-[40vh] flex items-center justify-center bg-background pt-16 lg:pt-8 pb-24 md:pb-32 lg:pb-40">
      <div className="container px-4 md:px-6">
        {/* Main content container with glass effect */}
        <div className="relative w-full max-w-7xl mx-auto rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-primary/10 overflow-hidden">
          <BackgroundEffect />
          
          <div className="relative px-6 py-20 md:px-12 md:py-24">
            <SectionHeader 
              label="Proactive AI Assistant"
              title={<>The First AI Assistant That Works <span className="text-primary"><br />Before You Even Ask</span></>}
              description="Morr.ai centralizes data from your apps into a single, intuitive interface."
            />

            {/* Responsive grid for feature cards */}
            <div className="mx-auto grid max-w-xl xl:max-w-5xl items-start gap-8 sm:grid-cols-1 xl:grid-cols-3 pt-16">
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