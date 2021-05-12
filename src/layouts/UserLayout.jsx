import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import React from 'react';
import logo from '../assets/logo.png';
import styles from './UserLayout.less';
import {Tooltip} from 'antd'
import { GithubOutlined } from '@ant-design/icons';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider >
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.bg}></div>
        <div className={styles.content}>
          <div className={styles.top}>
            <Tooltip title={"免密登录"}>
              <div className={styles.header}>
                <Link to="/">
                  <img alt="logo" className={styles.logo} src={logo} />
                  <span className={styles.title}>职位分析平台</span>
                </Link>
              </div>
            </Tooltip>
            <div className={styles.desc}>
              诞生于大数据背景之下的职位数据分析平台
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright={`${new Date().getFullYear()} 南昌大学科学技术学院`}
          links={[
            {
              key: '作者主页',
              title: '作者主页',
              href: 'http://www.ndkj.com.cn/',
              blankTarget: true,
            },
            {
              key: '项目源码',
              title: <GithubOutlined />,
              href: 'https://github.com',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
