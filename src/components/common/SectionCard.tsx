import type { PropsWithChildren, ReactNode } from 'react';
import { Card } from 'antd';

interface SectionCardProps extends PropsWithChildren {
  title: ReactNode;
  extra?: ReactNode;
}

export function SectionCard({
  title,
  extra,
  children,
}: SectionCardProps) {
  return (
    <Card className="section-card glass-panel" title={title} extra={extra}>
      {children}
    </Card>
  );
}
