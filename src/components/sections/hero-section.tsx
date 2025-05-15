import React from 'react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  SlackIcon, 
  DriveIcon, 
  FirefliesIcon, 
  NotionIcon, 
  PipedriveIcon 
} from "@/components/icons"

// Enhanced Tool Icon component with logo
const ToolIcon = ({ name, icon: Icon, delay = 0 }: { 
  name: string, 
  icon: React.ComponentType<{ className?: string }>, 
  delay?: number 
}) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black/40 backdrop-blur-xl",
        "border border-primary/20 shadow-lg shadow-primary/5 animate-float hover:border-primary/40 transition-colors",
        delay ? `delay-${delay}` : ""
      )}
    >
      <div className="flex items-center justify-center w-6 h-6 shrink-0">
        <Icon className="w-full h-full text-primary/80" />
      </div>
      <span className="text-sm font-medium text-primary/80">{name}</span>
    </div>
  )
}

// Data point component
const DataPoint = ({ value, label, className }: { value: string, label: string, className?: string }) => (
  <div className={cn("flex flex-col items-start gap-1", className)}>
    <div className="text-[2rem] font-bold tracking-tight text-[#00FF9D]">{value}</div>
    <div className="text-sm text-[#00FF9D]/70">{label}</div>
  </div>
)

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_65%)]" />
      </div>
      
      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <div className="container relative px-4 md:px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <div className="inline-block">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary/80">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
                  <span>AI that works before you ask</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Work Smarter.<br />
                <span className="text-primary/90">Stay Ahead.</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground/80 md:text-xl leading-relaxed">
                Morr.ai connects seamlessly with your existing tools, learns your workflow, and proactively anticipates your needs. From preparing meeting briefs to delivering real-time insights and automating tasks.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden">
                <span className="relative z-10">Get Early Access</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary/20 hover:bg-primary/5">
                Request Demo
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-secondary/10 hover:bg-secondary/20">
                Join Waitlist
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-8 border-t border-primary/10">
              <p className="text-sm text-muted-foreground/60 mb-4">Trusted by forward-thinking teams</p>
              <div className="flex items-center gap-6">
                <div className="h-8 w-24 bg-primary/5 rounded animate-pulse" />
                <div className="h-8 w-24 bg-primary/5 rounded animate-pulse delay-150" />
                <div className="h-8 w-24 bg-primary/5 rounded animate-pulse delay-300" />
              </div>
            </div>
          </div>

          {/* Interactive Visual */}
          <div className="relative lg:block">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/40 backdrop-blur-3xl border border-primary/10 shadow-[0_0_50px_-12px] shadow-primary/20">
              {/* Grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,75,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,75,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
              
              {/* Tool Icons */}
              <div className="absolute inset-0">
                {/* Top row */}
                <div className="absolute top-[8%] left-[5%]">
                  <ToolIcon name="Slack" icon={SlackIcon} />
                </div>
                <div className="absolute top-[12%] right-[8%]">
                  <ToolIcon name="Drive" icon={DriveIcon} delay={150} />
                </div>
                
                {/* Middle row */}
                <div className="absolute top-[40%] right-[5%]">
                  <ToolIcon name="Fireflies" icon={FirefliesIcon} delay={300} />
                </div>
                
                {/* Bottom row */}
                <div className="absolute bottom-[15%] left-[8%]">
                  <ToolIcon name="Notion" icon={NotionIcon} delay={450} />
                </div>
                <div className="absolute bottom-[10%] right-[10%]">
                  <ToolIcon name="Pipedrive" icon={PipedriveIcon} delay={600} />
                </div>
              </div>

              {/* Data Points */}
              <div className="absolute inset-0">
                <div className="absolute top-[15%] left-[25%]">
                  <DataPoint value="+45%" label="Efficiency" />
                </div>
                <div className="absolute top-[30%] right-[25%]">
                  <DataPoint value="2.5x" label="Faster Decisions" />
                </div>
                <div className="absolute bottom-[25%] left-[30%]">
                  <DataPoint value="-60%" label="Meeting Prep Time" />
                </div>
              </div>

              {/* Central Hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Outer rings */}
                  <div className="absolute -inset-32 rounded-full border border-[#00FF9D]/10 animate-[spin_20s_linear_infinite]">
                    <div className="absolute h-2 w-2 bg-[#00FF9D] rounded-full -top-1 left-1/2 transform -translate-x-1/2 blur-[2px]" />
                  </div>
                  <div className="absolute -inset-48 rounded-full border border-[#00FF9D]/5 animate-[spin_30s_linear_infinite_reverse]">
                    <div className="absolute h-2 w-2 bg-[#00FF9D] rounded-full -top-1 left-1/2 transform -translate-x-1/2 blur-[2px]" />
                  </div>
                  
                  {/* Core */}
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 bg-[#00FF9D]/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#00FF9D]/30 to-transparent backdrop-blur-xl border border-[#00FF9D]/20 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#00FF9D]/40 to-[#00FF9D]/10 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#00FF9D] shadow-[0_0_15px] shadow-[#00FF9D]/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {/* Status Card 1 */}
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-xl border border-[#00FF9D]/10 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00FF9D]/20 flex items-center justify-center shadow-[0_0_15px] shadow-[#00FF9D]/20">
                    <div className="w-5 h-5 rounded-full bg-[#00FF9D] animate-ping" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-[#00FF9D]">Real-time insights</p>
                    <p className="text-sm text-[#00FF9D]/50">Processing data...</p>
                  </div>
                </div>
              </div>

              {/* Status Card 2 */}
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-xl border border-[#00FF9D]/10 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00FF9D]/20 flex items-center justify-center shadow-[0_0_15px] shadow-[#00FF9D]/20">
                    <div className="w-5 h-5 rounded-full bg-[#00FF9D] animate-bounce" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-[#00FF9D]">Proactive workflows</p>
                    <p className="text-sm text-[#00FF9D]/50">Next meeting prep ready</p>
                  </div>
                </div>
              </div>

              {/* Status Card 3 */}
              <div className="p-4 rounded-lg bg-black/40 backdrop-blur-xl border border-[#00FF9D]/10 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00FF9D]/20 flex items-center justify-center shadow-[0_0_15px] shadow-[#00FF9D]/20">
                    <div className="w-5 h-5 rounded-full bg-[#00FF9D] animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-[#00FF9D]">Smart Automation</p>
                    <p className="text-sm text-[#00FF9D]/50">Tasks optimized</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}