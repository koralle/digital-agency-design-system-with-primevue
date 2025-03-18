import type {
  CheckboxProps as PrimeCheckboxProps,
  CheckboxSlots as PrimeCheckboxSlots,
  CheckboxEmits as PrimeCheckboxEmits,
  CheckboxContext as PrimeCheckboxContext,
  CheckboxEmitsOptions as PrimeCheckboxEmitsOptions,
  CheckboxPassThroughOptions as PrimeCheckboxPassThroughOptions,
  CheckboxPassThroughAttributes as PrimeCheckboxPassThroughAttributes,
  CheckboxPassThroughMethodOptions as PrimeCheckboxPassThroughMethodOptions,
  CheckboxPassThroughOptionType as PrimeCheckboxPassThroughOptionType,
} from 'primevue/checkbox'

export interface CheckboxProps extends /* @vue-ignore */ Omit<PrimeCheckboxProps , 'size' | 'unstyled' | 'variant'>{
  size: 'small' | 'medium' | 'large'
}

export interface CheckboxSlots extends PrimeCheckboxSlots {}

export interface CheckboxEmits extends /* @vue-ignore */ PrimeCheckboxEmits {}

export interface CheckboxContext extends PrimeCheckboxContext {}

export interface CheckboxEmitsOptions extends PrimeCheckboxEmitsOptions {}

export interface CheckboxPassThroughOptions extends PrimeCheckboxPassThroughOptions {}

export interface CheckboxPassThroughAttributes extends PrimeCheckboxPassThroughAttributes {}

export interface CheckboxPassThroughMethodOptions extends PrimeCheckboxPassThroughMethodOptions {}

export type CheckboxPassThroughOptionType = PrimeCheckboxPassThroughOptionType
