import type { InputTextProps as PrimeInputTextProps } from 'primevue/inputtext';

export interface InputTextProps extends /* @vue-ignore */ Omit<PrimeInputTextProps, 'size' | 'unstyled'> {
  size?: 'small' | 'medium' | 'large';
}
