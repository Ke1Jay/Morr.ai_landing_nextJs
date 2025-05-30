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
    PipedriveIcon,
    GmailIcon,
    OutlookIcon,
    Microsoft365Icon,
    HubSpotIcon
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
        title: "Customer Sentiment",
        value: "72%",
        growth: "+12%",
        trend: "up"
    },
    {
        title: "Team Productivity",
        value: "89%",
        growth: "+8%",
        trend: "up"
    },
    {
        title: "Response Time",
        value: "15%",
        growth: "-5%",
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
        "absolute top-3 sm:top-4 md:top-5 lg:top-6 right-3 sm:right-4 md:right-5 lg:right-6 max-w-[200px] sm:max-w-[240px] md:max-w-xs",
        "transition-all duration-300 transform",
        show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
    )}>
        <div className="p-3 sm:p-3.5 md:p-4 rounded-xl bg-black/90 backdrop-blur-xl relative">
            {/* Close button */}
            <button
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black/80 
                         flex items-center justify-center hover:bg-black 
                         transition-colors"
                aria-label="Close notification"
            >
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    className="text-[#00FF9D]/70 hover:text-[#00FF9D] transition-colors"
                >
                    <path
                        d="M1 1L9 9M9 1L1 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </button>

            <div className="flex gap-2 sm:gap-2.5 md:gap-3 items-start">
                {/* Checkmark icon with animation */}
                <div className="relative mt-1">
                    <div
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#00FF9D]/20 
                                 animate-[checkmark-circle_2s_ease-out_forwards]"
                    />
                    <svg
                        className="absolute inset-0"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 6L5 8L9 4"
                            stroke="#00FF9D"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="animate-[checkmark-appear_2s_ease-out_forwards]"
                            style={{
                                strokeDasharray: 16,
                                strokeDashoffset: 0
                            }}
                        />
                    </svg>
                </div>
                <div className="space-y-0.5">
                    <p className="text-sm sm:text-base font-medium text-[#00FF9D]">{title}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    </div>
))
NotificationCard.displayName = 'NotificationCard'

const InsightCard = memo(({ title, value, growth, trend, show }: {
    title: string
    value: string
    growth: string
    trend: 'up' | 'down'
    show: boolean
}) => (
    <div className={cn(
        "absolute bottom-3 sm:bottom-4 md:bottom-5 lg:bottom-6 left-3 sm:left-4 md:left-5 lg:left-6",
        "transition-all duration-300 transform",
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
    )}>
        <div className="p-3 sm:p-3.5 md:p-4 rounded-xl bg-black/90 backdrop-blur-xl">
            <div className="space-y-1">
                {/* Title */}
                <p className="text-sm text-foreground/60">{title}</p>

                {/* Value and Growth */}
                <div className="flex items-start gap-2">
                    <p className="text-2xl sm:text-3xl font-bold text-[#00FF9D]">{value}</p>
                    <div className={cn(
                        "flex items-center text-sm font-medium",
                        trend === "up" ? "text-emerald-400" : "text-red-400"
                    )}>
                        {growth}
                    </div>
                </div>
            </div>
        </div>
    </div>
))
InsightCard.displayName = 'InsightCard'

const CoreElement = memo(() => (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
        <div className="absolute inset-0 bg-[#00FF9D]/20 rounded-full blur-xl animate-pulse" />
        <div className="relative w-full h-full rounded-4xl bg-gradient-to-br from-[#00FF9D]/30 to-transparent backdrop-blur-xl flex items-center justify-center">
            <MorraiLogo className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 [&>path]:fill-[#00FF9D] animate-pulse" />
        </div>
    </div>
))
CoreElement.displayName = 'CoreElement'

// Add keyframes for the orbit animations
const orbitKeyframes = `
@keyframes orbit-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes orbit-spin-reverse {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@keyframes counter-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@keyframes counter-spin-reverse {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.orbit-outer {
  animation: orbit-spin var(--orbit-duration) linear infinite;
}

.orbit-outer-icon {
  animation: counter-spin var(--orbit-duration) linear infinite;
  transform-origin: center center;
}

.orbit-inner {
  animation: orbit-spin-reverse var(--orbit-duration) linear infinite;
}

.orbit-inner-icon {
  animation: counter-spin-reverse var(--orbit-duration) linear infinite;
  transform-origin: center center;
}

@keyframes notification-ping {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes notification-wave {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 157, 0.4);
  }
  70% {
    box-shadow: 0 0 0 4px rgba(0, 255, 157, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 157, 0);
  }
}

@keyframes checkmark-appear {
  0% {
    stroke-dashoffset: 16;
    opacity: 0;
  }
  60% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes checkmark-circle {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
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
        if (!inView) return

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

            {/* Central container */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    {/* Outer orbit */}
                    <div 
                        className="absolute -inset-[5rem] xs:-inset-[5.5rem] sm:-inset-[7rem] md:-inset-[8rem] lg:-inset-[9rem] xl:-inset-[10rem] rounded-full border border-[#00FF9D]/10 orbit-outer"
                        style={{ '--orbit-duration': `${ANIMATION_CONFIG.orbit.outer}ms` } as React.CSSProperties}
                    >
                        {/* Top icon */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-outer-icon">
                            <div className="relative scale-[0.65] xs:scale-75 sm:scale-90 md:scale-100">
                                <ToolIcon icon={SlackIcon} />
                            </div>
                        </div>
                        
                        {/* Top right icon */}
                        <div className="absolute top-[12.5%] right-[12.5%] translate-x-1/2 -translate-y-1/2 orbit-outer-icon">
                            <div className="relative scale-[0.65] xs:scale-75 sm:scale-90 md:scale-100">
                                <ToolIcon icon={GmailIcon} />
                            </div>
                        </div>
                        
                        {/* Right icon */}
                        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 orbit-outer-icon">
                            <div className="relative scale-[0.65] xs:scale-75 sm:scale-90 md:scale-100">
                                <ToolIcon icon={OutlookIcon} />
                            </div>
                        </div>
                        
                        {/* Bottom right icon */}
                        <div className="absolute bottom-[12.5%] right-[12.5%] translate-x-1/2 translate-y-1/2 orbit-outer-icon">
                            <div className="relative scale-[0.65] xs:scale-75 sm:scale-90 md:scale-100">
                                <ToolIcon icon={Microsoft365Icon} />
                            </div>
                        </div>
                        
                        {/* Bottom icon */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 orbit-outer-icon">
                            <div className="relative scale-[0.65] xs:scale-75 sm:scale-90 md:scale-100">
                                <ToolIcon icon={DriveIcon} />
                            </div>
                        </div>
                        
                        {/* Left icon */}
                        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 orbit-outer-icon">
                            <div className="relative scale-[0.65] xs:scale-75 sm:scale-90 md:scale-100">
                                <ToolIcon icon={NotionIcon} />
                            </div>
                        </div>
                        
                        {/* Top left icon */}
                        <div className="absolute top-[12.5%] left-[12.5%] -translate-x-1/2 -translate-y-1/2 orbit-outer-icon">
                            <div className="relative scale-[0.65] xs:scale-75 sm:scale-90 md:scale-100">
                                <ToolIcon icon={HubSpotIcon} />
                            </div>
                        </div>
                    </div>

                    {/* Inner orbit */}
                    <div 
                        className="absolute -inset-[2.5rem] xs:-inset-[2.75rem] sm:-inset-[3.25rem] md:-inset-[3.75rem] lg:-inset-[4rem] xl:-inset-[4.5rem] rounded-full border border-[#00FF9D]/10 orbit-inner"
                        style={{ '--orbit-duration': `${ANIMATION_CONFIG.orbit.inner}ms` } as React.CSSProperties}
                    >
                        {/* Top icon */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 orbit-inner-icon">
                            <div className="relative scale-[0.65] xs:scale-75 sm:scale-90 md:scale-100">
                                <ToolIcon icon={PipedriveIcon} />
                            </div>
                        </div>
                        
                        {/* Right icon */}
                        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 orbit-inner-icon">
                            <div className="relative scale-[0.65] xs:scale-75 sm:scale-90 md:scale-100">
                                <ToolIcon icon={FirefliesIcon} />
                            </div>
                        </div>
                    </div>

                    {/* Core element */}
                    <div className="relative w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32">
                        <div className="absolute inset-0 bg-[#00FF9D]/20 rounded-full blur-xl animate-pulse" />
                        <div className="relative w-full h-full rounded-4xl bg-gradient-to-br from-[#00FF9D]/30 to-transparent backdrop-blur-xl flex items-center justify-center">
                            <MorraiLogo className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-22 lg:h-22 xl:w-24 xl:h-24 [&>path]:fill-[#00FF9D] animate-pulse" />
                        </div>
                    </div>
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
                title={INSIGHTS[currentInsight].title}
                value={INSIGHTS[currentInsight].value}
                growth={INSIGHTS[currentInsight].growth}
                trend={INSIGHTS[currentInsight].trend}
                show={showInsight}
            />
        </div>
    )
} 