import { Descriptions } from 'antd';
import type { Committee } from '../../types/models';
import { getCommitteeMembers } from '../../utils/registration';
import { SectionCard } from './SectionCard';

interface CommitteeCardProps {
  committee?: Committee | null;
}

export function CommitteeCard({ committee }: CommitteeCardProps) {
  return (
    <SectionCard title="Thông tin hội đồng">
      <Descriptions column={1} size="small">
        <Descriptions.Item label="Tên hội đồng">
          {committee?.name ?? 'Chưa phân công'}
        </Descriptions.Item>
        <Descriptions.Item label="Chủ tịch">
          {committee?.chair?.fullName ?? 'Chưa cập nhật'}
        </Descriptions.Item>
        <Descriptions.Item label="Thư ký">
          {committee?.secretary?.fullName ?? 'Chưa cập nhật'}
        </Descriptions.Item>
        <Descriptions.Item label="Thành viên">
          {getCommitteeMembers(committee)
            .map((member) => member?.fullName ?? '')
            .filter(Boolean)
            .join(', ') || 'Chưa cập nhật'}
        </Descriptions.Item>
        <Descriptions.Item label="Địa điểm">
          {committee?.location ?? 'Chưa cập nhật'}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày bảo vệ">
          {committee?.defenseDate ?? 'Chưa cập nhật'}
        </Descriptions.Item>
      </Descriptions>
    </SectionCard>
  );
}
