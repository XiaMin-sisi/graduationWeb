/*
 * @Author: XiaMin
 * @Date: 2021-05-21 11:50:56
 * @Description: file content
 */
import { requestRedict } from '@/utils/request';
 export async function addPatient(data,headers) {
    return requestRedict(
      '/local/patient/addPatient',
      'get',
      data,
      headers?headers:{})
  }
  export async function getHpList(data,headers) {
    return requestRedict(
      '/local/hospitalInfo/getHpList',
      'get',
      data,
      headers?headers:{})
  }

export async function getPatientList(data,headers) {
  return requestRedict(
    '/local/patient/getPatientList',
    'get',
    data,
    headers?headers:{})
}