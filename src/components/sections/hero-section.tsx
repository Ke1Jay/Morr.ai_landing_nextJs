import React from 'react'
import { Button } from "@/components/ui/button" // Import Shadcn Button

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center text-center bg-gradient-to-b from-background to-muted/40"> {/* Example styling */}
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
              🧠 Work Smarter. Stay Ahead. {/* From copyright.mdc */}
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Morr.ai connects seamlessly with your existing tools, learns your workflow, and proactively anticipates your needs. From preparing meeting briefs to delivering real-time insights and automating tasks, Morr.ai is your ultimate AI assistant—always a step ahead. {/* From copyright.mdc */}
            </p>
             <p className="text-lg font-semibold text-primary">
              👉 Stop searching, start knowing—Morr.ai {/* From copyright.mdc */}
            </p>
          </div>
          <div className="space-x-4">
            {/* CTAs from structure.mdc, using Shadcn Button */}
            <Button size="lg">Get Early Access</Button> 
            <Button variant="outline" size="lg">Request Demo</Button>
            <Button variant="secondary" size="lg">Join Waitlist</Button> 
          </div>
        </div>
      </div>
    </section>
  )
}

// Interface placement as per technical.mdc (none needed here yet)
// Static content placement as per technical.mdc (none needed here yet)

// Note: Applied some basic Tailwind styling for layout and text. This can be refined. 