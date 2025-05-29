'use client'

import React, { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"
import { ToolIcon } from "./tool-icon"
import { 
  SlackIcon, 
  DriveIcon, 
  FirefliesIcon, 
  NotionIcon, 
  PipedriveIcon 
} from "@/components/icons"

interface HeroVisualProps {
  className?: string
}

// Animation timing configuration
const ANIMATION_CONFIG = {
  toolRotation: {
    duration: 30000, // 30 seconds for a full rotation
  },
  notification: {
    duration: 4000, // 4 seconds per notification
    transition: 300, // 300ms transition
  },
  insight: {
    duration: 4000, // 4 seconds per insight
    transition: 300, // 300ms transition
  }
} as const

// Sample notifications
const NOTIFICATIONS = [
  {
    title: "Incoming meeting with Acme",
    description: "We've prepared your brief with latest updates"
  },
  {
    title: "New task assigned",
    description: "Review Q3 sales projections by EOD"
  },
  {
    title: "Deal update",
    description: "Techcorp proposal approved - next steps ready"
  }
] as const

// Sample insights
const INSIGHTS = [
  {
    metric: "+28%",
    label: "Pipeline Growth",
    trend: "up"
  },
  {
    metric: "89%",
    label: "Team Productivity",
    trend: "up"
  },
  {
    metric: "-15%",
    label: "Response Time",
    trend: "down"
  }
] as const

export function HeroVisual({ className }: HeroVisualProps) {
  const [currentNotification, setCurrentNotification] = useState(0)
  const [currentInsight, setCurrentInsight] = useState(0)
  const [showNotification, setShowNotification] = useState(true)
  const [showInsight, setShowInsight] = useState(true)

  useEffect(() => {
    // Rotate notifications
    const notificationInterval = setInterval(() => {
      setShowNotification(false)
      setTimeout(() => {
        setCurrentNotification((prev) => (prev + 1) % NOTIFICATIONS.length)
        setShowNotification(true)
      }, ANIMATION_CONFIG.notification.transition)
    }, ANIMATION_CONFIG.notification.duration)

    // Rotate insights
    const insightInterval = setInterval(() => {
      setShowInsight(false)
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % INSIGHTS.length)
        setShowInsight(true)
      }, ANIMATION_CONFIG.insight.transition)
    }, ANIMATION_CONFIG.insight.duration)

    return () => {
      clearInterval(notificationInterval)
      clearInterval(insightInterval)
    }
  }, [])

  return (
    <div className={cn(
      "relative w-full aspect-square rounded-xl overflow-hidden",
      "bg-black/40 backdrop-blur-3xl border border-primary/10",
      "shadow-[0_0_50px_-12px] shadow-primary/20",
      className
    )}>
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,75,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,75,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Central hub with rotating circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Outer rotating circle with tool icons */}
          <div className="absolute -inset-48 rounded-full border border-[#00FF9D]/10 animate-[spin_30s_linear_infinite]">
            <ToolIcon 
              icon={SlackIcon}
              className="absolute -top-4 left-1/2 -translate-x-1/2 [--rotation:0deg]"
            />
            <ToolIcon 
              icon={DriveIcon}
              className="absolute top-1/2 -right-4 -translate-y-1/2 [--rotation:-90deg]"
            />
            <ToolIcon 
              icon={FirefliesIcon}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 [--rotation:180deg]"
            />
            <ToolIcon 
              icon={NotionIcon}
              className="absolute top-1/2 -left-4 -translate-y-1/2 [--rotation:90deg]"
            />
          </div>

          {/* Inner rotating circle with more tool icons */}
          <div className="absolute -inset-32 rounded-full border border-[#00FF9D]/10 animate-[spin_20s_linear_infinite_reverse]">
            <ToolIcon 
              icon={PipedriveIcon}
              className="absolute -top-4 left-1/2 -translate-x-1/2 [--rotation:0deg]"
            />
          </div>

          {/* Core element */}
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-[#00FF9D]/20 rounded-full blur-xl animate-pulse" />
            <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#00FF9D]/30 to-transparent backdrop-blur-xl border border-[#00FF9D]/20 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#00FF9D]/40 to-[#00FF9D]/10 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#00FF9D] shadow-[0_0_15px] shadow-[#00FF9D]/50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification card */}
      <div className={cn(
        "absolute top-6 right-6 max-w-xs transition-all duration-300 transform",
        showNotification 
          ? "translate-x-0 opacity-100" 
          : "translate-x-full opacity-0"
      )}>
        <div className="p-4 rounded-lg bg-black/40 backdrop-blur-xl border border-[#00FF9D]/10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            <div>
              <p className="text-sm font-medium text-[#00FF9D]">
                {NOTIFICATIONS[currentNotification].title}
              </p>
              <p className="text-xs text-[#00FF9D]/60">
                {NOTIFICATIONS[currentNotification].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insight card */}
      <div className={cn(
        "absolute bottom-6 left-6 transition-all duration-300 transform",
        showInsight 
          ? "translate-y-0 opacity-100" 
          : "translate-y-full opacity-0"
      )}>
        <div className="p-4 rounded-lg bg-black/40 backdrop-blur-xl border border-[#00FF9D]/10">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-2xl font-bold text-[#00FF9D]">
                {INSIGHTS[currentInsight].metric}
              </p>
              <p className="text-sm text-[#00FF9D]/60">
                {INSIGHTS[currentInsight].label}
              </p>
            </div>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              INSIGHTS[currentInsight].trend === "up" 
                ? "bg-emerald-500/20" 
                : "bg-red-500/20"
            )}>
              {INSIGHTS[currentInsight].trend === "up" ? "↑" : "↓"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 