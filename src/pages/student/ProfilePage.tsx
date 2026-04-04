import { useQuery } from '@tanstack/react-query';
import { Descriptions, Table, Typography } from 'antd';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { StatusTag } from '../../components/status/StatusTag';
import { getMyRegistrations } from '../../services/registrations.api';
import { getProfile } from '../../services/users.api';
import { queryKeys } from '../../utils/query-keys';
import {
  getRegistrationTitle,
  getRegistrationType,
  getTermName,
} from '../../utils/registration';

export default function StudentProfilePage() {
  const profileQuery = useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfile,
  });

  const registrationsQuery = useQuery({
    queryKey: queryKeys.registrations({ scope: 'me' }),
    queryFn: getMyRegistrations,
  });

  return (
    <div className="page-stack">
      <PageHeader
        title="Thong tin chung"
        subtitle="Xem ho so ca nhan va lich su dang ky BCTT/KLTN."
      />

      <SectionCard title="Ho so ca nhan">
        <Descriptions column={2}>
          <Descriptions.Item label="MSSV">
            {profileQuery.data?.studentCode ?? profileQuery.data?.id ?? '--'}
          </Descriptions.Item>
          <Descriptions.Item label="Ho ten">
            {profileQuery.data?.fullName ?? '--'}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {profileQuery.data?.email ?? '--'}
          </Descriptions.Item>
          <Descriptions.Item label="Vai tro">
            {profileQuery.data?.role ?? '--'}
          </Descriptions.Item>
          <Descriptions.Item label="Chuyen nganh">
            {profileQuery.data?.major ?? '--'}
          </Descriptions.Item>
          <Descriptions.Item label="He dao tao">
            {profileQuery.data?.heDaoTao ?? '--'}
          </Descriptions.Item>
        </Descriptions>
      </SectionCard>

      <SectionCard title="Lich su dang ky">
        <Table
          rowKey="id"
          dataSource={registrationsQuery.data ?? []}
          pagination={{ pageSize: 6 }}
          columns={[
            {
              title: 'De tai',
              render: (_, record) => getRegistrationTitle(record),
            },
            {
              title: 'Loai',
              render: (_, record) => getRegistrationType(record),
            },
            {
              title: 'Dot',
              render: (_, record) => getTermName(record),
            },
            {
              title: 'GVHD',
              render: (_, record) => record.supervisor?.fullName ?? '--',
            },
            {
              title: 'Trang thai',
              render: (_, record) => <StatusTag status={record.statusLabel} />,
            },
          ]}
          locale={{
            emptyText: (
              <Typography.Text type="secondary">
                Chua co registration nao.
              </Typography.Text>
            ),
          }}
        />
      </SectionCard>
    </div>
  );
}
