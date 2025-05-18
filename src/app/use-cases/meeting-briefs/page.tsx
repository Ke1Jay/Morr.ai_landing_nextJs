import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function MeetingBriefsPage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Proactive Meeting Briefs
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
          Never walk into a meeting unprepared again. Get AI-generated summaries and key documents before every meeting.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/demo">Try it Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </section>

      {/* How it Works */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold tracking-tighter text-center">How it Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            number={1}
            title="Connect Your Calendar"
            description="Integrate with Google Calendar, Outlook, or any other calendar system."
          />
          <StepCard
            number={2}
            title="AI Analyzes Context"
            description="Our AI scans related documents, previous meetings, and participant information."
          />
          <StepCard
            number={3}
            title="Get Instant Briefs"
            description="Receive comprehensive briefing materials before every meeting."
          />
        </div>
      </section>

      {/* Key Features */}
      <section className="space-y-16">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Key Features</h2>
        
        <FeatureSection
          title="Smart Calendar Integration"
          description="Seamlessly connects with your existing calendar to automatically prepare for upcoming meetings."
          features={[
            "Multi-calendar support",
            "Recurring meeting intelligence",
            "Participant availability tracking",
            "Meeting series context"
          ]}
          imagePosition="right"
        />

        <FeatureSection
          title="Automated Document Gathering"
          description="Automatically collects and organizes all relevant documents and information for your meetings."
          features={[
            "Smart document discovery",
            "Cross-tool search",
            "Version tracking",
            "Attachment organization"
          ]}
          imagePosition="left"
        />

        <FeatureSection
          title="Key Points Summarization"
          description="AI-powered summaries of important information and action items from previous meetings."
          features={[
            "Meeting history analysis",
            "Action item tracking",
            "Decision summaries",
            "Follow-up reminders"
          ]}
          imagePosition="right"
        />

        <FeatureSection
          title="Participant Insights"
          description="Get valuable context about meeting participants and their roles."
          features={[
            "Attendee profiles",
            "Interaction history",
            "Common topics",
            "Relationship mapping"
          ]}
          imagePosition="left"
        />
      </section>

      {/* Benefits Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold tracking-tighter text-center">Benefits</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <BenefitCard
            title="70% Less Prep Time"
            description="Reduce meeting preparation time dramatically with automated briefing materials."
          />
          <BenefitCard
            title="Better Decisions"
            description="Make informed decisions with all relevant context at your fingertips."
          />
          <BenefitCard
            title="Perfect Organization"
            description="Keep all meeting-related documents and notes in one centralized place."
          />
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-muted rounded-2xl p-12">
        <blockquote className="space-y-8">
          <p className="text-2xl font-medium text-center italic">
            &ldquo;Morr.ai&apos;s meeting briefs have transformed how our team prepares for meetings. We&apos;re more productive and better informed than ever before.&rdquo;
          </p>
          <footer className="text-center">
            <p className="font-semibold">Sarah Chen</p>
            <p className="text-muted-foreground">Product Director at TechCorp</p>
          </footer>
        </blockquote>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8">
        <h2 className="text-3xl font-bold tracking-tighter">Ready to Transform Your Meetings?</h2>
        <p className="mx-auto max-w-[600px] text-lg text-muted-foreground">
          Join thousands of professionals who use Morr.ai to make every meeting more productive.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/demo">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function StepCard({ number, title, description }: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="space-y-4 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <span className="text-xl font-bold text-primary">{number}</span>
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function FeatureSection({ title, description, features, imagePosition }: {
  title: string
  description: string
  features: string[]
  imagePosition: 'left' | 'right'
}) {
  const contentOrder = imagePosition === 'right' ? 'order-1' : 'order-1 md:order-2'
  const imageOrder = imagePosition === 'right' ? 'order-2' : 'order-2 md:order-1'

  return (
    <div className="grid gap-12 md:grid-cols-2 items-center">
      <div className={`space-y-6 ${contentOrder}`}>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold tracking-tighter">{title}</h3>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-muted-foreground">
              <span className="mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className={`rounded-xl bg-muted aspect-video ${imageOrder}`} />
    </div>
  )
}

function BenefitCard({ title, description }: {
  title: string
  description: string
}) {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
} 