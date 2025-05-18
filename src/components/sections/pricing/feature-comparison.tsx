import React from "react"
import { Check, HelpCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FeatureItem {
  name: string
  description?: string
  free: string | boolean
  base: string | boolean
  plus: string | boolean
  premium: string | boolean
}

const features: { category: string; items: FeatureItem[] }[] = [
  {
    category: "Core Features",
    items: [
      {
        name: "Team members",
        description: "Number of team members that can access the platform",
        free: "1",
        base: "Up to 5",
        plus: "Up to 20",
        premium: "Unlimited"
      },
      {
        name: "AI chat queries",
        description: "Monthly AI-powered chat interactions",
        free: "100/mo",
        base: "1,000/mo",
        plus: "10,000/mo",
        premium: "Unlimited"
      },
      {
        name: "Integrations",
        description: "Number of tool integrations available",
        free: "3",
        base: "10",
        plus: "20",
        premium: "Unlimited"
      }
    ]
  },
  {
    category: "AI Features",
    items: [
      {
        name: "Unified search",
        description: "Search across all your connected tools",
        free: true,
        base: true,
        plus: true,
        premium: true
      },
      {
        name: "Meeting briefs",
        description: "AI-generated meeting summaries and prep",
        free: false,
        base: true,
        plus: true,
        premium: true
      },
      {
        name: "Custom AI workflows",
        description: "Create your own AI-powered automation",
        free: false,
        base: false,
        plus: true,
        premium: true
      },
      {
        name: "Custom AI agents",
        description: "Build and train specialized AI agents",
        free: false,
        base: false,
        plus: false,
        premium: true
      }
    ]
  },
  {
    category: "Collaboration",
    items: [
      {
        name: "Shared workspaces",
        description: "Collaborative spaces for teams",
        free: "1",
        base: "3",
        plus: "10",
        premium: "Unlimited"
      },
      {
        name: "Knowledge sharing",
        description: "Share insights and documentation",
        free: true,
        base: true,
        plus: true,
        premium: true
      },
      {
        name: "Access controls",
        description: "Role-based access management",
        free: false,
        base: true,
        plus: true,
        premium: true
      }
    ]
  },
  {
    category: "Support",
    items: [
      {
        name: "Support level",
        free: "Community",
        base: "Email",
        plus: "Priority",
        premium: "Dedicated"
      },
      {
        name: "SLA guarantee",
        description: "Response time guarantee",
        free: false,
        base: false,
        plus: true,
        premium: true
      },
      {
        name: "Training sessions",
        description: "Onboarding and training calls",
        free: false,
        base: "1 session",
        plus: "3 sessions",
        premium: "Unlimited"
      }
    ]
  }
]

interface FeatureComparisonProps {
  className?: string
}

export function FeatureComparison({ className }: FeatureComparisonProps) {
  return (
    <Card className={cn("relative overflow-hidden border-none bg-transparent", className)}>
      <div className="absolute inset-0 " />
      
      <div className="relative">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
            <TableRow className="border-b border-primary/10 hover:bg-transparent">
              <TableHead className="w-[300px]">Features</TableHead>
              <TableHead className="text-center w-[140px]">
                <div className="flex flex-col items-center gap-1">
                  <Badge variant="outline" className="bg-primary/5 w-20 font-normal">
                    Free
                  </Badge>
                  <span className="text-xs text-muted-foreground/60">Get Started</span>
                </div>
              </TableHead>
              <TableHead className="text-center w-[140px]">
                <div className="flex flex-col items-center gap-1">
                  <Badge variant="outline" className="bg-primary/5 w-20 font-normal">
                    Base
                  </Badge>
                  <span className="text-xs text-muted-foreground/60">Most Popular</span>
                </div>
              </TableHead>
              <TableHead className="text-center w-[140px]">
                <div className="flex flex-col items-center gap-1">
                  <Badge variant="outline" className="bg-primary/5 w-20 font-normal">
                    Plus
                  </Badge>
                  <span className="text-xs text-muted-foreground/60">Scale Up</span>
                </div>
              </TableHead>
              <TableHead className="text-center w-[140px]">
                <div className="flex flex-col items-center gap-1 relative">
                  <Badge variant="outline" className="bg-primary/5 w-20 font-normal">
                    Premium
                  </Badge>
                  <span className="text-xs text-muted-foreground/60">Enterprise</span>
                  <div className="absolute -top-1 -right-1">
                    <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((category) => (
              <React.Fragment key={`category-${category.category}`}>
                <TableRow className="hover:bg-transparent">
                  <TableCell 
                    colSpan={5} 
                    className="bg-primary/5 text-primary font-medium py-4"
                  >
                    {category.category}
                  </TableCell>
                </TableRow>
                {category.items.map((feature) => (
                  <TableRow 
                    key={feature.name}
                    className="group transition-colors hover:bg-primary/[0.02] border-primary/5"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {feature.name}
                        {feature.description && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary/40 transition-colors" />
                              </TooltipTrigger>
                              <TooltipContent side="right" className="max-w-[300px]">
                                <p>{feature.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                    {[feature.free, feature.base, feature.plus, feature.premium].map((value, index) => (
                      <TableCell key={index} className="text-center">
                        {typeof value === 'boolean' ? (
                          value ? (
                            <div className="flex justify-center">
                              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground/40">—</span>
                          )
                        ) : (
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">{value}</span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center p-4 mt-6 border-t border-primary/10">
        <p className="text-sm text-muted-foreground/60">
          Need help choosing? Contact our sales team
        </p>
        <Button variant="outline" className="text-primary group">
          <span>Download PDF</span>
          <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">↓</div>
        </Button>
      </div>
    </Card>
  )
} 