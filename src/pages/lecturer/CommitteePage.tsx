import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Modal, Space, message } from 'antd';
import { useState } from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { ScoreForm, type ScoreFormValues } from '../../components/score/ScoreForm';
import { RegistrationTable } from '../../components/tables/RegistrationTable';
import { getRegistrations } from '../../services/registrations.api';
import { createScore } from '../../services/scores.api';
import type { Registration } from '../../types/models';
import { getErrorMessage } from '../../utils/errors';
import { queryKeys } from '../../utils/query-keys';

export default function LecturerCommitteePage() {
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(
    null,
  );

  const registrationsQuery = useQuery({
    queryKey: queryKeys.registrations({ roleView: 'committee' }),
    queryFn: () => getRegistrations({ roleView: 'committee' }),
  });

  const scoreMutation = useMutation({
    mutationFn: (values: ScoreFormValues & { registrationId: number | string }) =>
      createScore({ ...values, registrationId: values.registrationId, role: 'COMMITTEE' }),
    onSuccess: () => {
      message.success('Đã lưu điểm hội đồng.');
      setSelectedRegistration(null);
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  return (
    <div className="page-stack">
      <PageHeader
        title="Thành viên hội đồng"
        subtitle="Xem lịch bảo vệ, tài liệu liên quan và nhập điểm hội đồng."
      />

      <SectionCard title="Danh sách sinh viên trong hội đồng">
        <RegistrationTable
          data={registrationsQuery.data ?? []}
          extraColumns={[
            {
              title: 'Hội đồng',
              render: (_, record) => record.committee?.name ?? 'Chưa xếp',
            },
            {
              title: 'Ngày bảo vệ',
              render: (_, record) => record.committee?.defenseDate ?? record.defenseDate ?? '--',
            },
            {
              title: 'Địa điểm',
              render: (_, record) => record.committee?.location ?? record.defenseLocation ?? '--',
            },
          ]}
          actions={(registration) => (
            <Space wrap>
              <Button
                type="primary"
                size="small"
                onClick={() => setSelectedRegistration(registration)}
              >
                Nhập điểm
              </Button>
            </Space>
          )}
        />
      </SectionCard>

      <Modal
        open={Boolean(selectedRegistration)}
        onCancel={() => setSelectedRegistration(null)}
        footer={null}
        title="Nhập điểm hội đồng"
      >
        {selectedRegistration ? (
          <ScoreForm
            loading={scoreMutation.isPending}
            onSubmit={(values) =>
              scoreMutation.mutate({
                ...values,
                registrationId: selectedRegistration.id,
              })
            }
          />
        ) : null}
      </Modal>
    </div>
  );
}
