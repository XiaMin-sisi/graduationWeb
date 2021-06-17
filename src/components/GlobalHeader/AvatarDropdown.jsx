import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React,{useState,useEffect} from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const AvatarDropdown = (props)=>{
    const onMenuClick = (event) => {
    const { key } = event;
    //history.push(`/user/login`);
    if (key === 'logout') {
      const { dispatch } = props;
      localStorage.setItem("passWord","");
      localStorage.setItem("userName","");

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }
    else{
      if(key === 'center')
        history.push(`/account?key=1`);
      else
        history.push(`/account?key=2`)
    }
    };
    console.log(props)
    const {menu,upload:{isUpdate}} = props;
    const  [currentUser,setCurrent]=useState(JSON.parse(localStorage.getItem("currentUser")));// 从缓存中获取用户的用户名、头像地址
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    useEffect(()=>{
      if(isUpdate){
        setCurrent(JSON.parse(localStorage.getItem("currentUser")));
      }
    },[isUpdate])
   

    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={`${currentUser.avatar}`} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  
}

export default connect(({ user,upload }) => ({
  currentUser: user.currentUser,
  upload
}))(AvatarDropdown);
