import React, { useState,useEffect} from 'react';
import {connect} from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Form,Button,Modal,Select,Input,InputNumber,DatePicker} from 'antd';
import ProTable from '@/components/proTable';
import moment from 'moment';
import md5 from 'md5-js'


const Page=(props)=>{
  let {dispatch,hospital:{patientList, patientCount}}=props;
  let userNum=localStorage.getItem("userName")
  const [form]=Form.useForm();
  const [form2]=Form.useForm();
  const [form3]=Form.useForm();
  const [modalVisible,setModalVisible]=useState(false);
  const [modalVisible2,setModalVisible2]=useState(false);
  const [hpList,setHpList]=useState([]);
  const [id,saveid]=useState();
  const columns=[
    {title:"医院名称",dataIndex:"hospitalName",key:"hospitalName"},
    {title:"医院账号",dataIndex:"hospitalNum",key:"hospitalNum"},
    {title:"医院地址",dataIndex:"hospitalDress",key:"hospitalDress"},
    {title:"床位数",dataIndex:"bedsSum",key:"bedsSum"},
    {title:"空床位数",dataIndex:"emptys",key:"emptys"},
    {title:"需要志愿者数",dataIndex:"voluns",key:"voluns"},
  ]
  const fieldItems=[
    {
      type:"input",label:"医院名称",placeholder:"请输入",name:"name"
    },
    {
      type:"input",label:"医院账号",placeholder:"请输入",name:"num"
    }
  ]
  const topButton=(list)=>{
    return [
      <Button type={"primary"} onClick={()=>{setModalVisible(true)}} key="1" >新增医院</Button>,
    ]
  }
  
  useEffect(()=>{
    dispatch({type:"patient/getHpList",payload:{},callback:(res)=>{
      if(res&&res.code==0)
        {
          setHpList(res.data)
        }
    }})
  },[])
 
 
//列表查询
const onFinish=(val)=>{
    dispatch({type:"hospital/getHpListPage",payload:{...val}});    
}
//
const addVoluteer=()=>{
  form2.validateFields().then((values)=>{
    values.startTime2=moment(values.startTime2).format('x');
    console.log(values);
    dispatch({type:"hospital/regist",payload:{...values,userRole:"1",passWord:md5('123456')},callback:(res)=>{
            if(res&&res.code==0)
              {
                form.submit();
                setModalVisible(false);
              }
    }})
  })
}

  return(
    <PageHeaderWrapper title={false}>

       <ProTable
            form={form} 
            columns={columns}
            fieldItems={fieldItems}
            rowKey="patientId"
            selectType="checkbox"
            topButton={topButton}
            onFinish={onFinish}
            dataSource={patientList}
            totalCount={ patientCount}
       >

       </ProTable>

       
       <Modal title={"新增医院账号"} visible={modalVisible} onCancel={()=>{setModalVisible(false)}}
              cancelText="取消" okText="确认" onOk={addVoluteer} 
       >
          <Form form={form2} labelCol={{span:8}} wrapperCol={{span:10}}>
            <Form.Item label="账号" name="userName" rules={[
                          {message:"账号不能为空！",required:true},
                          {message: "不能以0开头！",pattern:/^[1-9][\w\W]*$/},
                          {message:"手机号只能包含数字",pattern: /^[0-9]+$/},
                          {message: "手机号长度不正确",pattern:/^[0-9]{11}/}
                         ]}>
                <Input placeholder="请输入手机号"></Input>
            </Form.Item>
          </Form>
       </Modal>

      

    </PageHeaderWrapper>
  )
}
export default connect(({hospital})=>{return { hospital }})(Page);