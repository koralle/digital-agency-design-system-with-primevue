import type { TextareaProps as PrimeTextareaProps } from 'primevue/textarea';

export interface TextareaProps extends /* @vue-ignore */ Omit<PrimeTextareaProps, 'size' | 'unstyled'> {
  size?: 'small' | 'medium' | 'large';
}
