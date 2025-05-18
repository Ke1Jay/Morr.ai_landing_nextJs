import { ReactNode } from 'react';

interface PricingLayoutProps {
    children: ReactNode;
}

export default function PricingLayout({ children }: PricingLayoutProps) {
    return (
        <div className="flex-grow">
            {children}
        </div>
    );
}
