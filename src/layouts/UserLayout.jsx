import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import React from 'react';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';
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
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>MDRESCSYS</span>
              </Link>
            </div>
            <div className={styles.desc}>
              MDRESCSYS--诞生于疫情之下的医疗资源调度系统
            </div>
          </div>
          {children}
        </div>
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
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
