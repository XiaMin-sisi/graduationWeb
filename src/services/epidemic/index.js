import { requestRedict } from '@/utils/request';
export async function getEsticData(data,headers) {
  return requestRedict(
    '/fy/get',
    'get',
    data,
    headers?headers:{})
}
export async function addUser(data,headers){
  return requestRedict(
    '/g2/getOnsInfo',
    'get',
    data,
    headers?headers:{})
}
