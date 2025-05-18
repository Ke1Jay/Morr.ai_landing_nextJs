import { cn } from "@/lib/utils"
import Link from "next/link"
import { Twitter, Linkedin, FileText, Mail } from "lucide-react"
import MorraiLogo from "@/components/icons/morr-ai/morrai-logo"

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
}

interface FooterSectionProps {
  title: string
  children: React.ReactNode
}

function FooterLink({ href, children, external }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground transition-colors"
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {children}
    </Link>
  )
}

function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold" id={`footer-${title.toLowerCase()}`}>
        {title}
      </h3>
      <nav
        className="mt-3 flex flex-col space-y-2 text-sm"
        aria-labelledby={`footer-${title.toLowerCase()}`}
      >
        {children}
      </nav>
    </div>
  )
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full bg-background/10 p-2 text-muted-foreground",
        "hover:bg-background/20 hover:text-foreground transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="contentinfo">
      <div className="mx-auto max-w-screen-xl px-6 py-12">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div>
            <Link href="/" className="inline-block" aria-label="Morr.ai Home">
              <MorraiLogo className="h-8 w-auto" aria-hidden="true" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              The first truly proactive AI agent that understands what you need and acts on it.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <SocialLink href="https://twitter.com/morrai" icon={Twitter} label="Follow us on Twitter" />
              <SocialLink href="https://linkedin.com/company/morrai" icon={Linkedin} label="Connect with us on LinkedIn" />
              <SocialLink href="/blog" icon={FileText} label="Read our blog" />
              <SocialLink href="mailto:contact@morr.ai" icon={Mail} label="Contact us via email" />
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4 md:gap-8 lg:gap-16">
            <FooterSection title="Product">
              <FooterLink href="/product-tour">Product Tour</FooterLink>
              <FooterLink href="/how-it-works">How It Works</FooterLink>
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/integrations">Integrations</FooterLink>
            </FooterSection>

            <FooterSection title="Solutions">
              <FooterLink href="/solutions/sales">Sales Teams</FooterLink>
              <FooterLink href="/solutions/product">Product & Ops</FooterLink>
              <FooterLink href="/solutions/leadership">Leadership</FooterLink>
              <FooterLink href="/solutions/startups">Startups</FooterLink>
            </FooterSection>

            <FooterSection title="Company">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterSection>

            <FooterSection title="Legal">
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
              <FooterLink href="/security">Security</FooterLink>
              <FooterLink href="/gdpr">GDPR</FooterLink>
            </FooterSection>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="mt-12 grid grid-cols-1 md:grid-cols-2 items-center gap-4 border-t pt-8 text-xs text-muted-foreground"
          aria-label="Footer bottom section"
        >
          <p>© {new Date().getFullYear()} Morr.ai Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 md:justify-end" aria-label="Security certifications">
            <span>SOC 2-ready</span>
            <span aria-hidden="true">•</span>
            <span>End-to-end encryption</span>
            <span aria-hidden="true">•</span>
            <span>GDPR-compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 