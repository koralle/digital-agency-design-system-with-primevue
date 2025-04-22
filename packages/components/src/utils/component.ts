import { type Ref, computed, unref } from 'vue'

export const useComponentCssClass =
  <
    ComponentProps extends {},
    K extends keyof ComponentProps,
    PrimeVueComponentPassThrough extends {},
    U extends keyof PrimeVueComponentPassThrough,
  >(
    resolverFn: (
      args: Required<{ [key in keyof Pick<ComponentProps, K>]: ComponentProps[key] }> & {
        [key in U]: PrimeVueComponentPassThrough[key]
      },
    ) => string,
  ) =>
  (
    args: Required<{ [key in keyof Pick<ComponentProps, K>]: Ref<ComponentProps[key]> }> & {
      [key in U]: PrimeVueComponentPassThrough[key]
    },
  ) =>
    computed(() => {
      const plainArgs = Object.entries(args).reduce(
        (acc, [key, value]) => {
          acc[key as keyof typeof args] = unref(value) as any
          return acc
        },
        {} as Required<{ [key in keyof Pick<ComponentProps, K>]: ComponentProps[key] }> & {
          [key in U]: PrimeVueComponentPassThrough[key]
        },
      )
      return resolverFn(plainArgs)
    })

export type ComponentProps<T extends object> = T extends {
  dt?: unknown
  pt?: unknown
  ptOptions?: unknown
  unstyled?: boolean
} ? Omit<T, 'dt' | 'pt' | 'ptOptions' | 'unstyled'> :  T

type ResolverArguments<T extends object> = { [key in keyof ComponentProps<T>]: Ref<ComponentProps<T>[key]>}

export const useComponentClass = <T extends object, U extends object>(resolverFn: (args: ResolverArguments<T>) => U) => (args: ResolverArguments<T>) => computed<U>(() => resolverFn(args))
