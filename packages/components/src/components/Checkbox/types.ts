export interface CheckboxProps {
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
  indeterminate?: boolean;
  modelValue?: any;
  defaultValue?: any;
  name?: string;
  binary?: boolean;
  readonly?: boolean;
  required?: boolean;
  trueValue?: any;
  falseValue?: any;
  inputId?: string;
  size?: 'small' | 'medium' | 'large';
}

export interface CheckboxEmits {
  (e: 'update:modelValue', value: any): void;
  (e: 'update:indeterminate', value: false): void;
}
