import React from 'react'
import { cn } from "@/lib/utils"

interface IconProps {
  className?: string
}

// Security feature icons
const ShieldIcon = ({ className }: IconProps) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const EncryptionIcon = ({ className }: IconProps) => (
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

const AccessControlIcon = ({ className }: IconProps) => (
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

const GDPRIcon = ({ className }: IconProps) => (
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
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M7 7h10" />
    <path d="M7 12h10" />
    <path d="M7 17h4" />
  </svg>
)

// Background pattern and gradient component
const BackgroundEffect = () => (
  <div className="absolute inset-0">
    {/* Radial gradient with security-themed color */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.08)_0%,rgba(37,99,75,0.02)_40%,transparent_70%)]" />
    
    {/* Hexagonal grid pattern */}
    <div className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.4 102L1.2 78.5V31.5L14.4 8L27.6 31.5M14.4 102L27.6 78.5M14.4 102L27.6 78.5M27.6 31.5L40.8 8L54 31.5V78.5L40.8 102L27.6 78.5M27.6 31.5L27.6 78.5' stroke='%2325634B' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 104px'
      }}
    />

    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.03]" />
  </div>
)

const SecurityFeature = ({ icon: Icon, title }: { icon: React.ComponentType<IconProps>, title: string }) => (
  <div className={cn(
    "group flex items-center gap-3 p-4",
    "rounded-xl border border-primary/10 bg-black/40",
    "hover:bg-black/50 hover:border-primary/20",
    "transition-all duration-300"
  )}>
    <div className={cn(
      "p-2 rounded-lg bg-primary/5 text-primary/80",
      "group-hover:bg-primary/10 group-hover:scale-110",
      "transition-all duration-300"
    )}>
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-base text-muted-foreground/90 group-hover:text-muted-foreground transition-colors duration-300">
      {title}
    </span>
  </div>
)

export function SecuritySection() {
  return (
    <section className="w-full min-h-[40vh] flex items-center justify-center bg-background pt-16 lg:pt-8 pb-24 md:pb-32 lg:pb-40">
      <div className="container px-4 md:px-6">
        <div className="relative w-full max-w-full mx-auto rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-primary/10 overflow-hidden">
          <BackgroundEffect />
          
          <div className="relative px-6 py-20 md:px-12 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Text content */}
              <div className="space-y-6">
                <div className={cn(
                  "inline-flex items-center",
                  "rounded-full border border-primary/20 bg-primary/5",
                  "px-4 py-1.5",
                  "text-sm text-primary/80"
                )}>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
                  <span>Enterprise Security</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tighter lg:text-5xl">
                  Built for <span className="text-primary">Enterprise Security</span>
                </h2>
                <p className="text-lg text-muted-foreground/80 leading-relaxed max-w-[600px]">
                  Your data security is our top priority. We implement industry-leading security measures and maintain compliance with major regulations to protect your sensitive information.
                </p>
              </div>

              {/* Right side - Security features */}
              <div className="grid gap-4">
                <SecurityFeature icon={ShieldIcon} title="SOC 2 Type II Certified" />
                <SecurityFeature icon={EncryptionIcon} title="End-to-end Encryption" />
                <SecurityFeature icon={AccessControlIcon} title="Role-based Access Control" />
                <SecurityFeature icon={GDPRIcon} title="GDPR Compliant Infrastructure" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 