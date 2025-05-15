import { SVGProps } from 'react';

interface GmailIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const GmailIcon = ({ className, ...props }: GmailIconProps) => (
  <svg 
    viewBox="0 0 74.6 56" 
    className={className}
    {...props}
  >
    <path className="st0" fill="#4285F4" d="M5.1,56H17V27.2L0,14.4v36.5C0,53.7,2.3,56,5.1,56"/>
    <path className="st1" fill="#34A853" d="M57.7,56h11.9c2.8,0,5.1-2.3,5.1-5.1V14.4l-17,12.7"/>
    <path className="st2" fill="#FBBC04" d="M57.7,5.1v22.1l17-12.7V7.6c0-6.3-7.2-9.9-12.2-6.1"/>
    <path className="st3" fill="#EA4335" d="M17,27.2V5.1l20.4,15.3L57.7,5.1v22.1L37.3,42.4"/>
    <path className="st4" fill="#C5221F" d="M0,7.6v6.8l17,12.7V5.1l-4.8-3.6C7.2-2.2,0,1.4,0,7.6"/>
  </svg>
);

export default GmailIcon; 