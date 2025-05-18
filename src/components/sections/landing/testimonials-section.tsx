import React from 'react'
import { cn } from "@/lib/utils"
import Image from "next/image"

// Placeholder avatar as a data URL
const PLACEHOLDER_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300FF9D' %3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"

// Types for testimonial data structure
interface Testimonial {
  author: string
  handle: string
  avatar: string
  message: string
  verified?: boolean
}

// Verified badge SVG component with proper accessibility
const VerifiedIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="img"
  >
    <path d="M15.75 8L14.0833 6.18164L14.2467 3.75L11.8467 3.31836L10.5 1.25L8.25 2.18164L6 1.25L4.65333 3.31836L2.25333 3.74164L2.41667 6.17336L0.75 8L2.41667 9.81836L2.25333 12.25L4.65333 12.6816L6 14.75L8.25 13.8184L10.5 14.75L11.8467 12.6816L14.2467 12.25L14.0833 9.81836L15.75 8Z" fill="#00FF9D"/>
    <path d="M7.13674 11.1337L4.17007 8.16699L5.11674 7.22033L7.13674 9.24033L11.5534 4.82366L12.5001 5.77866L7.13674 11.1337Z" fill="black"/>
  </svg>
)

// Static testimonial data
const TESTIMONIALS: Testimonial[] = [
  {
    author: "Jacob Jones",
    handle: "@steventey",
    avatar: PLACEHOLDER_AVATAR,
    message: "Before Morr.ai, I was buried under a pile of sticky notes and to-do lists. Now, everything is organized, prioritized, and handled—without me lifting a finger. The AI suggestions are scary smart.",
    verified: true
  },
  {
    author: "Kathryn Murphy",
    handle: "@steventey",
    avatar: PLACEHOLDER_AVATAR,
    message: "The moment I wake up, Morr.ai already has my day structured. Tasks, breaks, reminders—all balanced. It&apos;s like it knows me better than I know myself.",
    verified: true
  },
  {
    author: "Jerome Bell",
    handle: "@steventey",
    avatar: PLACEHOLDER_AVATAR,
    message: "My schedule used to control me—now I control it. Morr.ai&apos;s smart calendar blocks time efficiently, giving me space to focus. I&apos;m more productive, less stressed, and finally have breathing room in my day.",
    verified: true
  },
  {
    author: "Bessie Cooper",
    handle: "@steventey",
    avatar: PLACEHOLDER_AVATAR,
    message: "Juggling multiple clients used to be a mess. Morr.ai&apos;s automated routines and smart calendar help me stay on track—and deliver on time, every time. It feels like I hired an assistant.",
    verified: true
  },
  {
    author: "Ronald Richards",
    handle: "@steventey",
    avatar: PLACEHOLDER_AVATAR,
    message: "Our team productivity skyrocketed after using Morr.ai. Everyone is more aligned, focused, and collaborative. The AI removes all the guesswork. Now our meetings are short, our goals are clear, and our output is better.",
    verified: true
  },
  {
    author: "Wade Warren",
    handle: "@steventey",
    avatar: PLACEHOLDER_AVATAR,
    message: "Morr.ai doesn&apos;t just schedule my time, it protects it. I get focused time slots, gentle nudges, and clear priorities—so my productivity is higher, and my stress is lower.",
    verified: true
  }
]

// Testimonial card component for better code organization
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative group p-4 rounded-xl border border-primary/10 bg-[#0A1A14] hover:bg-[#0C1F17] transition-colors duration-300">
      <div className="flex items-start gap-2.5 mb-3">
        {/* User avatar with optimized image loading */}
        <div className="relative h-8 w-8 rounded-full overflow-hidden bg-primary/5">
          <Image
            src={testimonial.avatar}
            alt={`${testimonial.author}'s avatar`}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm text-muted-foreground truncate">
              {testimonial.author}
            </p>
            {testimonial.verified && (
              <VerifiedIcon className="flex-shrink-0 w-4 h-4" />
            )}
          </div>
          <p className="text-xs text-muted-foreground/60">
            {testimonial.handle}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground/90 leading-relaxed">
        {testimonial.message}
      </p>
    </div>
  )
}

// Main testimonials section component
export function TestimonialsSection() {
  return (
    <section className="w-full min-h-screen flex items-center max-w-full justify-center py-24 md:py-32" aria-labelledby="testimonials-title">
      <div className="container px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className={cn(
              "inline-flex items-center",
              "rounded-full border border-primary/20 bg-primary/5",
              "px-4 py-1.5 mb-8",
              "text-sm text-primary/80"
            )}>
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
              <span>Testimonials</span>
            </div>
            <h2 id="testimonials-title" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              What Our Users<br />Are Saying
            </h2>
          </div>

          {/* Testimonials grid with responsive layout */}
          <div className="grid gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard 
                key={`${testimonial.author}-${testimonial.handle}`} 
                testimonial={testimonial} 
              />
            ))}
          </div>

          {/* Action button */}
          <div className="text-center mt-10">
            <button 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 text-sm text-primary/80 transition-colors duration-300"
              aria-label="View all testimonials"
            >
              See All
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path 
                  d="M6 12L10 8L6 4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 