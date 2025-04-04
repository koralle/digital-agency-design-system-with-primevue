export interface PasswordInputProps {
  id?: string;
  class?: string;

  modelValue?: string | null;
  defaultValue?: string | null;

  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  readonly?: boolean;
  required?: boolean;
  spellcheck?: boolean;
  form?: string;
  placeholder?: string;
  autocomplete?: string;
  minlength?: number;
  maxlength?: number;

  inputId?: string;

  size?: 'small' | 'medium' | 'large';
}

export interface PasswordInputEmits {
  'update:modelValue': [value: string];
}
