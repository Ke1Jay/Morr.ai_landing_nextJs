import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Connect Your Tools',
      description: 'Integrate all your workplace tools in minutes. Morr.ai supports Slack, Gmail, Drive, CRM systems, and more.',
      details: ['One-click OAuth integration', 'Secure permission management', 'Real-time data sync']
    },
    {
      number: '02',
      title: 'AI Learns Your Context',
      description: 'Our AI analyzes your workflows, meetings, and communications to understand your team\'s unique patterns.',
      details: ['Privacy-first learning', 'Contextual understanding', 'Continuous improvement']
    },
    {
      number: '03',
      title: 'Get Proactive Insights',
      description: 'Receive intelligent recommendations, automated summaries, and actionable insights when you need them.',
      details: ['Smart notifications', 'Meeting briefs', 'Relationship insights']
    },
    {
      number: '04',
      title: 'Search Everything',
      description: 'Use natural language to search across all your tools simultaneously. Find what you need instantly.',
      details: ['Unified search', 'Natural language queries', 'Smart filtering']
    }
  ];

  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_65%)]" />
      </div>

      <div className="container relative px-4 md:px-6 py-16 space-y-16 z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary/80">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
              <span>How It Works</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Simple Setup, Powerful Results
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto">
            Get up and running with Morr.ai in minutes. Here&apos;s how our AI-powered platform transforms your workflow.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <Card key={index} className="p-8 bg-black/40 backdrop-blur-xl border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
                <div className="text-6xl font-bold text-primary/20">{step.number}</div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-primary/90">{step.title}</h2>
                  <p className="text-lg text-muted-foreground/80">{step.description}</p>
                  <div className="grid md:grid-cols-3 gap-4 pt-4">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground/70">
                        <div className="mr-2 h-4 w-4 text-primary">✓</div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="p-8 md:p-12 bg-black/40 backdrop-blur-xl border-primary/10 text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary/90">Ready to Transform Your Workflow?</h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Join thousands of teams already using Morr.ai to work smarter and achieve more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Start Free Trial</Button>
            <Button size="lg" variant="outline">Schedule Demo</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

