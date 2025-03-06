import type { SelectProps as PrimeSelectProps } from 'primevue/select';

export interface SelectProps extends /* @vue-ignore */ Omit<PrimeSelectProps, 'checkmark' | 'size' | 'unstyled'> {
  size?: 'small' | 'medium' | 'large';
}
