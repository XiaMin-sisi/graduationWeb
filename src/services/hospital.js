/*
 * @Author: XiaMin
 * @Date: 2021-05-21 11:50:56
 * @Description: file content
 */
import { requestRedict } from '@/utils/request';
export async function getHpListPage(data,headers) {
    return requestRedict(
      '/local/hospitalInfo/getHpListPage',
      'get',
      data,
      headers?headers:{})
  }
  export async function regist(data,headers) {
    return requestRedict(
      '/local/user/regist',
      'get',
      data,
      headers?headers:{})
  }