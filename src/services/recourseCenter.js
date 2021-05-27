/*
 * @Author: XiaMin
 * @Date: 2021-05-21 11:50:56
 * @Description: file content
 */
import { requestRedict } from '@/utils/request';
export async function addResource(data,headers) {
  return requestRedict(
    '/local/resource/addResource',
    'get',
    data,
    headers?headers:{})
}
export async function getResourceList(data,headers) {
    return requestRedict(
      '/local/resource/getResourceList',
      'get',
      data,
      headers?headers:{})
  }
export async function deleteResource(data,headers) {
    return requestRedict(
      '/local/resource/deleteResource',
      'get',
      data,
      headers?headers:{})
  }
export async function getResourceIdList(data,headers) {
    return requestRedict(
      '/local/resource/getResourceIdList',
      'get',
      data,
      headers?headers:{})
  }
export async function addResourceToHS(data,headers) {
    return requestRedict(
      '/local/resource/addResourceToHS',
      'get',
      data,
      headers?headers:{})
  }
export async function getHospitalResource(data,headers) {
    return requestRedict(
      '/local/resource/getHospitalResource',
      'get',
      data,
      headers?headers:{})
  }
  
  export async function applyResource(data,headers) {
    return requestRedict(
      '/local/resource/applyResource',
      'get',
      data,
      headers?headers:{})
  }
  export async function getApplyList(data,headers) {
    return requestRedict(
      '/local/resource/getApplyList',
      'get',
      data,
      headers?headers:{})
  }