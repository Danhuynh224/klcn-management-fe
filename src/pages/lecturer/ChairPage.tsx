import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Space, message } from 'antd';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { RegistrationTable } from '../../components/tables/RegistrationTable';
import { getRegistrations, updateStatus } from '../../services/registrations.api';
import { getErrorMessage } from '../../utils/errors';
import { queryKeys } from '../../utils/query-keys';

export default function LecturerChairPage() {
  const registrationsQuery = useQuery({
    queryKey: queryKeys.registrations({ roleView: 'chair' }),
    queryFn: () => getRegistrations({ roleView: 'chair' }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number | string;
      status: string;
    }) => updateStatus(id, { status }),
    onSuccess: () => {
      message.success('Đã cập nhật trạng thái chỉnh sửa.');
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  return (
    <div className="page-stack">
      <PageHeader
        title="Chủ tịch hội đồng"
        subtitle="Duyệt bài chỉnh sửa sau khi GVHD đã xác nhận hoàn tất."
      />

      <SectionCard title="Danh sách chờ duyệt chỉnh sửa">
        <RegistrationTable
          data={registrationsQuery.data ?? []}
          extraColumns={[
            {
              title: 'GVHD duyệt',
              render: (_, record) => (record.supervisorApproved ? 'Đã duyệt' : 'Chưa duyệt'),
            },
            {
              title: 'Chủ tịch duyệt',
              render: (_, record) => (record.chairApproved ? 'Đã duyệt' : 'Chưa duyệt'),
            },
          ]}
          actions={(registration) => (
            <Space wrap>
              <Button
                size="small"
                type="primary"
                disabled={!registration.supervisorApproved}
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: registration.id,
                    status: 'REVISION_APPROVED',
                  })
                }
              >
                Duyệt
              </Button>
              <Button
                size="small"
                danger
                disabled={!registration.supervisorApproved}
                onClick={() =>
                  updateStatusMutation.mutate({
                    id: registration.id,
                    status: 'WAITING_REVISION',
                  })
                }
              >
                Từ chối
              </Button>
            </Space>
          )}
        />
      </SectionCard>
    </div>
  );
}
