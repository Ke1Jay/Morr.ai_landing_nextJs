import React from 'react';
import { Card } from "@/components/ui/card";

export default function SecurityAndFaqPage() {
  const faqs = [
    {
      question: 'How does Morr.ai protect my data?',
      answer: 'We use enterprise-grade encryption (AES-256 at rest, TLS 1.3 in transit), maintain SOC 2 Type II certification, and host our infrastructure in certified data centers with 24/7 monitoring.'
    },
    {
      question: 'Is Morr.ai GDPR compliant?',
      answer: 'Yes, we are fully GDPR compliant. We provide data processing agreements, respect data subject rights, and implement privacy by design principles throughout our platform.'
    },
    {
      question: 'Can I control what data Morr.ai accesses?',
      answer: 'Absolutely. You have granular control over which tools to connect and what data to share. You can disconnect integrations or delete your data at any time.'
    },
    {
      question: 'Does Morr.ai train AI models on my data?',
      answer: 'No, we never use your data to train our AI models. Your data is used only to provide services to you and is kept strictly confidential.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'You can export all your data at any time. If you cancel, your data is retained for 30 days for recovery purposes, then permanently deleted.'
    },
    {
      question: 'Do you support Single Sign-On (SSO)?',
      answer: 'Yes, we support SAML 2.0 SSO with major identity providers including Okta, Azure AD, Google Workspace, and more.'
    },
    {
      question: 'How often do you perform security audits?',
      answer: 'We conduct annual SOC 2 Type II audits, regular penetration testing by third-party security firms, and continuous automated security scanning.'
    },
    {
      question: 'Where is my data stored?',
      answer: 'Data is stored in SOC 2 certified data centers in your region of choice. We support US, EU, and other regions to meet your compliance requirements.'
    },
    {
      question: 'Can I get a Business Associate Agreement (BAA)?',
      answer: 'Yes, we can provide BAAs for customers who need to comply with HIPAA. Contact our sales team to discuss your requirements.'
    },
    {
      question: 'How do you handle data breaches?',
      answer: 'We have incident response procedures in place and will notify affected customers within 72 hours of discovering any breach, in compliance with GDPR and other regulations.'
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
              <span>Security & FAQ</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Security & Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto">
            Your questions about security, privacy, and compliance answered.
          </p>
        </div>

        {/* Security Overview */}
        <Card className="p-8 bg-black/40 backdrop-blur-xl border-primary/10">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary/90">Security Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-3xl">🔒</div>
                <h3 className="font-semibold text-primary/80">Encryption</h3>
                <p className="text-sm text-muted-foreground/70">AES-256 at rest, TLS 1.3 in transit</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">✓</div>
                <h3 className="font-semibold text-primary/80">Certified</h3>
                <p className="text-sm text-muted-foreground/70">SOC 2 Type II, GDPR, ISO 27001</p>
              </div>
              <div className="space-y-2">
                <div className="text-3xl">👁️</div>
                <h3 className="font-semibold text-primary/80">Monitoring</h3>
                <p className="text-sm text-muted-foreground/70">24/7 security monitoring and alerts</p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-primary/90 text-center mb-8">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <Card key={index} className="p-6 bg-black/40 backdrop-blur-xl border-primary/10 hover:border-primary/20 transition-all duration-300">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary/90">{faq.question}</h3>
                <p className="text-muted-foreground/80">{faq.answer}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <Card className="p-8 md:p-12 bg-black/40 backdrop-blur-xl border-primary/10 text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary/90">Still Have Questions?</h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Our security and support teams are here to help. Contact us for more information about our security practices or any other questions.
          </p>
        </Card>
      </div>
    </div>
  );
}

