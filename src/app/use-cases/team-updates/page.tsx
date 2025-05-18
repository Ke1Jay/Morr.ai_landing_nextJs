import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function TeamUpdatesPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Automated Team Updates
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Keep everyone aligned with AI-generated status reports and project summaries that save time and improve clarity.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/demo">Try it Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid gap-8 md:grid-cols-3">
        <StatCard
          value="75%"
          label="Time Saved"
          description="Reduction in time spent creating and sharing updates"
        />
        <StatCard
          value="40%"
          label="Fewer Meetings"
          description="Reduction in status update meetings needed"
        />
        <StatCard
          value="98%"
          label="Team Alignment"
          description="Team members report better understanding of priorities"
        />
      </section>

      {/* Key Features */}
      <section className="space-y-16">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Key Features</h2>
        
        <FeatureSection
          title="Progress Tracking"
          description="Automatically track and summarize progress across all your team's tools and projects."
          features={[
            "Real-time progress monitoring",
            "Milestone tracking",
            "Blockers identification",
            "Timeline visualization"
          ]}
          imagePosition="right"
        />

        <FeatureSection
          title="Smart Summaries"
          description="Get AI-generated summaries that highlight what matters most to your team."
          features={[
            "Customizable templates",
            "Priority highlighting",
            "Risk identification",
            "Achievement tracking"
          ]}
          imagePosition="left"
        />

        <FeatureSection
          title="Task Prioritization"
          description="Let AI help your team focus on what's most important right now."
          features={[
            "Smart task sorting",
            "Deadline management",
            "Resource allocation",
            "Workload balancing"
          ]}
          imagePosition="right"
        />

        <FeatureSection
          title="Team Insights"
          description="Understand team dynamics and improve collaboration with AI-powered analytics."
          features={[
            "Collaboration patterns",
            "Productivity metrics",
            "Team health indicators",
            "Engagement tracking"
          ]}
          imagePosition="left"
        />
      </section>

      {/* Update Types */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Automated Updates For Every Need</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UpdateTypeCard
            title="Daily Standups"
            description="Automated daily updates that keep everyone informed without interrupting flow."
            features={[
              "Progress summaries",
              "Blocker alerts",
              "Priority updates",
              "Team availability"
            ]}
          />
          <UpdateTypeCard
            title="Weekly Reports"
            description="Comprehensive weekly summaries that highlight achievements and upcoming work."
            features={[
              "Week in review",
              "Goals tracking",
              "Resource planning",
              "Next week preview"
            ]}
          />
          <UpdateTypeCard
            title="Project Milestones"
            description="Automatic notifications when important project milestones are reached."
            features={[
              "Milestone tracking",
              "Dependency updates",
              "Risk assessment",
              "Timeline projections"
            ]}
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-muted rounded-2xl p-12">
        <blockquote className="space-y-8">
          <p className="text-2xl font-medium text-center italic">
            &ldquo;Morr.ai&apos;s automated updates have transformed our team communication. We spend less time in meetings and more time getting work done.&rdquo;
          </p>
          <footer className="text-center">
            <p className="font-semibold">Emily Zhang</p>
            <p className="text-muted-foreground">Engineering Manager at TechFlow</p>
          </footer>
        </blockquote>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8">
        <h2 className="text-3xl font-bold tracking-tighter">Ready to Streamline Team Updates?</h2>
        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
          Join leading teams using Morr.ai to automate updates and keep everyone aligned.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/demo">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function StatCard({ value, label, description }: {
  value: string
  label: string
  description: string
}) {
  return (
    <div className="text-center space-y-4 p-6 rounded-xl border">
      <div className="space-y-2">
        <p className="text-4xl font-bold text-primary">{value}</p>
        <p className="text-xl font-semibold">{label}</p>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function FeatureSection({ title, description, features, imagePosition }: {
  title: string
  description: string
  features: string[]
  imagePosition: 'left' | 'right'
}) {
  const contentOrder = imagePosition === 'right' ? 'order-1' : 'order-1 md:order-2'
  const imageOrder = imagePosition === 'right' ? 'order-2' : 'order-2 md:order-1'

  return (
    <div className="grid gap-12 md:grid-cols-2 items-center">
      <div className={`space-y-6 ${contentOrder}`}>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-tighter">{title}</h3>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-muted-foreground">
              <span className="mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className={`rounded-xl bg-muted aspect-video ${imageOrder}`} />
    </div>
  )
}

function UpdateTypeCard({ title, description, features }: {
  title: string
  description: string
  features: string[]
}) {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-center">
            <span className="mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
} 