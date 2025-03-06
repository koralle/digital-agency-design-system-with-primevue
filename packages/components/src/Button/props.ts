import type { ButtonProps as PrimeButtonProps } from 'primevue/button';

export interface ButtonProps
  extends /* @vue-ignore */ Omit<
    PrimeButtonProps,
    'size' | 'variant' | 'severity' | 'raised' | 'rounded' | 'text' | 'outlined' | 'unstyled' | 'loading' | 'loadingIcon' | 'badge' | 'badgeClass' | 'badgeSeverity'
  > {
  size?: 'x-small' | 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary';
}
