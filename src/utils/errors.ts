import axios from 'axios';

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const backendMessage =
      typeof error.response?.data?.message === 'string'
        ? error.response.data.message
        : undefined;

    return backendMessage ?? error.message ?? 'Đã có lỗi xảy ra.';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Đã có lỗi xảy ra.';
}
