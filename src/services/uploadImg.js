import { requestRedict } from '@/utils/request';
export async function uploadImg(data,headers) {
  return requestRedict('/local/uploadFile/index', 'POST', data, headers)
}
