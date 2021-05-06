import { ToLogin } from '@/services/login';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser:{}
  },
  effects: {
    // 用户登录
    *LoginToSys({ payload ,callback},{call,put}){
        // let res=yield call(ToLogin,{...payload});
        let res={code:0};
        if(res.code===0){
          console.log(payload);
          localStorage.setItem("userName",payload.userName);
          localStorage.setItem("passWord",payload.passWord);
        }
          callback(res);
    },
    *isUser({ payload ,callback},{call,put}){
      console.log("hello9999")
      // let res=yield call(ToLogin,{...payload})
      // callback(res);
    }
  },
  reducers: {
    updateToView(state,payload){
      return {...state,...payload}
    }
  },
};
export default UserModel;
