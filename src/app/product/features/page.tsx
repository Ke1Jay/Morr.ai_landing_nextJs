import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function FeaturesPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Powerful Features for Modern Teams
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Explore the comprehensive suite of features that make Morr.ai the leading AI-powered workspace solution.
        </p>
      </section>

      {/* Proactive AI Section */}
      <section id="proactive-ai" className="scroll-mt-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter">Proactive AI Assistant</h2>
            <div className="space-y-4">
              <FeatureDetail
                title="Smart Notifications"
                description="Receive intelligent alerts about important updates, meetings, and tasks before you need them."
              />
              <FeatureDetail
                title="Contextual Recommendations"
                description="Get personalized suggestions based on your workflow, schedule, and team interactions."
              />
              <FeatureDetail
                title="Automated Briefings"
                description="Start your day with AI-generated summaries of key updates and priorities."
              />
            </div>
            <Button variant="outline" asChild>
              <Link href="/demo">See it in Action</Link>
            </Button>
          </div>
          <div className="rounded-xl bg-muted aspect-square" />
        </div>
      </section>

      {/* Unified Search Section */}
      <section id="unified-search" className="scroll-mt-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1 rounded-xl bg-muted aspect-square" />
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter">Unified Search</h2>
            <div className="space-y-4">
              <FeatureDetail
                title="Cross-Platform Search"
                description="Search across all your connected tools and platforms with a single query."
              />
              <FeatureDetail
                title="Natural Language Processing"
                description="Ask questions in plain English and get accurate, contextual answers."
              />
              <FeatureDetail
                title="Smart Filters"
                description="Quickly narrow down results with intelligent filtering and sorting options."
              />
            </div>
            <Button variant="outline" asChild>
              <Link href="/product-tour">Take the Tour</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Real-time Insights Section */}
      <section id="real-time-insights" className="scroll-mt-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter">Real-time Insights</h2>
            <div className="space-y-4">
              <FeatureDetail
                title="Live Analytics"
                description="Monitor key metrics and performance indicators in real-time."
              />
              <FeatureDetail
                title="Trend Analysis"
                description="Identify patterns and trends across your organization&apos;s data."
              />
              <FeatureDetail
                title="Predictive Intelligence"
                description="Anticipate challenges and opportunities with AI-powered forecasting."
              />
            </div>
            <Button variant="outline" asChild>
              <Link href="/demo">Request Demo</Link>
            </Button>
          </div>
          <div className="rounded-xl bg-muted aspect-square" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 bg-muted rounded-2xl p-12">
        <h2 className="text-3xl font-bold tracking-tighter">Ready to Transform Your Workflow?</h2>
        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
          Join thousands of teams already using Morr.ai to streamline their operations and boost productivity.
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

function FeatureDetail({ title, description }: {
  title: string
  description: string
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
} 