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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
)

export function ComingSoonSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">📅 Coming Soon</h2>
           <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Exciting new features are on the horizon to make Morr.ai even more proactive.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
         {/* Could add a timeline or more details here */}
         <ul className="grid gap-4 md:gap-6 pt-8">
            <li className="flex items-center justify-center gap-2">
               <PlaceholderIcon className="h-5 w-5 text-primary" />
               Intelligent AI Agents
            </li>
             <li className="flex items-center justify-center gap-2">
               <PlaceholderIcon className="h-5 w-5 text-primary" />
               Chrome Extension
            </li>
            <li className="flex items-center justify-center gap-2">
               <PlaceholderIcon className="h-5 w-5 text-primary" />
               Custom Workflow Builder
            </li>
            <li className="flex items-center justify-center gap-2">
               <PlaceholderIcon className="h-5 w-5 text-primary" />
               Mobile App
            </li>
          </ul>
        </div>
         <p className="text-lg font-semibold text-primary pt-8">
          &gt; The future of work is proactive. And it&apos;s already here.
        </p>
      </div>
    </section>
  )
} 