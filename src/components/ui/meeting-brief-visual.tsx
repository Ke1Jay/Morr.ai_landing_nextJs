'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from "@/lib/utils"
import { useInView } from 'react-intersection-observer'
import MorraiLogo from "@/components/icons/morr-ai/morrai-logo"

interface Source {
    id: string
    name: string
    icon: React.ReactNode
    type: 'pipedrive' | 'morrai' | 'calendar' | 'email' | 'slack'
}

interface Meeting {
    id: string
    time: string
    title: string
    isInternal: boolean
    client?: string
    historicContext: string
    keyPoints: string[]
    sources: Source[]
    duration: number // in minutes
}

interface MeetingBriefVisualProps {
    className?: string
}

// Animation constants
const ANIMATION_CONSTANTS = {
    MEETING_DISPLAY_DURATION: 8000,
    TYPING_SPEED: {
        context: 30,
        keyPoints: 20,
    },
    SOURCE_REVEAL_DELAY: 200,
    TRANSITION_DURATION: 500,
    SCROLL_THRESHOLD: 20, // px from bottom to trigger scroll
} as const

// Icon components
const PipedriveIcon: React.FC = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16L16 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const CalendarIcon: React.FC = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
)

const SlackIcon: React.FC = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 10C13.67 10 13 9.33 13 8.5V3.5C13 2.67 13.67 2 14.5 2C15.33 2 16 2.67 16 3.5V8.5C16 9.33 15.33 10 14.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.5 10H14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 14C10.33 14 11 14.67 11 15.5V20.5C11 21.33 10.33 22 9.5 22C8.67 22 8 21.33 8 20.5V15.5C8 14.67 8.67 14 9.5 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.5 14H9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const EmailIcon: React.FC = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M2 8L12 14L22 8" stroke="currentColor" strokeWidth="2"/>
    </svg>
)

// Complete example meetings data
const EXAMPLE_MEETINGS: Meeting[] = [
    {
        id: '1',
        time: '09:00',
        title: 'Product Demo',
        isInternal: false,
        client: 'TechCorp Solutions',
        historicContext: 'Previous demo focused on AI capabilities. Team showed high interest in automation features.',
        keyPoints: [
            'Demo new workflow automation',
            'Address security questions from last call',
            'Discuss enterprise pricing options'
        ],
        sources: [
            { id: '1', name: 'PipeDrive', icon: <PipedriveIcon />, type: 'pipedrive' },
            { id: '2', name: 'Morr.ai', icon: <MorraiLogo className="w-3 h-3" />, type: 'morrai' },
            { id: '3', name: 'Calendar', icon: <CalendarIcon />, type: 'calendar' }
        ],
        duration: 60
    },
    {
        id: '2',
        time: '10:30',
        title: 'Team Standup',
        isInternal: true,
        historicContext: 'Sprint planning completed yesterday. New feature rollout starting this week.',
        keyPoints: [
            'Review sprint goals',
            'Discuss blockers',
            'Update on client feedback'
        ],
        sources: [
            { id: '1', name: 'Slack', icon: <SlackIcon />, type: 'slack' },
            { id: '2', name: 'Calendar', icon: <CalendarIcon />, type: 'calendar' }
        ],
        duration: 30
    },
    {
        id: '3',
        time: '13:00',
        title: 'Integration Planning',
        isInternal: false,
        client: 'DataFlow Inc',
        historicContext: 'Currently using legacy system. Need seamless transition to our platform within 2 months.',
        keyPoints: [
            'Review integration timeline',
            'Discuss data migration strategy',
            'Set up weekly checkpoints'
        ],
        sources: [
            { id: '1', name: 'PipeDrive', icon: <PipedriveIcon />, type: 'pipedrive' },
            { id: '2', name: 'Email', icon: <EmailIcon />, type: 'email' },
            { id: '3', name: 'Morr.ai', icon: <MorraiLogo className="w-3 h-3" />, type: 'morrai' }
        ],
        duration: 45
    },
    {
        id: '4',
        time: '15:30',
        title: 'Quarterly Review',
        isInternal: false,
        client: 'InnovateTech',
        historicContext: 'Strong Q1 performance. Looking to expand usage across more teams.',
        keyPoints: [
            'Present Q1 success metrics',
            'Propose expansion plan',
            'Schedule team training sessions'
        ],
        sources: [
            { id: '1', name: 'PipeDrive', icon: <PipedriveIcon />, type: 'pipedrive' },
            { id: '2', name: 'Morr.ai', icon: <MorraiLogo className="w-3 h-3" />, type: 'morrai' },
            { id: '3', name: 'Email', icon: <EmailIcon />, type: 'email' }
        ],
        duration: 90
    },
    {
        id: '5',
        time: '17:00',
        title: 'Security Review',
        isInternal: false,
        client: 'SecureBank Global',
        historicContext: 'Completed initial security assessment. Addressing final compliance requirements.',
        keyPoints: [
            'Review security audit results',
            'Present compliance documentation',
            'Discuss implementation timeline'
        ],
        sources: [
            { id: '1', name: 'PipeDrive', icon: <PipedriveIcon />, type: 'pipedrive' },
            { id: '2', name: 'Morr.ai', icon: <MorraiLogo className="w-3 h-3" />, type: 'morrai' },
            { id: '3', name: 'Calendar', icon: <CalendarIcon />, type: 'calendar' }
        ],
        duration: 60
    }
]

// Helper function to calculate end time
function calculateEndTime(startTime: string, durationMinutes: number): string {
    const [hours, minutes] = startTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + durationMinutes
    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
}

export function MeetingBriefVisual({ className }: MeetingBriefVisualProps) {
    const [currentMeetingIndex, setCurrentMeetingIndex] = useState(0)
    const [displayedContext, setDisplayedContext] = useState("")
    const [displayedKeyPoints, setDisplayedKeyPoints] = useState<string[]>([])
    const [visibleSources, setVisibleSources] = useState(0)
    const [scrollOffset, setScrollOffset] = useState(0)
    const timeoutsRef = useRef<NodeJS.Timeout[]>([])
    const contentRef = useRef<HTMLDivElement>(null)
    
    const { ref: inViewRef, inView } = useInView({
        threshold: 0.3,
        triggerOnce: false
    })

    // Pre-calculate all meeting positions
    const MEETING_HEIGHT = 33 // pixels between each meeting

    const meetings = EXAMPLE_MEETINGS.map((meeting, index) => ({
        meeting,
        translateY: MEETING_HEIGHT * index,
        isCurrent: index === currentMeetingIndex,
        isNext: index === currentMeetingIndex + 1
    }))

    const typeText = useCallback((
        text: string,
        setDisplay: (text: string) => void,
        speed: number,
        onComplete?: () => void
    ) => {
        let currentIndex = 0
        const typeNextChar = () => {
            if (currentIndex <= text.length) {
                setDisplay(text.slice(0, currentIndex))
                
                // Schedule scroll check after state update
                setTimeout(checkAndScroll, 0)
                
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

    const typeKeyPoints = useCallback((
        points: string[],
        onComplete?: () => void
    ) => {
        let currentPointIndex = 0
        let currentCharIndex = 0
        
        const typeNextChar = () => {
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

            // Schedule scroll check after state update
            setTimeout(checkAndScroll, 0)

            currentCharIndex++
            const timeout = setTimeout(typeNextChar, ANIMATION_CONSTANTS.TYPING_SPEED.keyPoints)
            timeoutsRef.current.push(timeout)
        }

        typeNextChar()
    }, [])

    // Function to check if we should scroll and do it smoothly
    const checkAndScroll = useCallback(() => {
        if (contentRef.current) {
            const { scrollHeight, clientHeight, scrollTop } = contentRef.current
            const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)
            
            if (distanceFromBottom > 0) {
                contentRef.current.scrollTo({
                    top: scrollHeight - clientHeight,
                    behavior: 'smooth'
                })
            }
        }
    }, [])

    const startMeetingAnimation = useCallback(() => {
        const currentMeeting = EXAMPLE_MEETINGS[currentMeetingIndex]
        setVisibleSources(0)
        setDisplayedKeyPoints([])
        setDisplayedContext("")
        
        typeText(
            currentMeeting.historicContext,
            setDisplayedContext,
            ANIMATION_CONSTANTS.TYPING_SPEED.context,
            () => {
                typeKeyPoints(currentMeeting.keyPoints, () => {
                    currentMeeting.sources.forEach((_, index) => {
                        const timeout = setTimeout(() => {
                            setVisibleSources(index + 1)
                        }, ANIMATION_CONSTANTS.SOURCE_REVEAL_DELAY * index)
                        timeoutsRef.current.push(timeout)
                    })

                    // Only schedule next meeting if not at the last meeting
                    if (currentMeetingIndex < EXAMPLE_MEETINGS.length - 1) {
                        const timeout = setTimeout(() => {
                            setScrollOffset(prev => prev - MEETING_HEIGHT)
                            
                            setTimeout(() => {
                                setCurrentMeetingIndex(prev => prev + 1)
                            }, ANIMATION_CONSTANTS.TRANSITION_DURATION)
                        }, ANIMATION_CONSTANTS.MEETING_DISPLAY_DURATION)
                        timeoutsRef.current.push(timeout)
                    }
                })
            }
        )
    }, [currentMeetingIndex])

    useEffect(() => {
        if (inView) {
            startMeetingAnimation()
        }
    }, [inView, currentMeetingIndex, startMeetingAnimation])

    return (
        <div 
            ref={inViewRef}
            className={cn(
                "relative w-full h-[280px]",
                "bg-black/40 rounded-lg p-6",
                "flex flex-col",
                "overflow-hidden",
                className
            )}
        >
            {/* Timeline - Fixed height section */}
            <div className="relative h-[66px] mb-4 overflow-hidden"> {/* Reduced height to show only 2 meetings */}
                {/* Timeline line that connects all meetings */}
                <div 
                    className="absolute left-[180px] top-0 bottom-0 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateY(${scrollOffset}px)` }}
                >
                    <svg
                        width="2"
                        height={MEETING_HEIGHT * EXAMPLE_MEETINGS.length}
                        viewBox={`0 0 2 ${MEETING_HEIGHT * EXAMPLE_MEETINGS.length}`}
                        preserveAspectRatio="none"
                        className="w-[2px]"
                    >
                        <path
                            d={`M1 0 L1 ${MEETING_HEIGHT * EXAMPLE_MEETINGS.length}`}
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary/10"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                
                {/* Meetings container */}
                <div 
                    className="absolute inset-0 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateY(${scrollOffset}px)` }}
                >
                    {meetings.map(({ meeting, translateY, isCurrent, isNext }) => {
                        if (!isCurrent && !isNext) return null;
                        
                        const endTime = calculateEndTime(meeting.time, meeting.duration)
                        
                        return (
                            <div
                                key={meeting.id}
                                className={cn(
                                    "absolute w-full flex items-center gap-4",
                                    "transition-all duration-500",
                                    !isCurrent && "opacity-50"
                                )}
                                style={{ transform: `translateY(${translateY}px)` }}
                            >
                                <div 
                                    className={cn(
                                        "w-[180px] flex items-center gap-2 transition-all duration-500",
                                        isCurrent
                                            ? "text-sm font-medium text-primary"
                                            : "text-xs text-muted-foreground/60"
                                    )}
                                >
                                    <span>{meeting.time}</span>
                                    <span className="text-primary/30">→</span>
                                    <span>{endTime}</span>
                                    <span className="text-xs text-primary/30">({meeting.duration}min)</span>
                                </div>
                                <div className="relative flex items-center gap-3 flex-1">
                                    <div 
                                        className={cn(
                                            "rounded-full transition-all duration-500",
                                            isCurrent
                                                ? "w-3 h-3 bg-primary animate-pulse"
                                                : "w-2 h-2 bg-primary/30"
                                        )}
                                    />
                                    <div 
                                        className={cn(
                                            "text-sm transition-all duration-500",
                                            isCurrent
                                                ? "font-medium text-primary"
                                                : "text-muted-foreground/60"
                                        )}
                                    >
                                        {meeting.title}
                                        <span 
                                            className={cn(
                                                "text-xs ml-2 transition-all duration-500",
                                                isCurrent
                                                    ? "text-primary/70"
                                                    : "opacity-60"
                                            )}
                                        >
                                            {meeting.isInternal ? "Internal" : meeting.client}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Brief content section */}
            <div className="relative h-[174px]">
                {/* Sources section */}
                <div className="absolute bottom-0 left-0 right-6">
                    <div className="flex items-center gap-2 h-6 mb-1">
                        <div className="flex -space-x-1">
                            {EXAMPLE_MEETINGS[currentMeetingIndex].sources.map((source, index) => (
                                <div
                                    key={source.id}
                                    className={cn(
                                        "w-4 h-4 rounded-sm bg-primary/10 flex items-center justify-center",
                                        "text-primary/80 transition-all duration-300",
                                        index < visibleSources
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-2"
                                    )}
                                    title={source.name}
                                >
                                    {source.icon}
                                </div>
                            ))}
                        </div>
                        <span className={cn(
                            "text-xs text-primary/60 transition-all duration-300",
                            visibleSources > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        )}>
                            {visibleSources} sources
                        </span>
                    </div>
                </div>

                {/* Content area */}
                <div className="space-y-4 pr-6">
                    <p className="text-sm text-muted-foreground/80 min-h-[48px]">
                        {displayedContext}
                        {displayedContext && displayedContext !== EXAMPLE_MEETINGS[currentMeetingIndex].historicContext && (
                            <span className="inline-block w-1 h-4 ml-0.5 bg-primary/50 animate-pulse" />
                        )}
                    </p>
                    <ul className="space-y-2 min-h-[72px]">
                        {displayedKeyPoints.map((point, index) => (
                            <li 
                                key={index}
                                className="text-xs text-muted-foreground/70 flex items-center gap-2"
                            >
                                <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                                <span>{point}</span>
                                {index === displayedKeyPoints.length - 1 && 
                                 point !== EXAMPLE_MEETINGS[currentMeetingIndex].keyPoints[index] && (
                                    <span className="inline-block w-1 h-4 ml-0.5 bg-primary/50 animate-pulse shrink-0" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
} 