import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function IntegrationsPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Connect Your Favorite Tools
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Morr.ai seamlessly integrates with your existing workflow, bringing all your tools together in one powerful platform.
        </p>
      </section>

      {/* Popular Integrations */}
      <section>
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Popular Integrations</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <IntegrationCard
            title="Slack"
            description="Real-time notifications, command shortcuts, and channel integrations to keep your team in sync."
            features={[
              "Smart notifications",
              "Channel-specific updates",
              "Command shortcuts",
              "Thread synchronization"
            ]}
            href="/integrations/slack"
          />
          <IntegrationCard
            title="Google Drive"
            description="Seamlessly access and search through all your Google Workspace documents and files."
            features={[
              "Document indexing",
              "Real-time search",
              "Version tracking",
              "Permission sync"
            ]}
            href="/integrations/google-drive"
          />
          <IntegrationCard
            title="Salesforce"
            description="Access customer data, track opportunities, and get AI-powered insights for your sales team."
            features={[
              "Contact syncing",
              "Opportunity tracking",
              "Pipeline analytics",
              "Custom workflows"
            ]}
            href="/integrations/salesforce"
          />
        </div>
      </section>

      {/* Integration Categories */}
      <section className="space-y-16">
        <h2 className="text-3xl font-bold tracking-tighter text-center">All Integrations</h2>
        
        <CategorySection
          title="Communication"
          integrations={[
            { name: "Microsoft Teams", href: "/integrations/teams" },
            { name: "Discord", href: "/integrations/discord" },
            { name: "Zoom", href: "/integrations/zoom" },
            { name: "Slack", href: "/integrations/slack" }
          ]}
        />

        <CategorySection
          title="Project Management"
          integrations={[
            { name: "Jira", href: "/integrations/jira" },
            { name: "Asana", href: "/integrations/asana" },
            { name: "Trello", href: "/integrations/trello" },
            { name: "Monday.com", href: "/integrations/monday" }
          ]}
        />

        <CategorySection
          title="Document Management"
          integrations={[
            { name: "Google Drive", href: "/integrations/google-drive" },
            { name: "Dropbox", href: "/integrations/dropbox" },
            { name: "OneDrive", href: "/integrations/onedrive" },
            { name: "Box", href: "/integrations/box" }
          ]}
        />
      </section>

      {/* Build Custom Integration */}
      <section className="text-center space-y-8 bg-muted rounded-2xl p-12">
        <h2 className="text-3xl font-bold tracking-tighter">Need a Custom Integration?</h2>
        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
          Our API makes it easy to build custom integrations for your specific needs.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/api-docs">View API Docs</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function IntegrationCard({ title, description, features, href }: {
  title: string
  description: string
  features: string[]
  href: string
}) {
  return (
    <div className="group rounded-xl border p-6 hover:border-primary transition-colors">
      <Link href={href} className="block space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-muted-foreground">
              <span className="mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  )
}

function CategorySection({ title, integrations }: {
  title: string
  integrations: { name: string; href: string }[]
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {integrations.map((integration) => (
          <Link
            key={integration.name}
            href={integration.href}
            className="flex items-center justify-center p-4 rounded-xl border hover:border-primary transition-colors text-center"
          >
            {integration.name}
          </Link>
        ))}
      </div>
    </div>
  )
} 