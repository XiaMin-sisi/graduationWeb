/*
 * @Author: XiaMin
 * @Date: 2021-05-19 18:53:49
 * @Description: file content
 */

import {message} from 'antd'
import {history} from 'umi'
import { getAccountMessage,alterInfo,alterPwd} from '@/services/accountCenter';
const Model = {
  namespace: 'accountCenter',
  state: {
    userInfo:{}
  },
  effects: {
    *getAccountMessage({payload,callback},{call,put}) {
      const res=yield call(getAccountMessage,payload);
      if(res&&res.code==0)
      yield put({type:"updateToView",payload:{userInfo:res.data[0]}})
    },
    *alterInfo({payload,callback},{call,put}) {
        const res=yield call(alterInfo,payload);
        if(res&&res.code==0){
            yield put({type:"getAccountMessage",payload:{role:localStorage.getItem("accountRole"),userName:localStorage.getItem("userName")}});
            message.success("修改成功！")
            callback(res)
        }   
    },
    *alterPwd({payload,callback},{call,put}) {
        const res=yield call(alterPwd,payload);
        if(res&&res.code==0){
            message.success("修改成功,请重新登录！");
            history.push("/user/login")
        } 
        else
        {
            message.error("修改失败！"+res.message)
        }  
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

