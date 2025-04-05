import type {
  ButtonProps as PrimeButtonProps,
  ButtonPassThroughOptions as PrimeButtonPassThroughOptions,
  ButtonSlots as PrimeButtonSlots,
  ButtonEmits as PrimeButtonEmits,
  ButtonContext as PrimeButtonContext,
  ButtonEmitsOptions as PrimeButtonEmitsOptions,
  ButtonPassThroughAttributes as PrimeButtonPassThroughAttributes,
  ButtonPassThroughMethodOptions as PrimeButtonPassThroughMethodOptions,
  ButtonPassThroughOptionType as PrimeButtonPassThroughOptionType,
} from 'primevue/button'

export interface ButtonProps
  extends /* @vue-ignore */ Omit<
    PrimeButtonProps,
    | 'size'
    | 'variant'
    | 'severity'
    | 'raised'
    | 'rounded'
    | 'text'
    | 'outlined'
    | 'unstyled'
    | 'loading'
    | 'loadingIcon'
    | 'badge'
    | 'badgeClass'
    | 'badgeSeverity'
  > {
  size?: 'x-small' | 'small' | 'medium' | 'large'
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export interface ButtonPassThroughOptions extends PrimeButtonPassThroughOptions {}

export interface ButtonSlots extends PrimeButtonSlots {}

export interface ButtonEmits extends /* @vue-ignore */ PrimeButtonEmits {}

export interface ButtonContext extends PrimeButtonContext {}

export interface ButtonEmitsOptions extends PrimeButtonEmitsOptions {}

export interface ButtonPassThroughAttributes extends PrimeButtonPassThroughAttributes {}

export interface ButtonPassThroughMethodOptions<T> extends PrimeButtonPassThroughMethodOptions<T> {}

export type ButtonPassThroughOptionType = PrimeButtonPassThroughOptionType
