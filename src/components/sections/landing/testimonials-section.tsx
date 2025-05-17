import React from 'react'

export function TestimonialsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">💬 Trusted by High-Performing Teams</h2>
             {/* Optional: Subtitle or description */}
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-1 md:gap-12 lg:grid-cols-2">
           {/* Testimonial 1 */}
          <div className="relative group grid gap-4 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <blockquote className="text-lg font-semibold leading-snug">
              “Morr.ai reduced our meeting times by 50% and made updates effortless.”
            </blockquote>
            {/* Optional: Add author/company name */}
            {/* <p className="text-sm text-muted-foreground">- Author Name, Company</p> */}
          </div>
          {/* Testimonial 2 */}
          <div className="relative group grid gap-4 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
             <blockquote className="text-lg font-semibold leading-snug">
              “I didn&apos;t need to prep—Morr.ai had everything organized for me.”
            </blockquote>
            {/* Optional: Add author/company name */}
            {/* <p className="text-sm text-muted-foreground">- Author Name, Company</p> */}
          </div>
        </div>
        {/* Optional: Logo Wall */}
        {/* <div className="mt-12 text-center"> <p className="text-muted-foreground">[Client Logos Here]</p> </div> */}
      </div>
    </section>
  )
} 