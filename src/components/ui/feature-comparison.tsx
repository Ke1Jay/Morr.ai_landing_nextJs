import { Check } from "lucide-react"
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
import { HelpCircle } from "lucide-react"

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
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/30 backdrop-blur-xl" />
      
      <div className="relative">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-primary/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Features</TableHead>
                <TableHead>
                  <Badge variant="outline" className="bg-primary/5">Free</Badge>
                </TableHead>
                <TableHead>
                  <Badge variant="outline" className="bg-primary/5">Base</Badge>
                </TableHead>
                <TableHead>
                  <Badge variant="outline" className="bg-primary/5">Plus</Badge>
                </TableHead>
                <TableHead>
                  <Badge variant="outline" className="bg-primary/5">Premium</Badge>
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>

        <Table>
          <TableBody>
            {features.map((category) => (
              <>
                <TableRow key={`category-${category.category}`}>
                  <TableCell 
                    colSpan={5} 
                    className="bg-primary/5 text-primary font-medium"
                  >
                    {category.category}
                  </TableCell>
                </TableRow>
                {category.items.map((feature) => (
                  <TableRow key={feature.name}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {feature.name}
                        {feature.description && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 text-muted-foreground/40" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{feature.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {typeof feature.free === 'boolean' ? (
                        feature.free ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span className="text-sm">{feature.free}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {typeof feature.base === 'boolean' ? (
                        feature.base ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span className="text-sm">{feature.base}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {typeof feature.plus === 'boolean' ? (
                        feature.plus ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span className="text-sm">{feature.plus}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {typeof feature.premium === 'boolean' ? (
                        feature.premium ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <span className="text-muted-foreground/40">—</span>
                        )
                      ) : (
                        <span className="text-sm">{feature.premium}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end p-4 border-t border-primary/10">
        <Button variant="outline" className="text-primary">
          Download PDF
        </Button>
      </div>
    </Card>
  )
} 