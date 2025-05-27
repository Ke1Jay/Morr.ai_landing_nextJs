import React from 'react'
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { IntegrationsGrid } from "@/components/ui/integrations-grid"
import { UnifiedSearch } from "@/components/ui/unified-search"
import { WorkflowSteps } from "@/components/ui/workflow-steps"
import { AnalyticsVisual } from "@/components/ui/analytics-visual"

// Feature card props interface
interface FeatureCardProps {
  icon: string
  title: string
  description?: string
  bulletPoints?: string[]
  className?: string
  visual: React.ReactNode
}

// Visual components for each feature
const UnifiedSearchVisual = () => (
  <div className="relative w-full h-[220px]">
    <UnifiedSearch className="h-full" />
  </div>
)

const WorkflowVisual = () => (
  <div className="relative w-full h-[220px]">
    <WorkflowSteps className="h-full" />
  </div>
)

const IntegrationsVisual = () => (
  <div className="relative w-full h-[220px]">
    <IntegrationsGrid />
  </div>
)

const AnalyticsVisualStandard = () => (
  <div className="relative w-full h-[220px]">
    <AnalyticsVisual className="h-full" />
  </div>
)

// Individual feature card component
const FeatureCard = ({ 
  icon, 
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
      "hover:border-primary/20 h-full", // Ensure all cards take full height
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
        <span className="text-2xl">{icon}</span>
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
        <ul className="space-y-2 flex-1">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-muted-foreground/80">
              <span className="text-primary/60 text-sm mt-1">•</span>
              <span className="text-sm leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Decorative corner accent */}
    <div className="absolute -bottom-0 -right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </Card>
)

// Core features data
const FEATURES = [
  {
    icon: "🔍",
    title: "Unified Search & AI Chat",
    description: "Ask anything. Get clear answers immediately—from Slack, Google Drive, Notion, CRM platforms, and more.",
    bulletPoints: [
      "Summarize Q2 product updates",
      "What did John say about pricing last week?",
      "What's the latest on the Acme deal?"
    ],
    visual: <UnifiedSearchVisual />
  },
  {
    icon: "📊",
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
    icon: "🤖",
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
    icon: "🔗",
    title: "Seamless Integrations",
    description: "Works with Slack, Google Drive, Notion, Pipedrive, HubSpot, Salesforce, Jira, Asana, Trello—and more. No workflow changes required.",
    visual: <IntegrationsVisual />
  }
]

export function CoreFeaturesSection() {
  return (
    <section className="w-full min-h-[40vh] flex items-center justify-center bg-background pt-16 lg:pt-8 pb-24 md:pb-32 lg:pb-40">
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-[900px]">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary/80 mb-4">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
              <span>Core Features</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mx-auto">
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