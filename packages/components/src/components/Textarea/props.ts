export interface TextareaProps {
  // Basics
  id?: string
  class?: any

  // Input
  modelValue?: string | null
  defaultValue?: string | null

  // Textarea Attributes
  autocomplete?: 'on' | 'off' | string
  autocorrect?: 'on' | 'off'
  autofocus?: boolean | "true" | "false"
  cols?: number
  dirname?: string
  disabled?: boolean
  form?: string
  inputMode?: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
  invalid?: boolean
  maxlength?: number
  minlength?: number
  name?: string
  placeholder?: string
  readonly?: boolean
  required?: boolean
  rows?: number
  spellcheck?: boolean | "true" | "false"
  wrap?: 'hard' | 'soft' | 'off'

  // Derived from PrimeVue Textarea component
  autoResize?: boolean
  fluid?: boolean

  segmenter?: Intl.Segmenter
}

export interface TextareaEmits {
  'update:modelValue': [value: string]
}
