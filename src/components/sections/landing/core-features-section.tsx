import React from 'react'
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Search, RealTimeInsights, Automation, MissingPuzzle } from "@/components/icons/ui-icons"
import dynamic from 'next/dynamic'

// Dynamically import visual components for better performance
const DynamicUnifiedSearch = dynamic(() => import('@/components/ui/unified-search').then(mod => mod.UnifiedSearch), { ssr: true })
const DynamicWorkflowSteps = dynamic(() => import('@/components/ui/workflow-steps').then(mod => mod.WorkflowSteps), { ssr: true })
const DynamicIntegrationsGrid = dynamic(() => import('@/components/ui/integrations-grid').then(mod => mod.IntegrationsGrid), { ssr: true })
const DynamicAnalyticsVisual = dynamic(() => import('@/components/ui/analytics-visual').then(mod => mod.AnalyticsVisual), { ssr: true })

// Feature card props interface
interface FeatureCardProps {
  Icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description?: string
  bulletPoints?: string[]
  className?: string
  visual: React.ReactNode
}

// Visual components for each feature
const UnifiedSearchVisual = () => (
  <div className="relative w-full h-[220px]" role="img" aria-label="Unified Search Interface">
    <DynamicUnifiedSearch className="h-full" />
  </div>
)

const WorkflowVisual = () => (
  <div className="relative w-full h-[220px]" role="img" aria-label="Workflow Steps Visualization">
    <DynamicWorkflowSteps className="h-full" />
  </div>
)

const IntegrationsVisual = () => (
  <div className="relative w-full h-[220px]" role="img" aria-label="Integrations Grid">
    <DynamicIntegrationsGrid />
  </div>
)

const AnalyticsVisualStandard = () => (
  <div className="relative w-full h-[220px]" role="img" aria-label="Analytics Dashboard">
    <DynamicAnalyticsVisual className="h-full" />
  </div>
)

// Individual feature card component
const FeatureCard = React.memo(({ 
  Icon, 
  title, 
  description, 
  bulletPoints, 
  className,
  visual
}: FeatureCardProps) => (
  <Card 
    className={cn(
      "group relative flex flex-col p-6 rounded-xl border border-primary/10",
      "bg-black/40 backdrop-blur-xl hover:bg-black/50 transition-all duration-300",
      "hover:border-primary/20 h-full",
      className
    )}
  >
    {/* Visual element */}
    <div className="relative w-full mb-6">
      {visual}
    </div>
    
    {/* Content */}
    <div className="relative z-10 flex-1 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "p-2 rounded-lg bg-primary/5 text-primary/80 w-10 h-10",
          "flex items-center justify-center",
          "group-hover:bg-primary/10 group-hover:scale-110",
          "transition-all duration-300",
          "relative z-10"
        )}>
          <Icon size={20} className="w-5 h-5" />
          <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <h3 className="text-xl font-bold text-primary/90">
          {title}
        </h3>
      </div>
      
      {description && (
        <p className="text-base text-muted-foreground/80 leading-relaxed mb-3">
          {description}
        </p>
      )}
      
      {bulletPoints && bulletPoints.length > 0 && (
        <ul className="space-y-2 flex-1" role="list">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-muted-foreground/80">
              <span className="text-primary/60 text-sm mt-1" aria-hidden="true">•</span>
              <span className="text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Decorative corner accent */}
    <div 
      className="absolute -bottom-0 -right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
      aria-hidden="true"
    />
  </Card>
))

FeatureCard.displayName = 'FeatureCard'

// Core features data
const FEATURES = [
  {
    Icon: Search,
    title: "Unified Search & AI Chat",
    description: "Ask anything. Get clear answers immediately—from Slack, Google Drive, Notion, CRM platforms, and more.",
    bulletPoints: [
      "Summarize Q2 product updates",
      "What did John say about pricing last week?",
      "What's the latest on the Acme deal?"
    ] as string[],
    visual: <UnifiedSearchVisual />
  },
  {
    Icon: RealTimeInsights,
    title: "Real-Time Insights, Delivered Proactively",
    description: "See how Morr.ai proactively delivers contextual insights, meeting briefs, and actionable intelligence before you even ask.",
    bulletPoints: [
      "Morr.ai delivers meeting briefs ahead of time",
      "Up-to-the-minute sales insights",
      "Project status updates without asking",
      "Risk detection and opportunity alerts"
    ],
    visual: <AnalyticsVisualStandard />
  },
  {
    Icon: Automation,
    title: "Automated, Proactive AI Workflows",
    bulletPoints: [
      "Generates meeting briefs automatically",
      "Flags overlooked tasks",
      "Prepares weekly team updates",
      "Delivers reports proactively"
    ],
    visual: <WorkflowVisual />
  },
  {
    Icon: MissingPuzzle,
    title: "Seamless Integrations",
    description: "Works with Slack, Google Drive, Notion, Pipedrive, HubSpot, Salesforce, Jira, Asana, Trello—and more. No workflow changes required.",
    visual: <IntegrationsVisual />
  }
] as const

export function CoreFeaturesSection() {
  return (
    <section 
      className="w-full min-h-[40vh] flex items-center justify-center bg-background pt-16 lg:pt-8 pb-24 md:pb-32 lg:pb-40"
      aria-labelledby="features-heading"
    >
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-[900px]">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary/80">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" aria-hidden="true" />
              <span>Core Features</span>
            </div>
            <h2 
              id="features-heading" 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mx-auto"
            >
              Key Features of <span className="text-primary">Morr.ai</span>
            </h2>
            <p className="mt-6 sm:max-w-xs lg:max-w-lg sm:text-lg md:text-xl text-muted-foreground/80 text-center mx-auto">
              Experience the power of proactive AI that understands your needs before you ask.
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="mx-auto grid max-w-full xl:max-w-7xl items-stretch gap-8 sm:grid-cols-1 lg:grid-cols-2 pt-16">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 