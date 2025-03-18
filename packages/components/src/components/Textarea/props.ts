export interface TextareaProps {
  id?: string
  class?: any
  modelValue?: string
  defaultValue?: string
  maxlength?: number
  disabled?: boolean
  invalid?: boolean
  rows?: number
  autoResize?: boolean
  placeholder?: string
}

export interface TextareaEmits {
  'update:modelValue': [value: string]
}
