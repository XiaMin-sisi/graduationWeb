/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.svg';
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);

/**
 * use Authorized check all menu item
 */


const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 东华理工大学长江学院`}
    links={[
      {
        key: '作者主页',
        title: '作者主页',
        href: 'http://sisixxn.xyz',
        blankTarget: true,
      },
      {
        key: '项目源码',
        title: <GithubOutlined />,
        href: 'https://github.com/XiaMin-sisi',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  const menuDataRef = useRef([]);
  const [menuData2,setMenu]=useState(require('./adminMenu'));
  const [role,setRole]=useState(localStorage.getItem("accountRole"))
  useEffect(()=>{
    setMenu(require('./adminMenu'));
  },[])
  useEffect(() => {
    if(localStorage.getItem("userName")&&localStorage.getItem("passWord"))
    {
      if (dispatch) {
        dispatch({
          type: 'user/isUser',
          payload:{userName:localStorage.getItem("userName"),passWord:localStorage.getItem("passWord")},
          callback:(res)=>{
            if(res.code !== 0){
              history.push("/user/login");
            }
          }
        });
      }
    }
    else {
      history.push("/user/login")
    }
  }, []);
  /**
   * init variables
   */
   const menuDataRender = (menuList) =>
   menuList.map((item) => {
       const localItem = {
         ...item,
         children: item.children ? menuDataRender(item.children) : undefined,
       };
       //医院应该去除的菜单
       if(role=="1")
       {
         if(localItem.name=="中心库存"||localItem.name=="物资审批记录"||localItem.name=="医院中心")
         return  null;
       }
       //管理员应该去除的菜单
       if(role=="0"){
         if(localItem.name=="自愿者中心"||localItem.name=="物资库存"||localItem.name=="物资申领记录")
         return  null;
       }
       //自愿者应该去除的菜单
       if(role=="2"){
         if(localItem.name=="物资中心"||localItem.name=="患者中心"||localItem.name=="自愿者中心")
         return  null;
       }
       return Authorized.check(item.authority, localItem, null);
     });
  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );
  const { formatMessage } = useIntl();
  return (
    <>
      <ProLayout
        logo={logo}
        formatMessage={formatMessage}
        {...props}
        {...settings}
        onCollapse={handleMenuCollapse}
        onMenuHeaderClick={() => history.push('/')}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            !menuItemProps.path ||
            location.pathname === menuItemProps.path
          ) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        postMenuData={(menuData) => {
          menuDataRef.current = menuData || [];
          return menuData || [];
        }}
      >
        <Authorized authority={authorized.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>
      
    </>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
