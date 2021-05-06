import { getEsticData,addUser} from '@/services/epidemic';

const Model = {
  namespace: 'estic',
  state: {

  },
  effects: {
    *getEsticData({payload,callback},{call}) {
      const res=yield call(getEsticData,payload);
      console.log(JSON.parse(res));
    },
    *addUser({payload,callback},{call}) {
      const res=yield call(addUser,payload);

    }
  },
  reducers: {
    updateToView(state,payload){
      return {...state,...payload}
    }
  },
};
export default Model;
