import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TeamsPage() {
  const teamBenefits = [
    {
      title: 'Sales Teams',
      description: 'Close deals faster with AI-powered insights',
      features: [
        'Automatic CRM updates from emails and meetings',
        'Deal intelligence and risk alerts',
        'Relationship mapping and insights',
        'Competitive intelligence gathering'
      ]
    },
    {
      title: 'Marketing Teams',
      description: 'Create better campaigns with data-driven insights',
      features: [
        'Campaign performance tracking',
        'Customer sentiment analysis',
        'Content discovery and research',
        'Collaboration across tools'
      ]
    },
    {
      title: 'Product Teams',
      description: 'Build better products with unified insights',
      features: [
        'Customer feedback aggregation',
        'Feature request tracking',
        'Cross-functional collaboration',
        'Product analytics insights'
      ]
    },
    {
      title: 'Executive Teams',
      description: 'Make informed decisions with real-time intelligence',
      features: [
        'Company-wide insights dashboard',
        'Strategic decision support',
        'Key metrics monitoring',
        'Risk and opportunity detection'
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
              <span>For Teams</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Built for Every Team
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto">
            Whether you&apos;re in sales, marketing, product, or leadership, Morr.ai adapts to your team&apos;s unique needs.
          </p>
        </div>

        {/* Team Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8 pt-8">
          {teamBenefits.map((team, index) => (
            <Card key={index} className="p-8 bg-black/40 backdrop-blur-xl border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-primary/90">{team.title}</h2>
                  <p className="text-lg text-muted-foreground/80">{team.description}</p>
                </div>
                <ul className="space-y-3">
                  {team.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-muted-foreground/70">
                      <div className="mr-3 mt-1 h-4 w-4 text-primary flex-shrink-0">✓</div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Success Story */}
        <Card className="p-8 md:p-12 bg-black/40 backdrop-blur-xl border-primary/10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="text-4xl mb-4">💡</div>
            <blockquote className="text-xl md:text-2xl text-muted-foreground/80 italic">
              &quot;Morr.ai has transformed how our teams collaborate. We&apos;ve seen a 40% increase in productivity and our sales cycle has shortened by 2 weeks on average.&quot;
            </blockquote>
            <div className="space-y-1">
              <p className="font-semibold text-primary/90">Sarah Chen</p>
              <p className="text-sm text-muted-foreground/70">VP of Operations, TechCorp</p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Card className="p-8 md:p-12 bg-black/40 backdrop-blur-xl border-primary/10 text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary/90">Ready to Transform Your Team?</h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Join thousands of teams already using Morr.ai to work smarter and achieve more together.
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

