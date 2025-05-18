import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function ProductPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Transform Your Workflow with AI
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Discover how Morr.ai&apos;s intelligent platform can revolutionize your team&apos;s productivity
          with proactive insights and seamless integrations.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/demo">Request Demo</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/product-tour">Take Product Tour</Link>
          </Button>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Core Features</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            title="Proactive AI"
            description="Get ahead with AI-powered insights that anticipate your needs before you ask."
            href="/features#proactive-ai"
          />
          <FeatureCard
            title="Unified Search"
            description="Access all your information from one place with our powerful search capabilities."
            href="/features#unified-search"
          />
          <FeatureCard
            title="Real-time Insights"
            description="Make informed decisions with live data analysis and actionable recommendations."
            href="/features#real-time-insights"
          />
        </div>
      </section>

      {/* Integrations Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Seamless Integrations</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <IntegrationCard
            title="Slack"
            description="Stay in sync with your team through real-time Slack notifications and updates."
            href="/integrations/slack"
          />
          <IntegrationCard
            title="Google Drive"
            description="Access and search through all your Google Drive documents instantly."
            href="/integrations/google-drive"
          />
          <IntegrationCard
            title="Salesforce"
            description="Keep your CRM data at your fingertips with deep Salesforce integration."
            href="/integrations/salesforce"
          />
        </div>
      </section>

      {/* Security Section */}
      <section className="space-y-8 bg-muted rounded-2xl p-8">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Enterprise-Grade Security</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <SecurityFeature
            title="SOC 2 Ready"
            description="Our infrastructure follows strict security protocols and compliance standards."
          />
          <SecurityFeature
            title="GDPR Compliant"
            description="Your data is handled in accordance with global privacy regulations."
          />
        </div>
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/security">Learn More About Security</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ title, description, href }: {
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href}>
      <div className="group rounded-xl border p-6 hover:border-primary transition-colors">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground group-hover:text-foreground transition-colors">
          {description}
        </p>
      </div>
    </Link>
  )
}

function IntegrationCard({ title, description, href }: {
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href}>
      <div className="group rounded-xl border p-6 hover:border-primary transition-colors">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground group-hover:text-foreground transition-colors">
          {description}
        </p>
      </div>
    </Link>
  )
}

function SecurityFeature({ title, description }: {
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
