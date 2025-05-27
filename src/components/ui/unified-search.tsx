'use client'

import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { cn } from "@/lib/utils"
import { useInView } from 'react-intersection-observer'
import {
    SlackIcon,
    NotionIcon,
    DriveIcon
} from "@/components/icons"

interface UnifiedSearchProps {
    className?: string
    searchQuery?: string
    responseText?: string
    sourcesCount?: number
}

// Animation constants
const ANIMATION_CONFIG = {
    typing: {
        baseSpeed: 50, // ms per character
        variationRange: 20, // +/- ms for natural variation
    },
    response: {
        baseSpeed: 20, // faster typing for response
        variationRange: 10, // smaller variation for smoother feel
    },
    search: {
        duration: 1000,
        startDelay: 300,
    },
    sources: {
        revealDelay: 200,
        resetDelay: 3000,
    }
} as const

// Memoized source icons for better performance
const SourceIcon = memo(({ index, isVisible }: { index: number; isVisible: boolean }) => {
    const icons = {
        0: <SlackIcon className="w-2.5 h-2.5 text-emerald-500/80" />,
        1: <NotionIcon className="w-2.5 h-2.5 text-emerald-500/80" />,
        2: <DriveIcon className="w-2.5 h-2.5 text-emerald-500/80" />
    }

    return (
        <div 
            className={cn(
                "w-4 h-4 rounded-sm bg-emerald-900/40 flex items-center justify-center transition-all duration-300",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
            role="img"
            aria-hidden="true"
        >
            {icons[index as keyof typeof icons]}
        </div>
    )
})
SourceIcon.displayName = 'SourceIcon'

// Memoized loading dots
const LoadingDots = memo(() => (
    <div className="flex gap-1" role="status" aria-label="Searching">
        {[0, 1, 2].map((i) => (
            <div
                key={i}
                className="w-2 h-2 rounded-full bg-emerald-500/50 animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
            />
        ))}
    </div>
))
LoadingDots.displayName = 'LoadingDots'

export function UnifiedSearch({
    className,
    searchQuery = "Summarize Q2 product updates",
    responseText = "Key updates: New AI workflow automation launched, 3 major integrations added, and user engagement up 40%. Team highlights shared in Slack and full report in Drive. Additional insights show customer satisfaction increased by 35% and development velocity improved by 25% across all teams.",
    sourcesCount = 3
}: UnifiedSearchProps) {
    const [displayedQuery, setDisplayedQuery] = useState("")
    const [displayedResponse, setDisplayedResponse] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [showResponse, setShowResponse] = useState(false)
    const [visibleSources, setVisibleSources] = useState(0)
    
    const timeoutsRef = useRef<NodeJS.Timeout[]>([])
    
    // Use intersection observer for better visibility detection
    const { ref: inViewRef, inView } = useInView({
        threshold: 0.3,
        rootMargin: '100px 0px',
        triggerOnce: false
    })

    const cleanup = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout)
        timeoutsRef.current = []
        setDisplayedQuery("")
        setDisplayedResponse("")
        setIsSearching(false)
        setShowResponse(false)
        setVisibleSources(0)
    }, [])

    // Natural typing simulation with variable speeds
    const typeText = useCallback((
        text: string, 
        setDisplay: (text: string) => void,
        speed: { baseSpeed: number; variationRange: number },
        onComplete?: () => void
    ) => {
        let currentIndex = 0
        
        const typeNextChar = () => {
            if (currentIndex <= text.length) {
                setDisplay(text.slice(0, currentIndex))
                
                if (currentIndex === text.length) {
                    onComplete?.()
                    return
                }

                // Add natural variation to typing speed
                const variation = Math.random() * speed.variationRange * 2 - speed.variationRange
                const delay = speed.baseSpeed + variation

                const timeout = setTimeout(typeNextChar, delay)
                timeoutsRef.current.push(timeout)
                currentIndex++
            }
        }

        typeNextChar()
    }, [])

    const startAnimation = useCallback(() => {
        cleanup()
        
        // Start typing search query
        typeText(
            searchQuery, 
            setDisplayedQuery, 
            ANIMATION_CONFIG.typing,
            () => {
                // Start search after typing
                const searchTimeout = setTimeout(() => {
                    setIsSearching(true)

                    // Show and type response after search
                    const responseTimeout = setTimeout(() => {
                        setIsSearching(false)
                        setShowResponse(true)
                        
                        // Type out response
                        typeText(
                            responseText,
                            setDisplayedResponse,
                            ANIMATION_CONFIG.response,
                            () => {
                                // Reveal sources after response is typed
                                for (let i = 0; i < sourcesCount; i++) {
                                    const sourceTimeout = setTimeout(() => {
                                        setVisibleSources(i + 1)
                                    }, ANIMATION_CONFIG.sources.revealDelay * i)
                                    timeoutsRef.current.push(sourceTimeout)
                                }

                                // Reset after completion
                                const resetTimeout = setTimeout(() => {
                                    startAnimation()
                                }, ANIMATION_CONFIG.sources.resetDelay)
                                timeoutsRef.current.push(resetTimeout)
                            }
                        )
                    }, ANIMATION_CONFIG.search.duration)
                    timeoutsRef.current.push(responseTimeout)
                }, ANIMATION_CONFIG.search.startDelay)
                timeoutsRef.current.push(searchTimeout)
            }
        )
    }, [cleanup, searchQuery, responseText, sourcesCount, typeText])

    // Handle visibility changes
    useEffect(() => {
        if (inView && !document.hidden) {
            startAnimation()
        } else {
            cleanup()
        }
    }, [inView, startAnimation, cleanup])

    // Handle tab visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                cleanup()
            } else if (inView) {
                startAnimation()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            cleanup()
        }
    }, [inView, startAnimation, cleanup])

    return (
        <div 
            ref={inViewRef}
            className={cn(
                "relative w-full h-full bg-[#0C1615] rounded-xl overflow-hidden",
                className
            )}
            role="region"
            aria-label="Unified Search Interface"
        >
            <div className="absolute inset-4 bg-[#070C0B] rounded-lg p-4 flex flex-col h-[calc(100%-2rem)]">
                {/* Search bar */}
                <div 
                    className="flex items-center gap-2 mb-3"
                    role="search"
                    aria-label="Search query"
                >
                    <svg
                        className={cn(
                            "w-4 h-4 text-emerald-500/80 shrink-0",
                            isSearching && "animate-spin"
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <div 
                        className="text-sm text-emerald-500/50 truncate"
                        aria-live="polite"
                    >
                        {displayedQuery}
                        {displayedQuery && !isSearching && !showResponse && (
                            <span 
                                className="inline-block w-1 h-4 ml-0.5 bg-emerald-500/50 animate-pulse"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                </div>

                {/* Response text */}
                <div className="flex-1 mb-4">
                    {showResponse && (
                        <p 
                            className="text-sm text-emerald-500/80 leading-relaxed line-clamp-3"
                            role="status"
                            aria-label="Search results"
                        >
                            {displayedResponse}
                            {displayedResponse && displayedResponse !== responseText && (
                                <span 
                                    className="inline-block w-1 h-4 ml-0.5 bg-emerald-500/50 animate-pulse"
                                    aria-hidden="true"
                                />
                            )}
                        </p>
                    )}
                    {isSearching && <LoadingDots />}
                </div>

                {/* Sources row */}
                <div 
                    className="flex items-center gap-2"
                    role="status"
                    aria-label={`Found in ${visibleSources} sources`}
                >
                    <div className="flex -space-x-1.5">
                        {[0, 1, 2].map((index) => (
                            <SourceIcon 
                                key={index}
                                index={index}
                                isVisible={visibleSources > index}
                            />
                        ))}
                    </div>
                    <span className={cn(
                        "text-[10px] text-emerald-500 transition-all duration-300",
                        visibleSources > 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    )}>
                        {visibleSources} {visibleSources === 1 ? 'source' : 'sources'}
                    </span>
                </div>
            </div>
        </div>
    )
} 