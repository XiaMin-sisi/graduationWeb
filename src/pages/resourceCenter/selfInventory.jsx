import React, { useState,useEffect} from 'react';
import styles from './index.less';
import {connect} from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {Form,Button,Modal,Select,Input,InputNumber } from 'antd';
import ProTable from '@/components/proTable';
import { use } from 'echarts';


const Page=(props)=>{
  let {dispatch,recourseCenter:{resourceIdList,HstotalCount,HsresourceList}}=props;
  let userNum=localStorage.getItem("userName")
  const [form]=Form.useForm();
  const [form2]=Form.useForm();
  const [form3]=Form.useForm();
  const [form4]=Form.useForm();
  const [addVisible,setAddvisible]=useState(false);
  const [applyModal,setApplyModal]=useState(false);
  const [delModal,setDelModal]=useState(false);
  const [useModl,setUseModal]=useState(false);
  const [rowList,setRowList]=useState([])
  const columns=[
    {title:"物资ID",dataIndex:"suppliesId",key:"suppliesId"},
    {title:"物资名称",dataIndex:"suppliesName",key:"suppliesName"},
    {title:"库存量",dataIndex:"hospitalsuppliesNum",key:"hospitalsuppliesNum"},
    {title:"中心库存量",dataIndex:"suppliesSum",key:"suppliesSum"},
  ]
  const fieldItems=[
    {type:"input",label:"物资ID",placeholder:"请输入物资ID",name:"id"},
    {type:"input",label:"物资名称",placeholder:"物资名称",name:"name"},
  ]
  const topButton=(list)=>{
    return [
      <Button type={"primary"} onClick={()=>{setAddvisible(true),form2.resetFields();}} key="1">添加物资</Button>,
      <Button type={"primary"} onClick={()=>{
        setApplyModal(true);setRowList(list);
      }} disabled={list.length!=1} key="2">申领物资</Button>,
      <Button type={"primary"} onClick={()=>{
        setUseModal(true);
        setRowList(list);
      }} disabled={list.length!=1||list[0].hospitalsuppliesNum==0} key="3">取用物资</Button>,
    ]
  }
  
  useEffect(()=>{
   
    //dispatch({type:"recourseCenter/getResourceIdList",payload:{userNum}});
      
    return ()=>{};
  },[])

  useEffect(()=>{
    if(addVisible)
    dispatch({type:"recourseCenter/getResourceIdList",payload:{userNum}});//查询选择列表
  },[addVisible])

//列表查询
const onFinish=(val)=>{
    dispatch({type:"recourseCenter/getHospitalResource",payload:{...val,userNum}});
}

  //添加物资种类--物资种类只能由管理员新增，医院只是把物资种类添加到自己库存中，默认数量为0
  const addResource=()=>{
    form2.validateFields().then((values)=>{
      dispatch({type:"recourseCenter/addResourceToHS",payload:{userNum,...values,num:0},callback:(res)=>{
        if(res.code==0)
          {
            setAddvisible(false);
            form.submit();
          }
      }});
    })
  }
  //删除
  const delteType=()=>{

  }
  //取用
  const useResource=()=>{
    form3.validateFields().then((values)=>{
      dispatch({type:"recourseCenter/addResourceToHS",payload:{userNum,...values,suppliesId:rowList[0].suppliesId},callback:(res)=>{
        if(res.code==0)
        {
          setDelModal(false);
          form.submit();
        }    
      }});
    })
  }
  //申请
  const apply=()=>{
    form4.validateFields().then((values)=>{
      dispatch({type:"recourseCenter/applyResource",payload:{userNum,...values,suppliesId:rowList[0].suppliesId},callback:(res)=>{
        if(res.code==0)
        {
          setApplyModal(false);
          form.submit();
        }    
      }});
    })
  }


  return(
    <PageHeaderWrapper title={false} >
       
       <ProTable
            form={form} 
            columns={columns}
            fieldItems={fieldItems}
            rowKey="suppliesId"
            selectType="checkbox"
            topButton={topButton}
            onFinish={onFinish}
            dataSource={HsresourceList}
            totalCount={HstotalCount}
       >

       </ProTable>
       <Modal title={"新增库存种类"} visible={addVisible} onCancel={()=>{setAddvisible(false)}}
              cancelText="取消" okText="新增" onOk={addResource} centered={true} className={styles.box}
       >
          <Form form={form2} labelCol={{span:8}} wrapperCol={{span:12}}>
            <Form.Item label="选择需要添加的物资" name="suppliesId">
            <Select>
              {resourceIdList.map((val)=>{
                return <Select.Option value={val.suppliesId} key={val.suppliesId}>{val.suppliesName}</Select.Option>
              })}
            </Select>
            </Form.Item>
          </Form>
       </Modal>

       <Modal title={"申请物资"} visible={applyModal} onCancel={()=>{setApplyModal(false)}}
              cancelText="取消" okText="申请" onOk={apply}
       >
          <Form form={form4}>
            <Form.Item label="请输入申请数量" name="num">
              <InputNumber min={1} max={rowList[0]?rowList[0].suppliesSum:99999}></InputNumber>
            </Form.Item>
          </Form>
       </Modal>

       <Modal title={"取用物资"} visible={useModl} onCancel={()=>{setUseModal(false)}}
              cancelText="取消" okText="确认" onOk={useResource}
       >
          <Form form={form3}>
            <Form.Item label="请输入领用数量" name="subNum">
              <InputNumber min={1} max={rowList[0]?rowList[0].hospitalsuppliesNum:99999}></InputNumber>
            </Form.Item>
          </Form>
       </Modal>

       <Modal title={"删除库存种类"} visible={delModal} onCancel={()=>{setDelModal(false)}}
              cancelText="取消" okText="删除" onOk={delteType}
       >
          确认删除库存种类--<span>{}</span>？,该物品剩余库存将会退还中心！
       </Modal>
      

    </PageHeaderWrapper>
  )
}
export default connect(({recourseCenter})=>{return { recourseCenter }})(Page);