import { uploadImg } from '@/services/uploadImg';

const UserModel = {
  namespace: 'upload',
  state: {

  },
  effects: {
    *uploadImg({payload,callback},{call}) {
      const res=yield call(uploadImg,payload,{'Content-Type': 'mulitipart/form-data' });
    }
  },
  reducers: {
    updateToView(state,payload){
      return {...state,...payload}
    }
  },
};
export default UserModel;
