import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { LucideIcon } from '../../../shared/types/icons';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center gap-1 justify-center font-medium whitespace-nowrap rounded-lg transition-colors focus-visible:outline-none ',
  {
    variants: {
      variant: {
        default: 'bg-foreground text-background font-semibold hover:opacity-90',
        brand: 'bg-brand-foreground text-brand font-semibold hover:opacity-90',
        accent: 'text-teal-600 bg-teal-600/10 hover:bg-teal-600/20',
        outlined: 'bg-background text-foreground outline outline-border hover:bg-secondary',
        destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
        bordered: 'border border-border bg-background text-foreground opacity-100 hover:opacity-80',
        secondary: 'bg-tertiary text-tertiary-foreground opacity-100 hover:opacity-80',
        ghost: 'hover:bg-secondary text-foreground opacity-100 hover:opacity-80',
        link: 'text-muted-foreground underline-offset-4 hover:underline h-auto decoration-border',
        text: 'p-0 text-xs',
      },
      size: {
        default: 'h-9 px-3 text-xs md:text-sm',
        sm: 'h-8 px-3 text-xs md:text-sm',
        xs: 'h-7 px-2 text-xs md:text-sm',
        md: 'h-9 px-4 text-xs md:text-sm font-semibold',
        lg: 'h-12 md:h-14  px-8 text-xs md:text-base font-semibold',
        icon: 'h-8 min-w-8 text-xs md:text-sm',
        'icon-sm': 'h-7 min-w-7 text-xs md:text-sm',
        'icon-xs': 'h-6 min-w-6 text-xs md:text-sm',
        'link-sm': 'p-0 text-xs',
        link: 'p-0',
      },
      rounded: {
        default: 'rounded-sm',
        lg: 'rounded-md',

        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      rounded: 'lg',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  suffixIcon?: LucideIcon;
  icon?: LucideIcon;
  iconSize?: 'xs' | 'sm' | 'md' | 'lg';
  prefixIcon?: LucideIcon;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconSize = 'sm',
      rounded,
      asChild = false,
      prefixIcon,
      suffixIcon,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const PrefixIcon = prefixIcon;
    const SuffixIcon = suffixIcon;
    const Icon = icon;

    const iconSizes = {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
    } as const;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      >
        {PrefixIcon && <PrefixIcon size={iconSizes[iconSize]} strokeWidth={2} />}
        {Icon ? <Icon size={iconSizes[iconSize]} strokeWidth={2} /> : children}
        {SuffixIcon && <SuffixIcon size={iconSizes[iconSize]} strokeWidth={2} />}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
