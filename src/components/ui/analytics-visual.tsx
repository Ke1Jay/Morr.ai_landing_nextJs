'use client'

import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { cn } from "@/lib/utils"
import { useInView } from 'react-intersection-observer'

interface AnalyticsVisualProps {
    className?: string
}

interface InsightData {
    readonly icon: string
    readonly title: string
    readonly description: string
    readonly priority: 'high' | 'medium' | 'low'
    readonly timestamp: string
}

interface MetricData {
    readonly label: string
    readonly value: string
    readonly trend: 'up' | 'down' | 'neutral'
    readonly change: string
}

// Constants moved to top level for better performance
const ANIMATION_TIMING = {
    duration: 800,
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
} as const

const CARD_DIMENSIONS = {
    height: 92,
    gap: 8
} as const

const INSIGHTS: readonly InsightData[] = [
    {
        icon: "🚨",
        title: "Meeting Brief Ready",
        description: "Acme Corp call in 15 min - 2 action items flagged",
        priority: 'high',
        timestamp: "2 min ago"
    },
    {
        icon: "📈",
        title: "Sales Momentum Alert",
        description: "Pipeline velocity up 23% - 3 deals closing this week",
        priority: 'medium',
        timestamp: "5 min ago"
    },
    {
        icon: "⚠️",
        title: "Risk Detection",
        description: "Customer sentiment dip detected for Enterprise tier",
        priority: 'high',
        timestamp: "8 min ago"
    },
    {
        icon: "✅",
        title: "Weekly Report Generated",
        description: "Team performance summary ready for review",
        priority: 'low',
        timestamp: "12 min ago"
    }
] as const

const METRICS: readonly MetricData[] = [
    { label: "Active Insights", value: "12", trend: 'up', change: "+3" },
    { label: "Response Time", value: "1.2s", trend: 'down', change: "-0.3s" },
    { label: "Accuracy", value: "94%", trend: 'up', change: "+2%" }
] as const

const PRIORITY_STYLES = {
    high: "border-red-500/30 bg-red-500/5",
    medium: "border-yellow-500/30 bg-yellow-500/5", 
    low: "border-emerald-500/30 bg-emerald-500/5"
} as const

const PRIORITY_DOTS = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-emerald-500"
} as const

const TREND_STYLES = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-yellow-400"
} as const

const TREND_ICONS = {
    up: "↗",
    down: "↘",
    neutral: "→"
} as const

function InsightCard({ 
    icon, 
    title, 
    description, 
    priority, 
    timestamp
}: InsightData) {
    return (
        <div 
            className={cn(
                "relative p-2.5 rounded-lg border transition-all duration-300 transform scale-[0.98]",
                PRIORITY_STYLES[priority],
                "hover:scale-100 cursor-pointer"
            )}
            role="article"
            aria-label={`${priority} priority insight: ${title}`}
        >
            <div className="flex items-start gap-2">
                <span className="text-sm shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-xs font-medium text-emerald-500/90 truncate">
                            {title}
                        </h4>
                        <div 
                            className={cn("w-1.5 h-1.5 rounded-full shrink-0", PRIORITY_DOTS[priority])} 
                            aria-hidden="true"
                        />
                    </div>
                    <p className="text-xs text-emerald-500/70 leading-relaxed line-clamp-2">
                        {description}
                    </p>
                    <div className="text-[10px] text-emerald-500/50 mt-1">
                        {timestamp}
                    </div>
                </div>
            </div>
        </div>
    )
}

const MemoizedInsightCard = memo(InsightCard)

function MetricCard({ metric, index, isVisible }: { 
    metric: MetricData
    index: number
    isVisible: boolean 
}) {
    return (
        <div 
            className="flex flex-col gap-1 px-2 py-1.5 rounded bg-emerald-900/20"
            style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'none' : 'translateX(-10px)',
                transition: `all ${ANIMATION_TIMING.duration}ms ${ANIMATION_TIMING.easing}`
            }}
            role="status"
            aria-label={`${metric.label}: ${metric.value}`}
        >
            <div className="text-[9px] text-emerald-500/50 leading-none truncate">
                {metric.label}
            </div>
            <div className="flex items-center justify-between gap-1">
                <div className="text-xs font-semibold text-emerald-500/90 leading-none">
                    {metric.value}
                </div>
                <div className={cn(
                    "text-[9px] flex items-center gap-0.5 leading-none",
                    TREND_STYLES[metric.trend]
                )}>
                    <span className="text-[7px]" aria-hidden="true">
                        {TREND_ICONS[metric.trend]}
                    </span>
                    {metric.change}
                </div>
            </div>
        </div>
    )
}

const MemoizedMetricCard = memo(MetricCard)

export function AnalyticsVisual({ className }: AnalyticsVisualProps) {
    const [visibleInsights, setVisibleInsights] = useState<number[]>([])
    const [showMetrics, setShowMetrics] = useState(false)
    const [scrollPosition, setScrollPosition] = useState(0)
    
    const metricsContainerRef = useRef<HTMLDivElement>(null)
    const lastMetricRef = useRef<HTMLDivElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Use intersection observer for visibility detection
    const { ref: inViewRef, inView } = useInView({
        threshold: 0.2,
        rootMargin: '50px 0px',
    })

    // Calculate scroll amount based on last metric position
    const calculateScrollAmount = useCallback(() => {
        const container = metricsContainerRef.current
        const lastMetric = lastMetricRef.current
        if (!container || !lastMetric) return 0

        const containerHeight = container.clientHeight
        const lastMetricBottom = lastMetric.offsetTop + lastMetric.offsetHeight
        const scrollNeeded = Math.max(0, lastMetricBottom - containerHeight)
        
        return scrollNeeded + 8 // Small offset for visibility
    }, [])

    const cleanup = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
        setVisibleInsights([])
        setScrollPosition(0)
    }, [])

    const startInsightCycle = useCallback(() => {
        cleanup()
        
        // Show first insight immediately
        setVisibleInsights([0])
        setScrollPosition(0)
        let currentIndex = 0

        intervalRef.current = setInterval(() => {
            currentIndex = (currentIndex + 1) % INSIGHTS.length
            
            if (currentIndex === 2) {
                setTimeout(() => setScrollPosition(0), 200)
            } else if (currentIndex === 1) {
                setTimeout(() => setScrollPosition(1), 300)
            }

            setVisibleInsights(current => [currentIndex, ...current].slice(0, 2))
        }, 4000)
    }, [cleanup])

    // Handle visibility changes
    useEffect(() => {
        if (inView) {
            // Start metrics animation
            setShowMetrics(true)
            
            // Start insight cycle with a delay
            const timer = setTimeout(() => {
                startInsightCycle()
            }, 500)
            
            return () => clearTimeout(timer)
        } else {
            cleanup()
        }
    }, [inView, startInsightCycle, cleanup])

    // Handle page visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                cleanup()
            } else if (inView) {
                const timer = setTimeout(() => {
                    startInsightCycle()
                }, 500)
                return () => clearTimeout(timer)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            cleanup()
        }
    }, [inView, startInsightCycle, cleanup])

    // Handle scroll animation for metrics
    useEffect(() => {
        const container = metricsContainerRef.current
        if (!container) return

        const scrollAmount = scrollPosition * calculateScrollAmount()
        container.style.transform = `translateY(-${scrollAmount}px)`
    }, [scrollPosition, calculateScrollAmount])

    // Cleanup on unmount
    useEffect(() => {
        return cleanup
    }, [cleanup])

    return (
        <div 
            ref={inViewRef}
            className={cn(
                "relative w-full bg-[#0C1615] rounded-xl overflow-hidden min-h-[180px]",
                className
            )}
            role="region"
            aria-label="Analytics Dashboard"
        >
            <div className="absolute inset-4 bg-[#070C0B] rounded-lg p-4 flex flex-col h-[calc(100%-2rem)]">
                {/* Header */}
                <div className={cn(
                    "flex items-center justify-between mb-4 transition-opacity duration-300",
                    inView ? "opacity-100" : "opacity-0"
                )}>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h3 className="text-sm font-medium text-emerald-500/90">
                            Live Insights Dashboard
                        </h3>
                    </div>
                    <div className="text-xs text-emerald-500/60">Real-time</div>
                </div>

                {/* Content */}
                <div className="flex-1 flex gap-4 overflow-hidden">
                    {/* Metrics */}
                    <div className={cn(
                        "w-1/5 overflow-hidden transition-all duration-300",
                        showMetrics ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    )}>
                        <div 
                            ref={metricsContainerRef}
                            className="flex flex-col gap-2 transition-all"
                            style={{ 
                                transition: `transform ${ANIMATION_TIMING.duration}ms ${ANIMATION_TIMING.easing}`
                            }}
                        >
                            {METRICS.map((metric, index) => (
                                <div
                                    key={metric.label}
                                    ref={index === METRICS.length - 1 ? lastMetricRef : null}
                                >
                                    <MemoizedMetricCard
                                        metric={metric}
                                        index={index}
                                        isVisible={showMetrics}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Insights */}
                    <div className="flex-1 overflow-hidden">
                        <div 
                            className="flex flex-col gap-2 relative" 
                            style={{ 
                                height: `${(visibleInsights.length * CARD_DIMENSIONS.height) + 
                                    ((visibleInsights.length - 1) * CARD_DIMENSIONS.gap)}px`,
                                minHeight: '100px',
                                transition: `height ${ANIMATION_TIMING.duration}ms ${ANIMATION_TIMING.easing}`
                            }}
                        >
                            {visibleInsights.map((insightIndex, displayIndex) => {
                                const yPosition = displayIndex * CARD_DIMENSIONS.height + 
                                    (displayIndex * CARD_DIMENSIONS.gap)
                                
                                return (
                                    <div
                                        key={`insight-${insightIndex}-${displayIndex}`}
                                        className="absolute w-full"
                                        style={{
                                            top: 0,
                                            transform: `translateY(${yPosition}px)`,
                                            opacity: 1,
                                            transition: `transform ${ANIMATION_TIMING.duration}ms ${ANIMATION_TIMING.easing}, opacity ${ANIMATION_TIMING.duration}ms ease-in-out`,
                                            ...(displayIndex === 0 && {
                                                animation: `slideInFromTop ${ANIMATION_TIMING.duration}ms ${ANIMATION_TIMING.easing}`
                                            })
                                        }}
                                    >
                                        <style jsx>{`
                                            @keyframes slideInFromTop {
                                                0% {
                                                    transform: translateY(-100%);
                                                    opacity: 0;
                                                }
                                                60% {
                                                    opacity: 1;
                                                }
                                                100% {
                                                    transform: translateY(0);
                                                    opacity: 1;
                                                }
                                            }
                                        `}</style>
                                        <MemoizedInsightCard
                                            {...INSIGHTS[insightIndex]}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 