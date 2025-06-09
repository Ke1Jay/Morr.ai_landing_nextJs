import React from 'react'

interface AutomationWorkflowVisualProps {
    className?: string
}

export function AutomationWorkflowVisual({ className }: AutomationWorkflowVisualProps) {
    return (
        <div className={`relative w-full h-28 bg-gradient-to-br from-primary/5 to-transparent rounded-lg flex items-center justify-center overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_70%)]" />
            <div className="flex items-center justify-between px-6 w-full">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-md bg-primary/20" />
                </div>
                <div className="w-20 h-[1px] bg-primary/20" />
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-md bg-primary/20" />
                </div>
                <div className="w-20 h-[1px] bg-primary/20" />
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-md bg-primary/20" />
                </div>
            </div>
        </div>
    )
} 