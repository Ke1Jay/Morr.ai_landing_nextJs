import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function UnifiedSearchPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Unified Knowledge Access
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Find any information instantly with AI-powered search across all your connected tools and platforms.
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
          value="50%"
          label="Time Saved"
          description="Average reduction in time spent searching for information"
        />
        <StatCard
          value="100+"
          label="Integrations"
          description="Connect with all your favorite tools and platforms"
        />
        <StatCard
          value="95%"
          label="Search Accuracy"
          description="Improved accuracy with AI-powered contextual search"
        />
      </section>

      {/* Key Features */}
      <section className="space-y-16">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Key Features</h2>
        
        <FeatureSection
          title="Cross-Tool Search"
          description="Search across all your connected tools and platforms with a single query."
          features={[
            "Universal search interface",
            "Real-time results",
            "Deep content indexing",
            "File preview support"
          ]}
          imagePosition="right"
        />

        <FeatureSection
          title="Natural Language Processing"
          description="Ask questions in plain English and get accurate, contextual answers."
          features={[
            "Semantic search",
            "Question answering",
            "Context understanding",
            "Multi-language support"
          ]}
          imagePosition="left"
        />

        <FeatureSection
          title="Smart Filters"
          description="Quickly narrow down results with intelligent filtering and sorting options."
          features={[
            "Advanced filtering",
            "Custom categories",
            "Saved searches",
            "Recent activity tracking"
          ]}
          imagePosition="right"
        />

        <FeatureSection
          title="Knowledge Graph"
          description="Understand relationships between documents, people, and topics."
          features={[
            "Content relationships",
            "Topic clustering",
            "Expert identification",
            "Knowledge mapping"
          ]}
          imagePosition="left"
        />
      </section>

      {/* Supported Platforms */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Search Everywhere</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PlatformCard
            title="Documents"
            platforms={[
              "Google Drive",
              "Dropbox",
              "OneDrive",
              "SharePoint"
            ]}
          />
          <PlatformCard
            title="Communication"
            platforms={[
              "Slack",
              "Microsoft Teams",
              "Gmail",
              "Outlook"
            ]}
          />
          <PlatformCard
            title="Project Tools"
            platforms={[
              "Jira",
              "Asana",
              "Trello",
              "Notion"
            ]}
          />
          <PlatformCard
            title="Knowledge Bases"
            platforms={[
              "Confluence",
              "Wiki",
              "GitBook",
              "Custom KB"
            ]}
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-muted rounded-2xl p-12">
        <blockquote className="space-y-8">
          <p className="text-2xl font-medium text-center italic">
            &ldquo;Morr.ai has transformed how we access information. What used to take hours now takes seconds. It&apos;s like having a super-smart assistant who knows where everything is.&rdquo;
          </p>
          <footer className="text-center">
            <p className="font-semibold">Alex Thompson</p>
            <p className="text-muted-foreground">CTO at InnovateCo</p>
          </footer>
        </blockquote>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8">
        <h2 className="text-3xl font-bold tracking-tighter">Ready to Find Everything Instantly?</h2>
        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
          Join thousands of teams using Morr.ai to make their knowledge accessible and actionable.
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

function PlatformCard({ title, platforms }: {
  title: string
  platforms: string[]
}) {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="space-y-2">
        {platforms.map((platform, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-center">
            <span className="mr-2">•</span>
            {platform}
          </li>
        ))}
      </ul>
    </div>
  )
} 