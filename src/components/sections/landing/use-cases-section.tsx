import React from 'react'
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { StartupIcon, SalesIcon, ProductIcon, LeadershipIcon } from "@/components/icons/use-case-icons"

// Types and interfaces
interface IconProps {
  className?: string
}

interface UseCase {
  icon: React.ComponentType<IconProps>
  title: string
  description: string
  benefits: {
    title: string
    description: string
  }[]
}

// Array of use case data with their respective details
const USE_CASES: UseCase[] = [
  {
    icon: StartupIcon,
    title: "Startup Sales Teams",
    description: "Experience AI that works ahead of you - from meeting prep to deal insights, everything is ready before you ask.",
    benefits: [
      {
        title: "Smart Meeting Prep",
        description: "AI-generated briefs with customer context, past interactions, and action items"
      },
      {
        title: "Deal Intelligence",
        description: "Real-time pipeline analytics and risk detection before issues arise"
      },
      {
        title: "Automated Follow-ups",
        description: "Context-aware follow-up suggestions and automated task creation"
      }
    ]
  },
  {
    icon: SalesIcon,
    title: "SMB Sales Leaders",
    description: "Transform data into decisions with proactive insights that surface opportunities and risks automatically.",
    benefits: [
      {
        title: "Performance Analytics",
        description: "Real-time team metrics and trend analysis across all deals"
      },
      {
        title: "Risk Prevention",
        description: "Early warning system for at-risk deals and team bottlenecks"
      },
      {
        title: "Revenue Forecasting",
        description: "AI-powered predictions and scenario planning for growth"
      }
    ]
  },
  {
    icon: ProductIcon,
    title: "Sales Operations",
    description: "Eliminate manual work with an AI that handles reporting, tracking, and analytics automatically.",
    benefits: [
      {
        title: "Automated Reporting",
        description: "Self-generating reports that combine data from all your tools"
      },
      {
        title: "Smart Forecasting",
        description: "AI-driven pipeline analysis and revenue projections"
      },
      {
        title: "Activity Monitoring",
        description: "Automated tracking and insights across team activities"
      }
    ]
  },
  {
    icon: LeadershipIcon,
    title: "Account Executives",
    description: "Focus on relationships while AI handles research, prep work, and follow-ups behind the scenes.",
    benefits: [
      {
        title: "Customer Intelligence",
        description: "Real-time updates on accounts, competitors, and opportunities"
      },
      {
        title: "Meeting Excellence",
        description: "AI-prepared briefings and next-step recommendations"
      },
      {
        title: "Deal Acceleration",
        description: "Proactive insights to move deals forward faster"
      }
    ]
  }
]

// Individual card component for displaying a use case
function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const Icon = useCase.icon
  
  return (
    <Card className={cn(
      "group relative flex flex-col h-full",
      "p-6 sm:p-8",
      "rounded-xl",
      "border border-primary/10 bg-black/40 backdrop-blur-xl",
      "hover:bg-black/50 transition-all duration-300 hover:border-primary/20",
      "hover:translate-y-[-2px]",
      "cursor-pointer overflow-hidden"
    )}>
      {/* Icon */}
      <div className="relative mb-6">
        <div className={cn(
          "p-3 rounded-xl bg-primary/5 text-primary/80 w-12 h-12",
          "flex items-center justify-center",
          "group-hover:bg-primary/10 group-hover:scale-110",
          "transition-all duration-300",
          "relative z-10"
        )}>
          <Icon className="w-6 h-6" />
          <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <h3 className={cn(
          "text-lg font-semibold",
          "text-primary/90 mb-2",
          "group-hover:text-primary transition-colors duration-300"
        )}>
          {useCase.title}
        </h3>

        <p className={cn(
          "text-sm/relaxed text-muted-foreground/70",
          "mb-6",
          "group-hover:text-muted-foreground/90 transition-colors duration-300"
        )}>
          {useCase.description}
        </p>

        {/* Benefits */}
        <div className="mt-auto space-y-4">
          {useCase.benefits.map((benefit, index) => (
            <div 
              key={index}
              className={cn(
                "group-hover:transform group-hover:translate-x-1",
                "transition-transform duration-300 ease-out",
                `delay-[${index * 50}ms]`
              )}
            >
              <div className="flex items-start gap-3">
                <span className={cn(
                  "flex-shrink-0 w-1.5 h-1.5 mt-2",
                  "rounded-full bg-primary/60",
                  "group-hover:bg-primary group-hover:scale-110",
                  "transition-all duration-300"
                )} />
                <div>
                  <h4 className="text-sm font-medium text-primary/80 mb-0.5">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-muted-foreground/60">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </Card>
  )
}

// Main section component that displays all use cases
export function UseCasesSection() {
  return (
    <section className="w-full py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,75,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,75,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 md:mb-16">
          <div className="space-y-2 max-w-[900px]">
            <div className={cn(
              "inline-flex items-center",
              "rounded-full border border-primary/20 bg-primary/5",
              "px-4 py-1.5",
              "text-sm text-primary/80",
              "shadow-[0_0_15px_-3px_rgba(37,99,75,0.2)]"
            )}>
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
              <span>Sales Excellence</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-center mx-auto">
              Supercharge Your <span className="text-primary">Sales Team</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground/80 text-center mx-auto max-w-[600px]">
              From meeting prep to deal insights, Morr.ai helps startups and SMBs close more deals with proactive AI that works before you ask.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className={cn(
          "grid",
          "gap-6 sm:gap-8",
          "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
          "max-w-7xl mx-auto"
        )}>
          {USE_CASES.map((useCase, index) => (
            <UseCaseCard key={index} useCase={useCase} />
          ))}
        </div>
      </div>
    </section>
  )
} 