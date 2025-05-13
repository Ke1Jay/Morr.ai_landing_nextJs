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

// Displays the Morr.ai logo as an SVG.
// React.memo is used for performance optimization, preventing re-renders if props don't change.
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
Logo.displayName = "Logo" // Useful for debugging in React DevTools.

// A reusable component for displaying individual items within the navigation dropdowns.
// It handles styling for hover/focus states and layouts the title and description.
// React.memo and React.forwardRef are used for performance and to correctly pass down refs.
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
            "block select-none rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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

// Component to render the list of links in the 'additional content' section of a dropdown.
// This section typically appears on the right side of the main sub-items.
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

// Dynamically renders a navigation menu item.
// It can either be a direct link or a trigger for a dropdown menu with sub-items
// and an optional additional content section.
const NavigationItemComponent = React.memo(({ item }: { item: NavigationItemConfig }) => {
  if (item.subItems) {
    // Renders a dropdown menu if subItems are present.
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className={cn(
            "flex",
            // Dynamically adjusts width based on the presence of additional content.
            item.additionalContent ? "w-[40rem]" : "w-[20rem]",
            "max-w-[90vw]" // Ensures responsiveness on smaller screens.
          )}>
            <ul className="flex-1 p-4 space-y-3 min-w-[20rem]">
              {item.subItems.map((subItem) => (
                <ListItem 
                  key={subItem.href} // React key for list items.
                  href={subItem.href}
                  title={subItem.title}
                >
                  {subItem.description}
                </ListItem>
              ))}
            </ul>
            {/* Renders the additional content section if defined for the item. */}
            {item.additionalContent && (
              <div className="w-[15rem] bg-muted border border-border rounded-xl">
                <AdditionalContentList content={item.additionalContent} />
              </div>
            )}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  // Renders a simple link if no subItems are present.
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

// The main header component for the website.
// It includes the logo, main navigation menu, and action buttons like 'Sign In' and 'Request Demo'.
// It is designed to be sticky at the top of the page.
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and site title link to homepage */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="font-bold text-xl">Morr.ai</span>
            </Link>
          </div>

          {/* Desktop navigation menu, hidden on smaller screens */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex space-x-2">
              {/* Maps over the navigationItems configuration to render each menu item */}
              {navigationItems.map((item) => (
                <NavigationItemComponent key={item.title} item={item} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Call-to-action buttons aligned to the right */}
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

// TYPE DEFINITIONS AND CONFIGURATION
// These are placed at the bottom as per coding conventions.

// Defines the structure for individual sub-items within a navigation dropdown.
interface SubItem {
  title: string
  href: string
  description: string
}

// Defines the structure for a single link item in the 'additional content' section.
interface AdditionalContentItem {
  title: string
  href: string
}

// Defines the structure for the 'additional content' block in a navigation dropdown.
interface AdditionalContent {
  title: string            // Title for the additional content section (e.g., "By Team").
  items: AdditionalContentItem[] // Array of links within this section.
}

// Defines the overall structure for a main navigation item.
// It can be a simple link (href) or a dropdown with subItems and optional additionalContent.
interface NavigationItemConfig {
  title: string
  href?: string                 // Optional direct link for top-level items without dropdowns.
  subItems?: SubItem[]          // Optional array of sub-items for a dropdown.
  additionalContent?: AdditionalContent // Optional additional content for the dropdown's right side.
}

// Central configuration for the entire navigation menu.
// Defines the structure and content of all main navigation links and their dropdowns.
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