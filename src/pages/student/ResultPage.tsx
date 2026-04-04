import { useQuery } from '@tanstack/react-query';
import { Descriptions, Empty, Select, Table, Typography } from 'antd';
import { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { getDocumentsByRegistration } from '../../services/documents.api';
import { getMinutesByRegistration } from '../../services/minutes.api';
import {
  getMyRegistrations,
  getRegistrationDetail,
} from '../../services/registrations.api';
import { getScoresByRegistration } from '../../services/scores.api';
import { queryKeys } from '../../utils/query-keys';
import {
  calculateAverageScore,
  getFileUrl,
  getLatestRegistration,
  getRegistrationTitle,
} from '../../utils/registration';

export default function StudentResultPage() {
  const [selectedRegistrationId, setSelectedRegistrationId] = useState<
    string | number
  >();

  const registrationsQuery = useQuery({
    queryKey: queryKeys.registrations({ scope: 'me' }),
    queryFn: getMyRegistrations,
  });

  const currentRegistrationId =
    selectedRegistrationId ??
    getLatestRegistration(registrationsQuery.data, 'KLTN')?.id ??
    registrationsQuery.data?.[0]?.id;

  const detailQuery = useQuery({
    queryKey: queryKeys.registration(currentRegistrationId),
    queryFn: () => getRegistrationDetail(currentRegistrationId!),
    enabled: Boolean(currentRegistrationId),
  });

  const scoresQuery = useQuery({
    queryKey: queryKeys.scores(currentRegistrationId),
    queryFn: () => getScoresByRegistration(currentRegistrationId!),
    enabled: Boolean(currentRegistrationId),
  });

  const documentsQuery = useQuery({
    queryKey: queryKeys.documents(currentRegistrationId),
    queryFn: () => getDocumentsByRegistration(currentRegistrationId!),
    enabled: Boolean(currentRegistrationId),
  });

  const minutesQuery = useQuery({
    queryKey: queryKeys.minutes(currentRegistrationId),
    queryFn: () => getMinutesByRegistration(currentRegistrationId!),
    enabled: Boolean(currentRegistrationId),
  });

  const registration = detailQuery.data;

  return (
    <div className="page-stack">
      <PageHeader
        title="Kết quả / Bảo vệ"
        subtitle="Xem lịch bảo vệ, điểm thành phần, điểm cuối cùng và biên bản hội đồng."
      />

      <SectionCard
        title="Chọn hồ sơ"
        extra={
          <Select
            style={{ minWidth: 280 }}
            value={currentRegistrationId}
            onChange={setSelectedRegistrationId}
            options={(registrationsQuery.data ?? []).map((registrationItem) => ({
              label: getRegistrationTitle(registrationItem),
              value: registrationItem.id,
            }))}
          />
        }
      >
        {registration ? (
          <Descriptions column={2}>
            <Descriptions.Item label="Đề tài">
              {getRegistrationTitle(registration)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày bảo vệ">
              {registration.defenseDate ?? 'Chưa xếp lịch'}
            </Descriptions.Item>
            <Descriptions.Item label="Địa điểm">
              {registration.defenseLocation ?? registration.committee?.location ?? 'Chưa có'}
            </Descriptions.Item>
            <Descriptions.Item label="Điểm trung bình">
              {calculateAverageScore(scoresQuery.data) ?? registration.finalScore ?? '--'}
            </Descriptions.Item>
            <Descriptions.Item label="Duyệt chỉnh sửa GVHD">
              {registration.supervisorApproved ? 'Đã duyệt' : 'Chưa duyệt'}
            </Descriptions.Item>
            <Descriptions.Item label="Duyệt chỉnh sửa Chủ tịch">
              {registration.chairApproved ? 'Đã duyệt' : 'Chưa duyệt'}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <Empty description="Chưa có dữ liệu kết quả." />
        )}
      </SectionCard>

      <div className="page-grid two-up">
        <SectionCard title="Điểm thành phần">
          <Table
            rowKey="id"
            pagination={false}
            dataSource={scoresQuery.data ?? []}
            columns={[
              { title: 'Vai trò', dataIndex: 'role' },
              { title: 'Điểm tổng', dataIndex: 'totalScore' },
              { title: 'Nhận xét', dataIndex: 'comments' },
            ]}
          />
        </SectionCard>

        <SectionCard title="Biên bản hội đồng">
          {minutesQuery.data?.fileUrl || minutesQuery.data?.url ? (
            <a
              href={minutesQuery.data.fileUrl ?? minutesQuery.data.url}
              target="_blank"
              rel="noreferrer"
            >
              Xem biên bản hội đồng
            </a>
          ) : (
            <Typography.Text type="secondary">
              Chưa có biên bản được sinh từ thư ký.
            </Typography.Text>
          )}
        </SectionCard>
      </div>

      <SectionCard title="Tài liệu liên quan">
        <Table
          rowKey="id"
          pagination={false}
          dataSource={documentsQuery.data ?? []}
          columns={[
            { title: 'Loại', dataIndex: 'type' },
            {
              title: 'Tệp',
              render: (_, record) => (
                <a href={getFileUrl(record)} target="_blank" rel="noreferrer">
                  {record.fileName ?? record.name ?? 'Xem tệp'}
                </a>
              ),
            },
          ]}
        />
      </SectionCard>
    </div>
  );
}
