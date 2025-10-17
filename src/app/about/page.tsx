import React from 'react';
import { Card } from "@/components/ui/card";

export default function AboutPage() {
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
              <span>About Us</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Building the Future of AI-Powered Productivity
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto">
            Morr.ai helps teams unlock their collective intelligence by making all their knowledge instantly accessible and actionable.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 bg-black/40 backdrop-blur-xl border-primary/10">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary/90 mb-4">Our Mission</h2>
              <p className="text-muted-foreground/80 text-lg leading-relaxed">
                We believe that the best insights often get lost in the noise of daily communication. 
                Our mission is to help teams surface the right information at the right time, 
                enabling better decisions and stronger collaboration.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-primary/90 mb-4">What We Do</h2>
              <p className="text-muted-foreground/80 text-lg leading-relaxed">
                Morr.ai connects all your team&apos;s tools and data sources, providing intelligent insights 
                and automating routine tasks. From unified search to AI-powered meeting briefs, 
                we help teams work smarter and stay focused on what matters most.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary/90 mb-4">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary/80">Privacy First</h3>
                  <p className="text-muted-foreground/70">
                    Your data is yours. We prioritize security and privacy in everything we build.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary/80">Simple & Powerful</h3>
                  <p className="text-muted-foreground/70">
                    Complex problems deserve elegant solutions that anyone can use.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary/80">Team Success</h3>
                  <p className="text-muted-foreground/70">
                    We measure our success by the impact we create for teams worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

