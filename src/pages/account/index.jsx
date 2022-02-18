import React, { useState,useEffect} from 'react';
import styles from './index.less';
import {connect} from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Tabs , Row ,Col,Avatar,Button,Form,Input,Upload} from 'antd';
import md5 from 'md5-js/md5';

const { TabPane } = Tabs;
const {Item}=Form


const Page=(props)=>{
  const {dispatch,accountCenter:{userInfo}}=props;
  const [form]=Form.useForm();
  const [form2]=Form.useForm();
  const [key,saveKey]=useState();
  const [imgUrl,setImgUrl]=useState(JSON.parse(localStorage.getItem("currentUser")).avatar||require('@/assets/avatar.png'));
  let userNum=localStorage.getItem("userName");
  let role=localStorage.getItem("accountRole");
  const formItemProps = {
    labelCol: { span: 8 },
  }
  useEffect(()=>{
    userNum=localStorage.getItem("userName");
    role=localStorage.getItem("accountRole");
      dispatch({type:"accountCenter/getAccountMessage",payload:{role,userName:userNum}});
      
    return ()=>{};
  },[])

  const tabChange=(val)=>{
    saveKey(val);
  }
  // 上传头像
  const beforeUpload=(file)=>{
    let tbName="hospitalmesstb";
    if(localStorage.getItem("accountRole")==0)
        tbName="admintb";
    else if(localStorage.getItem("accountRole")==2)
        tbName="volunteerstb";
    dispatch({
        type:'upload/uploadAvatar',
        payload:{file,role:tbName,userNum:localStorage.getItem("userName")},
        callback:(res)=>{
            if(res&&res.code==0){
                setImgUrl(res.data);
                localStorage.setItem("currentUser",JSON.stringify({...JSON.parse(localStorage.getItem("currentUser")),avatar:res.data}));
                dispatch({type:'upload/update',payload:{}})
            }  
        }
    });
    return false
}
 // 修改信息
 const alterInfo=(values)=>{
    dispatch(
        {
            type:"accountCenter/alterInfo",
            payload:{...values,role,userName:userNum},
            callback:(res)=>{
            if(res&&res.code==0)
                localStorage.setItem("currentUser",JSON.stringify({"name":values.name,"avatar":imgUrl}));
                dispatch({type:'upload/update',payload:{}})
            }
        });
 }
 // 修改密码
 const alterPwd=(values)=>{
    form2.validateFields().then((values)=>{
        dispatch({type:"accountCenter/alterPwd",payload:{
            oldPwd:md5(values.oldPwd),
            newPwd:md5(values.newPwd),
            userName:userNum}});
    }).catch((error)=>{
        console.log("error")
    })
 }
 

  return(
    <PageHeaderWrapper title={false}>
       <div className={styles.box}>
            <Tabs defaultActiveKey="1" onChange={tabChange}>
                <TabPane key="1" tab="基本信息">
                    <Row>
                        <Col span={10}> 
                            <Avatar size={256} src={imgUrl}></Avatar>
                        </Col>
                        <Col span={14}>
                             <Row >
                                 <Col span={12}><span className={styles.textSpan}>用户名：</span>{JSON.parse(localStorage.getItem("currentUser")).name}</Col>
                                 <Col span={12}><span className={styles.textSpan}>用户角色：</span>{role==0?"管理员":(role==1?"医院账号":"志愿者账号")}</Col>
                                 <Col span={12}><span className={styles.textSpan}>邮箱：</span>{userInfo.email||"--"}</Col>
                                 <Col span={12}><span className={styles.textSpan}>电话号码：</span>{userNum}</Col>
                                 {role==1?
                                  <>
                                     <Col span={24}><span className={styles.textSpan}>医院地址：</span>{userInfo.hospitalDress||"--"}</Col>
                                     <Col span={24} style={{lineHeight:"32px",display:"flex"}}>
                                         <div className={styles.desDiv}>医院描述：</div>
                                         <div>{userInfo.hospitalDescribe||"--"}</div>
                                     </Col>
                                  </>
                                  :null
                                 }   
                                 {role==2?
                                     <Col span={24}><span className={styles.textSpan}>身份证号：</span>{userInfo.volunteerId}</Col>
                                     :null
                                 }
                             </Row>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane key="2" tab="修改信息">
                    <Row>
                        <Col span={10}> 
                            <Row justify={"center"}>
                                <Col span={24}><Avatar size={256} src={imgUrl}></Avatar></Col>
                                <Col span={24}>
                                    <Upload beforeUpload={beforeUpload} showUploadList={false}>
                                        <Button type={"primary"} style={{marginLeft:"84px"}}>上传头像</Button>
                                    </Upload>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={14}>
                             <Row >
                                 <Form labelCol={{span:8}} wrapperCol={{span:16}} style={{width:"400px"}}
                                    initialValues={{
                                        name:JSON.parse(localStorage.getItem("currentUser")).name,
                                        email:userInfo.email,
                                        volunteerId:userInfo.volunteerId,
                                        hospitalDescribe:userInfo.hospitalDescribe,
                                        hospitalDress:userInfo.hospitalDress
                                    }}
                                    onFinish={alterInfo}
                                    form={form}
                                 >
                                     <Item label="用户名" name="name">
                                         <Input placeholder="请输入用户名"></Input>
                                     </Item>
                                     <Item label={"邮箱"} name="email">
                                         <Input placeholder="请输入邮箱"></Input>
                                     </Item>
                                     {role==2?
                                    <Item label={"身份证号"} name="volunteerId">
                                         <Input placeholder="请输入省份证号"></Input>
                                     </Item>:null
                                     }
                                     {role==1?
                                      <>
                                        <Item label={"地址"} name="hospitalDress">
                                                <Input placeholder="请输入医院地址"></Input>
                                        </Item>
                                        <Item label={"描述"} name="hospitalDescribe">
                                                <Input.TextArea  placeholder="请输入医院描述"></Input.TextArea >
                                        </Item>
                                     </>:null
                                     }
                                     <Item wrapperCol={{span:16,offset:8}}>
                                        <Button type="primary" htmlType="submit">
                                            保存
                                        </Button>
                                     </Item>
                                 </Form>
                             </Row>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane key="3" tab="修改密码">
                <Row style={{ maxWidth: 800 }}>
            <Col span={12}>
              <Form
                form={form2}
              >
                <Form.Item {...formItemProps} name='oldPwd' label='旧密码'
                  rules={[
                      {required:true,message:"不能为空"},
                      {pattern:new RegExp(`^${localStorage.getItem("passWord")}$`),message:"旧密码不正确",transform:(val)=>md5(val)}]}>
                  <Input.Password autoComplete="off" />
                </Form.Item>
                <Form.Item {...formItemProps} name='newPwd' label='新密码' hasFeedback
                  rules={[{ required: true, message: '请输入新密码!' }, () => ({
                    validator(rule, value) {
                      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/;
                      if (!value || reg.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject('至少6位，包含英文与数字组合!');
                    },
                  })]}>
                  <Input.Password autoComplete="off" />
                </Form.Item>
                <Form.Item {...formItemProps} name='confirm' label='确认新密码'
                  rules={[{ required: true, message: '请再输入一次新密码!' }, ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('newPwd') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('两次密码输入不一致!');
                    },
                  })]} hasFeedback>
                  <Input.Password autoComplete="off" />
                </Form.Item>
              </Form>
              <div style={{ textAlign: 'right' }}>
                <Button type='primary' onClick={alterPwd}>保存</Button>
              </div>
            </Col>
          </Row>
                </TabPane>
            </Tabs>
       </div>
    </PageHeaderWrapper>
  )
}
export default connect(({accountCenter})=>{return { accountCenter }})(Page);