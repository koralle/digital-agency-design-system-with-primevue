import type { VNode } from "vue"

export interface RadioButtonGroupProps<T> {
  id?: string

  defaultValue?: T

  name?: string

  invalid?: boolean
}

export interface RadioButtonGroupSlots<T> {
  default: (props: Pick<RadioButtonGroupProps<T>, 'defaultValue' | 'invalid'>) => VNode[]
}

export interface RadioButtonGroupEmits<T> {
  'value-change': [value: T]
}
