import React from 'react'

export function WhatItDoesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              ✨ The First AI Assistant That Works Before You Even Ask
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Morr.ai centralizes data from your apps into a single, intuitive interface.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 pt-12">
          {/* Scenario 1 */}
          <div className="grid gap-1 text-center md:text-left">
            <h3 className="text-lg font-bold">🙋‍♂️ Got a client meeting?</h3>
            <p className="text-sm text-muted-foreground">
              Morr.ai already sent the brief, highlighted critical points, and attached essential documents.
            </p>
          </div>
          {/* Scenario 2 */}
          <div className="grid gap-1 text-center md:text-left">
            <h3 className="text-lg font-bold">📈 Need insights on your sales performance?</h3>
            <p className="text-sm text-muted-foreground">
              Morr.ai provides live analytics, uncovers trends, and recommends next steps instantly.
            </p>
          </div>
          {/* Scenario 3 */}
          <div className="grid gap-1 text-center md:text-left">
            <h3 className="text-lg font-bold">🧩 Feeling overwhelmed by tool chaos?</h3>
            <p className="text-sm text-muted-foreground">
              Morr.ai centralizes data from your apps into a single, intuitive interface. {/* Reused from main description as per copyright.mdc */}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 