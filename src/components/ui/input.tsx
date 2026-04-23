import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[3.5rem] dark:bg-primary-100/50 w-full rounded-lg border border-primary-20 bg-white px-space12 py-space8 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-70 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-90  dark:ring-offset-primary-80 dark:placeholder:text-text500 dark:focus-visible:ring-primary-90 dark:text-primary-30",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
