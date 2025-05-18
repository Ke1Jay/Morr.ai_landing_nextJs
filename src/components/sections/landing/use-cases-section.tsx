import React from 'react'
import { cn } from "@/lib/utils"

// Types and interfaces
interface IconProps {
  className?: string
}

interface UseCase {
  icon: React.ComponentType<IconProps>
  title: string
  description: string
  benefits: string[]
}

// SVG Icon components for different use cases
const StartupIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20v-8" />
    <path d="M18 20v-4" />
    <path d="M6 20v-12" />
    <path d="M12 12a4 4 0 1 0-4-4" />
    <path d="M18 16a4 4 0 1 0-4-4" />
  </svg>
)

const SalesIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const ProductIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
)

const LeadershipIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-7H4a2 2 0 0 0-2 2v4" />
    <path d="M14 2v6h6" />
    <path d="M2 14h12" />
    <path d="M8 10v8" />
    <path d="m5 17 3 3 3-3" />
  </svg>
)

// Array of use case data with their respective details
const USE_CASES: UseCase[] = [
  {
    icon: StartupIcon,
    title: "Startup Sales Teams",
    description: "Close deals faster with AI-powered insights and automated meeting prep.",
    benefits: [
      "Automated pre-call briefs",
      "Real-time pipeline insights",
      "Smart follow-up automation"
    ]
  },
  {
    icon: SalesIcon,
    title: "SMB Sales Leaders",
    description: "Make data-driven decisions with instant access to team performance and deal analytics.",
    benefits: [
      "Team performance tracking",
      "Deal risk detection",
      "Revenue trend analysis"
    ]
  },
  {
    icon: ProductIcon,
    title: "Sales Operations",
    description: "Streamline processes and eliminate manual reporting tasks with proactive AI.",
    benefits: [
      "Automated sales reports",
      "Pipeline forecasting",
      "Activity tracking"
    ]
  },
  {
    icon: LeadershipIcon,
    title: "Account Executives",
    description: "Focus on relationships while AI handles the operational heavy lifting.",
    benefits: [
      "Instant client context",
      "Competitor insights",
      "Meeting preparation"
    ]
  }
]

// Individual card component for displaying a use case
function UseCaseCard({ useCase }: { useCase: UseCase }) {
  const Icon = useCase.icon
  
  return (
    <div className={cn(
      "group relative flex flex-col min-h-[420px]",
      "p-8",
      "rounded-xl",
      "border border-primary/10 bg-black/40 backdrop-blur-xl",
      "hover:bg-black/50 transition-all duration-300 hover:border-primary/20",
      "hover:translate-y-[-4px]",
      "cursor-pointer"
    )}>
      <div className="relative mb-6">
        <div className={cn(
          "p-4 rounded-xl bg-primary/5 text-primary/80 w-14 h-14",
          "flex items-center justify-center",
          "group-hover:bg-primary/10 group-hover:scale-110",
          "transition-all duration-300",
          "relative z-10"
        )}>
          <Icon className="w-7 h-7" />
        </div>
        <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className={cn(
          "text-xl font-semibold min-h-[3rem]",
          "text-primary/90 mb-4",
          "group-hover:text-primary transition-colors duration-300"
        )}>
          {useCase.title}
        </h3>

        <p className={cn(
          "text-base text-muted-foreground/70",
          "leading-relaxed mb-8",
          "group-hover:text-muted-foreground/90 transition-colors duration-300"
        )}>
          {useCase.description}
        </p>

        <div className="mt-auto pt-6 border-t border-primary/5">
          <ul className="space-y-4">
            {useCase.benefits.map((benefit, index) => (
              <li 
                key={index} 
                className={cn(
                  "flex items-start gap-3",
                  "text-muted-foreground/70",
                  "group-hover:transform group-hover:translate-x-1",
                  `delay-[${index * 50}ms]`
                )}
              >
                <span className={cn(
                  "flex-shrink-0 w-1.5 h-1.5 mt-2",
                  "rounded-full bg-primary/60",
                  "group-hover:bg-primary group-hover:scale-110",
                  "transition-all duration-300"
                )} />
                <span className="text-sm">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cn(
        "absolute -bottom-0 -right-0",
        "w-8 h-8",
        "bg-gradient-to-br from-primary/20 via-primary/10 to-transparent",
        "rounded-tl-3xl",
        "opacity-0 group-hover:opacity-100",
        "transition-all duration-300",
        "pointer-events-none"
      )} />
    </div>
  )
}

// Main section component that displays all use cases
export function UseCasesSection() {
  return (
    <section className="w-full min-h-[40vh] flex items-center justify-center bg-background pt-16 lg:pt-8 pb-24 md:pb-32 lg:pb-40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-[900px]">
            <div className={cn(
              "inline-flex items-center",
              "rounded-full border border-primary/20 bg-primary/5",
              "px-4 py-1.5",
              "text-sm text-primary/80"
            )}>
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
              <span>Sales Excellence</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mx-auto">
              Supercharge Your <span className="text-primary">Sales Team</span>
            </h2>
            <p className="mt-6 sm:max-w-xs lg:max-w-lg sm:text-lg md:text-xl text-muted-foreground/80 text-center mx-auto">
              From meeting prep to deal insights, Morr.ai helps startups and SMBs close more deals with proactive AI that works before you ask.
            </p>
          </div>
        </div>

        <div className={cn(
          "mx-auto grid max-w-full xl:max-w-6xl",
          "gap-6 sm:gap-8",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          "pt-16"
        )}>
          {USE_CASES.map((useCase, index) => (
            <UseCaseCard key={index} useCase={useCase} />
          ))}
        </div>
      </div>
    </section>
  )
} 