import { IconProps } from './types';

export const Magnet = ({ size = 22, className, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M5.04928 13.9138L1 9.86448L7.83316 3.01108C9.33526 1.66604 11.2955 0.947447 13.311 1.003C15.3266 1.05855 17.2443 1.88401 18.67 3.30975C20.0957 4.73549 20.9212 6.65318 20.9768 8.66871C21.0323 10.6842 20.3137 12.6445 18.9687 14.1466L12.1355 21L8.08624 16.9507L14.555 10.5124C14.8741 10.0954 15.0308 9.57667 14.9962 9.05273C14.9615 8.52879 14.7377 8.03529 14.3664 7.664C13.9951 7.29271 13.5016 7.0689 12.9776 7.03421C12.4537 6.99953 11.935 7.15631 11.518 7.47541L5.04928 13.9138Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.03711 6.82753L8.08639 10.8768"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.123 13.9138L15.1723 17.963"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 