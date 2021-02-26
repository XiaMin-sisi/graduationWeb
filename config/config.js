// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'login',
              component: './User/login',
            },
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/showEpidemic/domesticOutbreak',
            },
            {
              path: '/showEpidemic',
              name: '疫情展示',
              icon: 'dashboard',
              routes: [
                {
                  path: '/',
                  redirect: '/showEpidemic/domesticOutbreak',
                },
                {
                  name: '国内疫情',
                  icon: 'smile',
                  path: '/showEpidemic/domesticOutbreak',
                  component: './showEpidemic/domesticOutbreak',
                },
                {
                  name: '世界疫情',
                  icon: 'smile',
                  path: '/showEpidemic/domesticInbreak',
                  component: './showEpidemic/domesticInbreak',
                }
              ],
            },
            {
              name: '个人中心',
              icon: 'user',
              path: '/account',
              routes: [
                {
                  path: '/',
                  redirect: '/account/center',
                },
                {
                  name: '个人信息',
                  icon: 'smile',
                  path: '/account/center',
                  component: './account/center',
                },
                {
                  name: '信息设置',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                },
              ],
            },
            {
              path: '/resourceCenter',
              name: '物资中心',
              icon: 'dashboard',
              routes: [
                {
                  path: '/',
                  redirect: '/resourceCenter/allInventory',
                },
                {
                  name: '物资库存',
                  icon: 'smile',
                  path: '/resourceCenter/selfInventory',
                  component: './resourceCenter/selfInventory',
                },
                {
                  name: '中心库存',
                  icon: 'smile',
                  path: '/resourceCenter/allInventory',
                  component: './resourceCenter/allInventory',
                },
                {
                  name: '物资申领记录',
                  icon: 'smile',
                  path: '/resourceCenter/apply',
                  component: './resourceCenter/apply',
                },
                {
                  name: '物资审批记录',
                  icon: 'smile',
                  path: '/resourceCenter/forApply',
                  component: './resourceCenter/forApply',
                },
              ],
            },
            {
              path: '/volunteer',
              icon: 'form',
              name: '自愿者中心',
              routes: [
                {
                  path: '/',
                  redirect: '/volunteer/allMess',
                },
                {
                  name: '全部志愿者',
                  icon: 'smile',
                  path: '/volunteer/allMess',
                  component: './volunteer/allMess',
                },
                {
                  name: '分配志愿者',
                  icon: 'smile',
                  path: '/volunteer/distribution',
                  component: './volunteer/distribution',
                },
                {
                  name: '志愿者报名',
                  icon: 'smile',
                  path: '/volunteer/signUp',
                  component: './volunteer/signUp',
                },
                {
                  name: '查看志愿者',
                  icon: 'smile',
                  path: '/volunteer/check',
                  component: './volunteer/check',
                },
              ],
            },
            {
              path: '/patient',
              name: '患者中心',
              icon: 'profile',
              routes: [
                {
                  path: '/',
                  redirect: '/patient/patientMess',
                },
                {
                  name: '患者记录',
                  icon: 'smile',
                  path: '/patient/patientMess',
                  component: './patient/patientMess',
                },
                {
                  name: '患者入院',
                  icon: 'smile',
                  path: '/patient/toHospital',
                  component: './patient/toHospital',
                },
                {
                  name: '患者出院',
                  icon: 'smile',
                  path: '/patient/outHospital',
                  component: './patient/outHospital',
                },
              ],
            },
            {
              name: '医院中心',
              icon: 'CheckCircleOutlined',
              path: '/hospital',
              routes: [
                {
                  path: '/',
                  redirect: '/hospital/allMess',
                },
                {
                  name: '全部医院',
                  icon: 'smile',
                  path: '/hospital/allMess',
                  component: './hospital/allMess',
                },
              ],
            },
            {
              name: 'exception',
              icon: 'warning',
              path: '/exception',
              routes: [
                {
                  path: '/',
                  redirect: '/exception/403',
                },
                {
                  name: '403',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: '404',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: '500',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
              ],
            },
            {
              name: '留言建议',
              icon: 'highlight',
              path: '/leaveMess',
              routes: [
                {
                  path: '/',
                  redirect: '/leaveMess/',
                },
                {
                  name: '留言寄托',
                  icon: 'smile',
                  path: '/leaveMess/',
                  component: './leaveMess/',
                },
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
