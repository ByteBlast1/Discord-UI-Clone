import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center rounded-md font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            {
              'bg-[#5865F2] text-white hover:bg-[#4752C4]': variant === 'primary',
              'bg-[#4f545c] text-white hover:bg-[#686d73]': variant === 'secondary',
              'hover:bg-[#4f545c20]': variant === 'ghost',
              'h-8 px-3 text-sm': size === 'sm',
              'h-10 px-4': size === 'md',
              'h-12 px-6': size === 'lg',
            },
            className
          )
        )}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin">⏳</span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; 