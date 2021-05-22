/*
 * @Author: XiaMin
 * @Date: 2021-04-26 22:30:59
 * @Description: file content
 */
import { getEsticData,getOutEsticData} from '@/services/epidemic';

const Model = {
  namespace: 'estic',
  state: {

  },
  effects: {
    *getEsticData({payload,callback},{call}) {
      const res=yield call(getEsticData,payload);
      if(res&&res.code==0)
        callback(res)
    },
    *getOutEsticData({payload,callback},{call}) {
      const res=yield call(getOutEsticData,payload);
      console.log(res)
      if(res&&res.code==0)
        callback(res)
    }
  },
  reducers: {
    updateToView(state,payload){
      return {...state,...payload}
    }
  },
};
export default Model;
