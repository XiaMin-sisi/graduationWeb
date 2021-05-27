/*
 * @Author: XiaMin
 * @Date: 2021-05-21 11:51:38
 * @Description: file content
 */
import {message} from 'antd'
import { 
    getHpListPage,regist
} from '@/services/hospital';
const Model = {
  namespace: 'hospital',
  state: {
    patientList:[],
    patientCount:0
  },
  effects: {
    *getHpListPage({payload,callback},{call,put}) {
            const res=yield call(getHpListPage,payload);
            if(res&&res.code==0)
              {
                yield put({type:"updateToView",payload:{patientList:res.data.data,patientCount:res.data.totalCount}})
              }
            else
                message.error("添加失败"+res.message)
            if(callback) callback(res);
        },
        *regist({payload,callback},{call,put}) {
            const res=yield call(regist,payload);
            if(res&&res.code==0)
              {
               message.success('添加成功')
              }
            else
                message.error("添加失败"+res.message)
            if(callback) callback(res);
        }

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