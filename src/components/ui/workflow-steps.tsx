'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils"

interface Step {
  title: string
  description: string
}

interface WorkflowStepsProps {
  className?: string
}

const STEPS: Step[] = [
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
]

const ANIMATION_TIMING = {
  INITIAL_DELAY: 500,
  STEP_DURATION: 2000,
  LINE_ANIMATION_SPEED: 20,
  COMPLETION_DELAY: 500,
  COMPLETION_DURATION: 3000,
} as const

const CheckIcon = () => (
  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const ProcessingDot = () => (
  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
)

export function WorkflowSteps({ className }: WorkflowStepsProps) {
  const [currentStep, setCurrentStep] = useState(-1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [lineProgress, setLineProgress] = useState<number[]>([0, 0])
  const [showCompletion, setShowCompletion] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const lastVisibleTime = useRef<number>(Date.now())
  const restartTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animationRef = useRef<{ 
    cleanup: boolean; 
    timeouts: ReturnType<typeof setTimeout>[]; 
    intervals: ReturnType<typeof setInterval>[];
  }>({
    cleanup: false,
    timeouts: [],
    intervals: [],
  })

  const resetState = () => {
    setCurrentStep(-1)
    setCompletedSteps([])
    setLineProgress([0, 0])
    setShowCompletion(false)
    setIsAnimating(false)
  }

  const cleanup = () => {
    animationRef.current.cleanup = true
    animationRef.current.timeouts.forEach(clearTimeout)
    animationRef.current.intervals.forEach(clearInterval)
    animationRef.current.timeouts = []
    animationRef.current.intervals = []
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current)
      restartTimeoutRef.current = null
    }
    resetState()
  }

  const checkVisibility = () => {
    if (!componentRef.current) return false
    const rect = componentRef.current.getBoundingClientRect()
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0 &&
      !document.hidden
    )
  }

  const startAnimation = () => {
    // Clear any pending restart
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current)
      restartTimeoutRef.current = null
    }

    // Only start if visible and not already animating
    if (!checkVisibility() || isAnimating) return
    
    cleanup() // Ensure clean state
    animationRef.current.cleanup = false
    lastVisibleTime.current = Date.now()
    runAnimation()
  }

  // Debounced restart function
  const debouncedRestart = () => {
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current)
    }
    
    restartTimeoutRef.current = setTimeout(() => {
      if (checkVisibility()) {
        startAnimation()
      }
      restartTimeoutRef.current = null
    }, 300) // Wait 300ms before attempting to restart
  }

  const animateLine = (lineIndex: number): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        if (animationRef.current.cleanup) {
          clearInterval(interval)
          return
        }

        progress += 2
        setLineProgress(prev => 
          prev.map((val, i) => i === lineIndex ? Math.min(progress, 100) : val)
        )
        
        if (progress >= 100) {
          clearInterval(interval)
          resolve()
        }
      }, ANIMATION_TIMING.LINE_ANIMATION_SPEED)
      
      animationRef.current.intervals.push(interval)
    })
  }

  const runAnimation = async () => {
    if (animationRef.current.cleanup || isAnimating) return
    
    try {
      setIsAnimating(true)
      resetState()

      // Step 1
      await new Promise(r => {
        if (animationRef.current.cleanup) return
        const t = setTimeout(r, ANIMATION_TIMING.INITIAL_DELAY)
        animationRef.current.timeouts.push(t)
      })
      if (animationRef.current.cleanup) return
      setCurrentStep(0)
      
      await new Promise(r => {
        if (animationRef.current.cleanup) return
        const t = setTimeout(r, ANIMATION_TIMING.STEP_DURATION)
        animationRef.current.timeouts.push(t)
      })
      if (animationRef.current.cleanup) return
      setCompletedSteps(prev => [...prev, 0])
      
      // Animate line to step 2
      await animateLine(0)
      if (animationRef.current.cleanup) return

      // Step 2
      setCurrentStep(1)
      await new Promise(r => {
        if (animationRef.current.cleanup) return
        const t = setTimeout(r, ANIMATION_TIMING.STEP_DURATION)
        animationRef.current.timeouts.push(t)
      })
      if (animationRef.current.cleanup) return
      setCompletedSteps(prev => [...prev, 1])

      // Animate line to step 3
      await animateLine(1)
      if (animationRef.current.cleanup) return

      // Step 3
      setCurrentStep(2)
      await new Promise(r => {
        if (animationRef.current.cleanup) return
        const t = setTimeout(r, ANIMATION_TIMING.STEP_DURATION)
        animationRef.current.timeouts.push(t)
      })
      if (animationRef.current.cleanup) return
      setCompletedSteps(prev => [...prev, 2])

      // Show completion
      await new Promise(r => {
        if (animationRef.current.cleanup) return
        const t = setTimeout(r, ANIMATION_TIMING.COMPLETION_DELAY)
        animationRef.current.timeouts.push(t)
      })
      if (animationRef.current.cleanup) return
      setShowCompletion(true)

      // Reset after completion
      await new Promise(r => {
        if (animationRef.current.cleanup) return
        const t = setTimeout(r, ANIMATION_TIMING.COMPLETION_DURATION)
        animationRef.current.timeouts.push(t)
      })
      if (animationRef.current.cleanup) return
      
      setIsAnimating(false)
      runAnimation() // Start next cycle
    } catch (error) {
      console.error('Animation error:', error)
      cleanup()
    }
  }

  useEffect(() => {
    let visibilityTimeout: ReturnType<typeof setTimeout> | null = null

    const handleVisibilityChange = () => {
      // Clear any pending visibility timeout
      if (visibilityTimeout) {
        clearTimeout(visibilityTimeout)
        visibilityTimeout = null
      }

      if (document.hidden) {
        lastVisibleTime.current = Date.now()
        cleanup()
      } else {
        // Wait a brief moment to ensure the tab is actually focused
        visibilityTimeout = setTimeout(() => {
          const timeSinceHidden = Date.now() - lastVisibleTime.current
          if (timeSinceHidden > 200) { // Reduced time threshold for better responsiveness
            cleanup()
            debouncedRestart()
          }
          visibilityTimeout = null
        }, 100)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !document.hidden) {
            debouncedRestart()
          } else {
            cleanup()
          }
        })
      },
      { 
        threshold: 0.3,
        rootMargin: '100px 0px'
      }
    )

    if (componentRef.current) {
      observer.observe(componentRef.current)
      
      // Check initial visibility
      if (checkVisibility()) {
        startAnimation()
      }
    }

    // Add visibility change listener
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Debounced resize handler
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeTimeout = setTimeout(() => {
        if (checkVisibility()) {
          debouncedRestart()
        }
        resizeTimeout = null
      }, 250)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cleanup()
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('resize', handleResize)
      if (visibilityTimeout) clearTimeout(visibilityTimeout)
      if (resizeTimeout) clearTimeout(resizeTimeout)
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current)
    }
  }, [])

  return (
    <div 
      ref={componentRef}
      className={cn(
        "relative w-full h-full bg-[#0C1615] rounded-xl p-6",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Main workflow visualization */}
        <div className={cn(
          "transition-opacity duration-500",
          showCompletion ? "opacity-0" : "opacity-100"
        )}>
          {/* Steps and connecting lines */}
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((_, index) => (
              <React.Fragment key={index}>
                {/* Step box */}
                <div className="relative">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
                    completedSteps.includes(index) || currentStep === index
                      ? "bg-emerald-500/20"
                      : "bg-emerald-900/30"
                  )}>
                    {completedSteps.includes(index) && <CheckIcon />}
                    {currentStep === index && !completedSteps.includes(index) && <ProcessingDot />}
                  </div>
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full transition-colors duration-300",
                    completedSteps.includes(index) || currentStep === index
                      ? "bg-emerald-500"
                      : "bg-emerald-900/50",
                    currentStep === index && "animate-pulse"
                  )} />
                </div>

                {/* Connecting line */}
                {index < STEPS.length - 1 && (
                  <div className="flex-1 mx-2">
                    <div className="h-[2px] bg-emerald-900/30 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-emerald-500 origin-left transition-transform duration-500 ease-out"
                        style={{ transform: `scaleX(${lineProgress[index] / 100})` }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step description */}
          {currentStep >= 0 && !showCompletion && (
            <div className="h-12">
              <div className="transition-all duration-300 opacity-100 transform translate-y-0">
                <h4 className="text-sm text-emerald-500/80 font-medium">
                  {STEPS[currentStep].title}
                </h4>
                <p className="text-xs text-emerald-500/60 mt-0.5">
                  {STEPS[currentStep].description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Completion overlay */}
        <div className={cn(
          "absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500",
          showCompletion ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
            <CheckIcon />
          </div>
          <p className="text-sm text-emerald-500/80 text-center leading-relaxed">
            Your meeting brief is ready! We&apos;ve flagged 2 overlooked tasks and included the latest team updates.
          </p>
        </div>
      </div>
    </div>
  )
} 