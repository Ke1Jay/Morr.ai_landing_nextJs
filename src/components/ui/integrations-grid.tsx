import React from 'react'
import { cn } from "@/lib/utils"
import {
    SlackIcon,
    NotionIcon,
    DriveIcon,
    SalesforceIcon,
    HubSpotIcon,
    PipedriveIcon
} from "@/components/icons"

interface IntegrationsGridProps {
    className?: string
    showConnectionIndicator?: boolean
}

export function IntegrationsGrid({
    className,
    showConnectionIndicator = true
}: IntegrationsGridProps) {
    return (
        <div className={cn(
            "relative w-full bg-[#0C1615] rounded-xl p-6",
            className
        )}>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-900/30 p-3 transition-colors hover:bg-emerald-900/40">
                    <SlackIcon className="w-full h-full text-emerald-500/80" />
                </div>
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-900/30 p-3 transition-colors hover:bg-emerald-900/40">
                    <NotionIcon className="w-full h-full text-emerald-500/80" />
                </div>
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-900/30 p-3 transition-colors hover:bg-emerald-900/40">
                    <DriveIcon className="w-full h-full text-emerald-500/80" />
                </div>
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-900/30 p-3 transition-colors hover:bg-emerald-900/40">
                    <SalesforceIcon className="w-full h-full text-emerald-500/80" />
                </div>
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-900/30 p-3 transition-colors hover:bg-emerald-900/40">
                    <HubSpotIcon className="w-full h-full text-emerald-500/80" />
                </div>
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-900/30 p-3 transition-colors hover:bg-emerald-900/40">
                    <PipedriveIcon className="w-full h-full text-emerald-500/80" />
                </div>
            </div>

            {showConnectionIndicator && (
                <div className="absolute bottom-4 right-4">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 absolute inset-0" />
                </div>
            )}
        </div>
    )
} 