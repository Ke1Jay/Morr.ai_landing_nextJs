import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function IntegrationsPage() {
  const integrations = [
    { name: 'Slack', category: 'Communication', status: 'Available' },
    { name: 'Gmail', category: 'Email', status: 'Available' },
    { name: 'Google Drive', category: 'Storage', status: 'Available' },
    { name: 'Google Calendar', category: 'Calendar', status: 'Available' },
    { name: 'Salesforce', category: 'CRM', status: 'Available' },
    { name: 'HubSpot', category: 'CRM', status: 'In Progress' },
    { name: 'Microsoft Teams', category: 'Communication', status: 'Coming Soon' },
    { name: 'Outlook', category: 'Email', status: 'Coming Soon' },
    { name: 'OneDrive', category: 'Storage', status: 'Coming Soon' },
    { name: 'Notion', category: 'Notes', status: 'Coming Soon' },
    { name: 'Jira', category: 'Project Management', status: 'Planned' },
    { name: 'Linear', category: 'Project Management', status: 'Planned' }
  ];

  const categories = Array.from(new Set(integrations.map(i => i.category)));

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
              <span>Integrations</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Connect Your Favorite Tools
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto">
            Morr.ai seamlessly integrates with the tools you already use, bringing everything together in one intelligent platform.
          </p>
        </div>

        {/* Integrations by Category */}
        <div className="space-y-12 pt-8">
          {categories.map((category) => (
            <div key={category} className="space-y-6">
              <h2 className="text-2xl font-bold text-primary/90">{category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {integrations
                  .filter(i => i.category === category)
                  .map((integration, index) => (
                    <Card key={index} className="p-6 bg-black/40 backdrop-blur-xl border-primary/10 hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-primary/90">{integration.name}</h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                            integration.status === 'Available'
                              ? 'bg-green-500/20 text-green-400'
                              : integration.status === 'In Progress'
                              ? 'bg-blue-500/20 text-blue-400'
                              : integration.status === 'Coming Soon'
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {integration.status}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Integration CTA */}
        <Card className="p-8 md:p-12 bg-black/40 backdrop-blur-xl border-primary/10 text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary/90">Need a Custom Integration?</h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Don&apos;t see the integration you need? Our API makes it easy to build custom integrations for your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">View API Documentation</Button>
            <Button size="lg" variant="outline">Request Integration</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

