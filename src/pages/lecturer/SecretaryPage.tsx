import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Modal, Space, Table, Typography, message } from 'antd';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { RegistrationTable } from '../../components/tables/RegistrationTable';
import {
  generateMinutes,
  getMinutesByRegistration,
  updateMinutes,
} from '../../services/minutes.api';
import { getRegistrations } from '../../services/registrations.api';
import { finalizeScore, getScoresByRegistration } from '../../services/scores.api';
import type { Registration } from '../../types/models';
import { getErrorMessage } from '../../utils/errors';
import { queryKeys } from '../../utils/query-keys';

const minutesSchema = z.object({
  notes: z.string().min(1, 'Vui lòng nhập ghi chú biên bản'),
});

type MinutesFormValues = z.infer<typeof minutesSchema>;

export default function LecturerSecretaryPage() {
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(
    null,
  );

  const registrationsQuery = useQuery({
    queryKey: queryKeys.registrations({ roleView: 'secretary' }),
    queryFn: () => getRegistrations({ roleView: 'secretary' }),
  });

  const scoresQuery = useQuery({
    queryKey: queryKeys.scores(selectedRegistration?.id),
    queryFn: () => getScoresByRegistration(selectedRegistration!.id),
    enabled: Boolean(selectedRegistration?.id),
  });

  const minutesQuery = useQuery({
    queryKey: queryKeys.minutes(selectedRegistration?.id),
    queryFn: () => getMinutesByRegistration(selectedRegistration!.id),
    enabled: Boolean(selectedRegistration?.id),
  });

  const { control, handleSubmit, reset, formState } = useForm<MinutesFormValues>({
    resolver: zodResolver(minutesSchema),
    mode: 'onChange',
    defaultValues: { notes: '' },
  });

  const finalizeMutation = useMutation({
    mutationFn: finalizeScore,
    onSuccess: () => message.success('Đã chốt điểm cuối cùng.'),
    onError: (error) => message.error(getErrorMessage(error)),
  });

  const generateMutation = useMutation({
    mutationFn: generateMinutes,
    onSuccess: () => message.success('Đã sinh biên bản hội đồng.'),
    onError: (error) => message.error(getErrorMessage(error)),
  });

  const updateMinutesMutation = useMutation({
    mutationFn: ({
      registrationId,
      values,
    }: {
      registrationId: number | string;
      values: MinutesFormValues;
    }) => updateMinutes(registrationId, values),
    onSuccess: () => {
      message.success('Đã cập nhật biên bản.');
      setSelectedRegistration(null);
      reset({ notes: '' });
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  return (
    <div className="page-stack">
      <PageHeader
        title="Thư ký hội đồng"
        subtitle="Tổng hợp điểm, chốt điểm cuối cùng và cập nhật biên bản hội đồng."
      />

      <SectionCard title="Danh sách cần tổng hợp">
        <RegistrationTable
          data={registrationsQuery.data ?? []}
          extraColumns={[
            {
              title: 'Điểm final',
              render: (_, record) => record.finalScore ?? '--',
            },
          ]}
          actions={(registration) => (
            <Space wrap>
              <Button
                size="small"
                onClick={() => finalizeMutation.mutate(registration.id)}
              >
                Chốt điểm
              </Button>
              <Button
                size="small"
                onClick={() => generateMutation.mutate(registration.id)}
              >
                Sinh biên bản
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => setSelectedRegistration(registration)}
              >
                Xem chi tiết
              </Button>
            </Space>
          )}
        />
      </SectionCard>

      <Modal
        open={Boolean(selectedRegistration)}
        onCancel={() => setSelectedRegistration(null)}
        footer={null}
        width={860}
        title="Chi tiết tổng hợp"
      >
        <div className="page-grid two-up">
          <SectionCard title="Các điểm thành phần">
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

          <SectionCard title="Biên bản hiện tại">
            {minutesQuery.data?.fileUrl || minutesQuery.data?.url ? (
              <a
                href={minutesQuery.data.fileUrl ?? minutesQuery.data.url}
                target="_blank"
                rel="noreferrer"
              >
                Xem biên bản đã tạo
              </a>
            ) : (
              <Typography.Text type="secondary">
                Chưa có biên bản được sinh.
              </Typography.Text>
            )}
          </SectionCard>
        </div>

        {selectedRegistration ? (
          <form
            onSubmit={handleSubmit((values) =>
              updateMinutesMutation.mutate({
                registrationId: selectedRegistration.id,
                values,
              })
            )}
          >
            <FormTextarea control={control} name="notes" label="Cập nhật ghi chú biên bản" />
            <Button
              htmlType="submit"
              type="primary"
              loading={updateMinutesMutation.isPending}
              disabled={!formState.isValid}
            >
              Lưu biên bản
            </Button>
          </form>
        ) : null}
      </Modal>
    </div>
  );
}
