import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="Không tìm thấy trang"
      subTitle="Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi."
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      }
    />
  );
}
