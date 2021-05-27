import React, { useState,useEffect} from 'react';
import styles from './index.less';
import {connect} from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Form,Button,Modal,Select,Input,InputNumber } from 'antd';
import ProTable from '@/components/proTable';


const Page=(props)=>{
  let {dispatch,volunteer:{voluteerList,volumteerCount}}=props;
  let userNum=localStorage.getItem("userName")
  const [form]=Form.useForm();
  const [form2]=Form.useForm();
  const [form3]=Form.useForm();
  const [form4]=Form.useForm();
 
  const columns=[
    {title:"姓名",dataIndex:"volunteerName",key:"volunteerName"},
    {title:"身份证号",dataIndex:"volunteerId",key:"volunteerId"},
    {title:"是否报名",dataIndex:"isJoin",key:"hospitalsuppliesNum",render:(val)=>val?"已报名":"未报名"},
    {title:"所属医院  ",dataIndex:"hospitalName",key:"hospitalName",render:(val)=>val||"暂无"},
  ]
  const fieldItems=[
    {type:"select",label:"报名状态",placeholder:"请选择",name:"isJoin",value:[
      {label:"未报名",value:"0"},
      {label:"已报名",value:"1"}
    ]},
  ]
  const topButton=(list)=>{
    return [
      <Button type={"primary"} onClick={()=>{addVoluteer(list)}} key="1" disabled={list.length==0}>添加到本院</Button>,
    ]
  }
  
 
 
//列表查询
const onFinish=(val)=>{
    dispatch({type:"volunteer/getvolInfoList",payload:{...val}});
}
//
const addVoluteer=(list)=>{
  console.log(list.map((val)=>val.volunteerNum).join(','))

  Modal.confirm({
    title:"确认将这些志愿者添加本院？如果所选择的志愿者中含有未报名或已加入医院的，则不会添加成功",
    okText:"确定",
    cancelText:"取消",
    onOk:()=>{
      dispatch({type:"volunteer/volunteerToHs",payload:{userNum,ids:list.map((val)=>val.volunteerNum).join(',')},callback:()=>{
        form.submit();
      }});
    }
  })

}

  return(
    <PageHeaderWrapper title={false}>

       <ProTable
            form={form} 
            columns={columns}
            fieldItems={fieldItems}
            rowKey="volunteerNum"
            selectType="checkbox"
            topButton={topButton}
            onFinish={onFinish}
            dataSource={voluteerList}
            totalCount={volumteerCount}
       >

       </ProTable>

       
       {/* <Modal title={"删除库存种类"} visible={delModal} onCancel={()=>{setDelModal(false)}}
              cancelText="取消" okText="删除" onOk={delteType}
       >
          确认删除库存种类--<span>{}</span>？,该物品剩余库存将会退还中心！
       </Modal> */}


    </PageHeaderWrapper>
  )
}
export default connect(({volunteer})=>{return { volunteer }})(Page);