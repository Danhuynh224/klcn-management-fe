import {
  ApartmentOutlined,
  AuditOutlined,
  BarChartOutlined,
  DashboardOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  FormOutlined,
  NotificationOutlined,
  ProfileOutlined,
  ReadOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import type { Role } from '../types/auth';

export interface NavigationItem {
  key: string;
  path: string;
  label: string;
  icon: ReactNode;
}

export const navigationByRole: Record<Role, NavigationItem[]> = {
  STUDENT: [
    {
      key: 'student-dashboard',
      path: '/student/dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      key: 'student-profile',
      path: '/student/profile',
      label: 'Thông tin chung',
      icon: <UserOutlined />,
    },
    {
      key: 'student-bctt',
      path: '/student/register-bctt',
      label: 'Đăng ký BCTT',
      icon: <FormOutlined />,
    },
    {
      key: 'student-kltn',
      path: '/student/register-kltn',
      label: 'Đăng ký KLTN',
      icon: <ReadOutlined />,
    },
    {
      key: 'student-status',
      path: '/student/status',
      label: 'Theo dõi trạng thái',
      icon: <ProfileOutlined />,
    },
    {
      key: 'student-submission',
      path: '/student/submission',
      label: 'Nộp hồ sơ',
      icon: <FileTextOutlined />,
    },
    {
      key: 'student-result',
      path: '/student/result',
      label: 'Kết quả / Bảo vệ',
      icon: <NotificationOutlined />,
    },
  ],
  LECTURER: [
    {
      key: 'lecturer-dashboard',
      path: '/lecturer/dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      key: 'lecturer-supervisor',
      path: '/lecturer/supervisor',
      label: 'Hướng dẫn',
      icon: <SolutionOutlined />,
    },
    {
      key: 'lecturer-reviewer',
      path: '/lecturer/reviewer',
      label: 'Phản biện',
      icon: <AuditOutlined />,
    },
    {
      key: 'lecturer-committee',
      path: '/lecturer/committee',
      label: 'Hội đồng',
      icon: <TeamOutlined />,
    },
    {
      key: 'lecturer-chair',
      path: '/lecturer/chair',
      label: 'Chủ tịch',
      icon: <FileProtectOutlined />,
    },
    {
      key: 'lecturer-secretary',
      path: '/lecturer/secretary',
      label: 'Thư ký',
      icon: <ProfileOutlined />,
    },
    {
      key: 'lecturer-topics',
      path: '/lecturer/topic-suggestions',
      label: 'Gợi ý đề tài',
      icon: <FileSearchOutlined />,
    },
  ],
  HEAD_OF_DEPARTMENT: [
    {
      key: 'head-dashboard',
      path: '/head/dashboard',
      label: 'Dashboard',
      icon: <DashboardOutlined />,
    },
    {
      key: 'head-quotas',
      path: '/head/quotas',
      label: 'Quota GV',
      icon: <BarChartOutlined />,
    },
    {
      key: 'head-reviewers',
      path: '/head/assign-reviewer',
      label: 'Phân công phản biện',
      icon: <UserOutlined />,
    },
    {
      key: 'head-committees',
      path: '/head/assign-committee',
      label: 'Phân công hội đồng',
      icon: <ApartmentOutlined />,
    },
    {
      key: 'head-statistics',
      path: '/head/statistics',
      label: 'Thống kê',
      icon: <BarChartOutlined />,
    },
  ],
};

export const routeLabelMap: Record<string, string> = {
  login: 'Đăng nhập',
  student: 'Sinh viên',
  lecturer: 'Giảng viên',
  head: 'Trưởng bộ môn',
  dashboard: 'Dashboard',
  profile: 'Thông tin chung',
  'register-bctt': 'Đăng ký BCTT',
  'register-kltn': 'Đăng ký KLTN',
  status: 'Theo dõi trạng thái',
  submission: 'Nộp hồ sơ',
  result: 'Kết quả / Bảo vệ',
  supervisor: 'Hướng dẫn',
  reviewer: 'Phản biện',
  committee: 'Hội đồng',
  chair: 'Chủ tịch',
  secretary: 'Thư ký',
  'topic-suggestions': 'Gợi ý đề tài',
  quotas: 'Quota GV',
  'assign-reviewer': 'Phân công phản biện',
  'assign-committee': 'Phân công hội đồng',
  statistics: 'Thống kê',
  unauthorized: 'Không có quyền truy cập',
};
