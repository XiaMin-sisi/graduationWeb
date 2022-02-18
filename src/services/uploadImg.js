import { requestRedict } from '@/utils/request';
export async function uploadImg(data,headers) {
  console.log(data)
  return requestRedict(
    '/local/uploadFile/index',
    'POST',
     data,
     headers
     )
}
