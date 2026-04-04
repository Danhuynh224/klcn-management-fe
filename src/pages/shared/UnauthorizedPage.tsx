import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { getDefaultRouteByRole } from '../../utils/auth';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.user?.role);

  return (
    <Result
      status="403"
      title="Không có quyền truy cập"
      subTitle="Trang này không thuộc phạm vi thao tác của vai trò hiện tại."
      extra={
        <Button type="primary" onClick={() => navigate(getDefaultRouteByRole(role))}>
          Quay về dashboard
        </Button>
      }
    />
  );
}
