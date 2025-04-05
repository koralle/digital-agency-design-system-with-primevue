import type { SelectProps as PrimeSelectProps, SelectChangeEvent } from 'primevue/select'
import type { Booleanish, Nullable } from '../../utils'

export interface SelectProps /* @vue-ignore */
  extends Omit<PrimeSelectProps, 'size' | 'unstyled' | 'dt' | 'pt' | 'ptOptions' | 'variant'> {
  id?: string
  disabled?: boolean
  modelValue?: Nullable<any>
  defaultValue?: any
  invalid?: boolean
  size?: 'small' | 'medium' | 'large'
  required?: Booleanish
  readonly?: Booleanish
  placeholder?: string
  fluid?: boolean

  labelId?: string
  options?: any[]
  optionLabel?: string | ((data: any) => string)
  editable?: boolean
}

export interface SelectEmits {
  'update:modelValue': [value: any]
  'value-change': [value: any]
  change: [event: Event]
  focus: [event: Event]
  blur: [event: Event]
  'before-show': [event: Event]
  'before-hide': [event: Event]
  show: [event: SelectChangeEvent]
  hide: [event: SelectChangeEvent]
  filter: [event: Event]
}
