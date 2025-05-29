'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { OrbitVisual } from "@/components/ui/orbit-visual"

// Arrow icon component for better reusability
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

// Trust indicator component for better organization
const TrustIndicator = () => (
  <div className="pt-8 border-t border-primary/10">
    <p className="text-sm text-muted-foreground/60 mb-4">Trusted by forward-thinking teams</p>
    <div className="flex items-center gap-6">
      <div className="h-8 w-24 bg-primary/5 rounded animate-pulse" />
      <div className="h-8 w-24 bg-primary/5 rounded animate-pulse delay-150" />
      <div className="h-8 w-24 bg-primary/5 rounded animate-pulse delay-300" />
    </div>
  </div>
)

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] max-w-7xl mx-auto flex items-center justify-center bg-background overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_65%)]" />
      </div>
      
      <div className="container relative mt-12 px-4 md:px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col space-y-8 relative">
            <div className="relative space-y-6">
              <div className="inline-block">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary/80">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
                  <span>AI that works before you ask</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Work Smarter.<br />
                <span className="text-primary/90">Stay Ahead.</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground/80 md:text-xl leading-relaxed">
                Morr.ai connects seamlessly with your existing tools, learns your workflow, and proactively anticipates your needs. From preparing meeting briefs to delivering real-time insights and automating tasks.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden">
                <span className="relative z-10">Get Early Access</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <ArrowIcon />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/20 hover:bg-primary/5">
                Request Demo
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-secondary/10 hover:bg-secondary/20">
                Join Waitlist
              </Button>
            </div>

            <TrustIndicator />
          </div>

          {/* Interactive Visual */}
          <div className="relative lg:block">
            <OrbitVisual />
          </div>
        </div>
      </div>
    </section>
  )
}