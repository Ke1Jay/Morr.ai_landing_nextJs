'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { useInView } from 'react-intersection-observer'

interface KnowledgeItem {
    id: string
    category: 'decision' | 'process' | 'insight' | 'pattern'
    team: string
    timestamp: string
    title: string
    content: string
    relevance: number
    tags: string[]
}

interface AutomationWorkflowVisualProps {
    className?: string
}

interface AnimationState {
    currentKnowledgeIndex: number
    currentQueryIndex: number
    displayedQuery: string
    displayedContent: string
    showResults: boolean
    isSearching: boolean
    showKnowledge: boolean
    isPageVisible: boolean
}

export function AutomationWorkflowVisual({ className }: AutomationWorkflowVisualProps) {
    const [animationState, setAnimationState] = useState<AnimationState>({
        currentKnowledgeIndex: 0,
        currentQueryIndex: 0,
        displayedQuery: "",
        displayedContent: "",
        showResults: false,
        isSearching: false,
        showKnowledge: false,
        isPageVisible: true
    })
    
    const timeoutsRef = useRef<NodeJS.Timeout[]>([])
    
    const { ref: inViewRef, inView } = useInView({
        threshold: 0.3,
        triggerOnce: false
    })

    function clearAllTimeouts() {
        timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
        timeoutsRef.current = []
    }

    const resetAnimationState = useCallback(() => {
        setAnimationState(prev => ({
            ...prev,
            displayedQuery: "",
            displayedContent: "",
            showResults: false,
            isSearching: false,
            showKnowledge: false
        }))
        clearAllTimeouts()
    }, [])

    function updateAnimationState(updates: Partial<AnimationState>) {
        setAnimationState(prev => ({ ...prev, ...updates }))
    }

    // Handle page visibility changes
    useEffect(() => {
        function handleVisibilityChange() {
            const isVisible = !document.hidden
            updateAnimationState({ isPageVisible: isVisible })
            
            if (!isVisible) {
                clearAllTimeouts()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    const typeText = useCallback((
        text: string,
        updateFunction: (text: string) => void,
        speed: number,
        onComplete?: () => void
    ) => {
        let currentIndex = 0
        
        function typeNextChar() {
            if (!document.hidden && animationState.isPageVisible) {
                if (currentIndex <= text.length) {
                    updateFunction(text.slice(0, currentIndex))
                    
                    if (currentIndex === text.length) {
                        onComplete?.()
                        return
                    }

                    const timeout = setTimeout(typeNextChar, speed)
                    timeoutsRef.current.push(timeout)
                    currentIndex++
                }
            }
        }
        typeNextChar()
    }, [animationState.isPageVisible])

    const startKnowledgeAnimation = useCallback(() => {
        if (!animationState.isPageVisible || document.hidden) return

        const currentQuery = SEARCH_QUERIES[animationState.currentQueryIndex]
        const currentKnowledge = KNOWLEDGE_BASE[animationState.currentKnowledgeIndex]
        
        resetAnimationState()
        
        // Step 1: Type the search query
        typeText(currentQuery, (text) => updateAnimationState({ displayedQuery: text }), ANIMATION_CONSTANTS.TYPING_SPEED, () => {
            if (!animationState.isPageVisible || document.hidden) return
            
            // Step 2: Show searching state
            const searchTimeout = setTimeout(() => {
                if (!animationState.isPageVisible || document.hidden) return
                updateAnimationState({ isSearching: true })
                
                // Step 3: Show results
                const resultsTimeout = setTimeout(() => {
                    if (!animationState.isPageVisible || document.hidden) return
                    updateAnimationState({ 
                        isSearching: false, 
                        showResults: true, 
                        showKnowledge: true 
                    })
                    
                    // Step 4: Type the knowledge content
                    const contentTimeout = setTimeout(() => {
                        if (!animationState.isPageVisible || document.hidden) return
                        typeText(currentKnowledge.content, (text) => updateAnimationState({ displayedContent: text }), ANIMATION_CONSTANTS.TYPING_SPEED - 5, () => {
                            if (!animationState.isPageVisible || document.hidden) return
                            
                            // Step 5: Hold display then cycle to next
                            const cycleTimeout = setTimeout(() => {
                                if (!animationState.isPageVisible || document.hidden) return
                                updateAnimationState({
                                    currentQueryIndex: (animationState.currentQueryIndex + 1) % SEARCH_QUERIES.length,
                                    currentKnowledgeIndex: (animationState.currentKnowledgeIndex + 1) % KNOWLEDGE_BASE.length
                                })
                            }, ANIMATION_CONSTANTS.KNOWLEDGE_CYCLE_DURATION)
                            timeoutsRef.current.push(cycleTimeout)
                        })
                    }, 500)
                    timeoutsRef.current.push(contentTimeout)
                }, ANIMATION_CONSTANTS.SEARCH_DURATION)
                timeoutsRef.current.push(resultsTimeout)
            }, 1000)
            timeoutsRef.current.push(searchTimeout)
        })
    }, [animationState.currentQueryIndex, animationState.currentKnowledgeIndex, animationState.isPageVisible, typeText, resetAnimationState])

    // Start cycling animation
    useEffect(() => {
        if (inView && animationState.isPageVisible && !document.hidden) {
            startKnowledgeAnimation()
        } else {
            clearAllTimeouts()
        }
    }, [inView, animationState.currentQueryIndex, animationState.currentKnowledgeIndex, startKnowledgeAnimation, animationState.isPageVisible])

    useEffect(() => {
        return () => {
            clearAllTimeouts()
        }
    }, [])

    const currentKnowledge = KNOWLEDGE_BASE[animationState.currentKnowledgeIndex]
    const isTypingQuery = animationState.displayedQuery && animationState.displayedQuery !== SEARCH_QUERIES[animationState.currentQueryIndex] && animationState.isPageVisible
    const isTypingContent = animationState.displayedContent && animationState.displayedContent !== currentKnowledge.content && animationState.isPageVisible

    return (
        <div
            ref={inViewRef}
            className={cn(
                "relative w-full h-[280px] bg-[#070C0B] rounded-xl overflow-hidden p-4",
                className
            )}
            role="region"
            aria-label="Institutional Knowledge Assistant"
            aria-live="polite"
            aria-atomic="true"
        >
            {/* Search Interface */}
            <section className="mb-3" aria-labelledby="search-heading">
                <header className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    <h3 id="search-heading" className="text-xs font-medium text-emerald-500/90">
                        Search Company Knowledge
                    </h3>
                </header>
                
                <div className="bg-emerald-500/5 rounded-lg border border-emerald-500/10 p-2.5">
                    <div className="flex items-center gap-2">
                        <span className="text-emerald-400/60 text-xs" aria-hidden="true">🔍</span>
                        <div className="flex-1 text-xs text-emerald-300/90 min-h-[16px]" role="searchbox" aria-label="Knowledge search query">
                            {animationState.displayedQuery}
                            {isTypingQuery && (
                                <span className="inline-block w-0.5 h-3 ml-1 bg-emerald-400 animate-pulse" aria-hidden="true" />
                            )}
                        </div>
                        {animationState.isSearching && (
                            <div className="flex items-center gap-1" aria-label="Searching knowledge base">
                                {[0, 150, 300].map((delay, index) => (
                                    <div 
                                        key={index}
                                        className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" 
                                        style={{ animationDelay: `${delay}ms` }}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Knowledge Results */}
            {animationState.showResults && (
                <section 
                    className={cn(
                        "transition-all duration-500",
                        animationState.showKnowledge ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    )}
                    aria-labelledby="results-heading"
                >
                    <header className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                        <h3 id="results-heading" className="text-xs font-medium text-emerald-500/90">
                            Found in {currentKnowledge.team} Knowledge
                        </h3>
                        <div className="ml-auto flex items-center gap-1">
                            <span className="text-[10px] text-emerald-500/60">Relevance:</span>
                            <span className="text-[10px] font-semibold text-emerald-400">
                                {currentKnowledge.relevance}%
                            </span>
                        </div>
                    </header>
                    
                    <article className="bg-emerald-900/20 rounded-lg border border-emerald-500/20 p-3">
                        {/* Header */}
                        <header className="flex items-start gap-2 mb-2">
                            <span 
                                className="text-sm" 
                                role="img" 
                                aria-label={`${currentKnowledge.category} category`}
                            >
                                {CATEGORY_ICONS[currentKnowledge.category]}
                            </span>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-semibold text-emerald-400 mb-1 leading-tight">
                                    {currentKnowledge.title}
                                </h4>
                                <div className="flex items-center gap-1.5 text-[10px] text-emerald-500/60">
                                    <span>{currentKnowledge.team}</span>
                                    <span aria-hidden="true">•</span>
                                    <time dateTime={currentKnowledge.timestamp}>{currentKnowledge.timestamp}</time>
                                </div>
                            </div>
                        </header>
                        
                        {/* Content */}
                        <div className="text-xs text-emerald-300/90 leading-relaxed mb-2 min-h-[30px]">
                            {animationState.displayedContent}
                            {isTypingContent && (
                                <span className="inline-block w-0.5 h-3 ml-1 bg-emerald-400 animate-pulse" aria-hidden="true" />
                            )}
                        </div>
                        
                                                 {/* Tags */}
                         <div className="flex flex-wrap gap-1" role="list" aria-label="Knowledge tags">
                             {currentKnowledge.tags.slice(0, 3).map((tag) => (
                                 <span
                                     key={tag}
                                     role="listitem"
                                     className="text-[10px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400/70 rounded-full border border-emerald-500/20"
                                 >
                                     {tag}
                                 </span>
                             ))}
                        </div>
                    </article>
                </section>
            )}
        </div>
    )
}

// Animation constants
const ANIMATION_CONSTANTS = {
    KNOWLEDGE_CYCLE_DURATION: 4000,
    TYPING_SPEED: 25,
    SEARCH_DURATION: 2000,
} as const

// Static content data - moved to bottom per conventions
const KNOWLEDGE_BASE: KnowledgeItem[] = [
    {
        id: '1',
        category: 'decision',
        team: 'Sales Team',
        timestamp: '2023-11-12',
        title: 'TechCorp Pricing Objection Resolution',
        content: 'Offered 6-month pilot at 40% discount with full feature access. Client signed annual contract after seeing ROI. Key: show value first, negotiate later.',
        relevance: 96,
        tags: ['pricing', 'objections', 'pilot']
    },
    {
        id: '2',
        category: 'process',
        team: 'Sales Operations',
        timestamp: '2023-09-15',
        title: 'New Rep Onboarding Playbook',
        content: 'Week 1: Shadow 5 calls. Week 2: Lead qualification practice. Week 3: First solo demos. Results: 73% faster ramp-up vs old process.',
        relevance: 92,
        tags: ['onboarding', 'training', 'ramp-up']
    },
    {
        id: '3',
        category: 'insight',
        team: 'Implementation',
        timestamp: '2023-08-22',
        title: 'DataFlow Migration Failure Analysis',
        content: 'Failed due to incomplete data mapping + no rollback plan. Client had 30+ custom fields not documented. Always audit data schema first.',
        relevance: 94,
        tags: ['migration', 'failure', 'data-audit']
    },
    {
        id: '4',
        category: 'pattern',
        team: 'Customer Success',
        timestamp: '2023-12-03',
        title: 'High-Retention Integration Mix',
        content: 'Slack + Salesforce + Google Drive combo shows 91% retention vs 67% single-tool users. Multi-platform adoption = stickiness.',
        relevance: 89,
        tags: ['integrations', 'retention', 'multi-platform']
    }
]

const SEARCH_QUERIES = [
    "Client is pushing back on pricing - how did we handle this before?",
    "New hire asking about our sales process - what's the proven playbook?",
    "Why did the DataFlow migration fail last quarter?",
    "Which integrations actually drove customer retention in 2023?"
]

const CATEGORY_ICONS = {
    decision: '🎯',
    process: '⚙️', 
    insight: '💡',
    pattern: '📊'
} as const 