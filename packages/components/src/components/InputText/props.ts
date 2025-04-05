import type { InputTextProps as PrimeInputTextProps } from 'primevue/inputtext'

export interface InputTextProps /* @vue-ignore */ extends Omit<PrimeInputTextProps, 'size'> {
  size?: 'small' | 'medium' | 'large'
}

export interface InputTextEmits {
  'update:modelValue': [value: string]
}
