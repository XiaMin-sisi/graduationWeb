/*
 * @Author: XiaMin
 * @Date: 2021-05-21 11:51:38
 * @Description: file content
 */
import {message} from 'antd'
import {history} from 'umi'
import { 
    addPatient,getHpList,getPatientList
} from '@/services/patient';
const Model = {
  namespace: 'patient',
  state: {
    patientList:[],
    patientCount:0
  },
  effects: {
    *addPatient({payload,callback},{call,put}) {
        const res=yield call(addPatient,payload);
        if(res&&res.code==0)
          {
              message.success(res.message)
          }
        else
            message.error("添加失败"+res.message)
        if(callback) callback(res);
        },
    *getHpList({payload,callback},{call,put}) {
            const res=yield call(getHpList,payload);
            if(res&&res.code==0)
              {
                  
              }
            else
                message.error("添加失败"+res.message)
            if(callback) callback(res);
        },
    *getPatientList({payload,callback},{call,put}) {
            const res=yield call(getPatientList,payload);
            if(res&&res.code==0)
              {
                yield put({type:"updateToView",payload:{patientList:res.data.data,patientCount:res.data.totalCount}})
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