/*
 * @Author: XiaMin
 * @Date: 2021-02-24 22:53:10
 * @Description: file content
 */
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
        let res=yield call(ToLogin,{...payload});
        if(res.code==0){
          console.log("hello");
          localStorage.setItem("userName",payload.userName);
          localStorage.setItem("passWord",payload.passWord);
          localStorage.setItem("accountRole",res.data.accountRole);
          localStorage.setItem("email",res.data.email);
          localStorage.setItem("currentUser",JSON.stringify({"name":res.data.userName,"avatar":res.data.imgUrl}));
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
