/*
 * @Author: XiaMin
 * @Date: 2021-05-19 18:55:29
 * @Description: file content
 */
import { requestRedict } from '@/utils/request';
export async function getAccountMessage(data,headers) {
  return requestRedict(
    '/local/user/getInfo',
    'get',
    data,
    headers?headers:{})
}
export async function alterInfo(data,headers) {
    return requestRedict(
      '/local/user/alterInfo',
      'get',
      data,
      headers?headers:{})
  }
export async function alterPwd(data,headers) {
    return requestRedict(
      '/local/user/alterPwd',
      'put',
      data,
      headers?headers:{})
  }
