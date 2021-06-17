/*
 * @Author: XiaMin
 * @Date: 2021-03-04 19:22:24
 * @Description: file content
 */
import {message} from 'antd'
import { uploadImg } from '@/services/uploadImg';

const UserModel = {
  namespace: 'upload',
  state: {
    isUpdate:0
  },
  effects: {
    *uploadAvatar({payload,callback},{call,put}) {
      const res=yield call(uploadImg,{...payload,type:"avatar"},{'Content-Type': 'mulitipart/form-data' });
      if(res&&res.code==0)
        {
          callback(res);
          message.success("头像上传成功");
        }
    },
    *update({},{put}){
      yield put({type:"updateToView2",payload:{isUpdate:true}})
    }
  },
  reducers: {
    updateToView(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateToView2(state,{payload}){
      return {
        ...state,
        isUpdate:state.isUpdate+1
      }
    }
  },
};
export default UserModel;
