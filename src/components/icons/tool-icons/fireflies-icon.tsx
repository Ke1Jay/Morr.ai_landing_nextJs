import { SVGProps } from 'react';

interface FirefliesIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const FirefliesIcon = ({ className, ...props }: FirefliesIconProps) => (
  <svg 
    viewBox="0 0 56 56" 
    className={className}
    {...props}
  >
    <defs>
      <linearGradient id="fireflies-grad-1" gradientUnits="userSpaceOnUse" x1="45" y1="47" x2="-33" y2="35" gradientTransform="matrix(0.8571 0 0 -0.8571 -79.2389 -68.1736)">
        <stop offset="0" stopColor="#E82A73" />
        <stop offset="0.113" stopColor="#DE2D7A" />
        <stop offset="0.3" stopColor="#C5388F" />
        <stop offset="0.54" stopColor="#9B4AB0" />
        <stop offset="0.818" stopColor="#6262DE" />
        <stop offset="0.994" stopColor="#3B73FF" />
      </linearGradient>
      <linearGradient id="fireflies-grad-2" gradientUnits="userSpaceOnUse" x1="45" y1="47" x2="-33" y2="35" gradientTransform="matrix(0.8571 0 0 -0.8571 -79.2389 -68.1736)">
        <stop offset="0" stopColor="#FF3C82" />
        <stop offset="0.103" stopColor="#F53E88" />
        <stop offset="0.274" stopColor="#DC4598" />
        <stop offset="0.492" stopColor="#B251B2" />
        <stop offset="0.745" stopColor="#7961D7" />
        <stop offset="0.994" stopColor="#3B73FF" />
      </linearGradient>
      <linearGradient id="fireflies-grad-3" gradientUnits="userSpaceOnUse" x1="45" y1="37" x2="15" y2="50" gradientTransform="matrix(0.8571 0 0 -0.8571 -79.2389 -68.1736)">
        <stop offset="0" stopColor="#E82A73" />
        <stop offset="0.113" stopColor="#DE2D7A" />
        <stop offset="0.3" stopColor="#C5388F" />
        <stop offset="0.54" stopColor="#9B4AB0" />
        <stop offset="0.818" stopColor="#6262DE" />
        <stop offset="0.994" stopColor="#3B73FF" />
      </linearGradient>
      <linearGradient id="fireflies-grad-4" gradientUnits="userSpaceOnUse" x1="35" y1="46" x2="-75" y2="13" gradientTransform="matrix(0.8571 0 0 -0.8571 -79.2389 -68.1736)">
        <stop offset="0" stopColor="#E82A73" />
        <stop offset="0.113" stopColor="#DE2D7A" />
        <stop offset="0.3" stopColor="#C5388F" />
        <stop offset="0.54" stopColor="#9B4AB0" />
        <stop offset="0.818" stopColor="#6262DE" />
        <stop offset="0.994" stopColor="#3B73FF" />
      </linearGradient>
    </defs>
    <g>
      <path fill="url(#fireflies-grad-1)" d="M18.4,0H0v18.3h18.4V0z" />
      <path fill="url(#fireflies-grad-2)" d="M40.2,22.1H21.8v18.3h18.4V22.1z" />
      <path fill="url(#fireflies-grad-3)" d="M40.2,0H21.8v18.3H56v-2.6c0-4.2-1.7-8.1-4.6-11.1C48.4,1.7,44.4,0,40.2,0L40.2,0z" />
      <path fill="url(#fireflies-grad-4)" d="M0,22.1v18.3c0,4.2,1.7,8.1,4.6,11.1c3,2.9,7,4.6,11.2,4.6h2.6V22.1H0z" />
      <path opacity="0.18" fill="#E82A73" d="M0,0l18.4,18.3H0V0z" />
      <path opacity="0.18" fill="#E82A73" d="M21.8,22.1l18.4,18.3H21.8V22.1z" />
      <path opacity="0.18" fill="#E82A73" d="M0,40.3c0,4.2,1.7,8.1,4.6,11.1c3,2.9,7,4.6,11.2,4.6h2.6V22.1L0,40.3z" />
      <path opacity="0.18" fill="#E82A73" d="M40.2,0c4.2,0,8.2,1.7,11.2,4.6c3,2.9,4.6,6.9,4.6,11.1v2.6H21.8L40.2,0z" />
    </g>
  </svg>
);

export default FirefliesIcon; 