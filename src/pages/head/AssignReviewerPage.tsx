import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Select, Space, Table, message } from 'antd';
import { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { getRegistrations, changeReviewer } from '../../services/registrations.api';
import { getLecturers } from '../../services/users.api';
import { getErrorMessage } from '../../utils/errors';
import { getRegistrationTitle, getTermName } from '../../utils/registration';
import { queryKeys } from '../../utils/query-keys';

export default function HeadAssignReviewerPage() {
  const [draftAssignments, setDraftAssignments] = useState<
    Record<string, string | number | undefined>
  >({});

  const registrationsQuery = useQuery({
    queryKey: queryKeys.registrations({ loai: 'KLTN', role: 'head' }),
    queryFn: () => getRegistrations({ loai: 'KLTN' }),
  });

  const lecturersQuery = useQuery({
    queryKey: queryKeys.lecturers({ scope: 'assign-reviewer' }),
    queryFn: () => getLecturers(),
  });

  const assignMutation = useMutation({
    mutationFn: ({
      id,
      reviewerId,
    }: {
      id: number | string;
      reviewerId: number | string;
    }) => changeReviewer(id, { reviewerId }),
    onSuccess: () => {
      message.success('Đã phân công phản biện.');
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  return (
    <div className="page-stack">
      <PageHeader
        title="Phân công phản biện"
        subtitle="Chọn GVPB cho từng hồ sơ KLTN và lưu phân công ngay tại bảng."
      />

      <SectionCard title="Danh sách cần phân công">
        <Table
          rowKey="id"
          dataSource={registrationsQuery.data ?? []}
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
              title: 'GVHD',
              render: (_, record) => record.supervisor?.fullName ?? '--',
            },
            {
              title: 'Đợt',
              render: (_, record) => getTermName(record),
            },
            {
              title: 'Chọn GVPB',
              render: (_, record) => (
                <Select
                  style={{ minWidth: 220 }}
                  value={draftAssignments[String(record.id)] ?? record.reviewer?.email}
                  placeholder="Chọn giảng viên"
                  onChange={(value) =>
                    setDraftAssignments((current) => ({
                      ...current,
                      [String(record.id)]: value,
                    }))
                  }
                  options={(lecturersQuery.data ?? []).map((lecturer) => ({
                    label: lecturer.fullName,
                    value: lecturer.email,
                  }))}
                />
              ),
            },
            {
              title: 'Thao tác',
              render: (_, record) => (
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      const reviewerId =
                        draftAssignments[String(record.id)] ?? record.reviewer?.email;
                      if (!reviewerId) {
                        message.warning('Vui lòng chọn GVPB trước khi lưu.');
                        return;
                      }

                      assignMutation.mutate({ id: record.id, reviewerId });
                    }}
                  >
                    Lưu phân công
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </SectionCard>
    </div>
  );
}
