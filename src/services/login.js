import request from '@/utils/request';
export async function ToLogin(params) {
  return request('/local/user/login', {
    method: 'POST',
    data: params,
  });
}
