'use client'

import React, { useState, useEffect, useCallback, memo } from 'react'
import { cn } from "@/lib/utils"

// Types
interface WorkflowStep {
  title: string
  description: string
}

interface WorkflowStepsProps {
  className?: string
  steps?: WorkflowStep[]
  cycleTime?: number
  stepDuration?: number
}

interface StepCircleProps {
  index: number
  currentStep: number
  activeStep: number
  enableTransitions: boolean
}

interface ConnectorLineProps {
  progress: number
  enableTransitions: boolean
  label: string
}

// Constants
const DEFAULT_STEPS: WorkflowStep[] = [
  {
    title: "Gather Context",
    description: "Syncs recent emails, chats, and CRM data"
  },
  {
    title: "Prepare Brief",
    description: "Generates smart meeting summary and action items"
  },
  {
    title: "Deliver Insights",
    description: "Proactively shares brief with recommended actions"
  }
]

const ANIMATION_SETTINGS = {
  LINE_INCREMENT: 1,
  LINE_INTERVAL: 10,
  TEXT_FADE_DURATION: 300,
  COMPLETION_RESET_DELAY: 1000,
  NEXT_STEP_DELAY: 300,
} as const

const PROCESS_LABELS = [
  "Syncing data...",
  "Processing..."
] as const

// Components
const CheckmarkIcon = memo(function CheckmarkIcon() {
  return (
    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
})

const ProcessingDot = memo(function ProcessingDot() {
  return <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
})

const StepCircle = memo(function StepCircle({ 
  index, 
  currentStep,
  activeStep,
  enableTransitions 
}: StepCircleProps) {
  const isCompleted = index < currentStep
  const isActive = index === activeStep && index === currentStep
  const isHighlighted = index <= currentStep

  return (
    <div className="relative">
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center",
        enableTransitions && "transition-colors duration-300",
        isHighlighted ? "bg-emerald-500/20" : "bg-emerald-900/30"
      )}>
        {isCompleted && <CheckmarkIcon />}
        {isActive && <ProcessingDot />}
      </div>
      <div className={cn(
        "absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full",
        enableTransitions && "transition-colors duration-300",
        isHighlighted ? "bg-emerald-500" : "bg-emerald-900/50",
        isActive && "animate-pulse"
      )} />
    </div>
  )
})

const ProcessLabel = memo(function ProcessLabel({
  label,
  progress,
  isActive
}: {
  label: string
  progress: number
  isActive: boolean
}) {
  return (
    <div 
      className={cn(
        "absolute left-1/2 -translate-x-1/2 -bottom-9",
        "transition-all duration-300 transform origin-top",
        "w-24",
        isActive && progress > 0 
          ? "opacity-100 scale-100" 
          : "opacity-0 scale-95"
      )}
    >
      <div className="relative flex justify-center">
        {/* Tooltip arrow */}
        <div className="absolute -top-1 w-2 h-2 bg-[#132421] rotate-45 border-t border-l border-emerald-500/20" />
        
        {/* Tooltip content */}
        <div className={cn(
          "relative px-2.5 py-1.5 rounded-md",
          "bg-[#132421] border border-emerald-500/20",
          "shadow-lg shadow-emerald-500/5",
          "min-w-full text-center"
        )}>
          <div className="flex items-center justify-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-medium tracking-wide text-emerald-500/90 whitespace-nowrap">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
})

const ConnectorLine = memo(function ConnectorLine({ 
  progress, 
  enableTransitions,
  label,
  isActive
}: ConnectorLineProps & { isActive: boolean }) {
  return (
    <div className="flex-1 mx-2 relative">
      <div className="h-[2px] bg-emerald-900/30 relative overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 bg-emerald-500 origin-left",
            enableTransitions && "transition-transform duration-1000 ease-in-out"
          )}
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
      <ProcessLabel
        label={label}
        progress={progress}
        isActive={isActive}
      />
    </div>
  )
})

const CompletionMessage = memo(function CompletionMessage() {
  return (
    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
      <CheckmarkIcon />
    </div>
  )
})

// Main component
export function WorkflowSteps({ 
  className,
  steps = DEFAULT_STEPS,
  cycleTime = 13000,
  stepDuration = 3000
}: WorkflowStepsProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [showText, setShowText] = useState(true)
  const [lineProgress, setLineProgress] = useState<number[]>([0, 0])
  const [showCompletion, setShowCompletion] = useState(false)
  const [enableTransitions, setEnableTransitions] = useState(true)
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null)

  const resetWorkflow = useCallback(() => {
    setEnableTransitions(false)
    setCurrentStep(0)
    setActiveStep(0)
    setLineProgress([0, 0])
    setShowText(true)
    setActiveLineIndex(null)
  }, [])

  const animateLine = useCallback((lineIndex: number): Promise<void> => {
    return new Promise((resolve) => {
      setActiveLineIndex(lineIndex)
      let progress = 0
      const interval = setInterval(() => {
        progress += ANIMATION_SETTINGS.LINE_INCREMENT
        setLineProgress(prev => 
          prev.map((val, i) => i === lineIndex ? Math.min(progress, 100) : val)
        )
        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setActiveLineIndex(null)
            resolve()
          }, 300) // Brief delay before hiding the label
        }
      }, ANIMATION_SETTINGS.LINE_INTERVAL)
    })
  }, [])

  useEffect(() => {
    if (!steps.length) return

    const animateStep = async (index: number, startTime: number) => {
      if (index === 0) return

      setTimeout(() => {
        setCurrentStep(index)
        
        setTimeout(async () => {
          setShowText(false)
          await new Promise(resolve => setTimeout(resolve, ANIMATION_SETTINGS.TEXT_FADE_DURATION))
          await animateLine(index - 1)
          setActiveStep(index)
          setShowText(true)
        }, ANIMATION_SETTINGS.NEXT_STEP_DELAY)
      }, startTime)
    }

    const animationCycle = () => {
      setEnableTransitions(true)
      resetWorkflow()
      setShowCompletion(false)

      steps.forEach((_, index) => {
        animateStep(index, index * stepDuration)
      })

      setTimeout(() => {
        setShowCompletion(true)
        setTimeout(resetWorkflow, ANIMATION_SETTINGS.COMPLETION_RESET_DELAY)
      }, steps.length * stepDuration)
    }

    animationCycle()
    const interval = setInterval(animationCycle, cycleTime)
    return () => clearInterval(interval)
  }, [steps, cycleTime, stepDuration, resetWorkflow, animateLine])

  return (
    <div className={cn(
      "relative w-full h-full bg-[#0C1615] rounded-xl p-6",
      className
    )}>
      <div className="flex flex-col h-full">
        <div className={cn(
          showCompletion ? "opacity-0" : "opacity-100",
          enableTransitions ? "transition-all duration-500" : "transition-none"
        )}>
          <div className="flex items-center justify-between mb-4">
            {steps.map((_, index) => (
              <React.Fragment key={index}>
                <StepCircle 
                  index={index}
                  currentStep={currentStep}
                  activeStep={activeStep}
                  enableTransitions={enableTransitions}
                />
                {index < steps.length - 1 && (
                  <ConnectorLine 
                    progress={lineProgress[index]}
                    enableTransitions={enableTransitions}
                    label={PROCESS_LABELS[index]}
                    isActive={activeLineIndex === index}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="h-12">
            <div 
              className={cn(
                enableTransitions && "transition-all duration-300",
                showText ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-2"
              )}
            >
              <h4 className="text-sm text-emerald-500/80 font-medium">
                {steps[activeStep].title}
              </h4>
              <p className="text-xs text-emerald-500/60 mt-0.5">
                {steps[activeStep].description}
              </p>
            </div>
          </div>
        </div>

        <div className={cn(
          "absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500",
          showCompletion ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <CompletionMessage />
          <p className="text-sm text-emerald-500/80 text-center leading-relaxed">
            Your meeting brief is ready! We&apos;ve flagged 2 overlooked tasks and included the latest team updates in your report.
          </p>
        </div>
      </div>
    </div>
  )
} 