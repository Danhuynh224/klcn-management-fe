import { useQuery } from '@tanstack/react-query';
import { Progress, Select, Table, Typography } from 'antd';
import { useState } from 'react';
import { MetricCard } from '../../components/common/MetricCard';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { getHeadDashboard } from '../../services/dashboards.api';
import { getRegistrations } from '../../services/registrations.api';
import { getTerms } from '../../services/terms.api';
import { queryKeys } from '../../utils/query-keys';
import { getRegistrationTitle } from '../../utils/registration';

export default function HeadStatisticsPage() {
  const [selectedTermId, setSelectedTermId] = useState<string | number>();

  const termsQuery = useQuery({
    queryKey: queryKeys.terms({ scope: 'statistics' }),
    queryFn: () => getTerms(),
  });

  const registrationsQuery = useQuery({
    queryKey: queryKeys.registrations({ scope: 'statistics', termId: selectedTermId }),
    queryFn: () => getRegistrations(selectedTermId ? { termId: selectedTermId } : undefined),
  });

  const dashboardQuery = useQuery({
    queryKey: queryKeys.dashboard('head-statistics'),
    queryFn: getHeadDashboard,
  });

  const registrations = registrationsQuery.data ?? [];
  const completedCount = registrations.filter((item) => item.status === 'COMPLETED').length;
  const revisionApprovedCount = registrations.filter((item) => item.chairApproved).length;
  const progressPercent = registrations.length
    ? Math.round((completedCount / registrations.length) * 100)
    : 0;

  return (
    <div className="page-stack">
      <PageHeader
        title="Thống kê"
        subtitle="Lọc theo đợt để theo dõi tiến độ hoàn thành, pass/fail và trạng thái duyệt chỉnh sửa."
        extra={
          <Select
            allowClear
            style={{ minWidth: 240 }}
            value={selectedTermId}
            placeholder="Lọc theo đợt"
            onChange={setSelectedTermId}
            options={(termsQuery.data ?? []).map((term) => ({
              label: term.name,
              value: term.id,
            }))}
          />
        }
      />

      <div className="page-grid three-up">
        <MetricCard title="Tổng hồ sơ" value={registrations.length} />
        <MetricCard title="Hoàn thành" value={completedCount} />
        <MetricCard title="Đã duyệt chỉnh sửa" value={revisionApprovedCount} />
      </div>

      <SectionCard title="Tiến độ hoàn thành">
        <Progress percent={progressPercent} strokeColor="#138a72" />
        <Typography.Paragraph style={{ marginTop: 16, marginBottom: 0 }}>
          Dashboard head báo cáo còn {dashboardQuery.data?.pendingReviewers ?? 0} hồ sơ
          đang chờ phân công phản biện.
        </Typography.Paragraph>
      </SectionCard>

      <SectionCard title="Bảng chi tiết">
        <Table
          rowKey="id"
          dataSource={registrations}
          pagination={{ pageSize: 8 }}
          columns={[
            {
              title: 'Sinh viên',
              render: (_, record) => record.student?.fullName ?? '--',
            },
            {
              title: 'Đề tài',
              render: (_, record) => getRegistrationTitle(record),
            },
            {
              title: 'Trạng thái',
              dataIndex: 'status',
            },
            {
              title: 'Điểm final',
              render: (_, record) => record.finalScore ?? '--',
            },
            {
              title: 'GVHD duyệt sửa',
              render: (_, record) => (record.supervisorApproved ? 'Đã duyệt' : 'Chưa duyệt'),
            },
            {
              title: 'Chủ tịch duyệt sửa',
              render: (_, record) => (record.chairApproved ? 'Đã duyệt' : 'Chưa duyệt'),
            },
          ]}
        />
      </SectionCard>
    </div>
  );
}
