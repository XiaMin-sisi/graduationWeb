/*
 * @Author: XiaMin
 * @Date: 2021-05-21 11:51:38
 * @Description: file content
 */
import {message} from 'antd'
import {history} from 'umi'
import { 
    getvolInfoList,volunteerToHs
} from '@/services/volunteer';
const Model = {
  namespace: 'volunteer',
  state: {
    voluteerList:[],
    volumteerCount:0
  },
  effects: {
    
    *getvolInfoList({payload,callback},{call,put}) {
        const res=yield call(getvolInfoList,payload);
        if(res&&res.code==0)
          {
              yield put({type:"updateToView",payload:{voluteerList:res.data.data,volumteerCount:res.data.totalCount}})
          }
        else
            message.error("查询失败！"+res.message)
        if(callback) callback(res);
    },
    *volunteerToHs({payload,callback},{call,put}) {
        const res=yield call(volunteerToHs,payload);
        if(res&&res.code==0)
          {
              yield put({type:"updateToView",payload:{voluteerList:res.data.data,volumteerCount:res.data.totalCount}})
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