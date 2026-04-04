import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, Space, Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { FormInput } from '../../components/forms/FormInput';
import { approveQuota, getQuotas, updateQuota } from '../../services/quotas.api';
import type { Quota } from '../../types/models';
import { getErrorMessage } from '../../utils/errors';
import { queryKeys } from '../../utils/query-keys';

const quotaSchema = z.object({
  quota: z.string().min(1, 'Vui lòng nhập quota'),
});

type QuotaFormValues = z.infer<typeof quotaSchema>;

export default function HeadQuotaPage() {
  const [selectedQuota, setSelectedQuota] = useState<Quota | null>(null);
  const queryClient = useQueryClient();

  const quotasQuery = useQuery({
    queryKey: queryKeys.quotas(),
    queryFn: () => getQuotas(),
  });

  const { control, handleSubmit, reset, formState } = useForm<QuotaFormValues>({
    resolver: zodResolver(quotaSchema),
    mode: 'onChange',
    defaultValues: { quota: '1' },
  });

  useEffect(() => {
    if (selectedQuota) {
      reset({ quota: String(selectedQuota.quota) });
    }
  }, [reset, selectedQuota]);

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      values,
    }: {
      id: number | string;
      values: QuotaFormValues;
    }) => updateQuota(id, { quota: Number(values.quota) }),
    onSuccess: () => {
      message.success('Đã cập nhật quota.');
      setSelectedQuota(null);
      queryClient.invalidateQueries({ queryKey: queryKeys.quotas() });
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  const approveMutation = useMutation({
    mutationFn: approveQuota,
    onSuccess: () => {
      message.success('Đã duyệt quota.');
      queryClient.invalidateQueries({ queryKey: queryKeys.quotas() });
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  return (
    <div className="page-stack">
      <PageHeader
        title="Quota giảng viên"
        subtitle="Chỉnh quota, theo dõi số slot đã dùng và duyệt phân bổ theo từng đợt."
      />

      <SectionCard title="Danh sách quota">
        <Table
          rowKey="id"
          dataSource={quotasQuery.data ?? []}
          pagination={{ pageSize: 8 }}
          columns={[
            {
              title: 'Giảng viên',
              render: (_, record) => record.lecturer?.fullName ?? '--',
            },
            { title: 'Quota', dataIndex: 'quota' },
            { title: 'Đã dùng', dataIndex: 'usedSlots' },
            { title: 'Còn lại', dataIndex: 'remainingSlots' },
            {
              title: 'Đợt',
              render: (_, record) => record.term?.name ?? '--',
            },
            {
              title: 'Thao tác',
              render: (_, record) => (
                <Space>
                  <Button size="small" onClick={() => setSelectedQuota(record)}>
                    Sửa
                  </Button>
                  <Button size="small" type="primary" onClick={() => approveMutation.mutate(record.id)}>
                    Duyệt
                  </Button>
                </Space>
              ),
            },
          ]}
        />
      </SectionCard>

      <Modal
        open={Boolean(selectedQuota)}
        onCancel={() => setSelectedQuota(null)}
        footer={null}
        title="Cập nhật quota"
      >
        {selectedQuota ? (
          <form
            onSubmit={handleSubmit((values) =>
              updateMutation.mutate({
                id: selectedQuota.id,
                values,
              })
            )}
          >
            <FormInput control={control} name="quota" label="Quota mới" />
            <Button
              type="primary"
              htmlType="submit"
              loading={updateMutation.isPending}
              disabled={!formState.isValid}
            >
              Lưu thay đổi
            </Button>
          </form>
        ) : null}
      </Modal>
    </div>
  );
}
