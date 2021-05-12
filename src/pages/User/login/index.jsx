
import {message,Form,Input,Button} from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import {UserAddOutlined,LockOutlined} from '@ant-design/icons'
import {connect} from 'dva';
import {history } from 'umi';

const checkNum=(form)=>{
  const num=form.getFieldValue("username");
    if(num){
      if(num.toString()[0]==="0"){
        return {message: "手机号不能以 0 开头",pattern:"/^[^0]$/"}
      }
      if(num.search(/^[0-9]+$/)===-1){
        return  {message:"手机号只能包含数字",pattern: /^[0-9]+$/}
      }
      return {message: "手机号长度不正确",pattern:/^[0-9]{11}$/}
    }
    return {message:"账号不能为空！",required:true}
};

const checkPwd=(form)=>{
  const pwd=form.getFieldValue("username");
  if(!pwd){
    return  {message:"密码不能为空！",required:true}
  }
  return {}
}

const Login = (props) => {
  const {dispatch}=props
  const [form]=Form.useForm();
  const login=(val)=>{
    dispatch({type:"user/LoginToSys",payload:{...val},callback:(res)=>{
      if(res.code===0){
          message.success("🎉 🎉 🎉登录成功！欢迎来到 职位数据分析平台");
          history.push("/");
      }
      else{
        message.error(res.message)
      }
      }})
  }

  return(
        <div className={styles.login}>
            <Form
                  layout="vertical"
                  form={form}
                  onFinish={login}
            >
              <Form.Item label="账号："
                         name="userName"
                         rules={[checkNum]}
              >
                <Input size={'large'} prefix={<UserAddOutlined style={{color:"#40a9ff"}}/>} placeholder={"请输入11位手机号码"}></Input>
              </Form.Item>
              <Form.Item label=" 密码："
                         name="passWord"
                         rules={[checkPwd]}
              >
                <Input.Password size={'large'} placeholder={"请输入用户密码"} prefix={<LockOutlined style={{color:"#40a9ff"}} />}></Input.Password>
              </Form.Item>
              <Form.Item >
                <Button type="primary" htmlType="submit" style={{width:"100%"}} size={'large'}>
                  登录
                </Button>
              </Form.Item>
            </Form>
        </div>
  )
};
export default connect(({user})=>{return { user }})(Login);

