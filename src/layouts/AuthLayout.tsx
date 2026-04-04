import { Card, Space, Typography } from 'antd';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="auth-shell app-shell">
      <Card className="auth-card glass-panel" bordered={false}>
        <Space direction="vertical" size={8} style={{ marginBottom: 24 }}>
          <Typography.Text style={{ color: '#138a72', fontWeight: 700 }}>
            KLCN Management
          </Typography.Text>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Hệ thống đăng ký BCTT / KLTN
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            Đăng nhập để truy cập dashboard đúng vai trò và theo dõi toàn bộ
            workflow từ đăng ký đến hậu bảo vệ.
          </Typography.Paragraph>
        </Space>
        <Outlet />
      </Card>
    </div>
  );
}
