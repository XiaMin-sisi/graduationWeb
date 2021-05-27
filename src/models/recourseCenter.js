/*
 * @Author: XiaMin
 * @Date: 2021-05-21 11:51:38
 * @Description: file content
 */
import {message} from 'antd'
import {history} from 'umi'
import { 
    addResource,getResourceList,deleteResource,getResourceIdList,addResourceToHS,
    getHospitalResource,applyResource,getApplyList
} from '@/services/recourseCenter';
const Model = {
  namespace: 'recourseCenter',
  state: {
    resourceList:[],
    totalCount:0,
    resourceIdList:[],
    HsresourceList:[],
    HstotalCount:0,
    applyList:[],
    applyListCount:0,
  },
  effects: {
    *addResource({payload,callback},{call,put}) {
        const res=yield call(addResource,payload);
        if(res&&res.code==0)
        {   if(payload.rowId)
                message.success("修改成功")
            else
            message.success("添加成功")
        }
        else
            message.error("操作失败！"+res.message)
        callback(res);
    },
    *getResourceList({payload,callback},{call,put}) {
        const res=yield call(getResourceList,payload);
        if(res&&res.code==0)
          {
              yield put({type:"updateToView",payload:{resourceList:res.data.data,totalCount:res.data.totalCount}})
          }
        else
            message.error("查询失败！"+res.message)
        if(callback) callback(res);
    },
    *deleteResource({payload,callback},{call,put}) {
        const res=yield call(deleteResource,payload);
        if(res&&res.code==0)
          {
              message.success("删除成功！")
          }
        else
            message.error("删除失败！"+res.message)
        callback(res);
    },
    *getResourceIdList({payload,callback},{call,put}) {
        const res=yield call(getResourceIdList,payload);
        if(res&&res.code==0)
          {
              yield put({type:"updateToView",payload:{resourceIdList:res.data}})
          }
        else
            message.error("查询失败！"+res.message)
        if(callback) callback(res);
    },
    *addResourceToHS({payload,callback},{call,put}) {
        const res=yield call(addResourceToHS,payload);
        if(res&&res.code==0)
          {     
              if(payload.subNum)
                message.success("领用成功!")
              else
              message.success("库存新品添加成功!后续你可以向资源中心申请该物资！")
          }
        else
            message.error("操作失败！"+res.message)
        if(callback) callback(res);
    },
    *getHospitalResource({payload,callback},{call,put}) {
        const res=yield call(getHospitalResource,payload);
        if(res&&res.code==0)
          {
            yield put({type:"updateToView",payload:{HsresourceList:res.data.data,totalCount:res.data.HstotalCount}})
          }
        else
            message.error("查询失败！"+res.message)
        if(callback) callback(res);
    },
    *applyResource({payload,callback},{call,put}) {
        const res=yield call(applyResource,payload);
        if(res&&res.code==0)
          {
            message.success("操作成功！")
          }
        else
            message.error("操作失败！"+res.message)
        if(callback) callback(res);
    },
    *getApplyList({payload,callback},{call,put}) {
      const res=yield call(getApplyList,payload);
      if(res&&res.code==0)
        {
          yield put({type:"updateToView",payload:{applyList:res.data.data,applyListCount:res.data.totalCount}})
        }
      else
          message.error("查询失败！"+res.message)
      if(callback) callback(res);
  },
  },
  reducers: {
    updateToView(state, { payload }) {
        return {
          ...state,
          ...payload,
        };
      },
  },
};
export default Model;