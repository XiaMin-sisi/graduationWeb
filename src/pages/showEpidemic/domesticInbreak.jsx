import {message,Form,Input,Button} from 'antd';
import React, { useState,useEffect} from 'react';
import styles from './index.less';
import {UserAddOutlined,LockOutlined} from '@ant-design/icons';
import {connect} from 'dva';
import {history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Page=(props)=>{
  let {dispatch}=props;
  useEffect(()=>{
      dispatch({type:"estic/getEsticData",payload:{},callback:()=>{}});
      dispatch({type:"estic/addUser",payload:{name:'disease_h5'},callback:()=>{}});
    return ()=>{};
  },[])


  return(
    <PageHeaderWrapper title={false}>
      {/*<img src="http://localhost:3002/static/index" alt="" />*/}
      <div id={'esticBox'}>

      </div>
    </PageHeaderWrapper>
  )
}
export default connect(({estic})=>{return { estic }})(Page);
