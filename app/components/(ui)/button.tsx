import { forwardRef } from 'react';
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import { cn } from '~/utils/misc';
import { cva, type VariantProps } from 'cva';

const buttonVariants = cva(
  `inline-flex items-center justify-center font-medium px-4 py-2 rounded-md
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-border focus-visible:ring-offset-2 ring-offset-bg
   disabled:opacity-50 disabled:pointer-events-none
   text-fg
  `,
  {
    variants: {
      variant: {
        default: 'bg-ui hover:bg-ui-hover',
        primary: 'bg-accent-ui hover:bg-accent-ui-hover',
        toolbar: 'bg-accent-ui hover:bg-accent-ui-hover px-2 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
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
  }
);

Button.displayName = 'Button';

export { Button };
