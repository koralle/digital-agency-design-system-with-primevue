export interface TextareaProps {
  id?: string
  class?: any
  modelValue?: string | null
  defaultValue?: string | null
  maxlength?: number
  minlength?: number
  disabled?: boolean
  invalid?: boolean
  rows?: number
  autoResize?: boolean
  placeholder?: string
  inputMode?: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
  fluid?: boolean
  required?: boolean,
  segmenter?: Intl.Segmenter
}

export interface TextareaEmits {
  'update:modelValue': [value: string]
}
