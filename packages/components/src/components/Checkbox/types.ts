export interface CheckboxProps {
  value?: any
  modelValue?: any
  defaultValue?: any
  name?: string
  label?: string
  binary?: boolean
  indeterminate?: boolean
  size?: 'small' | 'medium' | 'large'
  invalid?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  tabindex?: number
  trueValue?: any
  falseValue?: any
  inputId?: string
  ariaLabel?: string
  ariaLabelledby?: string
  formControl?: Record<string, any>
}

export interface CheckboxEmits {
  'update:modelValue': [value: any]
  'update:indeterminate': [value: false]
  'value-change': [value: any]
  'change': [event: Event]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}
