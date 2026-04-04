import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, message } from 'antd';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { FormInput } from '../../components/forms/FormInput';
import { login } from '../../services/auth.api';
import { useAuthStore } from '../../store/auth.store';
import { getErrorMessage } from '../../utils/errors';

const loginSchema = z.object({
  email: z.email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const saveLogin = useAuthStore((state) => state.login);

  const { control, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      saveLogin(data);
      message.success('Đăng nhập thành công.');

      const fallbackPath =
        typeof location.state === 'object' &&
        location.state &&
        'from' in location.state &&
        typeof location.state.from === 'object' &&
        location.state.from &&
        'pathname' in location.state.from &&
        typeof location.state.from.pathname === 'string'
          ? location.state.from.pathname
          : undefined;

      navigate(fallbackPath ?? (data.user.role === 'STUDENT'
        ? '/student/dashboard'
        : data.user.role === 'LECTURER'
          ? '/lecturer/dashboard'
          : '/head/dashboard'));
    },
    onError: (error) => {
      message.error(getErrorMessage(error));
    },
  });

  return (
    <Form layout="vertical" onFinish={handleSubmit((values) => loginMutation.mutate(values))}>
      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="student@university.edu.vn"
      />
      <FormInput
        control={control}
        name="password"
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        type="password"
      />

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        block
        loading={loginMutation.isPending}
        disabled={!formState.isValid}
      >
        Đăng nhập
      </Button>
    </Form>
  );
}
