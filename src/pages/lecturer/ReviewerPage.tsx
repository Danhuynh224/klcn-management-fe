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

export default function LecturerReviewerPage() {
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(
    null,
  );

  const registrationsQuery = useQuery({
    queryKey: queryKeys.registrations({ roleView: 'reviewer' }),
    queryFn: () => getRegistrations({ roleView: 'reviewer' }),
  });

  const scoreMutation = useMutation({
    mutationFn: (values: ScoreFormValues & { registrationId: number | string }) =>
      createScore({ ...values, registrationId: values.registrationId, role: 'REVIEWER' }),
    onSuccess: () => {
      message.success('Đã lưu điểm phản biện.');
      setSelectedRegistration(null);
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  return (
    <div className="page-stack">
      <PageHeader
        title="Phản biện"
        subtitle="Xem danh sách được phân công và nhập điểm phản biện theo từng hồ sơ."
      />

      <SectionCard title="Danh sách phản biện">
        <RegistrationTable
          data={registrationsQuery.data ?? []}
          extraColumns={[
            {
              title: 'Turnitin',
              render: () => 'Xem từ hồ sơ đính kèm',
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
        title="Nhập điểm phản biện"
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
