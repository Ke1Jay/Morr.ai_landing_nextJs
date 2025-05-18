import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function SecurityPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Enterprise-Grade Security
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Your data security is our top priority. Morr.ai is built with enterprise-grade security features and compliance standards.
        </p>
      </section>

      {/* Security Features Grid */}
      <section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <SecurityCard
            title="Data Encryption"
            description="Industry-standard encryption at rest and in transit ensures your data remains secure."
            features={[
              "AES-256 encryption at rest",
              "TLS 1.3 for data in transit",
              "End-to-end encryption",
              "Regular security audits"
            ]}
          />
          <SecurityCard
            title="Access Control"
            description="Granular access controls and authentication methods to protect your organization."
            features={[
              "Role-based access control",
              "SSO integration",
              "2FA/MFA support",
              "API key management"
            ]}
          />
          <SecurityCard
            title="Compliance"
            description="Meet industry standards and regulatory requirements with our compliance certifications."
            features={[
              "SOC 2 Type II",
              "GDPR compliance",
              "HIPAA compliance",
              "ISO 27001"
            ]}
          />
        </div>
      </section>

      {/* Detailed Security Sections */}
      <section className="space-y-16">
        <SecuritySection
          title="Data Protection"
          description="We implement multiple layers of security to protect your sensitive information."
          details={[
            {
              title: "Encryption Everywhere",
              description: "All data is encrypted at rest and in transit using industry-standard protocols."
            },
            {
              title: "Secure Infrastructure",
              description: "Our infrastructure is hosted in SOC 2 certified data centers with 24/7 monitoring."
            },
            {
              title: "Regular Backups",
              description: "Automated backups with point-in-time recovery capabilities."
            }
          ]}
        />

        <SecuritySection
          title="Authentication & Access"
          description="Robust authentication and access control mechanisms to prevent unauthorized access."
          details={[
            {
              title: "Single Sign-On",
              description: "Support for SAML 2.0 and popular SSO providers like Okta and Azure AD."
            },
            {
              title: "Multi-Factor Authentication",
              description: "Optional 2FA/MFA for additional security using authenticator apps or hardware keys."
            },
            {
              title: "Activity Monitoring",
              description: "Detailed audit logs of all user and system activities."
            }
          ]}
        />

        <SecuritySection
          title="Compliance & Certifications"
          description="We maintain strict compliance with international security standards and regulations."
          details={[
            {
              title: "SOC 2 Compliance",
              description: "Annual SOC 2 Type II audits ensuring operational excellence."
            },
            {
              title: "GDPR Framework",
              description: "Comprehensive data protection measures following GDPR requirements."
            },
            {
              title: "Regular Audits",
              description: "Third-party security assessments and penetration testing."
            }
          ]}
        />
      </section>

      {/* Security Whitepaper CTA */}
      <section className="text-center space-y-8 bg-muted rounded-2xl p-12">
        <h2 className="text-3xl font-bold tracking-tighter">Download Security Whitepaper</h2>
        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
          Get detailed information about our security practices, infrastructure, and compliance standards.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/security/whitepaper">Download Whitepaper</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Security Team</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function SecurityCard({ title, description, features }: {
  title: string
  description: string
  features: string[]
}) {
  return (
    <div className="rounded-xl border p-6">
      <div className="space-y-4">
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
      </div>
    </div>
  )
}

function SecuritySection({ title, description, details }: {
  title: string
  description: string
  details: { title: string; description: string }[]
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tighter">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {details.map((detail, index) => (
          <div key={index} className="space-y-2">
            <h3 className="font-semibold">{detail.title}</h3>
            <p className="text-sm text-muted-foreground">{detail.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 