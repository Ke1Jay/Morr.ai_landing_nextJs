import { IconProps } from './types';

export const Bell = ({ size = 27, className, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={(size * 22) / 27} // Maintaining aspect ratio
      viewBox="0 0 27 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M1 18.5C1 17.837 1.26339 17.2011 1.73223 16.7322C2.20107 16.2634 2.83696 16 3.5 16H23.5C24.163 16 24.7989 16.2634 25.2678 16.7322C25.7366 17.2011 26 17.837 26 18.5V21H1V18.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.5005 16.0001C23.5005 13.3479 22.4469 10.8044 20.5716 8.92899C18.6962 7.05363 16.1527 6.00006 13.5005 6.00006C10.8483 6.00006 8.30478 7.05363 6.42942 8.92899C4.55406 10.8044 3.50049 13.3479 3.50049 16.0001"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 1V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0005 1H16.0005"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 