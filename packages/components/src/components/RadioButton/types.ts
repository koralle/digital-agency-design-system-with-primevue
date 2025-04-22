import type { RadioButtonProps as PrimeVueRadioButtonProps } from 'primevue/radiobutton'
import { ComponentProps } from '../../utils/component'

export interface RadioButtonProps<T = boolean>
  extends /* @vue-ignore */ Omit<
    ComponentProps<PrimeVueRadioButtonProps>,
    'variant' | 'inputStyle' | 'inputClass' | 'formControl'
  > {
    id?: string

    label?: string

    value?: T

    modelValue?: T

    defaultValue?: T

    name?: string

    binary?: boolean

    size?: 'small' | 'medium' | 'large'

    invalid?: boolean

    disabled?: boolean

    readonly?: boolean

    inputId?: string

    ariaLabelledby?: string

    ariaLabel?: string
  }

export interface RadioButtonEmits<T = boolean> {
  'update:modelValue': [value: T]
  'value-change': [value: T]
  change: [value: Event]
  focus: [value: Event]
  blur: [value: Event]
}
