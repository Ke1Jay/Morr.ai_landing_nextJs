'use client';

import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { FeatureComparison } from "@/components/sections/pricing/feature-comparison"

export default function PricingPage() {
    const [teamCount, setTeamCount] = useState(1);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
        {
            name: 'Base',
            description: 'For startups and small teams',
            subtitle: 'Perfect for teams getting started with AI-powered productivity and knowledge management.',
            basePrice: 29,
            maxTeamMembers: 5,
            additionalUserPrice: 19,
            color: 'primary',
            features: [
                'Unified search across tools',
                'Basic AI chat capabilities',
                'Up to 5 team members',
                '10 integrations',
                'Standard support'
            ],
            buttonText: 'Choose Base',
            buttonVariant: 'default' as const,
        },
        {
            name: 'Plus',
            description: 'For growing teams and departments',
            subtitle: 'Advanced features for teams who need more power and customization in their AI workflows.',
            basePrice: 79,
            maxTeamMembers: 20,
            additionalUserPrice: 29,
            color: 'primary',
            features: [
                'Everything in Base, plus:',
                'Advanced AI workflows',
                'Custom integrations',
                'Up to 20 team members',
                'Priority support'
            ],
            buttonText: 'Choose Plus',
            buttonVariant: 'secondary' as const,
        },
        {
            name: 'Premium',
            description: 'For enterprises and large organizations',
            subtitle: 'The ultimate solution for organizations that need maximum AI capabilities and enterprise features.',
            basePrice: 199,
            maxTeamMembers: Infinity,
            additionalUserPrice: 39,
            color: 'primary',
            features: [
                'Everything in Plus, plus:',
                'Unlimited team members',
                'Custom AI agents',
                'Enterprise security',
                'Dedicated support'
            ],
            buttonText: 'Choose Premium',
            buttonVariant: 'outline' as const,
        },
    ];

    // Calculate price based on team count and billing cycle
    const calculatePrice = (basePrice: number, additionalUserPrice: number, teamCount: number) => {
        let monthlyPrice = basePrice; // First user pays base price
        
        // Additional users pay the additional user price
        if (teamCount > 1) {
            monthlyPrice += (teamCount - 1) * additionalUserPrice;
        }

        // If yearly, multiply by 12 and apply 15% discount
        if (billingCycle === 'yearly') {
            const yearlyPrice = monthlyPrice * 12;
            return Math.round(yearlyPrice * 0.85); // 15% discount
        }

        return monthlyPrice;
    };

    // Calculate appropriate plan based on team size
    const currentPlan = useMemo(() => {
        if (teamCount <= 5) return plans[0]; // Base
        if (teamCount <= 20) return plans[1]; // Plus
        return plans[2]; // Premium
    }, [teamCount]);

    return (
        <div className="w-full min-h-[90vh] flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_65%)]" />
            </div>

            <div className="container relative px-4 md:px-6 py-16 space-y-12 z-10">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-block">
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary/80">
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
                            <span>Simple Pricing</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                        Choose your plan
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground/80">
                        Start with our early access pricing. Scale as you grow.
                    </p>
                </div>

                {/* User Count Selector */}
                <div className="space-y-4 max-w-xl mx-auto">
                    <p className="text-center text-xl text-muted-foreground/90">How many team members?</p>
                    <Card className="p-6 bg-black/40 backdrop-blur-xl border-primary/10">
                        <div className="text-center mb-4">
                            <span className="text-2xl font-bold text-primary">{teamCount}</span>
                            <span className="text-lg text-muted-foreground/80"> member{teamCount > 1 ? 's' : ''}</span>
                            <div className="text-sm text-muted-foreground/60 mt-1">
                                Recommended plan: <span className="text-primary">{currentPlan.name}</span>
                            </div>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={teamCount}
                            onChange={(e) => setTeamCount(parseInt(e.target.value))}
                            className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-center mt-4">
                            <span className="text-sm text-muted-foreground/60">
                                Need more than 50 seats? Contact us for enterprise pricing
                            </span>
                        </div>
                    </Card>
                </div>

                {/* Billing Cycle Toggle */}
                <div className="flex justify-center items-center gap-4">
                    <Button
                        onClick={() => setBillingCycle('monthly')}
                        variant={billingCycle === 'monthly' ? 'default' : 'outline'}
                        className={cn(
                            "rounded-full",
                            billingCycle === 'monthly' ? 'bg-primary text-primary-foreground' : 'border-primary/20 hover:bg-primary/5'
                        )}
                    >
                        Monthly billing
                    </Button>
                    <Button
                        onClick={() => setBillingCycle('yearly')}
                        variant={billingCycle === 'yearly' ? 'default' : 'outline'}
                        className={cn(
                            "rounded-full",
                            billingCycle === 'yearly' ? 'bg-primary text-primary-foreground' : 'border-primary/20 hover:bg-primary/5'
                        )}
                    >
                        Yearly billing
                        <span className="ml-2 text-sm text-orange-500">Save 15%</span>
                    </Button>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 pt-8">
                    {plans.map((plan) => {
                        const price = calculatePrice(plan.basePrice, plan.additionalUserPrice, teamCount);
                        const isRecommended = plan.name === currentPlan.name;
                        
                        return (
                            <Card
                                key={plan.name}
                                className={cn(
                                    "group relative grid gap-6 p-8 rounded-xl border border-primary/10",
                                    "bg-black/40 backdrop-blur-xl hover:bg-black/50 transition-all duration-300",
                                    "hover:border-primary/20",
                                    isRecommended && "border-primary/30 shadow-lg shadow-primary/5"
                                )}
                            >
                                {isRecommended && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                                        Recommended
                                    </div>
                                )}
                                
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-primary/90">{plan.name}</h3>
                                    <p className="text-sm text-muted-foreground/80">{plan.description}</p>
                                    <p className="text-sm text-muted-foreground/60">{plan.subtitle}</p>
                                </div>
                                
                                <div className="text-4xl font-bold text-primary">
                                    €{price}
                                    <span className="text-base font-normal text-muted-foreground/60">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                                </div>

                                <div className="space-y-2">
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm text-muted-foreground/70">
                                            <div className="mr-2 h-4 w-4 text-primary">✓</div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    variant={plan.buttonVariant}
                                    className="w-full group relative overflow-hidden"
                                >
                                    <span className="relative z-10">{plan.buttonText}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Button>

                                <p className="text-sm text-muted-foreground/60">
                                    {teamCount > 1 && `${teamCount} users • `}€{Math.round(price / (billingCycle === 'yearly' ? 12 : 1) / teamCount)} per user/{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                </p>

                                {/* Decorative corner accent */}
                                <div className="absolute -bottom-0 -right-0 w-8 h-8 bg-gradient-to-br from-primary/20 to-transparent rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Card>
                        );
                    })}
                </div>

                {/* Enterprise Call-to-Action */}
                <div className="text-center mt-12">
                    <p className="text-muted-foreground/70">
                        Looking for enterprise features? <Button variant="link" className="text-primary">Contact our sales team</Button>
                    </p>
                </div>

                {/* Feature Comparison */}
                <div className="pt-24 pb-16">
                    <div className="text-center space-y-4 mb-8">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            Compare all features
                        </h2>
                        <p className="text-lg text-muted-foreground/80">
                            Detailed comparison of all features across different plans
                        </p>
                    </div>
                    
                    <FeatureComparison className="border-primary/10" />
                </div>
            </div>
        </div>
    );
}
