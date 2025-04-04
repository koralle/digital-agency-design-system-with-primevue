import { type Ref, computed, unref } from 'vue';

export const useComponentCssClass =
  <
    ComponentProps extends {},
    K extends keyof ComponentProps,
    PrimeVueComponentPassThrough extends {},
    U extends keyof PrimeVueComponentPassThrough,
  >(
    resolverFn: (
      args: Required<{ [key in keyof Pick<ComponentProps, K>]: ComponentProps[key] }> & {
        [key in U]: PrimeVueComponentPassThrough[key];
      },
    ) => string,
  ) =>
  (
    args: Required<{ [key in keyof Pick<ComponentProps, K>]: Ref<ComponentProps[key]> }> & {
      [key in U]: PrimeVueComponentPassThrough[key];
    },
  ) =>
    computed(() => {
      const plainArgs = Object.entries(args).reduce(
        (acc, [key, value]) => {
          acc[key as keyof typeof args] = unref(value) as any;
          return acc;
        },
        {} as Required<{ [key in keyof Pick<ComponentProps, K>]: ComponentProps[key] }> & {
          [key in U]: PrimeVueComponentPassThrough[key];
        },
      );
      return resolverFn(plainArgs);
    });
