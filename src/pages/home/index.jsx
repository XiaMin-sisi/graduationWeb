import React from 'react';
import {Typography,Tooltip} from 'antd';
import styles from './index.less';
import {history } from 'umi';
const { Paragraph, Text } = Typography;
const Page=()=>{


  return(
    <div>
      <div className={styles.name}>
        <Tooltip title={'诞生于大数据背景下的职位数据分析平台'} placement={'right'}><span>职位数据分析平台</span></Tooltip>
      </div>
      <div className={styles.top}>
        <div className={styles.item} onClick={()=>{history.push('/city')}}>城市筛选>></div>
        <div className={styles.item} onClick={()=>{history.push('/job')}}>职位筛选>></div>
        <div className={styles.item} onClick={()=>{history.push('/salary')}}>工资筛选>></div>
        <div className={styles.item} onClick={()=>{history.push('/num')}}>数量筛选>></div>
        <div className={styles.item} onClick={()=>{history.push('/num')}}>数量筛选>></div>
      </div>
      <div className={styles.bigBox}>
        <div className={styles.leftBox}></div>
        <div className={styles.rightBox}>

        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.desTitle}>平台描述</div>
        <div className={styles.desText}>
          在大数据蓬勃发展的环境下，借助网络爬虫、数据分析，致力于帮助有需要的人了解行业情况，以便更好、更快的选择合适的工作地点、工作类型。<br/>
          请知悉，本平台为&nbsp;
          <span>公平</span>
          、
          <span>公开</span>
          、
          <span>工正</span>
          、
          <span>免费</span>
          &nbsp;的平台，不会向任何招聘网站进行引流，任何组织或个人以任何形式向您索取财物的行为都是诈骗，您的任何损失都与本平台无关。<br/>
          平台的所有数据都来自于第三方，平台仅进行简单的数据分析、与可视化， 作为您选择工作的参考，不能保证其真实性。
        </div>
        <div className={styles.desFoot}>（本平台数据来爬于boss直聘、智联招聘，如有侵权请联系作者进行删除）</div>
      </div>
    </div>
  )
}

export default Page
