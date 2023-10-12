import { forwardRef } from 'react';

import { cva, type VariantProps } from 'cva';
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import { cn } from '#utils/misc';

const buttonVariants = cva(
  `inline-flex items-center justify-center rounded-md px-4 py-2 font-medium
   text-fg ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-border
   focus-visible:ring-offset-2 disabled:pointer-events-none
   disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: 'bg-ui hover:bg-ui-hover',
        primary: 'bg-accent-ui hover:bg-accent-ui-hover',
        toolbar: 'rounded-lg bg-accent-ui px-2 hover:bg-accent-ui-hover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type ButtonProps = AriaButtonProps & VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <AriaButton
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button };
