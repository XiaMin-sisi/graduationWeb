/*
 * @Author: XiaMin
 * @Date: 2021-04-26 21:59:25
 * @Description: file content
 */
import { requestRedict } from '@/utils/request';
export async function getEsticData(data,headers) {
  return requestRedict(
    '/local/data/data',
    'get',
    data,
    headers?headers:{})
}
export async function getOutEsticData(data,headers) {
  return requestRedict(
    '/local/data/outdata',
    'get',
    data,
    headers?headers:{})
}

