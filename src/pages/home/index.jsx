import React from 'react';
import {Typography,Tooltip} from 'antd';
import styles from './index.less';
import {history } from 'umi';
const { Paragraph, Text } = Typography;
const Page=()=>{


  return(
    <div>
      <div className={styles.name}>
        <Tooltip title={'诞生于疫情之下的一套医疗物资调度系统，有利于疫情下物资的及时、准确分配'} placement={'right'}><span>医疗资源调度系统</span></Tooltip>
      </div>
      <div className={styles.top}>
        <div className={styles.item} onClick={()=>{history.push('/showEpidemic/domesticOutbreak')}}>疫情数据</div>
        <div className={styles.item} onClick={()=>{history.push('/account/center')}}>个人信息</div>
        <div className={styles.item} onClick={()=>{history.push('/account/settings')}}>信息设置</div>
        <div className={styles.item} onClick={()=>{history.push('/leaveMess')}}>留言寄托</div>
        <div className={styles.item} onClick={()=>{history.push('/resourceCenter/selfInventory')}}>物资中心</div>
      </div>
      <div className={styles.bigBox}>
        <div className={styles.leftBox}></div>
        <div className={styles.rightBox}>
          <div className={styles.title}>致敬英雄</div>
          <Paragraph ellipsis={{ rows:21 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;在全国上下抗击新型冠状病毒感染的肺炎疫情战役中，有那么一群人毅然奔赴抗疫前线，是他们的坚守和付出，筑起了一道守护人民健康的防护线。他们是最美“逆行者”。　<br/>

            &nbsp;&nbsp;&nbsp;&nbsp;新春伊始，一场猝不及防的肺炎疫情席卷全国大地。在这场突如其来的战“疫”面前，一群“最美逆行者”没有退缩，逆“风”而行，迎难而上，为抗击疫情，奉献力量，传递温暖。
            他们义无反顾的“逆行”，是最勇敢的坚守，是最温暖的守护，值得我们每一个人点赞和致敬!<br/>

            &nbsp;&nbsp;&nbsp;&nbsp;最美逆行者，肩负的是责任与担当。责任重于泰山。面对疫情，广大医护工作者，
            写下请战书，按下鲜红的手印，主动请缨，毅然奔向这场没有硝烟的战场。公安干警、基层干部、运输司机等，义无反顾，奋战在防疫抗灾战场的第一线。他们手挽手、肩并肩，冲锋
            陷阵，为抗击疫情、稳定局面默默无闻地奉献着，他们都是最美、最帅的“逆行者”。正是这些最美“逆行者”，他们肩负起了责任，扛起身上的重担，用行动诠释着责任与担当。<br/>

            &nbsp;&nbsp;&nbsp;&nbsp;最美逆行者，传递的是信心与力量。疫情面前，人心是最强大的力量。危险紧要关头，最美“逆行者”迎难而上，挺身而出，这是对生命的尊重与救助，更是为社会传递着休戚与共、
            守望相助的力量与温情，坚定广大民众的抗疫斗志和决心，树立战胜疫情的坚强信念。在这些闪闪发光的普通人身上，我们看到了爱的伟大、爱的力量，对所有人的一颗大爱之心。
            正是这些“最美逆行者”的实际行动，鼓舞了人们对抗疫情的信心，有了直面危险的勇气和众志成城的毅力。<br/>

            &nbsp;&nbsp;&nbsp;&nbsp;最美逆行者，守护的是生命与希望。正是这些普通平凡的最美“逆行者”，用实际行动守护着我们的健康，守护着人民的安危，守护着城市的平安。每一个时代都有每一个时代的“英雄”，
            病毒肆虐时，医生、护士、警察……他们在默默奋战，守护我们，护佑国家，他们无愧于新时代的英雄。疫情当前，是他们在危险之境中逆风而行，以自己的生命守护着我们的生命，
            让我们战胜了恐惧，克服了困难，扛起了胜利希望，让我们温暖、安定，心中有力量，眼前有希望。<br/>

            &nbsp;&nbsp;&nbsp;&nbsp;在这场没有硝烟的战争中，勇敢逆行的他们，千千万万最美“逆行者”，谱写了一曲感人篇章，一首首赞美诗歌。他们都是新时代最可爱的人、最可敬的人，
            值得被所有人铭记、点赞。在这个不寻常的春节，让我们守望相助，向最可爱的人致敬，他们是最美逆行者!<br/>
          </Paragraph>
        </div>
      </div>
      <div className={styles.bottom}>
        谨以此系统致敬疫情中保护我们的最勇敢、最可爱的人们！
      </div>
    </div>
  )
}

export default Page
