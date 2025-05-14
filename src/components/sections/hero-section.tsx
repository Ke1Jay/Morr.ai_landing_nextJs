import React from 'react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Tool icons SVG components
const ToolLogos = {
  Teams: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M14.5 3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-2 13v-4a8.31 8.31 0 0 0-1.5-.145A8.5 8.5 0 0 0 2.5 21a.5.5 0 0 0 .5.5h18a.5.5 0 0 0 .5-.5 8.5 8.5 0 0 0-8.5-8.5 8.31 8.31 0 0 0-1.5.145v4z"/>
    </svg>
  ),
  Drive: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M1.922 9.37l3.084 5.343 5.344-9.255H4.266L1.922 9.37zm18.156 0l-2.344-4.058h-6.084l5.344 9.255 3.084-5.343zm-3.083 5.343l-2.344 4.058H9.349l-2.344-4.058 2.344-4.058h6.084l2.344 4.058z"/>
    </svg>
  ),
  Jira: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.017 0H11.459a5.215 5.215 0 0 0 5.214 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.017 0z"/>
    </svg>
  ),
  Pipedrive: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M0 11.1h4.7l3.7 4.5 3.7-4.5h4.7L8.4 21 0 11.1zm8.4-8.2 3.7 4.5 3.7-4.5h4.7L12 11.8l-3.6-4.4-3.7 4.5H0l8.4-9.9z"/>
    </svg>
  ),
  Notion: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.62c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-2.986-4.577c-.56-.84-.793-1.353-.793-1.866V2.667c0-.839.374-1.54 1.307-1.632z"/>
    </svg>
  )
}

// Enhanced Tool Icon component with logo
const ToolIcon = ({ name, delay = 0 }: { name: string, delay?: number }) => {
  const Logo = ToolLogos[name as keyof typeof ToolLogos]
  return (
    <div 
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black/40 backdrop-blur-xl",
        "border border-primary/20 shadow-lg shadow-primary/5 animate-float hover:border-primary/40 transition-colors",
        delay ? `delay-${delay}` : ""
      )}
    >
      {Logo && <Logo />}
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
                  <ToolIcon name="Teams" />
                </div>
                <div className="absolute top-[12%] right-[8%]">
                  <ToolIcon name="Drive" delay={150} />
                </div>
                
                {/* Middle row */}
                <div className="absolute top-[40%] right-[5%]">
                  <ToolIcon name="Jira" delay={300} />
                </div>
                
                {/* Bottom row */}
                <div className="absolute bottom-[15%] left-[8%]">
                  <ToolIcon name="Notion" delay={450} />
                </div>
                <div className="absolute bottom-[10%] right-[10%]">
                  <ToolIcon name="Pipedrive" delay={600} />
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

            {/* Status Cards */}
            <div className="absolute -right-4 top-4 w-72 p-4 rounded-lg bg-black/40 backdrop-blur-xl border border-[#00FF9D]/10 shadow-lg">
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

            <div className="absolute -left-4 bottom-4 w-72 p-4 rounded-lg bg-black/40 backdrop-blur-xl border border-[#00FF9D]/10 shadow-lg">
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
          </div>
        </div>
      </div>
    </section>
  )
}