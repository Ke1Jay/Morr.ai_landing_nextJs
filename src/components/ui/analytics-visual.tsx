'use client'

import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { cn } from "@/lib/utils"

interface AnalyticsVisualProps {
    className?: string
}

interface MetricCardProps {
    label: string
    value: string | number
    change: {
        value: number
        isPositive: boolean
    }
    animationDelay?: number
    isVisible?: boolean
}

function AnimatedNumberBase({ 
    value, 
    duration = 1000, 
    isVisible = false 
}: { 
    value: number
    duration?: number
    isVisible?: boolean 
}) {
    const [displayValue, setDisplayValue] = useState<number>(0)
    const animationRef = useRef<number | null>(null)
    const startTimeRef = useRef<number | null>(null)
    
    useEffect(() => {
        if (!isVisible) {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
                animationRef.current = null
            }
            setDisplayValue(0)
            return
        }

        // Reset start time when value changes
        startTimeRef.current = Date.now()
        const startValue = 0
        
        function updateValue() {
            if (!startTimeRef.current) return

            const elapsed = Date.now() - startTimeRef.current
            
            if (elapsed < duration) {
                const progress = elapsed / duration
                // Use easeOutQuad for smoother animation
                const easeProgress = 1 - (1 - progress) * (1 - progress)
                const nextValue = startValue + (value - startValue) * easeProgress
                
                setDisplayValue(nextValue)
                animationRef.current = requestAnimationFrame(updateValue)
            } else {
                setDisplayValue(value)
                animationRef.current = null
            }
        }
        
        animationRef.current = requestAnimationFrame(updateValue)
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
                animationRef.current = null
            }
        }
    }, [value, duration, isVisible])

    return <>{displayValue.toLocaleString(undefined, { maximumFractionDigits: 1 })}</>
}

const AnimatedNumber = memo(AnimatedNumberBase)

function MetricCardBase({ 
    label, 
    value, 
    change, 
    animationDelay = 0, 
    isVisible = false 
}: MetricCardProps) {
    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value
    
    return (
        <div 
            className={cn(
                "relative p-3 rounded-xl bg-[#1A1D1D] border border-emerald-500/10",
                isVisible && "animate-in fade-in duration-300 fill-mode-forwards",
                "hover:border-emerald-500/20 transition-colors duration-300"
            )}
            style={{ 
                animationDelay: `${animationDelay}ms`,
                opacity: isVisible ? undefined : 0,
                transform: isVisible ? 'none' : 'translateY(10px)',
                transition: 'opacity 300ms ease-out, transform 300ms ease-out'
            }}
        >
            <div className="text-xs text-emerald-500/60 mb-1">{label}</div>
            <div className="text-2xl font-semibold text-white/90 mb-1 leading-none">
                {typeof value === 'string' && value.includes('%') ? (
                    <><AnimatedNumber value={numericValue} isVisible={isVisible} />{value.includes('%') ? '%' : ''}</>
                ) : (
                    <AnimatedNumber value={numericValue} isVisible={isVisible} />
                )}
            </div>
            <div className={cn(
                "text-xs flex items-center gap-1",
                change.isPositive ? "text-emerald-500" : "text-red-500"
            )}>
                {change.isPositive ? "↑" : "↓"} {Math.abs(change.value)}%
            </div>
            
            <div className="absolute -bottom-0 -right-0 w-6 h-6 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-tl-2xl" />
        </div>
    )
}

const MetricCard = memo(MetricCardBase)

const METRICS = [
    {
        label: "Sentiment Score",
        value: "8.4",
        change: { value: 2.1, isPositive: true }
    },
    {
        label: "Health Score",
        value: "92",
        change: { value: 1.5, isPositive: true }
    },
    {
        label: "Engagement",
        value: "76%",
        change: { value: 0.8, isPositive: false }
    },
    {
        label: "Total Customers",
        value: "1,240",
        change: { value: 12, isPositive: true }
    }
] as const

export function AnalyticsVisual({ className }: AnalyticsVisualProps) {
    const [showSecondPair, setShowSecondPair] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const componentRef = useRef<HTMLDivElement | null>(null)
    const intervalRef = useRef<number | null>(null)

    const startInterval = useCallback(() => {
        // Clear any existing interval first
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        intervalRef.current = window.setInterval(() => {
            setShowSecondPair(prev => !prev)
        }, 4000)
    }, [])

    const cleanupInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])

    useEffect(() => {
        if (!componentRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true)
                        startInterval()
                    } else {
                        cleanupInterval()
                        setIsVisible(false)
                        setShowSecondPair(false)
                    }
                })
            },
            {
                threshold: 0.2,
                rootMargin: '50px 0px'
            }
        )

        observer.observe(componentRef.current)
        return () => {
            observer.disconnect()
            cleanupInterval()
        }
    }, [startInterval, cleanupInterval])

    const currentMetrics = showSecondPair ? METRICS.slice(2, 4) : METRICS.slice(0, 2)

    return (
        <div 
            ref={componentRef}
            className={cn(
                "relative w-full h-[180px] bg-[#0C1615] rounded-xl p-4",
                className
            )}
        >
            <div className={cn(
                "flex items-center gap-2 mb-3",
                "transition-opacity duration-300",
                isVisible ? "opacity-100" : "opacity-0"
            )}>
                <div className="text-lg">😕</div>
                <h3 className="text-base font-semibold text-emerald-500/90">Customer Sentiment</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {currentMetrics.map((metric, index) => (
                    <MetricCard 
                        key={metric.label}
                        {...metric}
                        animationDelay={index * 100}
                        isVisible={isVisible}
                    />
                ))}
            </div>
        </div>
    )
} 