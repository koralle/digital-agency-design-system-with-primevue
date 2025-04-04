import type {
  SelectEmits as PrimeSelectEmits,
  SelectProps as PrimeSelectProps,
  SelectSlots as PrimeSelectSlots,
} from 'primevue/select';

export interface SelectProps
  extends /* @vue-ignore */ Omit<PrimeSelectProps, 'checkmark' | 'size' | 'unstyled'> {
  size?: 'small' | 'medium' | 'large';
}

export interface SelectSlots extends PrimeSelectSlots {}

export interface SelectEmits extends /* @vue-ignore */ PrimeSelectEmits {}
