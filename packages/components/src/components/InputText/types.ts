import type { InputTextProps as PrimeInputTextProps } from 'primevue/inputtext'
import type { Booleanish, Nullable } from '../../utils'

export interface InputTextProps /* @vue-ignore */
  extends Omit<PrimeInputTextProps, 'size' | 'unstyled' | 'dt' | 'pt' | 'ptOptions' | 'variant'> {
  id?: string
  disabled?: boolean
  modelValue?: Nullable<string>
  defaultValue?: Nullable<string>
  invalid?: boolean | undefined | null
  size?: 'small' | 'medium' | 'large'
  required?: Booleanish
  readonly?: Booleanish
  placeholder?: string
  fluid?: Nullable<boolean>
}

export interface InputTextEmits {
  'update:modelValue': [value: string | undefined]
  'value-change': [value: string | undefined]
}
