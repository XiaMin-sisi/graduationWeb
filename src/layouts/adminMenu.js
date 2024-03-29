/*
 * @Author: XiaMin
 * @Date: 2021-06-06 14:14:08
 * @Description: file content
 */
export default [
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
              redirect: '/home',
            },
            {
              path: '/home',
              name: '首页',
              icon: 'dashboard',
              component: './home',
            },

            {
              path: '/showEpidemic',
              name: '疫情展示',
              icon: 'dashboard',
              routes: [
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
              component:'./account'
            },
            {
              path: '/resourceCenter',
              name: '物资中心',
              icon: 'dashboard',
              routes: [
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
                  name: '全部志愿者',
                  icon: 'smile',
                  path: '/volunteer/allMess',
                  component: './volunteer/allMess',
                },
                // {
                //   name: '分配志愿者',
                //   icon: 'smile',
                //   path: '/volunteer/distribution',
                //   component: './volunteer/distribution',
                // },
                // {
                //   name: '志愿者报名',
                //   icon: 'smile',
                //   path: '/volunteer/signUp',
                //   component: './volunteer/signUp',
                // },
                // {
                //   name: '查看志愿者',
                //   icon: 'smile',
                //   path: '/volunteer/check',
                //   component: './volunteer/check',
                // },
              ],
            },
            {
              path: '/patient',
              name: '患者中心',
              icon: 'profile',
              routes: [
                {
                  name: '患者记录',
                  icon: 'smile',
                  path: '/patient/patientMess',
                  component: './patient/patientMess',
                },
                // {
                //   name: '患者入院',
                //   icon: 'smile',
                //   path: '/patient/toHospital',
                //   component: './patient/toHospital',
                // },
                // {
                //   name: '患者出院',
                //   icon: 'smile',
                //   path: '/patient/outHospital',
                //   component: './patient/outHospital',
                // },
              ],
            },
            {
              name: '医院中心',
              icon: 'CheckCircleOutlined',
              path: '/hospital',
              routes: [
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
  ]