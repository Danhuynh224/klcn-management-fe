import { useQuery } from '@tanstack/react-query';
import { List, Typography } from 'antd';
import { MetricCard } from '../../components/common/MetricCard';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { getHeadDashboard } from '../../services/dashboards.api';
import { queryKeys } from '../../utils/query-keys';

export default function HeadDashboardPage() {
  const dashboardQuery = useQuery({
    queryKey: queryKeys.dashboard('head'),
    queryFn: getHeadDashboard,
  });

  return (
    <div className="page-stack">
      <PageHeader
        title="Dashboard trưởng bộ môn"
        subtitle="Nắm số lượng hồ sơ theo đợt, quota giảng viên và các bước đang chờ phân công."
      />

      <div className="page-grid three-up">
        <MetricCard
          title="Tổng registrations"
          value={dashboardQuery.data?.totalRegistrations}
        />
        <MetricCard
          title="Chờ duyệt"
          value={dashboardQuery.data?.pendingApprovals}
        />
        <MetricCard
          title="Chờ phân công hội đồng"
          value={dashboardQuery.data?.pendingCommittees}
        />
      </div>

      <SectionCard title="Quota overview">
        <List
          dataSource={dashboardQuery.data?.quotaOverview ?? []}
          locale={{ emptyText: 'Backend chưa trả dữ liệu quota overview.' }}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item.label}</Typography.Text>
              <Typography.Text strong>{item.value}</Typography.Text>
            </List.Item>
          )}
        />
      </SectionCard>
    </div>
  );
}
