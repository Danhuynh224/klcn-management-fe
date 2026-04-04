import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
} from 'antd';
import type { MenuProps } from 'antd';
import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { navigationByRole, routeLabelMap } from '../app/navigation';
import { NotificationBell } from '../components/notifications/NotificationBell';
import { useAuthStore } from '../store/auth.store';
import { getDefaultRouteByRole } from '../utils/auth';

const { Header, Content, Sider } = Layout;

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useAuthStore((state) => state.user?.role);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [collapsed, setCollapsed] = useState(false);

  const items = role ? navigationByRole[role] : [];
  const selectedItem =
    items.find((item) => location.pathname.startsWith(item.path)) ?? items[0];

  const menuItems: MenuProps['items'] = items.map((item) => ({
    key: item.path,
    icon: item.icon,
    label: <Link to={item.path}>{item.label}</Link>,
  }));

  const breadcrumbItems = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => ({
      title: routeLabelMap[segment] ?? segment,
    }));

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'home',
      icon: <UserOutlined />,
      label: 'Về dashboard',
      onClick: () => navigate(getDefaultRouteByRole(role)),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  return (
    <Layout className="dashboard-layout app-shell">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={280}
        className="dashboard-layout__sider glass-panel"
      >
        <div className="dashboard-layout__brand">
          <Typography.Text style={{ color: '#138a72', fontWeight: 700 }}>
            KLCN Portal
          </Typography.Text>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {role === 'STUDENT'
              ? 'Sinh viên'
              : role === 'LECTURER'
                ? 'Giảng viên'
                : 'Trưởng bộ môn'}
          </Typography.Title>
          <Typography.Text type="secondary">
            Điều hướng theo đúng quyền hạn và luồng nghiệp vụ.
          </Typography.Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={selectedItem ? [selectedItem.path] : []}
          items={menuItems}
          style={{ borderInlineEnd: 'none', background: 'transparent' }}
        />
      </Sider>

      <Layout>
        <Header className="dashboard-layout__header glass-panel">
          <Space align="center" size="middle">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((value) => !value)}
            />
            <div>
              <Typography.Title level={4} style={{ margin: 0 }}>
                {selectedItem?.label ?? 'Dashboard'}
              </Typography.Title>
              <Breadcrumb items={breadcrumbItems} />
            </div>
          </Space>

          <div className="dashboard-layout__toolbar">
            <NotificationBell />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Button type="text">
                <Space>
                  <Avatar style={{ background: '#138a72' }}>
                    {user?.fullName?.[0] ?? 'U'}
                  </Avatar>
                  <span>{user?.fullName ?? 'Người dùng'}</span>
                </Space>
              </Button>
            </Dropdown>
          </div>
        </Header>

        <Content className="dashboard-layout__content">
          <div className="dashboard-layout__page">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
