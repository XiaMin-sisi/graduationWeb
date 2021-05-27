/*
 * @Author: XiaMin
 * @Date: 2021-05-21 11:50:56
 * @Description: file content
 */
import { requestRedict } from '@/utils/request';
 export async function getvolInfoList(data,headers) {
    return requestRedict(
      '/local/volunteer/getvolInfoList',
      'get',
      data,
      headers?headers:{})
  }
  
  export async function volunteerToHs(data,headers) {
    return requestRedict(
      '/local/volunteer/volunteerToHs',
      'get',
      data,
      headers?headers:{})
  }
