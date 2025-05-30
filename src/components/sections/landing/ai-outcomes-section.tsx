import React from 'react'
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Clock, BarChart3, Workflow, Users } from "lucide-react"

// Types for our component props
interface IconProps {
    className?: string
    size?: number
}

interface JourneyPoint {
    timing: string
    description: string
}

interface RoleTag {
    name: string
    color?: string
}

interface OutcomeCardProps {
    icon: React.ComponentType<IconProps>
    title: string
    description: string
    journeyPoints: JourneyPoint[]
    roles: RoleTag[]
    visualElement: React.ReactNode
    className?: string
}

// Visual elements for each outcome card
const MeetingBriefVisual = () => (
    <div className="relative w-full h-28 bg-gradient-to-br from-primary/5 to-transparent rounded-lg flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_70%)]" />
        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-primary/10 animate-pulse" />
        <div className="absolute top-8 left-20 w-[120px] h-3 rounded-full bg-primary/10" />
        <div className="absolute top-16 left-20 w-[80px] h-3 rounded-full bg-primary/10" />
        <div className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-primary/10" />
        </div>
    </div>
)

const AnalyticsVisual = () => (
    <div className="relative w-full h-28 bg-gradient-to-br from-primary/5 to-transparent rounded-lg flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_70%)]" />
        <div className="grid grid-cols-3 gap-2 px-4 w-full">
            <div className="h-16 bg-primary/5 rounded-md flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 mb-2" />
                <div className="w-12 h-2 bg-primary/10 rounded-full" />
            </div>
            <div className="h-16 bg-primary/10 rounded-md flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 mb-2" />
                <div className="w-12 h-2 bg-primary/20 rounded-full" />
            </div>
            <div className="h-16 bg-primary/5 rounded-md flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 mb-2" />
                <div className="w-12 h-2 bg-primary/10 rounded-full" />
            </div>
        </div>
    </div>
)

const AutomationVisual = () => (
    <div className="relative w-full h-28 bg-gradient-to-br from-primary/5 to-transparent rounded-lg flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_70%)]" />
        <div className="flex items-center justify-between px-6 w-full">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <div className="w-6 h-6 rounded-md bg-primary/20" />
            </div>
            <div className="w-20 h-[1px] bg-primary/20" />
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <div className="w-6 h-6 rounded-md bg-primary/20" />
            </div>
            <div className="w-20 h-[1px] bg-primary/20" />
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <div className="w-6 h-6 rounded-md bg-primary/20" />
            </div>
        </div>
    </div>
)

const RelationshipVisual = () => (
    <div className="relative w-full h-28 bg-gradient-to-br from-primary/5 to-transparent rounded-lg flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_70%)]" />
        <div className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10" />
            <div className="w-[1px] h-6 bg-primary/20" />
            <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-primary/10" />
            </div>
            <div className="w-[1px] h-6 bg-primary/20" />
            <div className="w-12 h-12 rounded-full bg-primary/10" />
        </div>
    </div>
)

// Outcome card component
function OutcomeCard({
    icon: Icon,
    title,
    description,
    journeyPoints,
    roles,
    visualElement,
    className
}: OutcomeCardProps) {
    return (
        <Card className={cn(
            "group relative flex flex-col h-full",
            "p-6 sm:p-8",
            "rounded-xl",
            "border border-primary/10 bg-black/40 backdrop-blur-xl",
            "hover:bg-black/50 transition-all duration-300 hover:border-primary/20",
            "hover:translate-y-[-2px]",
            "overflow-hidden",
            className
        )}>
            {/* Icon and title */}
            <div className="flex items-center gap-3 mb-5">
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
                <h3 className="text-lg font-bold text-primary/90">
                    {title}
                </h3>
            </div>

            {/* Main description */}
            <p className="text-sm/relaxed text-muted-foreground/80 mb-5">
                {description}
            </p>

            {/* Visual element */}
            <div className="mb-5">
                {visualElement}
            </div>

            {/* Journey points */}
            <div className="space-y-3 mb-6">
                {journeyPoints.map((point, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-start gap-2 group-hover:transform group-hover:translate-x-1",
                            "transition-transform duration-300 ease-out",
                            `delay-[${index * 50}ms]`
                        )}
                    >
                        <div className="min-w-[4rem] mt-0.5">
                            <span className="text-xs font-medium text-primary/70 px-2 py-0.5 bg-primary/5 rounded-full">
                                {point.timing}
                            </span>
                        </div>
                        <span className="text-xs text-muted-foreground/70">
                            {point.description}
                        </span>
                    </div>
                ))}
            </div>

            {/* Role tags */}
            <div className="mt-auto flex flex-wrap gap-2">
                {roles.map((role, index) => (
                    <span
                        key={index}
                        className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            "bg-black/30 text-muted-foreground/60 border border-primary/10",
                            "group-hover:bg-primary/5 group-hover:text-primary/70 group-hover:border-primary/20",
                            "transition-all duration-300"
                        )}
                    >
                        {role.name}
                    </span>
                ))}
            </div>

            {/* Background effect */}
            <div className={cn(
                "absolute bottom-0 right-0",
                "w-32 h-32",
                "bg-gradient-to-br from-primary/5 via-primary/3 to-transparent",
                "rounded-tl-[8rem]",
                "opacity-0 group-hover:opacity-100",
                "transition-all duration-500",
                "pointer-events-none"
            )} />
        </Card>
    )
}

// Data for our outcome cards
const OUTCOMES = [
    {
        icon: Clock,
        title: "Eliminate Prep Work",
        description: "Focus on selling while AI handles the operational heavy lifting before you even ask.",
        journeyPoints: [
            {
                timing: "Morning",
                description: "Start your day with AI-generated briefs for all meetings"
            },
            {
                timing: "Pre-meeting",
                description: "Client history, recent changes, and talking points automatically prepared"
            },
            {
                timing: "End of day",
                description: "Tomorrow's meetings already analyzed and prepped"
            }
        ],
        roles: [
            { name: "Sales Reps" },
            { name: "Account Execs" },
            { name: "Leaders" }
        ],
        visualElement: <MeetingBriefVisual />
    },
    {
        icon: BarChart3,
        title: "Make Smarter Decisions",
        description: "Access real-time analytics that highlight risks and opportunities across your entire pipeline.",
        journeyPoints: [
            {
                timing: "Planning",
                description: "Predictive forecasting and trend analysis at your fingertips"
            },
            {
                timing: "Mid-quarter",
                description: "Early warning system for at-risk deals"
            },
            {
                timing: "Reviews",
                description: "Automated performance insights across all reps"
            }
        ],
        roles: [
            { name: "Sales Leaders" },
            { name: "Operations" },
            { name: "Executives" }
        ],
        visualElement: <AnalyticsVisual />
    },
    {
        icon: Workflow,
        title: "Eliminate Manual Work",
        description: "Automate reporting, tracking and analysis across all your tools and teams.",
        journeyPoints: [
            {
                timing: "Weekly",
                description: "Reports generated and distributed automatically"
            },
            {
                timing: "Monthly",
                description: "Pipeline analysis and forecasting without lifting a finger"
            },
            {
                timing: "Anytime",
                description: "Real-time tracking of all sales activities across tools"
            }
        ],
        roles: [
            { name: "Operations" },
            { name: "Sales Leaders" },
            { name: "Admins" }
        ],
        visualElement: <AutomationVisual />
    },
    {
        icon: Users,
        title: "Focus on What Matters",
        description: "Let AI handle research and follow-ups while you focus on building client relationships.",
        journeyPoints: [
            {
                timing: "Before calls",
                description: "Complete client context and competitive intelligence"
            },
            {
                timing: "During",
                description: "Real-time access to relevant information"
            },
            {
                timing: "After",
                description: "Automated follow-ups and next step tracking"
            }
        ],
        roles: [
            { name: "Sales Reps" },
            { name: "Account Execs" },
            { name: "Success" }
        ],
        visualElement: <RelationshipVisual />
    }
]

export function AiOutcomesSection() {
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
                            <span>Proactive AI</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-center mx-auto">
                            AI-Powered Outcomes for <span className="text-primary">Every Sales Role</span>
                        </h2>
                        <p className="mt-4 text-base sm:text-lg text-muted-foreground/80 text-center mx-auto max-w-[600px]">
                            From meeting prep to deal insights, Morr.ai helps teams achieve better results with less effort through AI that works before you ask.
                        </p>
                    </div>
                </div>

                {/* Outcomes grid */}
                <div className={cn(
                    "grid",
                    "gap-6 sm:gap-8",
                    "grid-cols-1 md:grid-cols-2",
                    "max-w-7xl mx-auto"
                )}>
                    {OUTCOMES.map((outcome, index) => (
                        <OutcomeCard key={index} {...outcome} />
                    ))}
                </div>
            </div>
        </section>
    )
} 