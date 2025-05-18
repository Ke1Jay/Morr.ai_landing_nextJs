import React from 'react'
import { cn } from "@/lib/utils"

// Types
interface IconProps {
  className?: string
}

// Icon components for upcoming features
const AgentIcon = ({ className }: IconProps) => (
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
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    <path d="m12 2 4 4" />
    <path d="m12 2-4 4" />
    <path d="m12 22-4-4" />
    <path d="m12 22 4-4" />
    <path d="m2 12 4 4" />
    <path d="m2 12 4-4" />
    <path d="m22 12-4 4" />
    <path d="m22 12-4-4" />
  </svg>
)

const ExtensionIcon = ({ className }: IconProps) => (
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
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <line x1="3" x2="21" y1="9" y2="9" />
    <line x1="9" x2="9" y1="21" y2="9" />
  </svg>
)

const WorkflowIcon = ({ className }: IconProps) => (
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
    <path d="M2 9h18v12H2z" />
    <path d="M2 3h18" />
    <path d="M2 6h18" />
  </svg>
)

const MobileIcon = ({ className }: IconProps) => (
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
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
)

// Roadmap milestones
const ROADMAP_ITEMS = [
  {
    icon: AgentIcon,
    title: "Intelligent AI Agents",
    date: "Q2 2024",
    description: "Advanced AI agents that proactively handle your tasks",
    status: "upcoming"
  },
  {
    icon: ExtensionIcon,
    title: "Chrome Extension",
    date: "Q2 2024",
    description: "Seamless browser integration for enhanced productivity",
    status: "upcoming"
  },
  {
    icon: WorkflowIcon,
    title: "Custom Workflow Builder",
    date: "Q3 2024",
    description: "Create and automate your perfect workflow",
    status: "planned"
  },
  {
    icon: MobileIcon,
    title: "Mobile App",
    date: "Q4 2024",
    description: "Take Morr.ai's power with you everywhere",
    status: "planned"
  }
]

function RoadmapItem({ item, index }: { item: typeof ROADMAP_ITEMS[0], index: number }) {
  const Icon = item.icon
  const isLast = index === ROADMAP_ITEMS.length - 1
  
  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-0 w-[2px] bg-gradient-to-b from-primary/20 to-primary/5" />
      )}
      
      <div className="relative flex gap-6 md:gap-8 group items-start">
        {/* Icon column */}
        <div className="relative flex-shrink-0">
          <div className={cn(
            "w-12 h-12 rounded-xl",
            "flex items-center justify-center",
            "bg-primary/5 text-primary/80",
            "group-hover:scale-110 group-hover:bg-primary/10",
            "transition-all duration-300"
          )}>
            <Icon className="w-6 h-6" />
          </div>
          
          {/* Date pill */}
          <div className={cn(
            "hidden md:block", // Hide on mobile to prevent overlap
            "absolute left-full ml-4 top-1/2 -translate-y-1/2",
            "px-3 py-1 rounded-full",
            "text-sm font-medium whitespace-nowrap",
            "bg-primary/5 text-primary/70",
            "opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0",
            "transition-all duration-300",
            "z-10" // Ensure it's above other content
          )}>
            {item.date}
          </div>
        </div>

        {/* Content with increased spacing for date pill */}
        <div className="flex-grow pt-1 pb-12 md:pb-16 md:pr-24">
          <h3 className={cn(
            "text-xl font-semibold mb-3",
            "text-muted-foreground/90 group-hover:text-muted-foreground",
            "transition-colors duration-300"
          )}>
            {item.title}
            {/* Show date on mobile */}
            <span className="md:hidden inline-block ml-2 text-sm text-primary/70">
              ({item.date})
            </span>
          </h3>
          <p className="text-muted-foreground/70 max-w-xl text-base leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Status indicator */}
        <div className={cn(
          "absolute -left-3 top-6",
          "w-3 h-3 rounded-full",
          "bg-primary/30",
          "ring-4 ring-background",
          item.status === "upcoming" && "animate-pulse"
        )} />
      </div>
    </div>
  )
}

// Main section component
export function ComingSoonSection() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-24">
            <div className={cn(
              "inline-flex items-center",
              "rounded-full border border-primary/20 bg-primary/5",
              "px-4 py-1.5 mb-8",
              "text-sm text-primary/80"
            )}>
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
              <span>Product Roadmap</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
              The Future is <span className="text-primary">Proactive</span>
            </h2>
            <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto">
              We&apos;re building the next generation of AI-powered tools to make your work more efficient and proactive than ever before.
            </p>
          </div>

          {/* Roadmap timeline */}
          <div className="relative pl-8 md:pl-16 max-w-3xl mx-auto">
            {ROADMAP_ITEMS.map((item, index) => (
              <RoadmapItem key={index} item={item} index={index} />
            ))}
          </div>

          {/* Footer message */}
          <div className="text-center mt-24">
            <p className="text-lg font-medium text-primary/90">
              Join us on this journey to revolutionize how teams work together.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 