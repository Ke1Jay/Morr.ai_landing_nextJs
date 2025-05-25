import React from 'react'

// Import section components
import { HeroSection } from "@/components/sections/landing/hero-section"
import { WhatItDoesSection } from "@/components/sections/landing/what-it-does-section"
import { CoreFeaturesSection } from "@/components/sections/landing/core-features-section"
import { UseCasesSection } from "@/components/sections/landing/use-cases-section"
import { SecuritySection } from "@/components/sections/landing/security-section"
import { ComingSoonSection } from "@/components/sections/landing/coming-soon-section"
import { CtaSection } from "@/components/sections/landing/cta-section"
import { TestimonialsSection } from "@/components/sections/landing/testimonials-section"

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      {/* Render sections in order defined by structure.mdc */}
      <HeroSection />
      <WhatItDoesSection />
      <CoreFeaturesSection />
      <UseCasesSection />
      {/* <SecuritySection /> */}
      {/* <ComingSoonSection /> */}
      <CtaSection />
      {/* <TestimonialsSection /> */}
    </main>
  )
}
