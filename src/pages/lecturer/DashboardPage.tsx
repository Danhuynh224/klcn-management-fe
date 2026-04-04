import { useQuery } from '@tanstack/react-query';
import { List, Typography } from 'antd';
import { MetricCard } from '../../components/common/MetricCard';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { getLecturerDashboard } from '../../services/dashboards.api';
import { queryKeys } from '../../utils/query-keys';

export default function LecturerDashboardPage() {
  const dashboardQuery = useQuery({
    queryKey: queryKeys.dashboard('lecturer'),
    queryFn: getLecturerDashboard,
  });

  return (
    <div className="page-stack">
      <PageHeader
        title="Dashboard giảng viên"
        subtitle="Tổng quan số lượng sinh viên hướng dẫn, phản biện và các tác vụ đang chờ."
      />

      <div className="page-grid three-up">
        <MetricCard title="Sinh viên hướng dẫn" value={dashboardQuery.data?.supervisorCount} />
        <MetricCard title="Sinh viên phản biện" value={dashboardQuery.data?.reviewerCount} />
        <MetricCard title="Tác vụ cần xử lý" value={dashboardQuery.data?.pendingTasks} />
      </div>

      <SectionCard title="Danh sách việc cần làm">
        <List
          dataSource={dashboardQuery.data?.tasks ?? []}
          locale={{ emptyText: 'Chưa có tác vụ phát sinh.' }}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.label}
                description={
                  <Typography.Text type="secondary">
                    {item.description ?? 'Hệ thống đang đồng bộ chi tiết tác vụ.'}
                  </Typography.Text>
                }
              />
              <Typography.Text strong>{item.count ?? '--'}</Typography.Text>
            </List.Item>
          )}
        />
      </SectionCard>
    </div>
  );
}
