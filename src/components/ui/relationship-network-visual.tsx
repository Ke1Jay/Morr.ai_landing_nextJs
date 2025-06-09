import React from 'react'

interface RelationshipNetworkVisualProps {
    className?: string
}

export function RelationshipNetworkVisual({ className }: RelationshipNetworkVisualProps) {
    return (
        <div className={`relative w-full h-28 bg-gradient-to-br from-primary/5 to-transparent rounded-lg flex items-center justify-center overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_70%)]" />
            <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10" />
                <div className="w-[1px] h-6 bg-primary/20" />
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10" />
                </div>
                <div className="w-[1px] h-6 bg-primary/20" />
                <div className="w-12 h-12 rounded-full bg-primary/10" />
            </div>
        </div>
    )
} 