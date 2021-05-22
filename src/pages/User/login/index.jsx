
import {message,Form,Input,Button} from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import {UserAddOutlined,LockOutlined} from '@ant-design/icons'
import {connect} from 'dva';
import {history } from 'umi';


const Login = (props) => {
  const {dispatch}=props
  const [form]=Form.useForm();
  //console.log(md5("123456"));  // e10adc3949ba59abbe56e057f20f883e
  const login=(val)=>{
    dispatch({type:"user/LoginToSys",payload:{...val},callback:(res)=>{
      if(res.code==0){
          message.success("🎉 🎉 🎉登录成功！欢迎来到 医疗资源调度中心");
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
                         rules={[
                          {message:"账号不能为空！",required:true},
                          {message: "不能以0开头！",pattern:/^[1-9][\w\W]*$/},
                          {message:"手机号只能包含数字",pattern: /^[0-9]+$/},
                          {message: "手机号长度不正确",pattern:/^[0-9]{11}/}
                         ]}
              >
                <Input size={'large'} prefix={<UserAddOutlined style={{color:"#40a9ff"}}/>} placeholder={"请输入11位手机号码"}></Input>
              </Form.Item>
              <Form.Item label=" 密码："
                         name="passWord"
                         rules={[{message:"密码不能为空！",required:true}]}
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

