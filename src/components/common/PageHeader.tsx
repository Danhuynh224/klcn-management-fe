import type { ReactNode } from 'react';
import { Space, Typography } from 'antd';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
}

export function PageHeader({ title, subtitle, extra }: PageHeaderProps) {
  return (
    <div className="table-toolbar">
      <Space direction="vertical" size={4}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
        {subtitle ? (
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            {subtitle}
          </Typography.Paragraph>
        ) : null}
      </Space>
      {extra}
    </div>
  );
}
