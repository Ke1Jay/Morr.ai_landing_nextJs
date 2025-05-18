'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils"
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

const TYPING_SPEED = 50 // ms per character
const SEARCH_DURATION = 1000 // ms to simulate search
const SOURCE_REVEAL_DELAY = 200 // ms between each source reveal

export function UnifiedSearch({
    className,
    searchQuery = "Summarize Q2 product updates",
    responseText = "Key updates: New AI workflow automation launched, 3 major integrations added, and user engagement up 40%. Team highlights shared in Slack and full report in Drive.",
    sourcesCount = 3
}: UnifiedSearchProps) {
    const [displayedQuery, setDisplayedQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [showResponse, setShowResponse] = useState(false)
    const [visibleSources, setVisibleSources] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<{
        timeouts: ReturnType<typeof setTimeout>[];
    }>({
        timeouts: []
    })

    const cleanup = () => {
        animationRef.current.timeouts.forEach(clearTimeout)
        animationRef.current.timeouts = []
        setDisplayedQuery("")
        setIsSearching(false)
        setShowResponse(false)
        setVisibleSources(0)
        setIsAnimating(false)
    }

    const startAnimation = async () => {
        if (isAnimating) return
        setIsAnimating(true)
        cleanup()

        // Type out the search query
        for (let i = 0; i <= searchQuery.length; i++) {
            const timeout = setTimeout(() => {
                setDisplayedQuery(searchQuery.slice(0, i))
                
                // When typing is done, start search
                if (i === searchQuery.length) {
                    const searchTimeout = setTimeout(() => {
                        setIsSearching(true)
                        
                        // After search duration, show response
                        const responseTimeout = setTimeout(() => {
                            setIsSearching(false)
                            setShowResponse(true)
                            
                            // Reveal sources one by one
                            for (let j = 0; j < sourcesCount; j++) {
                                const sourceTimeout = setTimeout(() => {
                                    setVisibleSources(j + 1)
                                }, SOURCE_REVEAL_DELAY * j)
                                animationRef.current.timeouts.push(sourceTimeout)
                            }

                            // Reset after completion
                            const resetTimeout = setTimeout(() => {
                                setIsAnimating(false)
                                startAnimation()
                            }, 3000)
                            animationRef.current.timeouts.push(resetTimeout)
                        }, SEARCH_DURATION)
                        animationRef.current.timeouts.push(responseTimeout)
                    }, 300)
                    animationRef.current.timeouts.push(searchTimeout)
                }
            }, i * TYPING_SPEED)
            animationRef.current.timeouts.push(timeout)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !document.hidden) {
                        startAnimation()
                    } else {
                        cleanup()
                    }
                })
            },
            { 
                threshold: 0.3,
                rootMargin: '100px 0px'
            }
        )

        if (componentRef.current) {
            observer.observe(componentRef.current)
            
            // Check initial visibility
            const boundingRect = componentRef.current.getBoundingClientRect()
            const isInitiallyVisible = boundingRect.top < window.innerHeight && boundingRect.bottom > 0
            if (isInitiallyVisible && !document.hidden) {
                startAnimation()
            }
        }

        return () => {
            cleanup()
            observer.disconnect()
        }
    }, [])

    return (
        <div 
            ref={componentRef}
            className={cn(
                "relative w-full h-full bg-[#0C1615] rounded-xl overflow-hidden",
                className
            )}
        >
            {/* Inner container with darker background */}
            <div className="absolute inset-4 bg-[#070C0B] rounded-lg p-4 flex flex-col h-[calc(100%-2rem)]">
                {/* Search bar */}
                <div className="flex items-center gap-2 mb-3">
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
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <div className="text-sm text-emerald-500/50 truncate">
                        {displayedQuery}
                        {displayedQuery && !isSearching && !showResponse && (
                            <span className="inline-block w-1 h-4 ml-0.5 bg-emerald-500/50 animate-pulse" />
                        )}
                    </div>
                </div>

                {/* Response text */}
                <div className="flex-1 mb-4">
                    {showResponse && (
                        <p className="text-sm text-emerald-500/80 leading-relaxed line-clamp-2 animate-fade-in">
                            {responseText}
                        </p>
                    )}
                    {isSearching && (
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    )}
                </div>

                {/* Sources row */}
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                        <div className={cn(
                            "w-4 h-4 rounded-sm bg-emerald-900/40 flex items-center justify-center transition-all duration-300",
                            visibleSources >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        )}>
                            <SlackIcon className="w-2.5 h-2.5 text-emerald-500/80" />
                        </div>
                        <div className={cn(
                            "w-4 h-4 rounded-sm bg-emerald-900/40 flex items-center justify-center transition-all duration-300",
                            visibleSources >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        )}>
                            <NotionIcon className="w-2.5 h-2.5 text-emerald-500/80" />
                        </div>
                        <div className={cn(
                            "w-4 h-4 rounded-sm bg-emerald-900/40 flex items-center justify-center transition-all duration-300",
                            visibleSources >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        )}>
                            <DriveIcon className="w-2.5 h-2.5 text-emerald-500/80" />
                        </div>
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