import React from 'react'

// Import section components
import { HeroSection } from "@/components/sections/hero-section"
import { WhatItDoesSection } from "@/components/sections/what-it-does-section"
import { CoreFeaturesSection } from "@/components/sections/core-features-section"
import { UseCasesSection } from "@/components/sections/use-cases-section"
import { SecuritySection } from "@/components/sections/security-section"
import { ComingSoonSection } from "@/components/sections/coming-soon-section"
import { CtaSection } from "@/components/sections/cta-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"

export default function LandingPage() {
  return (
    <main className="flex flex-col">
      {/* Render sections in order defined by structure.mdc */}
      <HeroSection />
      <WhatItDoesSection />
      <CoreFeaturesSection />
      <UseCasesSection />
      <SecuritySection />
      <ComingSoonSection />
      <CtaSection />
      <TestimonialsSection />
    </main>
  )
}
