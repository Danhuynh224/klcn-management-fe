import { Tag } from 'antd';
import { getStatusMeta } from '../../utils/status';

interface StatusTagProps {
  status?: string;
}

export function StatusTag({ status }: StatusTagProps) {
  const meta = getStatusMeta(status);

  return <Tag color={meta.color}>{meta.label}</Tag>;
}
