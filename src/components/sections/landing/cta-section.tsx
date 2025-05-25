import React from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Background effect component for consistency
const BackgroundEffect = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_65%)]" />
  </>
)

export function CtaSection() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="relative w-full max-w-7xl mx-auto rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-primary/10 overflow-hidden">
          <BackgroundEffect />
          
          <div className="relative px-6 py-16 md:px-12 md:py-20">
            <div className="flex flex-col items-center text-center max-w-xl mx-auto">
              {/* Section label */}
              <div className={cn(
                "inline-flex items-center",
                "rounded-full border border-primary/20 bg-primary/5",
                "px-4 py-1.5 mb-8",
                "text-sm text-primary/80"
              )}>
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
                <span>Early Access</span>
              </div>

              {/* Main heading */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Ready to Experience{" "}
                  <span className="text-primary">Morr.ai</span>
                  <span>?</span>
                </h2>

                {/* Subheading */}
                <p className="text-lg md:text-xl text-muted-foreground/80 max-w-lg mx-auto">
                  Join early access and discover the first AI designed to truly anticipate your needs.
                </p>
              </div>

              {/* CTA buttons */}
              <div className="w-full max-w-md mt-12 space-y-6">
                {/* Primary CTA */}
                <div className="flex flex-col items-center gap-2">
                  <Button 
                    variant="default"
                    size="lg"
                    className="w-full h-12 text-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    Get Early Access
                  </Button>
                  <p className="text-sm text-muted-foreground/70">
                    Be among the first to try Morr.ai
                  </p>
                </div>

                {/* Secondary CTAs */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col items-center gap-2">
                    <Button 
                      variant="outline"
                      className="w-full h-11 hover:bg-primary/5 transition-colors"
                    >
                      Request Demo
                    </Button>
                    <p className="text-sm text-muted-foreground/70">
                      See Morr.ai in action
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button 
                      variant="secondary"
                      className="w-full h-11 hover:bg-primary/5 transition-colors"
                    >
                      Join Waitlist
                    </Button>
                    <p className="text-sm text-muted-foreground/70">
                      Stay updated on our progress
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 pt-6 border-t border-primary/10 w-full max-w-md">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-muted-foreground/60">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="text-sm">Enterprise-grade security</span>
                  </div>
                  <p className="text-sm text-muted-foreground/60">
                    No credit card required • Cancel anytime • 14-day free trial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 