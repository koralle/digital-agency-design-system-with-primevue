import { clsx } from "clsx";
import { useComponentClass, useComponentCssClass } from "../../utils/component";
import { CheckboxProps } from "./types";
import { unref } from "vue";

export interface useCheckboxClassResult {
  rootClass?: string
  boxClass?: string
  labelClass?: string
  checkboxIconClass?: string
  indeterminateIconClass?: string
  outlineBlankIconClass?: string
}

export const useCheckboxClass = useComponentClass<CheckboxProps, useCheckboxClassResult>(({ size, invalid, disabled, readonly, required, binary, indeterminate }) => {

  const unwrappedSize = unref(size) ?? 'medium'
  const unwrappedDisabled = unref(disabled)
  const unwrappedInvalid = unref(invalid)
  const unwrappedIndeterminate = unref(indeterminate)

  const resolveSizeClass = (size: Exclude<CheckboxProps['size'], undefined>) => {
    switch (size) {
      case 'small':
        return {
          root: clsx('h-[2.5em]', 'gap-[0.25em]'),
          box: clsx('w-[1.5em]', 'h-[1.5em]'),
        }
      case 'medium':
        return {
          root: clsx('h-[3em]', 'gap-[0.5em]'),
          box: clsx('w-[2em]', 'h-[2em]'),
        }
      case 'large':
        return {
          root: clsx('h-[3.75em]', 'gap-[0.75em]'),
          box: clsx('w-[2.75em]', 'h-[2.75em]'),
        }
    }
  }

  const sizeClass = resolveSizeClass(unwrappedSize)

  return {
    rootClass: clsx(
      'flex flex-row justify-center items-center',
      'text-[1rem]',
      sizeClass.root
    ),
    boxClass: clsx(
      'inline-flex justify-center items-center',
      'focus:outline-lime-1200 focus:outline-[2px] focus:outline-offset-[2px]',
      sizeClass.box
    ),
    labelClass: clsx(
      'inline-flex justify-center items-center',
      'text-solid-gray-900',
    ),
    checkboxIconClass: clsx(
      {
        'text-red-900 hover:text-red-1000': !unwrappedDisabled && unwrappedInvalid,
        'text-blue-900 hover:text-blue-1100': !unwrappedDisabled && !unwrappedInvalid,
        'cursor-pointer': !unwrappedDisabled,
      },
      'not-motion-reduce:transition not-motion-reduce:duration-300',
      'motion-reduce:transition-none',
      'rounded-[4px]',
      'focus:outline-lime-1200 focus:outline-[2px]',
    ),
    indeterminateIconClass: clsx(
      {
        'text-red-900 hover:text-red-1000': !unwrappedDisabled && unwrappedInvalid,
        'text-blue-900 hover:text-blue-1100': !unwrappedDisabled && !unwrappedInvalid,
        'cursor-pointer': !unwrappedDisabled,
      },
      'not-motion-reduce:transition not-motion-reduce:duration-300',
      'motion-reduce:transition-none',
      'rounded-[4px]',
      'focus:outline-lime-1200 focus:outline-[2px]',
    ),
    outlineBlankIconClass: clsx(
      {
        'text-red-900 hover:text-red-1000': !unwrappedDisabled && unwrappedInvalid,
        'text-solid-gray-600 hover:text-black': !unwrappedDisabled && !unwrappedInvalid,
        'cursor-pointer': !unwrappedDisabled,
      },
      'not-motion-reduce:transition not-motion-reduce:duration-300',
      'motion-reduce:transition-none',
      'rounded-[4px]',
      'focus:outline-lime-1200 focus:outline-[2px]',
    )
  }
})
