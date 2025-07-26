'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { useInView } from 'react-intersection-observer'

export function RelationshipNetworkVisual({ className }: RelationshipNetworkVisualProps) {
    // Consolidated state management for better performance
    const [animationState, setAnimationState] = useState<AnimationState>({
        currentScenarioIndex: 0,
        showPhase: false,
        showScenario: false,
        showWork: false,
        showResult: false,
        activeSection: 'scenario',
        displayedScenario: "",
        displayedAiWork: "",
        displayedFocus: "",
        displayedOutcome: "",
        isPageVisible: true
    })
    
    const timeoutsRef = useRef<NodeJS.Timeout[]>([])
    const animationStateRef = useRef<AnimationLifecycle>('idle')
    
    const { ref: inViewRef, inView } = useInView({
        threshold: 0.3,
        triggerOnce: false
    })

    function clearAllTimeouts() {
        timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
        timeoutsRef.current = []
    }

    function updateAnimationState(updates: Partial<AnimationState>) {
        setAnimationState(prev => ({ ...prev, ...updates }))
    }

    const resetAnimationState = useCallback(() => {
        updateAnimationState({
            showPhase: false,
            showScenario: false,
            showWork: false,
            showResult: false,
            activeSection: 'scenario',
            displayedScenario: "",
            displayedAiWork: "",
            displayedFocus: "",
            displayedOutcome: ""
        })
        clearAllTimeouts()
    }, [])

    const typeText = useCallback((
        text: string,
        updateFunction: (text: string) => void,
        speed: number,
        onComplete?: () => void
    ) => {
        if (animationStateRef.current !== 'running') return

        let currentIndex = 0
        
        function typeNextChar() {
            if (animationStateRef.current !== 'running' || document.hidden) {
                return
            }

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
        
        typeNextChar()
    }, [])

    const startWorkflowAnimation = useCallback(() => {
        if (!animationState.isPageVisible || document.hidden || !inView) {
            return
        }

        animationStateRef.current = 'running'
        const currentScenario = WORKFLOW_SCENARIOS[animationState.currentScenarioIndex]
        
        // Reset state
        resetAnimationState()
        
        // Step 1: Show phase header
        const phaseTimeout = setTimeout(() => {
            if (animationStateRef.current !== 'running') return
            updateAnimationState({ showPhase: true })
            
            // Step 2: Show scenario section and start typing
            const showScenarioTimeout = setTimeout(() => {
                if (animationStateRef.current !== 'running') return
                updateAnimationState({ showScenario: true, activeSection: 'scenario' })
                
                typeText(
                    currentScenario.scenario, 
                    (text) => updateAnimationState({ displayedScenario: text }), 
                    ANIMATION_CONSTANTS.TYPING_SPEED, 
                    () => {
                        if (animationStateRef.current !== 'running') return
                        
                        // Step 3: Show work section and highlight it
                        const workTimeout = setTimeout(() => {
                            if (animationStateRef.current !== 'running') return
                            updateAnimationState({ showWork: true, activeSection: 'work' })
                            
                            // Step 4: Type AI work first
                            const aiTimeout = setTimeout(() => {
                                if (animationStateRef.current !== 'running') return
                                typeText(
                                    currentScenario.aiWork, 
                                    (text) => updateAnimationState({ displayedAiWork: text }), 
                                    ANIMATION_CONSTANTS.TYPING_SPEED, 
                                    () => {
                                        if (animationStateRef.current !== 'running') return
                                        
                                        // Step 5: Type your focus after AI work completes
                                        const focusTimeout = setTimeout(() => {
                                            if (animationStateRef.current !== 'running') return
                                            typeText(
                                                currentScenario.yourFocus, 
                                                (text) => updateAnimationState({ displayedFocus: text }), 
                                                ANIMATION_CONSTANTS.TYPING_SPEED, 
                                                () => {
                                                    if (animationStateRef.current !== 'running') return
                                                    
                                                    // Step 6: Show result section and highlight it
                                                    const resultTimeout = setTimeout(() => {
                                                        if (animationStateRef.current !== 'running') return
                                                        updateAnimationState({ showResult: true, activeSection: 'result' })
                                                        
                                                        // Step 7: Type outcome
                                                        const typeOutcomeTimeout = setTimeout(() => {
                                                            if (animationStateRef.current !== 'running') return
                                                            typeText(
                                                                currentScenario.outcome, 
                                                                (text) => updateAnimationState({ displayedOutcome: text }), 
                                                                ANIMATION_CONSTANTS.TYPING_SPEED, 
                                                                () => {
                                                                    if (animationStateRef.current !== 'running') return
                                                                    
                                                                    // Step 8: Hold then cycle to next scenario
                                                                    const cycleTimeout = setTimeout(() => {
                                                                        if (animationStateRef.current !== 'running') return
                                                                        updateAnimationState({ 
                                                                            currentScenarioIndex: (animationState.currentScenarioIndex + 1) % WORKFLOW_SCENARIOS.length 
                                                                        })
                                                                    }, ANIMATION_CONSTANTS.DISPLAY_DURATION)
                                                                    timeoutsRef.current.push(cycleTimeout)
                                                                }
                                                            )
                                                        }, 400)
                                                        timeoutsRef.current.push(typeOutcomeTimeout)
                                                    }, ANIMATION_CONSTANTS.RESULT_TRANSITION_DELAY)
                                                    timeoutsRef.current.push(resultTimeout)
                                                }
                                            )
                                        }, 500)
                                        timeoutsRef.current.push(focusTimeout)
                                    }
                                )
                            }, 400)
                            timeoutsRef.current.push(aiTimeout)
                        }, ANIMATION_CONSTANTS.PHASE_TRANSITION_DELAY)
                        timeoutsRef.current.push(workTimeout)
                    }
                )
            }, 600)
            timeoutsRef.current.push(showScenarioTimeout)
        }, 300)
        timeoutsRef.current.push(phaseTimeout)
    }, [animationState.currentScenarioIndex, animationState.isPageVisible, inView, typeText, resetAnimationState])

    // Page visibility handling with improved cleanup
    useEffect(() => {
        function handleVisibilityChange() {
            const isVisible = !document.hidden
            updateAnimationState({ isPageVisible: isVisible })
            
            if (!isVisible) {
                animationStateRef.current = 'paused'
                clearAllTimeouts()
            } else if (animationStateRef.current === 'paused' && inView) {
                resetAnimationState()
                const restartTimeout = setTimeout(() => {
                    if (!document.hidden && inView) {
                        startWorkflowAnimation()
                    }
                }, 100)
                timeoutsRef.current.push(restartTimeout)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            clearAllTimeouts()
        }
    }, [inView, resetAnimationState, startWorkflowAnimation])

    // Main animation effect with optimized dependencies
    useEffect(() => {
        if (inView && animationState.isPageVisible && !document.hidden) {
            startWorkflowAnimation()
        } else {
            animationStateRef.current = 'idle'
            clearAllTimeouts()
        }
    }, [inView, animationState.currentScenarioIndex, animationState.isPageVisible, startWorkflowAnimation])

    // Cleanup effect
    useEffect(() => {
        return () => {
            clearAllTimeouts()
            animationStateRef.current = 'idle'
        }
    }, [])

    const currentScenario = WORKFLOW_SCENARIOS[animationState.currentScenarioIndex]
    const isTypingScenario = animationState.displayedScenario && 
        animationState.displayedScenario !== currentScenario.scenario && 
        animationStateRef.current === 'running'
    const isTypingAiWork = animationState.displayedAiWork && 
        animationState.displayedAiWork !== currentScenario.aiWork && 
        animationStateRef.current === 'running'
    const isTypingFocus = animationState.displayedFocus && 
        animationState.displayedFocus !== currentScenario.yourFocus && 
        animationStateRef.current === 'running'
    const isTypingOutcome = animationState.displayedOutcome && 
        animationState.displayedOutcome !== currentScenario.outcome && 
        animationStateRef.current === 'running'

    return (
        <section
            ref={inViewRef}
            className={cn(
                "relative w-full h-[280px] bg-[#070C0B] rounded-xl overflow-hidden p-4",
                className
            )}
            role="region"
            aria-label="AI Sales Workflow Assistant"
            aria-live="polite"
            aria-atomic="true"
        >
            {/* Phase Header */}
            <header 
                className={cn(
                    "mb-3 transition-all duration-500",
                    animationState.showPhase ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                )}
            >
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span className="text-sm font-medium text-emerald-500/90">Sales Workflow Automation</span>
                    <div className="ml-auto flex items-center gap-1">
                        <span className="text-[10px] text-emerald-500/60">Phase:</span>
                        <span className="text-[10px] font-semibold text-emerald-400">{currentScenario.timing}</span>
                    </div>
                </div>
                
                <div className="bg-emerald-500/5 rounded-lg border border-emerald-500/10 p-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm" aria-hidden="true">
                            {currentScenario.icon}
                        </span>
                        <h3 className="text-sm font-semibold text-emerald-400">
                            {currentScenario.phase}
                        </h3>
                    </div>
                </div>
            </header>

            {/* Progressive Content with Visual Emphasis */}
            <div className="space-y-2" role="main">
                {/* Scenario */}
                {animationState.showScenario && (
                    <article className={cn(
                        "bg-emerald-900/20 rounded-lg border p-2 transition-all duration-500",
                        animationState.activeSection === 'scenario' 
                            ? "border-emerald-400/40 bg-emerald-900/30 opacity-100" 
                            : "border-emerald-500/20 opacity-60"
                    )} aria-label="Current scenario">
                        <div className="text-[10px] text-emerald-300/90 leading-relaxed min-h-[16px]">
                            {animationState.displayedScenario}
                            {isTypingScenario && (
                                <span className="inline-block w-0.5 h-2.5 ml-1 bg-emerald-400 animate-pulse" aria-hidden="true" />
                            )}
                        </div>
                    </article>
                )}

                {/* Work Split */}
                {animationState.showWork && (
                    <div className={cn(
                        "grid grid-cols-2 gap-2 transition-all duration-500",
                        animationState.activeSection === 'work' ? "opacity-100" : "opacity-60"
                    )} role="group" aria-label="Work distribution">
                        {/* AI Work */}
                        <article className={cn(
                            "bg-emerald-900/20 rounded-lg border p-2 transition-all duration-500",
                            animationState.activeSection === 'work' 
                                ? "border-emerald-400/40 bg-emerald-900/30" 
                                : "border-emerald-500/20"
                        )} aria-label="AI responsibilities">
                            <div className="flex items-center gap-1 mb-1">
                                <span className="text-[10px]" aria-hidden="true">🤖</span>
                                <span className="text-[10px] font-medium text-emerald-400/90">AI Handles</span>
                            </div>
                            <div className="text-[9px] text-emerald-300/90 leading-relaxed min-h-[20px]">
                                {animationState.displayedAiWork}
                                {isTypingAiWork && (
                                    <span className="inline-block w-0.5 h-2 ml-1 bg-emerald-400 animate-pulse" aria-hidden="true" />
                                )}
                            </div>
                        </article>

                        {/* Your Focus */}
                        <article className={cn(
                            "bg-emerald-500/10 rounded-lg border p-2 transition-all duration-500",
                            animationState.activeSection === 'work' 
                                ? "border-emerald-400/40 bg-emerald-500/20" 
                                : "border-emerald-500/20"
                        )} aria-label="Human responsibilities">
                            <div className="flex items-center gap-1 mb-1">
                                <span className="text-[10px]" aria-hidden="true">👤</span>
                                <span className="text-[10px] font-medium text-emerald-400/90">You Focus On</span>
                            </div>
                            <div className="text-[9px] text-emerald-300/90 leading-relaxed min-h-[20px]">
                                {animationState.displayedFocus}
                                {isTypingFocus && (
                                    <span className="inline-block w-0.5 h-2 ml-1 bg-emerald-400 animate-pulse" aria-hidden="true" />
                                )}
                            </div>
                        </article>
                    </div>
                )}

                {/* Result */}
                {animationState.showResult && (
                    <article className={cn(
                        "bg-emerald-500/10 rounded-lg border p-2 transition-all duration-500",
                        animationState.activeSection === 'result' 
                            ? "border-emerald-400/40 bg-emerald-500/20 opacity-100" 
                            : "border-emerald-500/20 opacity-60"
                    )} aria-label="Workflow outcome">
                        <div className="text-[10px] text-emerald-300/90 leading-relaxed min-h-[16px]">
                            <span className="text-xs font-semibold text-emerald-400">RESULT:</span>{" "}
                            {animationState.displayedOutcome}
                            {isTypingOutcome && (
                                <span className="inline-block w-0.5 h-2.5 ml-1 bg-emerald-400 animate-pulse" aria-hidden="true" />
                            )}
                        </div>
                    </article>
                )}
            </div>
        </section>
    )
}

// TypeScript interfaces moved to bottom per conventions
interface WorkflowScenario {
    id: string
    phase: string
    timing: string
    scenario: string
    aiWork: string
    yourFocus: string
    outcome: string
    icon: string
}

interface RelationshipNetworkVisualProps {
    className?: string
}

interface AnimationState {
    currentScenarioIndex: number
    showPhase: boolean
    showScenario: boolean
    showWork: boolean
    showResult: boolean
    activeSection: 'scenario' | 'work' | 'result'
    displayedScenario: string
    displayedAiWork: string
    displayedFocus: string
    displayedOutcome: string
    isPageVisible: boolean
}

type AnimationLifecycle = 'idle' | 'running' | 'paused'

// Animation constants moved to bottom per conventions
const ANIMATION_CONSTANTS = {
    TYPING_SPEED: 30,
    DISPLAY_DURATION: 4500,
    PHASE_TRANSITION_DELAY: 2000,
    RESULT_TRANSITION_DELAY: 1500,
} as const

// Static content data moved to bottom per conventions
const WORKFLOW_SCENARIOS: WorkflowScenario[] = [
    {
        id: 'before',
        phase: 'Before Client Call',
        timing: 'Pre-meeting prep',
        icon: '🔍',
        scenario: 'Important call with TechFlow Inc in 30 minutes. CEO Sarah mentioned "scaling challenges" last week.',
        aiWork: 'Researched Q3 growth (40% expansion), found similar case studies, prepared scaling discussion points.',
        yourFocus: 'Reviewing AI brief, planning conversation flow, preparing value-focused talking points.',
        outcome: 'Walk into call prepared with context for strategic conversation vs basic info gathering.'
    },
    {
        id: 'during',
        phase: 'During Client Call',
        timing: 'Live conversation',
        icon: '🎯',
        scenario: 'Client asks: "How would this integrate with our Salesforce?" You need technical details fast.',
        aiWork: 'Surfaces Salesforce integration docs, customer configs, timeline, and challenges.',
        yourFocus: 'Active listening, building rapport, addressing questions with AI-provided context.',
        outcome: 'Answered complex question immediately, maintained flow, built trust through knowledge.'
    },
    {
        id: 'after',
        phase: 'After Client Call',
        timing: 'Follow-up tasks',
        icon: '✅',
        scenario: 'Call ended with next steps. Client wants demo scheduled and pricing proposal by Friday.',
        aiWork: 'Created summary, scheduled demo with engineering, drafted proposal, set reminders.',
        yourFocus: 'Planning demo strategy, customizing value prop, strategizing relationship steps.',
        outcome: 'Admin work completed automatically. Focus time freed for relationship building.'
    }
] 