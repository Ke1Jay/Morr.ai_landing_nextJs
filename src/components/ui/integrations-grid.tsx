'use client'

import React, { useState, useEffect, useCallback, memo } from 'react'
import { cn } from "@/lib/utils"
import { useInView } from 'react-intersection-observer'
import {
    SlackIcon,
    NotionIcon,
    DriveIcon,
    PipedriveIcon,
    FirefliesIcon,
    GmailIcon,
    OutlookIcon,
    Microsoft365Icon
} from "@/components/icons"

interface IntegrationsGridProps {
    className?: string
}

interface Integration {
    readonly Icon: React.ComponentType<{ className?: string }>
    readonly name: string
    readonly status: IntegrationStatus
}

type IntegrationStatus = 'active' | 'in-development'

// Animation configuration
const ANIMATION_CONFIG = {
    stagger: {
        delay: 75,
    },
    transition: {
        duration: 600,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
} as const

// Integration data
const INTEGRATIONS: readonly Integration[] = [
    { Icon: PipedriveIcon, name: 'Pipedrive', status: 'active' },
    { Icon: FirefliesIcon, name: 'Fireflies', status: 'active' },
    { Icon: SlackIcon, name: 'Slack', status: 'in-development' },
    { Icon: NotionIcon, name: 'Notion', status: 'in-development' },
    { Icon: DriveIcon, name: 'Google Drive', status: 'in-development' },
    { Icon: GmailIcon, name: 'Gmail', status: 'in-development' },
    { Icon: OutlookIcon, name: 'Outlook', status: 'in-development' },
    { Icon: Microsoft365Icon, name: 'Microsoft 365', status: 'in-development' }
] as const

const STATUS_STYLES = {
    active: {
        icon: "text-emerald-500/80",
        dot: {
            bg: "bg-emerald-500",
            ping: "bg-emerald-500/30"
        }
    },
    'in-development': {
        icon: "text-yellow-500/60",
        dot: {
            bg: "bg-yellow-500",
            ping: "bg-yellow-500/30"
        }
    }
} as const

interface IntegrationIconProps {
    Icon: React.ComponentType<{ className?: string }>
    name: string
    status: IntegrationStatus
    index: number
    isVisible: boolean
    shouldAnimate: boolean
}

// Status indicator component
const StatusDot = memo(({ status }: { status: IntegrationStatus }) => (
    <div className="absolute -top-1 -right-1">
        {status === 'active' ? (
            <div className="relative w-2.5 h-2.5">
                <div className={cn(
                    "absolute w-full h-full rounded-full animate-ping",
                    STATUS_STYLES[status].dot.ping
                )} />
                <div className={cn(
                    "absolute w-full h-full rounded-full",
                    STATUS_STYLES[status].dot.bg
                )} />
            </div>
        ) : (
            <div className={cn(
                "w-2.5 h-2.5 rounded-full animate-pulse",
                STATUS_STYLES[status].dot.bg
            )} />
        )}
    </div>
))
StatusDot.displayName = 'StatusDot'

// Integration icon component
const IntegrationIcon = memo(({ 
    Icon, 
    name,
    status,
    index, 
    isVisible,
    shouldAnimate
}: IntegrationIconProps) => {
    const transitionStyles = shouldAnimate ? {
        transitionProperty: 'transform, opacity, background-color, box-shadow',
        transitionDuration: `${ANIMATION_CONFIG.transition.duration}ms`,
        transitionTimingFunction: ANIMATION_CONFIG.transition.easing,
        transitionDelay: isVisible ? `${index * ANIMATION_CONFIG.stagger.delay}ms` : '0ms'
    } : {
        transitionProperty: 'none'
    }

    return (
        <div 
            className={cn(
                "relative flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-900/30 p-3",
                "hover:rotate-2 hover:scale-110 hover:bg-emerald-900/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]",
                status === 'active' && "animate-subtle-pulse"
            )}
            style={{ 
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                opacity: isVisible ? 1 : 0,
                ...transitionStyles
            }}
            role="img"
            aria-label={`${name} integration - ${status}`}
        >
            <Icon className={cn(
                "w-full h-full",
                STATUS_STYLES[status].icon
            )} />
            <StatusDot status={status} />
        </div>
    )
})
IntegrationIcon.displayName = 'IntegrationIcon'

export function IntegrationsGrid({ className }: IntegrationsGridProps) {
    const [isAnimating, setIsAnimating] = useState(false)
    const [shouldAnimate, setShouldAnimate] = useState(false)
    
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: false,
        rootMargin: '100px 0px'
    })

    const resetAnimation = useCallback(() => {
        setIsAnimating(false)
        setShouldAnimate(false)
    }, [])

    // Handle visibility changes
    useEffect(() => {
        let timeoutId: NodeJS.Timeout

        if (inView && !document.hidden) {
            setShouldAnimate(true)
            timeoutId = setTimeout(() => {
                setIsAnimating(true)
            }, 50)
        } else {
            resetAnimation()
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [inView, resetAnimation])

    // Handle tab visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                resetAnimation()
            } else if (inView) {
                setShouldAnimate(true)
                setIsAnimating(true)
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            resetAnimation()
        }
    }, [inView, resetAnimation])

    return (
        <div 
            ref={ref}
            className={cn(
                "relative w-full h-full bg-[#0C1615] rounded-xl overflow-hidden",
                className
            )}
            role="region"
            aria-label="Integration Grid"
        >
            <div className="absolute inset-4 rounded-lg p-6 flex items-center justify-center">
                <div className="w-full grid grid-cols-4 gap-4 place-items-center max-w-[600px] mx-auto">
                    {INTEGRATIONS.map(({ Icon, name, status }, index) => (
                        <IntegrationIcon
                            key={name}
                            Icon={Icon}
                            name={name}
                            status={status}
                            index={index}
                            isVisible={isAnimating}
                            shouldAnimate={shouldAnimate}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
} 