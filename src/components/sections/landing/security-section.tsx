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
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export function SecuritySection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">🛡️ Security You Can Trust</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Enterprise-grade security features to protect your data and ensure compliance.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
          {/* Security Points from copyright.mdc */}
          <ul className="grid gap-4 md:gap-6">
            <li className="flex items-center gap-2">
               <PlaceholderIcon className="h-5 w-5 text-primary" />
               SOC 2-ready
            </li>
            <li className="flex items-center gap-2">
               <PlaceholderIcon className="h-5 w-5 text-primary" />
               End-to-end encryption
            </li>
            <li className="flex items-center gap-2">
               <PlaceholderIcon className="h-5 w-5 text-primary" />
               Role-based access control
            </li>
            <li className="flex items-center gap-2">
               <PlaceholderIcon className="h-5 w-5 text-primary" />
               GDPR-compliant infrastructure
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
} 