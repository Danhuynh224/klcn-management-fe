import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form, Space, Table, message } from 'antd';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PageHeader } from '../../components/common/PageHeader';
import { SectionCard } from '../../components/common/SectionCard';
import { FormInput } from '../../components/forms/FormInput';
import { FormSelect } from '../../components/forms/FormSelect';
import {
  createTopicSuggestion,
  getTopicSuggestions,
  updateTopicSuggestion,
} from '../../services/topic-suggestions.api';
import type { TopicSuggestion } from '../../types/models';
import { FIELD_OPTIONS } from '../../utils/constants';
import { getErrorMessage } from '../../utils/errors';
import { queryKeys } from '../../utils/query-keys';

const topicSchema = z.object({
  title: z.string().min(1, 'Vui lòng nhập tên đề tài'),
  fieldName: z.string().min(1, 'Vui lòng chọn lĩnh vực'),
  status: z.enum(['OPEN', 'CLOSED']),
});

type TopicFormValues = z.infer<typeof topicSchema>;

export default function LecturerTopicSuggestionPage() {
  const queryClient = useQueryClient();

  const topicsQuery = useQuery({
    queryKey: queryKeys.topicSuggestions,
    queryFn: getTopicSuggestions,
  });

  const { control, handleSubmit, reset, formState } = useForm<TopicFormValues>({
    resolver: zodResolver(topicSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      fieldName: '',
      status: 'OPEN',
    },
  });

  const createMutation = useMutation({
    mutationFn: createTopicSuggestion,
    onSuccess: () => {
      message.success('Đã tạo đề tài gợi ý.');
      reset();
      queryClient.invalidateQueries({ queryKey: queryKeys.topicSuggestions });
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  const toggleMutation = useMutation({
    mutationFn: (topic: TopicSuggestion) =>
      updateTopicSuggestion(topic.id, {
        status: topic.status === 'OPEN' ? 'CLOSED' : 'OPEN',
      }),
    onSuccess: () => {
      message.success('Đã cập nhật trạng thái đề tài.');
      queryClient.invalidateQueries({ queryKey: queryKeys.topicSuggestions });
    },
    onError: (error) => message.error(getErrorMessage(error)),
  });

  return (
    <div className="page-stack">
      <PageHeader
        title="Gợi ý đề tài"
        subtitle="Tạo mới, mở hoặc đóng trạng thái các đề tài để sinh viên tham khảo."
      />

      <div className="page-grid two-up">
        <SectionCard title="Tạo đề tài gợi ý">
          <Form layout="vertical" onFinish={handleSubmit((values) => createMutation.mutate(values))}>
            <FormInput
              control={control}
              name="title"
              label="Tên đề tài"
              placeholder="Nhập tên đề tài"
            />
            <FormSelect
              control={control}
              name="fieldName"
              label="Lĩnh vực"
              options={FIELD_OPTIONS.map((item) => ({ label: item, value: item }))}
            />
            <FormSelect
              control={control}
              name="status"
              label="Trạng thái"
              options={[
                { label: 'Mở', value: 'OPEN' },
                { label: 'Đóng', value: 'CLOSED' },
              ]}
            />
            <Button
              type="primary"
              htmlType="submit"
              loading={createMutation.isPending}
              disabled={!formState.isValid}
            >
              Tạo đề tài
            </Button>
          </Form>
        </SectionCard>

        <SectionCard title="Danh sách đề tài gợi ý">
          <Table
            rowKey="id"
            dataSource={topicsQuery.data ?? []}
            pagination={{ pageSize: 6 }}
            columns={[
              { title: 'Đề tài', dataIndex: 'title' },
              { title: 'Lĩnh vực', dataIndex: 'fieldName' },
              { title: 'Trạng thái', dataIndex: 'status' },
              {
                title: 'Thao tác',
                render: (_, record) => (
                  <Space>
                    <Button size="small" onClick={() => toggleMutation.mutate(record)}>
                      {record.status === 'OPEN' ? 'Đóng' : 'Mở'}
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </SectionCard>
      </div>
    </div>
  );
}
