import React, { useState,useEffect} from 'react';
import styles from './index.less';
import {connect} from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Form} from 'antd';
import ProTable from '@/components/proTable';


const Page=(props)=>{
  let {dispatch,recourseCenter:{userInfo}}=props;
  const [form]=Form.useForm();
  
  useEffect(()=>{
   
    //dispatch({type:"recourseCenter/getAccountMessage",payload:{role,userName:userNum}});
      
    return ()=>{};
  },[])

  return(
    <PageHeaderWrapper title={false}>
      中心页面 -- 查看所有医院的物资申请
       <ProTable
          
       >

       </ProTable>
    </PageHeaderWrapper>
  )
}
export default connect(({recourseCenter})=>{return { recourseCenter }})(Page);

