import React from 'react'

// Placeholder icons (replace with actual icons or SVGs later)
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
    <circle cx="12" cy="12" r="10" />
  </svg>
)

export function CoreFeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">⚙️ Key Features of Morr.ai</h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2">
          {/* Feature 1: Unified Search & AI Chat */}
          <div className="grid gap-2 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center gap-2">
              <PlaceholderIcon className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">🔍 Unified Search & AI Chat</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Ask anything. Get clear answers immediately—from Slack, Google Drive, Notion, CRM platforms, and more.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 space-y-1 mt-2">
              <li>&quot;Summarize Q2 product updates.&quot;</li>
              <li>&quot;What did John say about pricing last week?&quot;</li>
              <li>&quot;What&apos;s the latest on the Acme deal?&quot;</li>
            </ul>
          </div>

          {/* Feature 2: Real-Time Insights */}
          <div className="grid gap-2 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
             <div className="flex items-center gap-2">
              <PlaceholderIcon className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">📊 Real-Time Insights, Delivered Proactively</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 space-y-1 mt-2">
              <li>Morr.ai delivers meeting briefs ahead of time</li>
              <li>Up-to-the-minute sales insights</li>
              <li>Project status updates without asking</li>
            </ul>
          </div>

          {/* Feature 3: Automated, Proactive AI Workflows */}
          <div className="grid gap-2 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center gap-2">
              <PlaceholderIcon className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">🤖 Automated, Proactive AI Workflows</h3>
            </div>
            <ul className="list-disc list-inside text-sm text-muted-foreground pl-4 space-y-1 mt-2">
              <li>Generates meeting briefs automatically</li>
              <li>Flags overlooked tasks</li>
              <li>Prepares weekly team updates</li>
              <li>Delivers reports proactively</li>
            </ul>
          </div>

          {/* Feature 4: Seamless Integrations */}
          <div className="grid gap-2 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center gap-2">
              <PlaceholderIcon className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">🔗 Seamless Integrations</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Works with Slack, Google Drive, Notion, Pipedrive, HubSpot, Salesforce, Jira, Asana, Trello—and more.
              No workflow changes required.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 