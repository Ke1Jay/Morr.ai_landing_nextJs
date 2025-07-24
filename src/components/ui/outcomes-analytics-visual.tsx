'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'

interface OutcomesAnalyticsVisualProps {
    className?: string
}

interface DecisionInsight {
    type: 'prediction' | 'risk' | 'opportunity' | 'recommendation'
    title: string
    description: string
    confidence: number
    priority: 'critical' | 'high' | 'medium'
    action: string
}

export function OutcomesAnalyticsVisual({ className }: OutcomesAnalyticsVisualProps) {
    const [currentInsightIndex, setCurrentInsightIndex] = useState(0)
    const [showInsights, setShowInsights] = useState(false)
    const [showRecommendations, setShowRecommendations] = useState(false)
    const [confidenceAnimated, setConfidenceAnimated] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const timeoutRefs = useRef<NodeJS.Timeout[]>([])
    
    const { ref: inViewRef, inView } = useInView({
        threshold: 0.3,
        rootMargin: '20px 0px',
    })

    // Clear all timeouts helper
    const clearAllTimeouts = useCallback(() => {
        timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
        timeoutRefs.current = []
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])

    // Start the cycling animation
    const startCycling = useCallback(() => {
        if (intervalRef.current) return // Already running
        
        intervalRef.current = setInterval(() => {
            // Only animate if page is visible
            if (!document.hidden) {
                // Phase 1: Hide current recommendation
                setShowRecommendations(false)
                setConfidenceAnimated(false)
                
                const timeout1 = setTimeout(() => {
                    // Phase 2: Change insight content
                    setCurrentInsightIndex(prev => (prev + 1) % DECISION_INSIGHTS.length)
                    
                    const timeout2 = setTimeout(() => {
                        // Phase 3: Show new recommendation
                        setShowRecommendations(true)
                    }, 200)
                    
                    const timeout3 = setTimeout(() => {
                        // Phase 4: Animate confidence bar
                        setConfidenceAnimated(true)
                    }, 300)
                    
                    timeoutRefs.current.push(timeout2, timeout3)
                }, 600)
                
                timeoutRefs.current.push(timeout1)
            }
        }, 3500)
    }, [])

    // Restart animations from current state
    const restartAnimations = useCallback(() => {
        clearAllTimeouts()
        
        // Reset to clean state
        setShowRecommendations(false)
        setConfidenceAnimated(false)
        
        // Restart with proper timing
        const timeout1 = setTimeout(() => setShowRecommendations(true), 200)
        const timeout2 = setTimeout(() => setConfidenceAnimated(true), 400)
        
        // Resume cycling
        const timeout3 = setTimeout(() => {
            startCycling()
        }, 1000)
        
        timeoutRefs.current = [timeout1, timeout2, timeout3]
    }, [clearAllTimeouts, startCycling])

    // Initial animation sequence
    const startInitialAnimation = useCallback(() => {
        clearAllTimeouts()
        
        const timeout1 = setTimeout(() => setShowInsights(true), 300)
        const timeout2 = setTimeout(() => setShowRecommendations(true), 800)
        const timeout3 = setTimeout(() => setConfidenceAnimated(true), 1000)
        const timeout4 = setTimeout(() => startCycling(), 1400)
        
        timeoutRefs.current = [timeout1, timeout2, timeout3, timeout4]
    }, [clearAllTimeouts, startCycling])

    // Handle visibility change (tab focus/blur)
    const handleVisibilityChange = useCallback(() => {
        const isCurrentlyVisible = !document.hidden
        setIsVisible(isCurrentlyVisible)
        
        if (!isCurrentlyVisible) {
            // Page is hidden - pause all animations
            clearAllTimeouts()
        } else if (inView) {
            // Page is visible again and component is in view - restart animations
            restartAnimations()
        }
    }, [inView, clearAllTimeouts, restartAnimations])

    // Handle in-view changes
    useEffect(() => {
        if (inView && isVisible) {
            startInitialAnimation()
        } else {
            // Reset when out of view
            clearAllTimeouts()
            setShowInsights(false)
            setShowRecommendations(false)
            setConfidenceAnimated(false)
            setCurrentInsightIndex(0)
        }
    }, [inView, isVisible, startInitialAnimation, clearAllTimeouts])

    // Handle page visibility changes
    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange)
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            clearAllTimeouts()
        }
    }, [handleVisibilityChange, clearAllTimeouts])

    const currentInsight = DECISION_INSIGHTS[currentInsightIndex]

    return (
        <div 
            ref={inViewRef}
            className={`relative w-full h-[280px] bg-[#0C1615] rounded-xl overflow-hidden ${className || ''}`}
            role="region"
            aria-label="Decision Intelligence Dashboard"
            aria-live="polite"
            aria-atomic="true"
        >
            <div className="absolute inset-4 bg-[#070C0B] rounded-lg p-4 flex flex-col h-[calc(100%-2rem)]">
                {/* Header - Decision Insight */}
                <header 
                    className="mb-4"
                    style={{
                        opacity: showInsights ? 1 : 0,
                        transform: showInsights ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'all 500ms ease-out'
                    }}
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div 
                            className="w-2 h-2 rounded-full bg-emerald-500" 
                            style={{ 
                                animation: showInsights ? 'pulse 2s infinite' : 'none' 
                            }}
                            aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-emerald-500/90">Live Decision Support</span>
                        <div className="ml-auto text-xs text-emerald-500/60">AI-Powered</div>
                    </div>
                    
                    <div className={`p-3 rounded-lg border transition-all duration-500 ${PRIORITY_STYLES[currentInsight.priority]}`}>
                        <div className="flex items-start gap-2">
                            <span className="text-sm" role="img" aria-label={`${currentInsight.type} indicator`}>
                                {INSIGHT_ICONS[currentInsight.type]}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-sm font-semibold text-primary/90">{currentInsight.title}</h3>
                                    <div className="flex items-center gap-1" role="progressbar" aria-valuenow={currentInsight.confidence} aria-valuemin={0} aria-valuemax={100} aria-label={`Confidence: ${currentInsight.confidence}%`}>
                                        <div className="w-8 h-1 bg-primary/10 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-primary/60 transition-all duration-1000 ease-out"
                                                style={{ 
                                                    width: confidenceAnimated ? `${currentInsight.confidence}%` : '0%' 
                                                }}
                                            />
                                        </div>
                                        <span className="text-sm text-primary/60 font-medium" aria-hidden="true">
                                            {currentInsight.confidence}%
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-primary/80 leading-relaxed">
                                    {currentInsight.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content - Action Recommendation */}
                <main className="flex-1">
                    <div 
                        className="bg-emerald-900/20 rounded-lg p-3 border border-emerald-500/20 ml-6"
                        style={{
                            opacity: showRecommendations ? 1 : 0,
                            transform: showRecommendations ? 'translateX(0)' : 'translateX(-20px)',
                            transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                            <span className="text-sm font-semibold text-emerald-500/90">Recommended Action</span>
                        </div>
                        <div className="text-sm text-emerald-500/90">
                            {currentInsight.action}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

// Static data moved to bottom per technical standards
const DECISION_INSIGHTS: DecisionInsight[] = [
    {
        type: 'prediction',
        title: 'Deal Risk Alert',
        description: 'Acme Corp deal likely to delay 2 weeks based on communication patterns',
        confidence: 87,
        priority: 'critical',
        action: 'Call John Smith today - address pricing concerns'
    },
    {
        type: 'opportunity',
        title: 'Expansion Opportunity',
        description: 'TechStart showing 3x usage growth - prime for upsell conversation',
        confidence: 94,
        priority: 'high',
        action: 'Schedule Pro features demo with IT team this week'
    },
    {
        type: 'recommendation',
        title: 'Resource Reallocation',
        description: 'Move 2 reps from Enterprise to SMB - 23% efficiency gain predicted',
        confidence: 78,
        priority: 'medium',
        action: 'Reassign Sarah and Mike to SMB next quarter'
    },
    {
        type: 'risk',
        title: 'Churn Prevention',
        description: 'Global Solutions engagement down 40% - immediate intervention needed',
        confidence: 91,
        priority: 'critical',
        action: 'Deploy success specialist within 48hrs for health check'
    }
]

const INSIGHT_ICONS = {
    prediction: '🔮',
    risk: '⚠️',
    opportunity: '🎯',
    recommendation: '💡'
} as const

const PRIORITY_STYLES = {
    critical: 'border-red-400/40 bg-red-500/10 text-red-400',
    high: 'border-orange-400/40 bg-orange-500/10 text-orange-400',
    medium: 'border-yellow-400/40 bg-yellow-500/10 text-yellow-400'
} as const 