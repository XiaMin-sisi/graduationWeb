import React, { useState,useEffect} from 'react';
import {connect} from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Form,Button,Modal,Select,Input,InputNumber,DatePicker} from 'antd';
import ProTable from '@/components/proTable';
import moment from 'moment';
import { use } from 'echarts';


const Page=(props)=>{
  let {dispatch,patient:{patientList, patientCount}}=props;
  let userNum=localStorage.getItem("userName")
  const [form]=Form.useForm();
  const [form2]=Form.useForm();
  const [form3]=Form.useForm();
  const [modalVisible,setModalVisible]=useState(false);
  const [modalVisible2,setModalVisible2]=useState(false);
  const [hpList,setHpList]=useState([]);
  const [id,saveid]=useState();
  const columns=[
    {title:"姓名",dataIndex:"patientName",key:"patientName"},
    {title:"身份证号",dataIndex:"idCardNum",key:"idCardNum"},
    {title:"住院时间",dataIndex:"startTime",key:"startTime",render:(val)=>val?moment(val,'x').format("YYYY-MM-DD HH:ss"):"--"},
    {title:"出院时间",dataIndex:"endTime",key:"endTime",render:(val)=>val?moment(val,'x').format("YYYY-MM-DD HH:ss"):"--"},
    {title:"所属医院",dataIndex:"hospitalName",key:"hospitalName",render:(val)=>val||"暂无"},
    {title:"操作",dataIndex:"patientId",key:"patientId",render:(val,item)=>{
      return <Button type="primary" disabled={item.endTime} onClick={()=>{
        saveid(val);
        setModalVisible2(true);
      }}>出院</Button>
    }},
  ]
  const fieldItems=[
    {type:"select",label:"患者状态",placeholder:"请选择",name:"isJoin",value:[
      {label:"在院",value:"0"},
      {label:"出院",value:"1"}
    ]},
    {
      type:"input",label:"身份证号",placeholder:"请输入",name:"id"
    }
  ]
  const topButton=(list)=>{
    return [
      <Button type={"primary"} onClick={()=>{setModalVisible(true)}} key="1" >新增</Button>,
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
    dispatch({type:"patient/getPatientList",payload:{...val}});    
}
//
const addVoluteer=()=>{
  form2.validateFields().then((values)=>{
    values.startTime2=moment(values.startTime2).format('x');
    console.log(values);
    dispatch({type:"patient/addPatient",payload:{...values},callback:(res)=>{
            if(res&&res.code==0)
              {
                form.submit();
                setModalVisible(false);
              }
    }})
  })
}
//
const outHospital=()=>{
  form3.validateFields().then((values)=>{
    values.endTime=moment(values.endTime).format('x');
    dispatch({type:"patient/addPatient",payload:{...values,id},callback:(res)=>{
      if(res&&res.code==0)
        {
          form.submit();
          setModalVisible2(false);
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

       
       <Modal title={"新增病人住院"} visible={modalVisible} onCancel={()=>{setModalVisible(false)}}
              cancelText="取消" okText="确认" onOk={addVoluteer} 
       >
          <Form form={form2} labelCol={{span:8}} wrapperCol={{span:10}}>
            <Form.Item label="患者姓名" name="patientName" rules={[{required:true,message:"必填"}]}>
                <Input placeholder="请输入"></Input>
            </Form.Item>
            <Form.Item label="身份证号" name="idCardNum" rules={[{required:true,message:"必填"}]}>
                <Input placeholder="请输入"></Input>
            </Form.Item>
            <Form.Item label="入院时间" name="startTime2" rules={[{required:true,message:"必填"}]}>
                <DatePicker style={{width:"100%"}}></DatePicker>
            </Form.Item>
            <Form.Item label="医院" name="hospitalNum" rules={[{required:true,message:"必填"}]} style={{width:"100%"}}>
                <Select>
                  {hpList.map((val)=>{
                    return <Select.Option key={val.hospitalNum} value={val.hospitalNum}>{val.hospitalName}</Select.Option>
                  })}
                </Select>
            </Form.Item>
          </Form>
       </Modal>

       <Modal title={"安排病人出院"} visible={modalVisible2} onCancel={()=>{setModalVisible2(false)}}
              cancelText="取消" okText="确认" onOk={outHospital} 
       >
         <Form form={form3} labelCol={{span:8}} wrapperCol={{span:10}}>
          
            <Form.Item label="出院时间" name="endTime" rules={[{required:true,message:"必填"}]}>
                <DatePicker style={{width:"100%"}}></DatePicker>
            </Form.Item>
           
          </Form>
       </Modal>

    </PageHeaderWrapper>
  )
}
export default connect(({patient})=>{return { patient }})(Page);