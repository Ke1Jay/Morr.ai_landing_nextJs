import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function SalesInsightsPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Real-Time Sales Insights
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Access live pipeline data, trends, and AI-powered recommendations to close deals faster and smarter.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/demo">See it in Action</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid gap-8 md:grid-cols-3">
        <StatCard
          value="35%"
          label="Higher Win Rates"
          description="Average increase in deal win rates for teams using Morr.ai"
        />
        <StatCard
          value="50%"
          label="Faster Closing"
          description="Reduction in sales cycle length with AI-powered insights"
        />
        <StatCard
          value="90%"
          label="More Accurate"
          description="Forecast accuracy improvement with real-time analytics"
        />
      </section>

      {/* Key Features */}
      <section className="space-y-16">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Key Features</h2>
        
        <FeatureSection
          title="Pipeline Analytics"
          description="Get a real-time view of your sales pipeline with AI-powered insights and predictions."
          features={[
            "Real-time pipeline visualization",
            "Deal stage tracking",
            "Revenue forecasting",
            "Risk assessment"
          ]}
          imagePosition="right"
        />

        <FeatureSection
          title="Deal Insights"
          description="Understand the health and potential of every deal in your pipeline."
          features={[
            "Deal scoring",
            "Engagement analytics",
            "Competitive analysis",
            "Win/loss patterns"
          ]}
          imagePosition="left"
        />

        <FeatureSection
          title="Competitor Tracking"
          description="Stay ahead of the competition with real-time competitive intelligence."
          features={[
            "Competitor mention tracking",
            "Feature comparison",
            "Market positioning",
            "Win/loss analysis"
          ]}
          imagePosition="right"
        />

        <FeatureSection
          title="Smart Recommendations"
          description="Get AI-powered suggestions for next best actions to move deals forward."
          features={[
            "Personalized recommendations",
            "Best practice insights",
            "Timing optimization",
            "Resource allocation"
          ]}
          imagePosition="left"
        />
      </section>

      {/* Integration Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Works With Your Tools</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <IntegrationCard
            title="Salesforce"
            description="Deep integration with Salesforce CRM for complete pipeline visibility."
          />
          <IntegrationCard
            title="HubSpot"
            description="Seamless connection with HubSpot for marketing and sales alignment."
          />
          <IntegrationCard
            title="Slack"
            description="Real-time notifications and updates in your team&apos;s Slack channels."
          />
          <IntegrationCard
            title="Custom CRM"
            description="API integration support for your custom CRM solution."
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-muted rounded-2xl p-12">
        <blockquote className="space-y-8">
          <p className="text-2xl font-medium text-center italic">
            &ldquo;Since implementing Morr.ai&apos;s sales insights, our team has seen a dramatic improvement in win rates and deal velocity. It&apos;s like having a AI-powered sales coach for every deal.&rdquo;
          </p>
          <footer className="text-center">
            <p className="font-semibold">Michael Rodriguez</p>
            <p className="text-muted-foreground">VP of Sales at GrowthTech</p>
          </footer>
        </blockquote>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8">
        <h2 className="text-3xl font-bold tracking-tighter">Ready to Accelerate Your Sales?</h2>
        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
          Join leading sales teams using Morr.ai to close more deals and exceed targets.
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

function IntegrationCard({ title, description }: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border p-6 space-y-3">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
} 