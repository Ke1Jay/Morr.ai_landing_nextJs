import React from 'react';
import { Card } from "@/components/ui/card";

export default function RoadmapPage() {
  const roadmapItems = [
    {
      quarter: 'Q1 2024',
      status: 'Completed',
      items: [
        'Slack integration with smart notifications',
        'Google Workspace (Gmail, Drive, Calendar) integration',
        'Unified search across all connected tools',
        'Meeting briefs and summaries',
        'Basic AI chat capabilities'
      ]
    },
    {
      quarter: 'Q2 2024',
      status: 'In Progress',
      items: [
        'Salesforce and HubSpot CRM integrations',
        'Advanced AI workflows and automation',
        'Relationship intelligence and insights',
        'Custom AI agents',
        'Mobile app (iOS & Android)'
      ]
    },
    {
      quarter: 'Q3 2024',
      status: 'Planned',
      items: [
        'Microsoft Teams integration',
        'Notion and Confluence integration',
        'Advanced analytics and reporting',
        'API for custom integrations',
        'White-label options for enterprises'
      ]
    },
    {
      quarter: 'Q4 2024',
      status: 'Planned',
      items: [
        'Jira and Linear project management integrations',
        'Video call transcription and analysis',
        'Multi-language support',
        'Advanced security features (HIPAA compliance)',
        'On-premise deployment options'
      ]
    }
  ];

  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_65%)]" />
      </div>

      <div className="container relative px-4 md:px-6 py-16 space-y-12 z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary/80">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
              <span>Product Roadmap</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            What&apos;s Coming Next
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto">
            See what we&apos;re building and what&apos;s coming soon. Our roadmap is shaped by your feedback.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="max-w-4xl mx-auto space-y-8 pt-8">
          {roadmapItems.map((item, index) => (
            <Card key={index} className="p-8 bg-black/40 backdrop-blur-xl border-primary/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary/90">{item.quarter}</h2>
                  <span className={`px-4 py-1 rounded-full text-sm ${
                    item.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : item.status === 'In Progress'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <ul className="space-y-3">
                  {item.items.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-muted-foreground/80">
                      <div className="mr-3 mt-1 h-4 w-4 text-primary flex-shrink-0">
                        {item.status === 'Completed' ? '✓' : '•'}
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Feature Request CTA */}
        <Card className="p-8 md:p-12 bg-black/40 backdrop-blur-xl border-primary/10 text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary/90">Have a Feature Request?</h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            We&apos;re always listening to our users. Share your ideas and help shape the future of Morr.ai.
          </p>
          <div className="text-muted-foreground/70 text-sm">
            <p>Note: Dates and features are subject to change based on user feedback and technical requirements.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

