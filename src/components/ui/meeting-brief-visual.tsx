import React from 'react'

interface MeetingBriefVisualProps {
    className?: string
}

export function MeetingBriefVisual({ className }: MeetingBriefVisualProps) {
    return (
        <div className={`relative w-full h-28 bg-gradient-to-br from-primary/5 to-transparent rounded-lg flex items-center justify-center overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_70%)]" />
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-primary/10 animate-pulse" />
            <div className="absolute top-8 left-20 w-[120px] h-3 rounded-full bg-primary/10" />
            <div className="absolute top-16 left-20 w-[80px] h-3 rounded-full bg-primary/10" />
            <div className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-primary/10" />
            </div>
        </div>
    )
} 