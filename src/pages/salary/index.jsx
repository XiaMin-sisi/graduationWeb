import React,{useEffect} from "react";
import styles from './index.less'
import * as echarts from 'echarts';
import echartsDS from '@/assets/china'

export default ()=>{

  useEffect(()=>{
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('salary'));
    echarts.registerMap("china",echartsDS());
    const option={
      geo:{
        type:"map",
        map:"china",
        roam:true,
        label:{
          show:true,
        }
      }
    }
    myChart.setOption(option);
  },[])

  return (
    <>
      <div>salary---显示各个城市的平均工资/最高工资/最低工资</div>
      <div className={styles.ebox} id={'salary'}>

      </div>
    </>
  )
}
