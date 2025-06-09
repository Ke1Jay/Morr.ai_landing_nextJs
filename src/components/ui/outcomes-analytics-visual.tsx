import React from 'react'

interface OutcomesAnalyticsVisualProps {
    className?: string
}

export function OutcomesAnalyticsVisual({ className }: OutcomesAnalyticsVisualProps) {
    return (
        <div className={`relative w-full h-28 bg-gradient-to-br from-primary/5 to-transparent rounded-lg flex items-center justify-center overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_70%)]" />
            <div className="grid grid-cols-3 gap-2 px-4 w-full">
                <div className="h-16 bg-primary/5 rounded-md flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 mb-2" />
                    <div className="w-12 h-2 bg-primary/10 rounded-full" />
                </div>
                <div className="h-16 bg-primary/10 rounded-md flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 mb-2" />
                    <div className="w-12 h-2 bg-primary/20 rounded-full" />
                </div>
                <div className="h-16 bg-primary/5 rounded-md flex flex-col items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 mb-2" />
                    <div className="w-12 h-2 bg-primary/10 rounded-full" />
                </div>
            </div>
        </div>
    )
} 