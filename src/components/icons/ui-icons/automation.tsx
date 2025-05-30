import { IconProps } from './types';

export const Automation = ({ size = 20, className, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size * 1.1} // Maintaining aspect ratio
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M11 1L1 13H10L9 21L19 9H10L11 1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 