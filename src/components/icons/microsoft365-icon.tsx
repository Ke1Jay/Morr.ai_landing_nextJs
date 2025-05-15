import { SVGProps } from 'react';

interface Microsoft365IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const Microsoft365Icon = ({ className, ...props }: Microsoft365IconProps) => (
  <svg 
    viewBox="0 0 50.9 56" 
    className={className}
    {...props}
  >
    <defs>
      <radialGradient id="grad1" cx="-9.3666" cy="128.8453" r="1.4931" gradientTransform="matrix(-9.9735 26.6356 46.4579 17.3958 -6062.2207 -1980.8879)" gradientUnits="userSpaceOnUse">
        <stop offset="0.06441" stopColor="#AE7FE2"/>
        <stop offset="1" stopColor="#0078D4"/>
      </radialGradient>
      <linearGradient id="grad2" x1="210.2598" y1="-656.236" x2="201.171" y2="-640.5163" gradientTransform="matrix(0.6667 0 0 -0.6667 -114.9763 -396.4654)" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#114A8B"/>
        <stop offset="1" stopColor="#0078D4" stopOpacity="0"/>
      </linearGradient>
      <radialGradient id="grad3" cx="-21.2446" cy="81.6108" r="1.4931" gradientTransform="matrix(26.1862 -3.8515 -2.5442 -17.2977 772.1304 1373.5771)" gradientUnits="userSpaceOnUse">
        <stop offset="0.1339" stopColor="#D59DFF"/>
        <stop offset="1" stopColor="#5E438F"/>
      </radialGradient>
    </defs>
    <path fill="url(#grad1)" d="M20.5,1.3l-0.3,0.2c-0.5,0.3-0.9,0.6-1.3,0.9l0.8-0.6h7l1.3,9.6l-6.4,6.4l-6.4,4.4v5.1c0,3.6,1.9,6.9,4.9,8.7 l6.7,4.1l-14.2,8.3H10l-5.1-3.1c-3-1.8-4.9-5.1-4.9-8.7V19.4c0-3.6,1.9-6.9,4.9-8.7l15.3-9.2C20.3,1.4,20.4,1.4,20.5,1.3z"/>
    <path fill="url(#grad2)" d="M20.5,1.3l-0.3,0.2c-0.5,0.3-0.9,0.6-1.3,0.9l0.8-0.6h7l1.3,9.6l-6.4,6.4l-6.4,4.4v5.1c0,3.6,1.9,6.9,4.9,8.7 l6.7,4.1l-14.2,8.3H10l-5.1-3.1c-3-1.8-4.9-5.1-4.9-8.7V19.4c0-3.6,1.9-6.9,4.9-8.7l15.3-9.2C20.3,1.4,20.4,1.4,20.5,1.3z"/>
    <path fill="url(#grad3)" d="M35.6,21.6v5.7c0,3.6-1.9,6.9-4.9,8.7l-15.3,9.2c-3.1,1.9-7,2-10.2,0.2l14.9,9c3.2,2,7.3,2,10.5,0L46,45.3 c3-1.8,4.9-5.1,4.9-8.7v-4.1l-1.3-1.9L35.6,21.6z"/>
  </svg>
);

export default Microsoft365Icon; 