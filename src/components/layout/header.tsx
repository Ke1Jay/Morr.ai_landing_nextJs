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
const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" /> {/* Simple placeholder */} 
  </svg>
)

// Reusable ListItem component for navigation menu items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
          <span className="font-bold inline-block">Morr.ai</span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex flex-1">
          <NavigationMenuList>
            {/* Product Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <ListItem href="/product-tour" title="Product Tour">
                    A visual or interactive explanation of core features.
                  </ListItem>
                  <ListItem href="/how-it-works" title="How It Works">
                    Technical overview of AI workflows and integrations.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Resources Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                 <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                   <ListItem href="/security-and-faq" title="Security & FAQ">
                    Details about SOC 2, GDPR, data policies, and FAQs.
                  </ListItem>
                  <ListItem href="/blog" title="Blog">
                    Optional content marketing hub.
                  </ListItem>
                 </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Example Simple Link (if needed later) */}
            {/* <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Aligned Button */}
        <div className="flex flex-1 items-center justify-end space-x-4">
           <Button asChild> 
             <Link href="/demo">Request a Demo</Link>
           </Button>
           {/* Add Mobile Menu Trigger Here later */}
        </div>
      </div>
    </header>
  )
} 