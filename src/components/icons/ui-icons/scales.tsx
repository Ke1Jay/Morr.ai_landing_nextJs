import { IconProps } from './types';

export const Scales = ({ size = 22, className, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={(size * 20) / 22} // Maintaining aspect ratio
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M6 19H16M11 1V19M2 5H4C6 5 9 4 11 3C13 4 16 5 18 5H20M15 14L18 6L21 14C20.13 14.65 19.08 15 18 15C16.92 15 15.87 14.65 15 14ZM1 14L4 6L7 14C6.13 14.65 5.08 15 4 15C2.92 15 1.87 14.65 1 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 