import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function UseCasesPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Transform How Your Team Works
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Discover how teams across different roles and industries use Morr.ai to boost productivity and streamline workflows.
        </p>
      </section>

      {/* Featured Use Cases */}
      <section id="featured-use-cases">
        <div className="space-y-16">
          {/* Proactive Meeting Briefs */}
          <UseCaseSection
            title="Proactive Meeting Briefs"
            description="Never walk into a meeting unprepared again. Get AI-generated summaries and key documents before every meeting."
            features={[
              "Smart calendar integration",
              "Automated document gathering",
              "Key points summarization",
              "Participant insights"
            ]}
            benefits={[
              {
                title: "Save Preparation Time",
                description: "Reduce meeting prep time by 70% with automated briefing materials."
              },
              {
                title: "Better Decisions",
                description: "Make informed decisions with all relevant context at your fingertips."
              },
              {
                title: "Stay Organized",
                description: "Keep all meeting-related documents and notes in one place."
              }
            ]}
            href="/use-cases/meeting-briefs"
            imagePosition="right"
          />

          {/* Real-Time Sales Insights */}
          <UseCaseSection
            title="Real-Time Sales Insights"
            description="Access live pipeline data, trends, and AI-powered recommendations to close deals faster."
            features={[
              "Pipeline analytics",
              "Deal insights",
              "Competitor tracking",
              "Next-step recommendations"
            ]}
            benefits={[
              {
                title: "Increase Win Rates",
                description: "Improve deal closure rates with AI-powered insights and recommendations."
              },
              {
                title: "Faster Decisions",
                description: "Make data-driven decisions with real-time pipeline visibility."
              },
              {
                title: "Better Forecasting",
                description: "Get accurate sales forecasts based on historical data and trends."
              }
            ]}
            href="/use-cases/sales-insights"
            imagePosition="left"
          />

          {/* Unified Knowledge Access */}
          <UseCaseSection
            title="Unified Knowledge Access"
            description="Find any information instantly with AI-powered search across all your connected tools."
            features={[
              "Cross-tool search",
              "Natural language queries",
              "Smart filtering",
              "Contextual answers"
            ]}
            benefits={[
              {
                title: "Find Anything Fast",
                description: "Locate documents and information in seconds, not minutes."
              },
              {
                title: "Break Down Silos",
                description: "Access knowledge across departments and tools seamlessly."
              },
              {
                title: "Boost Productivity",
                description: "Reduce time spent searching for information by 50%."
              }
            ]}
            href="/use-cases/unified-search"
            imagePosition="right"
          />

          {/* Automated Team Updates */}
          <UseCaseSection
            title="Automated Team Updates"
            description="Keep everyone aligned with AI-generated status reports and project summaries."
            features={[
              "Progress tracking",
              "Status summaries",
              "Task prioritization",
              "Team insights"
            ]}
            benefits={[
              {
                title: "Better Alignment",
                description: "Keep teams synchronized with automated status updates."
              },
              {
                title: "Save Time",
                description: "Eliminate manual reporting and status meetings."
              },
              {
                title: "Clear Priorities",
                description: "Ensure everyone knows what to focus on next."
              }
            ]}
            href="/use-cases/team-updates"
            imagePosition="left"
          />
        </div>
      </section>

      {/* Team-specific Solutions */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Solutions by Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <TeamCard
            title="For Sales Teams"
            description="Close more deals with AI-powered insights and automation."
            href="/teams/sales"
          />
          <TeamCard
            title="For Product & Ops"
            description="Streamline operations and accelerate product development."
            href="/teams/product-ops"
          />
          <TeamCard
            title="For Leadership"
            description="Make better decisions with real-time insights and forecasting."
            href="/teams/leadership"
          />
          <TeamCard
            title="For Onboarding"
            description="Accelerate team onboarding with smart knowledge sharing."
            href="/teams/onboarding"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 bg-muted rounded-2xl p-12">
        <h2 className="text-3xl font-bold tracking-tighter">Ready to Transform Your Workflow?</h2>
        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
          Join leading teams already using Morr.ai to boost productivity and streamline operations.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/demo">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

interface UseCaseSectionProps {
  title: string
  description: string
  features: string[]
  benefits: {
    title: string
    description: string
  }[]
  href: string
  imagePosition: 'left' | 'right'
}

function UseCaseSection({ title, description, features, benefits, href, imagePosition }: UseCaseSectionProps) {
  const contentOrder = imagePosition === 'right' ? 'order-1' : 'order-1 md:order-2'
  const imageOrder = imagePosition === 'right' ? 'order-2' : 'order-2 md:order-1'

  return (
    <div className="grid gap-12 md:grid-cols-2 items-center">
      <div className={`space-y-8 ${contentOrder}`}>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Key Features</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-muted-foreground">
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Benefits</h3>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="space-y-1">
                <h4 className="font-medium">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" asChild>
          <Link href={href}>Learn More</Link>
        </Button>
      </div>
      <div className={`rounded-xl bg-muted aspect-video ${imageOrder}`} />
    </div>
  )
}

function TeamCard({ title, description, href }: {
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href}>
      <div className="group h-full rounded-xl border p-6 hover:border-primary transition-colors">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground group-hover:text-foreground transition-colors">
          {description}
        </p>
      </div>
    </Link>
  )
}
