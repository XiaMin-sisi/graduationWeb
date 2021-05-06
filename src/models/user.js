import { ToLogin } from '@/services/login';
import md5 from 'md5-js/md5';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser:{}
  },
  effects: {
    // 用户登录
    *LoginToSys({ payload ,callback},{call,put}){
        payload.passWord=md5(payload.passWord);
        let res=yield call(ToLogin,{...payload})
        if(res.code===0){
          localStorage.setItem("userName",payload.userName);
          localStorage.setItem("passWord",payload.passWord);
          localStorage.setItem("accountRole",res.data.accountRole);
          localStorage.setItem("currentUser",JSON.stringify({"name":res.data.userName,"avatar":""}));
        }
          callback(res);
    },
    *isUser({ payload ,callback},{call,put}){
      let res=yield call(ToLogin,{...payload})
      callback(res);
    }
  },
  reducers: {
    updateToView(state,payload){
      return {...state,...payload}
    }
  },
};
export default UserModel;
