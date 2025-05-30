import { IconProps } from './types';

export const Grow = ({ size = 21, className, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={(size * 22) / 21} // Maintaining aspect ratio
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M4.8 21H17.4667M8.6 21C15.5667 17.875 9.61333 13 12.4 8.5M12.4 8.5C12.3418 6.73269 12.8276 4.98945 13.7933 3.5C14.9333 2.25 16.58 1.125 20 1C19.8733 3.875 19.1133 5.5 17.8467 6.75C16.58 7.75 14.8067 8.375 12.4 8.5ZM7.96667 7.75C9.36 8.75 10.2467 10.5 10.88 12.375C8.34667 12.875 6.44667 12.875 4.8 12C3.28 11.25 1.88667 9.625 1 6.75C4.54667 6.125 6.57333 6.75 7.96667 7.75Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}; 