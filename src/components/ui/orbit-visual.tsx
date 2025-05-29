'use client'

import React, { useState, useEffect, memo } from 'react'
import { cn } from "@/lib/utils"
import { useInView } from 'react-intersection-observer'
import { ToolIcon } from "./tool-icon"
import MorraiLogo from "@/components/icons/morr-ai/morrai-logo"
import {
    SlackIcon,
    DriveIcon,
    FirefliesIcon,
    NotionIcon,
    PipedriveIcon
} from "@/components/icons"

interface OrbitVisualProps {
    className?: string
}

// Animation timing configuration
const ANIMATION_CONFIG = {
    orbit: {
        outer: 30000, // 30 seconds for outer orbit
        inner: 20000, // 20 seconds for inner orbit
    },
    notification: {
        duration: 4000,
        transition: 300,
    },
    insight: {
        duration: 4000,
        transition: 300,
    }
} as const

// Sample notifications
const NOTIFICATIONS = [
    {
        title: "Incoming meeting with Acme",
        description: "We've prepared your brief with latest updates"
    },
    {
        title: "New task assigned",
        description: "Review Q3 sales projections by EOD"
    },
    {
        title: "Deal update",
        description: "Techcorp proposal approved - next steps ready"
    }
] as const

// Sample insights
const INSIGHTS = [
    {
        metric: "+28%",
        label: "Pipeline Growth",
        trend: "up"
    },
    {
        metric: "89%",
        label: "Team Productivity",
        trend: "up"
    },
    {
        metric: "-15%",
        label: "Response Time",
        trend: "down"
    }
] as const

// Memoized components for better performance
const NotificationCard = memo(({ title, description, show }: {
    title: string
    description: string
    show: boolean
}) => (
    <div className={cn(
        "absolute top-6 right-6 max-w-xs transition-all duration-300 transform",
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    )}>
        <div className="p-4 rounded-lg bg-black/40 backdrop-blur-xl border border-[#00FF9D]/10">
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
                <div>
                    <p className="text-sm font-medium text-[#00FF9D]">{title}</p>
                    <p className="text-xs text-[#00FF9D]/60">{description}</p>
                </div>
            </div>
        </div>
    </div>
))
NotificationCard.displayName = 'NotificationCard'

const InsightCard = memo(({ metric, label, trend, show }: {
    metric: string
    label: string
    trend: 'up' | 'down'
    show: boolean
}) => (
    <div className={cn(
        "absolute bottom-6 left-6 transition-all duration-300 transform",
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
    )}>
        <div className="p-4 rounded-lg bg-black/40 backdrop-blur-xl border border-[#00FF9D]/10">
            <div className="flex items-center gap-4">
                <div>
                    <p className="text-2xl font-bold text-[#00FF9D]">{metric}</p>
                    <p className="text-sm text-[#00FF9D]/60">{label}</p>
                </div>
                <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    trend === "up" ? "bg-emerald-500/20" : "bg-red-500/20"
                )}>
                    {trend === "up" ? "↑" : "↓"}
                </div>
            </div>
        </div>
    </div>
))
InsightCard.displayName = 'InsightCard'

const CoreElement = memo(() => (
    <div className="relative w-32 h-32">
        <div className="absolute inset-0 bg-[#00FF9D]/20 rounded-full blur-xl animate-pulse" />
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#00FF9D]/30 to-transparent backdrop-blur-xl flex items-center justify-center">
            <MorraiLogo className="w-24 h-24 [&>path]:fill-[#00FF9D] animate-pulse" />
        </div>
    </div>
))
CoreElement.displayName = 'CoreElement'

// Add keyframes for the orbit animations
const orbitKeyframes = `
@keyframes orbit-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes orbit-spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@keyframes counter-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

@keyframes counter-spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`

export function OrbitVisual({ className }: OrbitVisualProps) {
    const [currentNotification, setCurrentNotification] = useState(0)
    const [currentInsight, setCurrentInsight] = useState(0)
    const [showNotification, setShowNotification] = useState(true)
    const [showInsight, setShowInsight] = useState(true)

    // Use intersection observer for better visibility detection
    const { ref: inViewRef, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false
    })

    useEffect(() => {
        if (!inView) {
            return
        }

        // Rotate notifications
        const notificationInterval = setInterval(() => {
            setShowNotification(false)
            setTimeout(() => {
                setCurrentNotification((prev) => (prev + 1) % NOTIFICATIONS.length)
                setShowNotification(true)
            }, ANIMATION_CONFIG.notification.transition)
        }, ANIMATION_CONFIG.notification.duration)

        // Rotate insights
        const insightInterval = setInterval(() => {
            setShowInsight(false)
            setTimeout(() => {
                setCurrentInsight((prev) => (prev + 1) % INSIGHTS.length)
                setShowInsight(true)
            }, ANIMATION_CONFIG.insight.transition)
        }, ANIMATION_CONFIG.insight.duration)

        return () => {
            clearInterval(notificationInterval)
            clearInterval(insightInterval)
        }
    }, [inView])

    return (
        <div
            ref={inViewRef}
            className={cn(
                "relative w-full aspect-square rounded-xl overflow-hidden",
                "bg-black/40 backdrop-blur-3xl border border-primary/10",
                "shadow-[0_0_50px_-12px] shadow-primary/20",
                className
            )}
        >
            {/* Add keyframes */}
            <style jsx global>{orbitKeyframes}</style>

            {/* Grid pattern background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,75,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,75,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Central hub with rotating circles */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    {/* Outer rotating circle with tool icons */}
                    <div
                        className="absolute -inset-48 rounded-full border border-[#00FF9D]/10"
                        style={{ animation: `orbit-spin ${ANIMATION_CONFIG.orbit.outer}ms linear infinite` }}
                    >
                        {/* Top icon */}
                        <div 
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{ animation: `counter-spin ${ANIMATION_CONFIG.orbit.outer}ms linear infinite` }}
                        >
                            <ToolIcon icon={SlackIcon} />
                        </div>
                        
                        {/* Right icon */}
                        <div 
                            className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
                            style={{ animation: `counter-spin ${ANIMATION_CONFIG.orbit.outer}ms linear infinite` }}
                        >
                            <ToolIcon icon={DriveIcon} />
                        </div>
                        
                        {/* Bottom icon */}
                        <div 
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
                            style={{ animation: `counter-spin ${ANIMATION_CONFIG.orbit.outer}ms linear infinite` }}
                        >
                            <ToolIcon icon={FirefliesIcon} />
                        </div>
                        
                        {/* Left icon */}
                        <div 
                            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
                            style={{ animation: `counter-spin ${ANIMATION_CONFIG.orbit.outer}ms linear infinite` }}
                        >
                            <ToolIcon icon={NotionIcon} />
                        </div>
                    </div>

                    {/* Inner rotating circle with more tool icons */}
                    <div
                        className="absolute -inset-24 rounded-full border border-[#00FF9D]/10"
                        style={{ animation: `orbit-spin-reverse ${ANIMATION_CONFIG.orbit.inner}ms linear infinite` }}
                    >
                        <div 
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            style={{ animation: `counter-spin-reverse ${ANIMATION_CONFIG.orbit.inner}ms linear infinite` }}
                        >
                            <ToolIcon icon={PipedriveIcon} />
                        </div>
                    </div>

                    {/* Core element */}
                    <CoreElement />
                </div>
            </div>

            {/* Notification card */}
            <NotificationCard
                title={NOTIFICATIONS[currentNotification].title}
                description={NOTIFICATIONS[currentNotification].description}
                show={showNotification}
            />

            {/* Insight card */}
            <InsightCard
                metric={INSIGHTS[currentInsight].metric}
                label={INSIGHTS[currentInsight].label}
                trend={INSIGHTS[currentInsight].trend as 'up' | 'down'}
                show={showInsight}
            />
        </div>
    )
} 