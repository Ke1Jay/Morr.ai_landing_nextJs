import React from 'react'
import Link from 'next/link'

// Placeholder icons
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> {/* Example: Facebook/Meta Icon */}
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-background p-6 md:py-12 w-full">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold">Morr.ai</h3>
          {/* Add tagline or short description if desired */}
          <p className="text-muted-foreground">© {new Date().getFullYear()} Morr.ai Inc.</p> 
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Product</h3>
          <Link href="/product-tour" className="hover:underline">Product Tour</Link>
          <Link href="/how-it-works" className="hover:underline">How It Works</Link>
          {/* Add more links as needed */}
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Resources</h3>
          <Link href="/security-and-faq" className="hover:underline">Security & FAQ</Link>
          <Link href="/blog" className="hover:underline">Blog</Link> 
          {/* Add more links as needed */}
        </div>
         <div className="grid gap-1">
          <h3 className="font-semibold">Company</h3>
          {/* Add About Us, Careers etc. links */}
           <Link href="#" className="hover:underline">Contact Us</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          {/* Add Terms, Privacy etc. links */}
          <Link href="#" className="hover:underline">Privacy Policy</Link>
           <Link href="#" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
       <div className="container max-w-7xl mt-8 flex justify-between items-center">
         <div className="text-xs text-muted-foreground">
             {/* Optional additional footer text */}
         </div>
         {/* Social Links from copyright.mdc - Use actual icons */}
         <div className="flex gap-4">
            <Link href="#" aria-label="LinkedIn">
              <PlaceholderIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
             <Link href="#" aria-label="Twitter">
              <PlaceholderIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
             <Link href="#" aria-label="Blog Link">
               <PlaceholderIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Link>
         </div>
       </div>
    </footer>
  )
} 