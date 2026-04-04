import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Form, Select } from 'antd';
import type { SelectOption } from '../../types/models';

interface FormSelectProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  loading?: boolean;
  disabled?: boolean;
}

export function FormSelect<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  loading,
  disabled,
}: FormSelectProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.error ? 'error' : ''}
          help={fieldState.error?.message}
        >
          <Select
            value={field.value}
            options={options}
            placeholder={placeholder}
            loading={loading}
            disabled={disabled}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        </Form.Item>
      )}
    />
  );
}
