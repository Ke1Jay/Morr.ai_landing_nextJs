import React from 'react'
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

export function UnifiedSearch({
    className,
    searchQuery = "Summarize Q2 product updates",
    responseText = "Key updates: New AI workflow automation launched, 3 major integrations added, and user engagement up 40%. Team highlights shared in Slack and full report in Drive.",
    sourcesCount = 3
}: UnifiedSearchProps) {
    return (
        <div className={cn(
            "relative w-full h-full bg-[#0C1615] rounded-xl overflow-hidden",
            className
        )}>
            {/* Inner container with darker background */}
            <div className="absolute inset-4 bg-[#070C0B] rounded-lg p-4 flex flex-col h-[calc(100%-2rem)]">
                {/* Search bar */}
                <div className="flex items-center gap-2 mb-3">
                    <svg
                        className="w-4 h-4 text-emerald-500/80 shrink-0"
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
                    <div className="text-sm text-emerald-500/50 truncate">{searchQuery}</div>
                </div>

                {/* Response text */}
                <div className="flex-1 mb-4">
                    <p className="text-sm text-emerald-500/80 leading-relaxed line-clamp-2">
                        {responseText}
                    </p>
                </div>

                {/* Sources row */}
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                        <div className="w-4 h-4 rounded-sm bg-emerald-900/40 flex items-center justify-center">
                            <SlackIcon className="w-2.5 h-2.5 text-emerald-500/80" />
                        </div>
                        <div className="w-4 h-4 rounded-sm bg-emerald-900/40 flex items-center justify-center">
                            <NotionIcon className="w-2.5 h-2.5 text-emerald-500/80" />
                        </div>
                        <div className="w-4 h-4 rounded-sm bg-emerald-900/40 flex items-center justify-center">
                            <DriveIcon className="w-2.5 h-2.5 text-emerald-500/80" />
                        </div>
                    </div>
                    <span className="text-[10px] text-emerald-500">{sourcesCount} sources</span>
                </div>
            </div>
        </div>
    )
} 