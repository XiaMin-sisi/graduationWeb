import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, connect, history, FormattedMessage, formatMessage } from 'umi';
import styles from './style.less';
import {UserAddOutlined,LockOutlined} from '@ant-design/icons'
import md5 from 'md5-js'

const Register = ({dispatch}) => {
  
  const [form]=Form.useForm();


  const onFinish=()=>{
    form.validateFields().then((values)=>{
      dispatch({type:"user/regist",payload:{
          userRole:2,
          userName:values.userName,
          passWord:md5(values.newPwd),
        },callback:(res)=>{
          if(res.code==0)
          {
            message.success("注册成功！现在你可以使用账号和密码进行登录、完善个人信息！")
            history.push("/user/login");
          }
        }});
  }).catch((error)=>{
      console.log(error)
  })
  }

  return (
    <div className={styles.main}>
      <Form form={form} name="UserRegister" onFinish={onFinish} labelCol={{span:8}} wrapperCol={{span:24}} layout="vertical">
              <Form.Item label="手机号"
                         name="userName"
                         rules={[
                          {message:"账号不能为空！",required:true},
                          {message: "不能以0开头！",pattern:/^[^0][\w\W]*$/},
                          {message:"手机号只能包含数字",pattern: /^[0-9]+$/},
                          {message: "手机号长度不正确",pattern:/^[0-9]{11}/}
                         ]}
              >
                <Input size={'large'} prefix={<UserAddOutlined style={{color:"#40a9ff"}}/>} placeholder={"请输入11位手机号码"}></Input>
              </Form.Item>
              <Form.Item  name='newPwd' label='新密码' hasFeedback
                  rules={[{ required: true, message: '请输入新密码!' }, () => ({
                    validator(rule, value) {
                      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/;
                      if (!value || reg.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject('至少6位，包含英文与数字组合!');
                    },
                  })]}>
                  <Input.Password autoComplete="off" size={'large'} />
                </Form.Item>
                <Form.Item  name='confirm' label='确认新密码'
                  rules={[{ required: true, message: '请再输入一次新密码!' }, ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('newPwd') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('两次密码输入不一致!');
                    },
                  })]} hasFeedback>
                  <Input.Password autoComplete="off" size={'large'}/>
                </Form.Item>
                <Form.Item>
                  <Button
                    size="large"
                    className={styles.submit}
                    type="primary"
                    htmlType="submit"
                  >
                    <FormattedMessage id="userandregister.register.register" />
                  </Button>
                  <Link className={styles.login} to="/user/login">
                    <FormattedMessage id="userandregister.register.sign-in" />
                  </Link>
              </Form.Item>
      </Form>
      <div className={styles.text}>（只支持志愿者账号自行注册，医院账号请联系管理员进行添加）</div>
    </div>
  );
};

export default connect(({user})=>{return { user }})(Register);
