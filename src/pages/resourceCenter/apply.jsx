import React, { useState,useEffect} from 'react';
import styles from './index.less';
import {connect} from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Button, Form} from 'antd';
import ProTable from '@/components/proTable';


const Page=(props)=>{
  let {dispatch,recourseCenter:{applyList,applyListCount}}=props;
  const [supList,setSupList]=useState([]);
  let userNum=localStorage.getItem("userName")
  const [form]=Form.useForm();

  const columns=[
    {title:"物资名称",dataIndex:"suppliesName",key:"suppliesName"},
    {title:"申请数量",dataIndex:"suppliesNum",key:"suppliesNum"},
    {title:"中心数量",dataIndex:"suppliesSum",key:"suppliesSum"},
    {title:"审批人",dataIndex:"adminName",key:"adminName",render:(val)=>val||"--"},
    {title:"审批结果",dataIndex:"operationRes",key:"operationRes",render:(val)=>{
        if(val=="0")
          return <Button className={styles.blueButton}>未审核</Button>
        else if(val=="1")
        return <Button className={styles.greenButton}>审核通过</Button>
        else
        return <Button className={styles.redButton}>未通过</Button>
    }},
  ]
  const fieldItems=[
    {type:"select",label:"物资名称",placeholder:"请选择",name:"name",value:supList.map((val)=>{
        return  {label:val.suppliesName,value:val.suppliesName}
    })},
    {type:"select",label:"审核结果",placeholder:"请选择",name:"res",value:[
      {label:"未审核",value:0},
      {label:"审核通过",value:1},
      {label:"审核未通过",value:2}
    ]
    },
  ]
  
  useEffect(()=>{
   
    dispatch({type:"recourseCenter/getResourceIdList",payload:{userNum:"0"},callback:(res)=>{
            if(res.code==0)
            setSupList(res.data);
    }});
      
    return ()=>{};
  },[])

  //列表查询
const onFinish=(val)=>{
  dispatch({type:"recourseCenter/getApplyList",payload:{...val,userNum}});
}

  return(
    <PageHeaderWrapper title={false}>
       <ProTable
           form={form} 
           columns={columns}
           fieldItems={fieldItems}
           rowKey="applyId"
           onFinish={onFinish}
           dataSource={applyList}
           totalCount={applyListCount} 
       >

       </ProTable>
    </PageHeaderWrapper>
  )
}
export default connect(({recourseCenter})=>{return { recourseCenter }})(Page);

