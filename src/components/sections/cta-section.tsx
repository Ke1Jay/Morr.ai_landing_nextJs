import React from 'react'
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-background">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            ✅ Ready to Experience Morr.ai?
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            👇 Join early access and discover the first AI designed to truly anticipate your needs.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <div className="flex flex-col sm:flex-row justify-center gap-2 pt-4">
            {/* Reusing CTAs from Hero/structure.mdc */}
            <Button size="lg" className="w-full sm:w-auto">Get Early Access</Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Request Demo</Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">Join Waitlist</Button>
          </div>
        </div>
      </div>
    </section>
  )
} 