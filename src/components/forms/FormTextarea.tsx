import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { Form, Input } from 'antd';

interface FormTextareaProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  rows?: number;
}

export function FormTextarea<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 4,
}: FormTextareaProps<TFieldValues>) {
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
          <Input.TextArea {...field} placeholder={placeholder} rows={rows} />
        </Form.Item>
      )}
    />
  );
}
