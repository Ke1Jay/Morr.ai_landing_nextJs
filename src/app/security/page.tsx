import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SecurityPage() {
  const securityFeatures = [
    {
      title: 'Enterprise Encryption',
      description: 'AES-256 encryption at rest and TLS 1.3 in transit',
      icon: '🔒'
    },
    {
      title: 'SOC 2 Type II',
      description: 'Independently audited security controls',
      icon: '✓'
    },
    {
      title: 'GDPR Compliant',
      description: 'Full compliance with EU data protection regulations',
      icon: '🇪🇺'
    },
    {
      title: 'SSO Integration',
      description: 'SAML 2.0 support with major identity providers',
      icon: '🔐'
    },
    {
      title: 'Role-Based Access',
      description: 'Granular permission controls for your organization',
      icon: '👥'
    },
    {
      title: '24/7 Monitoring',
      description: 'Continuous security monitoring and threat detection',
      icon: '👁️'
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
              <span>Security</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Enterprise-Grade Security
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto">
            Your data security and privacy are our top priorities. We implement industry-leading standards to protect your information.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {securityFeatures.map((feature, index) => (
            <Card key={index} className="p-6 bg-black/40 backdrop-blur-xl border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="space-y-3">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary/90">{feature.title}</h3>
                <p className="text-muted-foreground/70">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Detailed Security Information */}
        <div className="max-w-4xl mx-auto space-y-8 pt-8">
          <Card className="p-8 bg-black/40 backdrop-blur-xl border-primary/10">
            <h2 className="text-2xl font-bold text-primary/90 mb-4">Data Protection</h2>
            <div className="space-y-4 text-muted-foreground/80">
              <p>
                All data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit. We use industry-standard security protocols to ensure your data remains private and secure.
              </p>
              <p>
                Our infrastructure is hosted in SOC 2 Type II certified data centers with 24/7 monitoring, automated threat detection, and regular security audits by independent third parties.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-black/40 backdrop-blur-xl border-primary/10">
            <h2 className="text-2xl font-bold text-primary/90 mb-4">Compliance & Certifications</h2>
            <div className="space-y-4 text-muted-foreground/80">
              <p>
                Morr.ai is fully compliant with GDPR, CCPA, and other major data protection regulations. We maintain SOC 2 Type II certification and undergo regular third-party security assessments.
              </p>
              <p>
                Our privacy policy is transparent about how we collect, use, and protect your data. We never sell your data to third parties and give you full control over your information.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-black/40 backdrop-blur-xl border-primary/10">
            <h2 className="text-2xl font-bold text-primary/90 mb-4">Access Control</h2>
            <div className="space-y-4 text-muted-foreground/80">
              <p>
                Implement role-based access controls with granular permissions for your organization. Support for SSO with major identity providers including Okta, Azure AD, and Google Workspace.
              </p>
              <p>
                Multi-factor authentication (MFA) is available for all users. Detailed audit logs track all user activity and system events for compliance and security monitoring.
              </p>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <Card className="p-8 md:p-12 bg-black/40 backdrop-blur-xl border-primary/10 text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary/90">Questions About Security?</h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Our security team is here to answer your questions and provide detailed information about our security practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Download Security Whitepaper</Button>
            <Button size="lg" variant="outline">Contact Security Team</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

