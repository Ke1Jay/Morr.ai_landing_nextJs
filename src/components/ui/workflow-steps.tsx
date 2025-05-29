'use client'

import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { cn } from "@/lib/utils"
import { useInView } from 'react-intersection-observer'

interface Step {
  title: string
  description: string
}

interface WorkflowStepsProps {
  className?: string
}

// Animation timing configuration
const ANIMATION_CONFIG = {
  initial: {
    delay: 500,
  },
  step: {
    duration: 2000,
    lineSpeed: 20,
  },
  completion: {
    delay: 500,
    duration: 3000,
  },
  transition: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
} as const

const STEPS: readonly Step[] = [
  {
    title: "Gather Context",
    description: "Syncs recent emails, chats, and CRM data"
  },
  {
    title: "Prepare Brief",
    description: "Generates smart meeting summary"
  },
  {
    title: "Deliver Insights",
    description: "Shares brief with recommended actions"
  }
] as const

// Memoized components for better performance
const CheckIcon = memo(() => (
  <svg 
    className="w-5 h-5 text-emerald-500" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M5 13l4 4L19 7" 
    />
  </svg>
))
CheckIcon.displayName = 'CheckIcon'

const ProcessingDot = memo(() => (
  <div 
    className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"
    role="progressbar"
    aria-label="Processing step"
  />
))
ProcessingDot.displayName = 'ProcessingDot'

// Step indicator component
const StepIndicator = memo(({ 
  isCompleted, 
  isActive, 
  stepNumber 
}: { 
  isCompleted: boolean
  isActive: boolean
  stepNumber: number 
}) => (
  <div className="relative" role="listitem">
    <div 
      className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
        isCompleted || isActive ? "bg-emerald-500/20" : "bg-emerald-900/30"
      )}
      aria-label={`Step ${stepNumber + 1}${isCompleted ? ' (completed)' : isActive ? ' (in progress)' : ''}`}
    >
      {isCompleted && <CheckIcon />}
      {isActive && !isCompleted && <ProcessingDot />}
    </div>
    <div 
      className={cn(
        "absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full transition-colors duration-300",
        isCompleted || isActive ? "bg-emerald-500" : "bg-emerald-900/50",
        isActive && "animate-pulse"
      )}
      aria-hidden="true"
    />
  </div>
))
StepIndicator.displayName = 'StepIndicator'

// Progress line component
const ProgressLine = memo(({ progress }: { progress: number }) => (
  <div className="flex-1 mx-2">
    <div 
      className="h-[3px] bg-emerald-900/30 relative overflow-hidden"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div 
        className="absolute inset-0 bg-emerald-500 origin-left transition-transform duration-500 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  </div>
))
ProgressLine.displayName = 'ProgressLine'

// Step description component
const StepDescription = memo(({ step }: { step: Step }) => (
  <div 
    className="transition-all duration-300 opacity-100 transform translate-y-0 text-center"
    role="status"
    aria-live="polite"
  >
    <h4 className="text-lg font-semibold text-emerald-500/90 mb-2">
      {step.title}
    </h4>
    <p className="text-md text-emerald-500/60 max-w-md mx-auto">
      {step.description}
    </p>
  </div>
))
StepDescription.displayName = 'StepDescription'

// Completion overlay component
const CompletionOverlay = memo(() => (
  <div 
    className="flex flex-col items-center justify-center"
    role="status"
    aria-label="Workflow completed"
  >
    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
      <CheckIcon />
    </div>
    <p className="text-sm text-emerald-500/80 text-center leading-relaxed">
      Your meeting brief is ready! We&apos;ve flagged 2 overlooked tasks and included the latest team updates.
    </p>
  </div>
))
CompletionOverlay.displayName = 'CompletionOverlay'

export function WorkflowSteps({ className }: WorkflowStepsProps) {
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [lineProgress, setLineProgress] = useState<number[]>([0, 0])
  const [showCompletion, setShowCompletion] = useState(false)
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const intervalsRef = useRef<NodeJS.Timeout[]>([])

  // Use intersection observer for better visibility detection
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    rootMargin: '100px 0px',
    triggerOnce: false
  })

  const cleanup = useCallback(() => {
    timeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
    intervalsRef.current.forEach((interval) => clearInterval(interval))
    timeoutsRef.current = []
    intervalsRef.current = []
    setCurrentStep(-1)
    setCompletedSteps([])
    setLineProgress([0, 0])
    setShowCompletion(false)
  }, [])

  const animateLine = useCallback((lineIndex: number): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 2
        setLineProgress(prev => 
          prev.map((val, i) => i === lineIndex ? Math.min(progress, 100) : val)
        )
        
        if (progress >= 100) {
          clearInterval(interval)
          resolve()
        }
      }, ANIMATION_CONFIG.step.lineSpeed)
      
      intervalsRef.current.push(interval)
    })
  }, [])

  const startAnimation = useCallback(async () => {
    cleanup()

    try {
      // Initial delay
      await new Promise(r => {
        const timeout = setTimeout(r, ANIMATION_CONFIG.initial.delay)
        timeoutsRef.current.push(timeout)
      })

      // Animate through each step
      for (let i = 0; i < STEPS.length; i++) {
        setCurrentStep(i)
        
        await new Promise(r => {
          const timeout = setTimeout(r, ANIMATION_CONFIG.step.duration)
          timeoutsRef.current.push(timeout)
        })
        
        setCompletedSteps(prev => [...prev, i])
        
        if (i < STEPS.length - 1) {
          await animateLine(i)
        }
      }

      // Show completion
      await new Promise(r => {
        const timeout = setTimeout(r, ANIMATION_CONFIG.completion.delay)
        timeoutsRef.current.push(timeout)
      })
      
      setShowCompletion(true)

      // Reset after completion
      const resetTimeout = setTimeout(() => {
        startAnimation()
      }, ANIMATION_CONFIG.completion.duration)
      timeoutsRef.current.push(resetTimeout)

    } catch (error) {
      console.error('Animation error:', error)
      cleanup()
    }
  }, [cleanup, animateLine])

  // Handle visibility changes
  useEffect(() => {
    if (inView && !document.hidden) {
      startAnimation()
    } else {
      cleanup()
    }
  }, [inView, startAnimation, cleanup])

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cleanup()
      } else if (inView) {
        startAnimation()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cleanup()
    }
  }, [inView, startAnimation, cleanup])

  return (
    <div 
      ref={inViewRef}
      className={cn(
        "relative w-full h-full bg-[#0C1615] rounded-xl p-6",
        className
      )}
      role="region"
      aria-label="Workflow Progress"
    >
      <div className="flex flex-col h-full">
        {/* Main workflow visualization */}
        <div 
          className={cn(
            "transition-opacity duration-500",
            showCompletion ? "opacity-0" : "opacity-100"
          )}
          aria-hidden={showCompletion}
        >
          {/* Steps and connecting lines */}
          <div 
            className="flex items-center justify-between mb-8"
            role="list"
            aria-label="Workflow steps"
          >
            {STEPS.map((_, index) => (
              <React.Fragment key={index}>
                <StepIndicator
                  isCompleted={completedSteps.includes(index)}
                  isActive={currentStep === index}
                  stepNumber={index}
                />
                {index < STEPS.length - 1 && (
                  <ProgressLine progress={lineProgress[index]} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step description */}
          {currentStep >= 0 && !showCompletion && (
            <div className="mt-6">
              <StepDescription step={STEPS[currentStep]} />
            </div>
          )}
        </div>

        {/* Completion overlay */}
        <div 
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500",
            showCompletion ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          aria-hidden={!showCompletion}
        >
          <CompletionOverlay />
        </div>
      </div>
    </div>
  )
} 