import React from 'react'
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

// Placeholder Logo
const Logo = React.memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
    aria-labelledby="logoTitle"
  >
    <title id="logoTitle">Morr.ai Logo</title>
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
  </svg>
))
Logo.displayName = "Logo"

// Reusable ListItem component for navigation menu items
const ListItem = React.memo(React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none mb-2">{title}</div>
          <p className="text-sm leading-snug text-muted-foreground max-w-[16rem] break-words">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}))
ListItem.displayName = "ListItem"

// Additional Content Component
const AdditionalContentList = React.memo(({ content }: { content: AdditionalContent }) => (
  <div className="p-4">
    <h4 className="mb-2 text-sm font-medium leading-none">{content.title}</h4>
    <ul className="space-y-2">
      {content.items.map((item) => (
        <li key={item.href}>
          <Link 
            href={item.href}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))
AdditionalContentList.displayName = "AdditionalContentList"

// Navigation Item Component
const NavigationItemComponent = React.memo(({ item }: { item: NavigationItemConfig }) => {
  if (item.subItems) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className={cn(
            "flex",
            item.additionalContent ? "w-[40rem]" : "w-[20rem]",
            "max-w-[90vw]"
          )}>
            <ul className="flex-1 p-4 space-y-3 min-w-[20rem]">
              {item.subItems.map((subItem) => (
                <ListItem 
                  key={subItem.href}
                  href={subItem.href}
                  title={subItem.title}
                >
                  {subItem.description}
                </ListItem>
              ))}
            </ul>
            {item.additionalContent && (
              <div className="w-[15rem] border-l">
                <AdditionalContentList content={item.additionalContent} />
              </div>
            )}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem>
      <Link href={item.href!} legacyBehavior passHref>
        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
          {item.title}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
})
NavigationItemComponent.displayName = "NavigationItemComponent"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-bold text-xl">Morr.ai</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex space-x-2">
              {navigationItems.map((item) => (
                <NavigationItemComponent key={item.title} item={item} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Aligned Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/demo">Request Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

// Navigation configuration
interface SubItem {
  title: string
  href: string
  description: string
}

interface AdditionalContentItem {
  title: string
  href: string
}

interface AdditionalContent {
  title: string
  items: AdditionalContentItem[]
}

interface NavigationItemConfig {
  title: string
  href?: string
  subItems?: SubItem[]
  additionalContent?: AdditionalContent
}

const navigationItems: NavigationItemConfig[] = [
  {
    title: "Product",
    subItems: [
      {
        title: "Core Features",
        href: "/features",
        description: "Discover proactive AI, unified search, and real-time insights."
      },
      {
        title: "Integrations",
        href: "/integrations",
        description: "Connect seamlessly with Slack, Google Drive, Salesforce, and more."
      },
      {
        title: "Security & Trust",
        href: "/security",
        description: "Learn about our SOC 2-ready, GDPR-compliant infrastructure."
      }
    ],
    additionalContent: {
      title: "Learn More",
      items: [
        { title: "Product Tour", href: "/product-tour" },
        { title: "How Morr.ai Works", href: "/how-it-works" },
        { title: "Roadmap", href: "/roadmap" }
      ]
    }
  },
  {
    title: "Use Cases",
    subItems: [
      {
        title: "Proactive Meeting Briefs",
        href: "/use-cases/meeting-briefs",
        description: "Arrive prepared with AI-generated summaries and key documents."
      },
      {
        title: "Real-Time Sales Insights",
        href: "/use-cases/sales-insights",
        description: "Access live pipeline data, trends, and next-step recommendations."
      },
      {
        title: "Unified Knowledge Access",
        href: "/use-cases/unified-search",
        description: "Ask any question and get instant answers from all your connected tools."
      },
      {
        title: "Automated Team Updates",
        href: "/use-cases/team-updates",
        description: "Keep everyone in sync with proactive status reports and summaries."
      }
    ],
    additionalContent: {
      title: "By Team",
      items: [
        { title: "For Sales Teams", href: "/teams/sales" },
        { title: "For Product & Ops", href: "/teams/product-ops" },
        { title: "For Leadership", href: "/teams/leadership" },
        { title: "For Onboarding", href: "/teams/onboarding" }
      ]
    }
  },
  {
    title: "Company",
    subItems: [
      {
        title: "About Us",
        href: "/about",
        description: "Our story and mission"
      },
      {
        title: "Careers",
        href: "/careers",
        description: "Join our growing team"
      },
      {
        title: "Blog",
        href: "/blog",
        description: "Latest news and insights"
      }
    ],
    additionalContent: {
      title: "Connect",
      items: [
        { title: "Contact Sales", href: "/contact" },
        { title: "Partner Program", href: "/partners" },
        { title: "Press Kit", href: "/press" }
      ]
    }
  },
  {
    title: "Enterprise",
    href: "/enterprise"
  },
  {
    title: "Pricing",
    href: "/pricing"
  }
] 