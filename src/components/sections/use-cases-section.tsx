import React from 'react'

// Placeholder icon
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
     <circle cx="9" cy="7" r="4" />
     <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

export function UseCasesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">👥 Built for Forward-Thinking Teams</h2>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 lg:gap-16 pt-8">
          {/* Persona 1 */}
          <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg border border-transparent hover:border-border hover:bg-card transition-colors">
            <PlaceholderIcon className="h-10 w-10 text-primary mb-2" />
            <h3 className="text-lg font-bold">Startups & Scaleups</h3>
            {/* Add description if available/needed */}
          </div>
          {/* Persona 2 */}
          <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg border border-transparent hover:border-border hover:bg-card transition-colors">
            <PlaceholderIcon className="h-10 w-10 text-primary mb-2" />
            <h3 className="text-lg font-bold">Sales Teams</h3>
             {/* Add description if available/needed */}
          </div>
          {/* Persona 3 */}
          <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg border border-transparent hover:border-border hover:bg-card transition-colors">
            <PlaceholderIcon className="h-10 w-10 text-primary mb-2" />
            <h3 className="text-lg font-bold">Product & Ops Teams</h3>
            {/* Add description if available/needed */}
          </div>
          {/* Persona 4 */}
          <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg border border-transparent hover:border-border hover:bg-card transition-colors">
            <PlaceholderIcon className="h-10 w-10 text-primary mb-2" />
            <h3 className="text-lg font-bold">Leadership & Strategy</h3>
            {/* Add description if available/needed */}
          </div>
        </div>
      </div>
    </section>
  )
} 