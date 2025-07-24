'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { useInView } from 'react-intersection-observer'

// Animation constants
const ANIMATION_CONSTANTS = {
    MEETING_DISPLAY_DURATION: 8000,
    TYPING_SPEED: {
        context: 30,
        keyPoints: 20,
    },
} as const

// Interfaces
interface Meeting {
    id: string
    time: string
    title: string
    isInternal: boolean
    client?: string
    historicContext: string
    keyPoints: string[]
    endTime: string
}

interface MeetingBriefVisualProps {
    className?: string
}

// Meeting data
const EXAMPLE_MEETINGS: Meeting[] = [
    {
        id: '1',
        time: '09:00',
        title: 'Product Demo',
        isInternal: false,
        client: 'TechCorp Solutions',
        historicContext: 'Previous demo focused on AI capabilities. Team showed high interest in automation features.',
        keyPoints: [
            'Show automated invoice processing (saves 40hrs/week)',
            'Confirm SOC2 compliance covers their banking reqs',
            'Present 3-tier pricing: $50/100/200 per user/month'
        ],
        endTime: '10:00'
    },
    {
        id: '2',
        time: '10:30',
        title: 'Team Standup',
        isInternal: true,
        historicContext: 'Sprint planning completed yesterday. New feature rollout starting this week.',
        keyPoints: [
            'Sprint goal: Complete user dashboard by Friday',
            'Blocker: API rate limits affecting data sync',
            'Client feedback: Need dark mode by next release'
        ],
        endTime: '11:00'
    },
    {
        id: '3',
        time: '13:00',
        title: 'Integration Planning',
        isInternal: false,
        client: 'DataFlow Inc',
        historicContext: 'Currently using legacy system. Need seamless transition to our platform within 2 months.',
        keyPoints: [
            'Timeline: Migration starts Jan 15, go-live March 1',
            'Data strategy: Parallel run for 2 weeks minimum',
            'Weekly calls: Tuesdays 2PM with tech & business teams'
        ],
        endTime: '13:45'
    },
    {
        id: '4',
        time: '15:30',
        title: 'Quarterly Review',
        isInternal: false,
        client: 'InnovateTech',
        historicContext: 'Strong Q1 performance. Looking to expand usage across more teams.',
        keyPoints: [
            'Q1 results: 45% efficiency gain, 99.2% uptime',
            'Expansion: Add 50 more users across sales & support',
            'Training: 3 sessions next week for new departments'
        ],
        endTime: '17:00'
    },
    {
        id: '5',
        time: '17:00',
        title: 'Security Review',
        isInternal: false,
        client: 'SecureBank Global',
        historicContext: 'Completed initial security assessment. Addressing final compliance requirements.',
        keyPoints: [
            'Audit passed: 2 minor issues fixed, report ready',
            'SOC2 Type II cert delivered, covers all requirements',
            'Go-live: Security features active by end of week'
        ],
        endTime: '18:00'
    }
]

const MEETING_HEIGHT = 90

export function MeetingBriefVisual({ className }: MeetingBriefVisualProps) {
    const [currentMeetingIndex, setCurrentMeetingIndex] = useState(0)
    const [displayedContext, setDisplayedContext] = useState("")
    const [displayedKeyPoints, setDisplayedKeyPoints] = useState<string[]>([])
    const [isContextExpanded, setIsContextExpanded] = useState(false)
    const [showKeyPoints, setShowKeyPoints] = useState(false)
    const [isPageVisible, setIsPageVisible] = useState(true)
    const [shouldRestartAnimation, setShouldRestartAnimation] = useState(false)
    const timeoutsRef = useRef<NodeJS.Timeout[]>([])
    const lastVisibilityChangeRef = useRef<number>(Date.now())

    const { ref: inViewRef, inView } = useInView({
        threshold: 0.3,
        triggerOnce: false
    })

    const meetings = EXAMPLE_MEETINGS.map((meeting, index) => ({
        meeting,
        translateY: MEETING_HEIGHT * (index - currentMeetingIndex),
        isCurrent: index === currentMeetingIndex,
        isVisible: index >= currentMeetingIndex - 1 && index <= currentMeetingIndex + 3
    }))

    const clearAllTimeouts = useCallback(() => {
        timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
        timeoutsRef.current = []
    }, [])

    const resetAnimationState = useCallback(() => {
        setDisplayedContext("")
        setDisplayedKeyPoints([])
        setIsContextExpanded(false)
        setShowKeyPoints(false)
        clearAllTimeouts()
    }, [clearAllTimeouts])

    // Handle page visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            const isVisible = !document.hidden
            
            if (isVisible !== isPageVisible) {
                setIsPageVisible(isVisible)
                
                if (isVisible) {
                    // Page became visible - check if we should restart animation
                    const timeSinceHidden = Date.now() - lastVisibilityChangeRef.current
                    // If hidden for more than 500ms, restart the animation
                    if (timeSinceHidden > 500) {
                        setShouldRestartAnimation(true)
                    }
                } else {
                    // Page became hidden - clear timeouts and save timestamp
                    clearAllTimeouts()
                    lastVisibilityChangeRef.current = Date.now()
                }
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        
        // Also handle window focus/blur as fallback
        const handleFocus = () => {
            if (!isPageVisible) {
                setIsPageVisible(true)
                const timeSinceHidden = Date.now() - lastVisibilityChangeRef.current
                if (timeSinceHidden > 500) {
                    setShouldRestartAnimation(true)
                }
            }
        }

        const handleBlur = () => {
            if (isPageVisible) {
                setIsPageVisible(false)
                clearAllTimeouts()
                lastVisibilityChangeRef.current = Date.now()
            }
        }

        window.addEventListener('focus', handleFocus)
        window.addEventListener('blur', handleBlur)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            window.removeEventListener('focus', handleFocus)
            window.removeEventListener('blur', handleBlur)
        }
    }, [isPageVisible, clearAllTimeouts])

    const typeText = useCallback((
        text: string,
        setDisplay: (text: string) => void,
        speed: number,
        onComplete?: () => void
    ) => {
        let currentIndex = 0
        const typeNextChar = () => {
            // Check if page is still visible before continuing
            if (!document.hidden && isPageVisible) {
                if (currentIndex <= text.length) {
                    setDisplay(text.slice(0, currentIndex))
                    
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
    }, [isPageVisible])

    const typeKeyPoints = useCallback((
        points: string[],
        onComplete?: () => void
    ) => {
        let currentPointIndex = 0
        let currentCharIndex = 0
        
        const typeNextChar = () => {
            // Check if page is still visible before continuing
            if (!document.hidden && isPageVisible) {
                if (currentPointIndex >= points.length) {
                    onComplete?.()
                    return
                }

                const currentPoint = points[currentPointIndex]
                if (currentCharIndex > currentPoint.length) {
                    currentPointIndex++
                    currentCharIndex = 0
                    
                    if (currentPointIndex < points.length) {
                        const timeout = setTimeout(typeNextChar, ANIMATION_CONSTANTS.TYPING_SPEED.keyPoints)
                        timeoutsRef.current.push(timeout)
                    } else {
                        onComplete?.()
                    }
                    return
                }

                setDisplayedKeyPoints(prev => {
                    const newPoints = [...prev]
                    if (currentPointIndex >= newPoints.length) {
                        newPoints.push("")
                    }
                    newPoints[currentPointIndex] = currentPoint.slice(0, currentCharIndex)
                    return newPoints
                })

                currentCharIndex++
                const timeout = setTimeout(typeNextChar, ANIMATION_CONSTANTS.TYPING_SPEED.keyPoints)
                timeoutsRef.current.push(timeout)
            }
        }

        typeNextChar()
    }, [isPageVisible])

    const startMeetingAnimation = useCallback(() => {
        // Don't start animation if page is not visible
        if (!isPageVisible || document.hidden) {
            return
        }

        const currentMeeting = EXAMPLE_MEETINGS[currentMeetingIndex]
        setDisplayedKeyPoints([])
        setDisplayedContext("")
        setIsContextExpanded(true)
        setShowKeyPoints(false)
        
        typeText(
            currentMeeting.historicContext,
            setDisplayedContext,
            ANIMATION_CONSTANTS.TYPING_SPEED.context,
            () => {
                // Check visibility before scheduling next step
                if (!isPageVisible || document.hidden) return

                const collapseTimeout = setTimeout(() => {
                    if (!isPageVisible || document.hidden) return
                    setIsContextExpanded(false)
                    
                    const keyPointsTimeout = setTimeout(() => {
                        if (!isPageVisible || document.hidden) return
                        setShowKeyPoints(true)
                        
                        const generateTimeout = setTimeout(() => {
                            if (!isPageVisible || document.hidden) return
                            typeKeyPoints(currentMeeting.keyPoints, () => {
                                if (!isPageVisible || document.hidden) return
                                if (currentMeetingIndex < EXAMPLE_MEETINGS.length - 1) {
                                    const timeout = setTimeout(() => {
                                        if (!isPageVisible || document.hidden) return
                                        setCurrentMeetingIndex(prev => prev + 1)
                                    }, ANIMATION_CONSTANTS.MEETING_DISPLAY_DURATION)
                                    timeoutsRef.current.push(timeout)
                                }
                            })
                        }, 300)
                        timeoutsRef.current.push(generateTimeout)
                    }, 700)
                    timeoutsRef.current.push(keyPointsTimeout)
                }, 1500)
                timeoutsRef.current.push(collapseTimeout)
            }
        )
    }, [currentMeetingIndex, typeText, typeKeyPoints, isPageVisible])

    const handleContextToggle = useCallback(() => {
        setIsContextExpanded(!isContextExpanded)
    }, [isContextExpanded])

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleContextToggle()
        }
    }, [handleContextToggle])

    // Handle restart animation when page becomes visible again
    useEffect(() => {
        if (shouldRestartAnimation && isPageVisible && inView && !document.hidden) {
            setShouldRestartAnimation(false)
            resetAnimationState()
            // Longer delay to ensure smooth transition
            const restartTimeout = setTimeout(() => {
                if (isPageVisible && !document.hidden) {
                    startMeetingAnimation()
                }
            }, 200)
            timeoutsRef.current.push(restartTimeout)
        }
    }, [shouldRestartAnimation, isPageVisible, inView, resetAnimationState, startMeetingAnimation])

    useEffect(() => {
        if (inView && isPageVisible && !document.hidden) {
            startMeetingAnimation()
        } else {
            clearAllTimeouts()
        }
    }, [inView, currentMeetingIndex, startMeetingAnimation, clearAllTimeouts, isPageVisible])

    useEffect(() => {
        return () => {
            clearAllTimeouts()
        }
    }, [clearAllTimeouts])

    return (
        <div
            ref={inViewRef}
            className={cn(
                "relative w-full h-[280px] bg-[#070C0B] rounded-xl overflow-hidden p-4",
                className
            )}
            role="region"
            aria-label="AI Meeting Brief Assistant"
            aria-live="polite"
            aria-atomic="true"
        >
            <div className="flex gap-4 h-full">
                {/* Left Side - Meeting Timeline (30%) */}
                <div className="w-[30%] flex flex-col">
                    <div className="relative overflow-hidden" style={{ height: `${MEETING_HEIGHT * 4}px` }}>
                        <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-emerald-500/20" />

                        <div className="relative">
                            {meetings.map(({ meeting, translateY, isCurrent, isVisible }) => {
                                if (!isVisible) return null

                                return (
                                    <div
                                        key={meeting.id}
                                        className={cn(
                                            "absolute w-full flex items-start gap-3 pb-4",
                                            "transition-all duration-700 ease-out",
                                            isCurrent
                                                ? "opacity-100 scale-100"
                                                : "opacity-60 scale-98"
                                        )}
                                        style={{
                                            transform: `translateY(${translateY}px)`,
                                            height: `${MEETING_HEIGHT}px`
                                        }}
                                    >
                                        <div className="relative mt-0 flex justify-center w-3">
                                            <div
                                                className={cn(
                                                    "rounded-full transition-all duration-700",
                                                    isCurrent
                                                        ? "w-3 h-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                                                        : "w-2 h-2 bg-emerald-500/50"
                                                )}
                                                aria-hidden="true"
                                            >
                                                {isCurrent && isPageVisible && (
                                                    <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div
                                                className={cn(
                                                    "text-sm font-medium truncate mb-2",
                                                    isCurrent ? "text-emerald-400" : "text-emerald-500/70"
                                                )}
                                            >
                                                {meeting.title}
                                            </div>

                                            <div
                                                className={cn(
                                                    "text-xs font-medium mb-1",
                                                    isCurrent ? "text-emerald-400/80" : "text-emerald-500/50"
                                                )}
                                            >
                                                {meeting.time} - {meeting.endTime}
                                            </div>

                                            <div
                                                className={cn(
                                                    "text-xs",
                                                    isCurrent ? "text-emerald-400/60" : "text-emerald-500/40"
                                                )}
                                            >
                                                {meeting.isInternal ? "Internal Meeting" : meeting.client}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Side - Meeting Details (70%) */}
                <div className="flex-1 flex flex-col border-l border-emerald-500/10 pl-4">
                    <div className="space-y-3 flex-1">
                        {/* Historical Context - Collapsible */}
                        <div className="bg-emerald-500/5 rounded-lg border border-emerald-500/10 transition-all duration-500">
                            <div
                                className="flex items-center gap-2 p-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-lg"
                                onClick={handleContextToggle}
                                onKeyDown={handleKeyDown}
                                role="button"
                                tabIndex={0}
                                aria-expanded={isContextExpanded}
                                aria-controls="historical-context-content"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                                <span className="text-xs font-medium text-emerald-400/80">Historical Context</span>
                                <div
                                    className={cn(
                                        "ml-auto text-emerald-400/60 transition-transform duration-300",
                                        isContextExpanded ? "rotate-180" : "rotate-0"
                                    )}
                                    aria-hidden="true"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            {isContextExpanded && (
                                <div id="historical-context-content" className="px-3 pb-3">
                                    <p className="text-sm text-emerald-300/90 leading-relaxed min-h-[50px]">
                                        {displayedContext}
                                        {displayedContext && displayedContext !== EXAMPLE_MEETINGS[currentMeetingIndex].historicContext && isPageVisible && (
                                            <span className="inline-block w-0.5 h-4 ml-1 bg-emerald-400 animate-pulse" aria-hidden="true" />
                                        )}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Key Discussion Points */}
                        {showKeyPoints && (
                            <div className="bg-emerald-500/5 rounded-lg p-3 border border-emerald-500/10 flex-1 transition-all duration-500">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                                    <span className="text-xs font-medium text-emerald-400/80">Key Discussion Points</span>
                                </div>
                                <ul className="space-y-2 min-h-[80px]" role="list">
                                    {displayedKeyPoints.map((point, index) => (
                                        <li
                                            key={index}
                                            className="text-sm text-emerald-300/80 flex items-start gap-2 leading-relaxed"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-emerald-400/60 shrink-0 mt-2" aria-hidden="true" />
                                            <span className="flex-1">{point}</span>
                                            {index === displayedKeyPoints.length - 1 &&
                                                point !== EXAMPLE_MEETINGS[currentMeetingIndex].keyPoints[index] &&
                                                isPageVisible && (
                                                    <span className="inline-block w-0.5 h-4 ml-1 bg-emerald-400 animate-pulse shrink-0" aria-hidden="true" />
                                                )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 