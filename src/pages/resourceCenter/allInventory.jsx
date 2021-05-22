
import React, { useState,useEffect} from 'react';
import styles from './index.less';
import {connect} from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Form,Button,Modal,Select,Input,InputNumber } from 'antd';
import ProTable from '@/components/proTable';
import { fromPairs } from 'lodash';


const Page=(props)=>{
  let {dispatch,recourseCenter:{resourceList,totalCount}}=props;
  const [form]=Form.useForm();
  const [form2]=Form.useForm();
  const [addVisible,setAddvisible]=useState(false);
  const [delModal,setDelModal]=useState(false);
  const [tetx,saveText]=useState("新增");
  const [rows,saveRows]=useState([])
  const columns=[
    {title:"物资ID",dataIndex:"suppliesId",key:"suppliesId"},
    {title:"物资名称",dataIndex:"suppliesName",key:"suppliesName"},
    {title:"中心库存量",dataIndex:"suppliesSum",key:"suppliesSum"},
  ]
  const fieldItems=[
    {type:"input",label:"物资ID",placeholder:"请输入物资ID",name:"id"},
    {type:"input",label:"物资名称",placeholder:"物资名称",name:"name"},
  ]
  const topButton=(list)=>{
    return [
      <Button type={"primary"} onClick={()=>{setAddvisible(true);saveText("新增")}} key="1">添加物资</Button>,
      <Button type={"primary"} 
        onClick={()=>{
          setAddvisible(true);saveText("编辑");
          form2.setFieldsValue({name:list[0].suppliesName,num:list[0].suppliesSum})
        }} 
        disabled={list.length!=1} key="2">编辑</Button>,
      <Button type={"primary"} 
        onClick={()=>{
          setDelModal(true);
          saveRows(list);
        }} 
        disabled={list.length==0} 
        key="4">删除物资</Button>
    ]
  }
  
  //查询
  const onFinish=(values)=>{
    console.log(rows);
    dispatch({type:"recourseCenter/getResourceList",payload:{...values},callback:(res)=>{
      console.log(res);
  }});

  }

  //添加物资种类
  const addResource=()=>{
    form2.validateFields().then((val)=>{
      if(tetx=="新增")
      dispatch({type:"recourseCenter/addResource",payload:{...val},callback:(res)=>{
          setAddvisible(false)
          if(res.code==0)
          {
            form.submit();
            console.log("hello");
          }
      }});
      else
      dispatch({type:"recourseCenter/addResource",payload:{...val,rowId:rows[0].suppliesId},callback:(res)=>{
        setAddvisible(false)
        if(res.code==0)
        {
          form.submit();
          console.log("hello");
        }
    }});
    })
  }
  //删除
  const delteType=()=>{
    let ids=rows.map((val)=>val.suppliesId);
    dispatch({type:"recourseCenter/deleteResource",payload:{ids:ids.join(',')},callback:(res)=>{
      setDelModal(false);
      if(res.code==0)
        {
          console.log("hello");
          form.submit();
        }
    }});

  }

  return(
    <PageHeaderWrapper title={false}>
       医院、中心共同页面 -- 查看中心的物资库存
       <ProTable
            form={form} 
            columns={columns}
            fieldItems={fieldItems}
            rowKey="suppliesId"
            selectType="checkbox"
            topButton={topButton}
            onFinish={onFinish}
            dataSource={resourceList}
            totalCount={totalCount}
       >

       </ProTable>

       <Modal title={`${tetx}物资`} visible={addVisible} onCancel={()=>{setAddvisible(false)}}
              cancelText="取消" okText="确认" onOk={addResource}
       >
          <Form form={form2}>
            <Form.Item label="物资名称" name="name" rules={[{required:true,message:"必填"}]}>
                <Input placeholder="请输入"></Input>
            </Form.Item>
            <Form.Item label="中心库存数" name="num" rules={[{required:true,message:"必填"}]} >
                <InputNumber placeholder="请输入" min={0}></InputNumber>
            </Form.Item>
          </Form>
       </Modal>

       <Modal title={"删除库存种类"} visible={delModal} onCancel={()=>{setDelModal(false)}}
              cancelText="取消" okText="删除" onOk={delteType}
       >
          确认删除物资种类--<span style={{color:"red"}}>{rows.map((val)=>val.suppliesName).join('、')}</span>？此操作不可撤回！
       </Modal>


    </PageHeaderWrapper>
  )
}
export default connect(({recourseCenter})=>{return { recourseCenter }})(Page);