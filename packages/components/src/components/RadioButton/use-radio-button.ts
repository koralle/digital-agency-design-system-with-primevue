import { RadioButtonProps } from "./types"
import { useComponentClass } from "../../utils"
import { clsx } from "clsx"
import { unref } from "vue"

export interface UseRadioButtonResult {
  rootClass: string
  inputClass: string
  labelClass: string
  boxClass: string
  iconClass: string
  disabledIconClass: string
}

export const useRadioButtonClass = useComponentClass<RadioButtonProps & { checked?: boolean }, UseRadioButtonResult>(({ size, disabled, readonly, invalid, checked }) => {
  const unwrappedSize = unref(size) ?? 'medium'
  const unwrappedDisabled = unref(disabled)
  const unwrappedReadonly = unref(readonly)
  const unwrappedInvalid = unref(invalid)
  const unwrappedChecked = unref(checked)

  const resolveSizeClass = (size: Exclude<RadioButtonProps['size'], undefined>) => {

    switch (size) {
      case 'small':
        return {
          root: clsx(
            'h-[2.5em] gap-[0.25em]'
          ),
          input: clsx(),
          label: clsx(),
          box: clsx(
            'text-[1rem]',
            'grid place-items-center',
            'w-[1.5em] h-[1.5em]'
          ),
          icon: clsx(),
        }
      case 'medium':
        return {
          root: clsx(
            'h-[3em] gap-[0.5em]'
          ),
          input: clsx(),
          label: clsx(),
          box: clsx(
            'text-[1rem]',
            'grid place-items-center',
            'w-[2em] h-[2em]'
          ),
          icon: clsx(),
        }
      case 'large':
        return {
          root: clsx(
            'h-[3.25em] gap-[0.75em]'
          ),
          input: clsx(
          ),
          label: clsx(),
          box: clsx(
            'text-[1rem]',
            'grid place-items-center',
            'w-[2.75em] h-[2.75em]'
          ),
          icon: clsx(),
        }
    }
  }

  const sizeClass = resolveSizeClass(unwrappedSize)

  return {
    rootClass: clsx(
      'text-[1rem]',
      'w-fit',
      'flex justify-start items-center',
      sizeClass.root
    ),
    inputClass: clsx(
      'sr-only'
    ),
    labelClass: clsx(
      'text-solid-gray-800',
      'w-fit'
    ),
    boxClass: clsx(
      sizeClass.box,
    ),
    iconClass: clsx(
      {
        'text-solid-gray-600 hover:text-black': !unwrappedDisabled && !unwrappedInvalid && !unwrappedChecked,
        'text-blue-900 hover:text-blue-1100': !unwrappedDisabled && !unwrappedInvalid && unwrappedChecked,
        'text-red-900 hover:text-red-1000': !unwrappedDisabled && unwrappedInvalid,
      },
      'not-motion-reduce:transition-colors not-motion-reduce:duration-300',
      'motion-reduce:transition-none'
    ),
    disabledIconClass: clsx(
      'text-current'
    ),
  }
})
