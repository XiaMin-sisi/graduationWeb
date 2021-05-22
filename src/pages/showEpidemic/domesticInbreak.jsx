import React, { useState,useEffect} from 'react';
import styles from './index.less';
import {connect} from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import * as echarts from 'echarts';
import {chunk} from 'lodash'
import {Pagination } from 'antd'
import { set } from 'lodash';
import option from './option'


const Page=(props)=>{
  let {dispatch}=props;
  const [data,setData]=useState([]);
  const [arr,setArr]=useState([]);  
  useEffect(()=>{
      dispatch({type:"estic/getOutEsticData",payload:{},callback:({data})=>{
        console.log(data)
        let arr1=[];//provinceName
        let arr2=[];//currentConfirmedCount
        let arr3=[];//confirmedCount
        let arr4=[];//curedCount
       data.map((val)=>{
          arr1.push(val.provinceName);
          arr2.push(val.currentConfirmedCount);
          arr3.push(val.confirmedCount);
          arr4.push(val.curedCount);
         return 0;
       })
      setData([arr1,arr2,arr3,arr4]);
      setArr([chunk(arr1,10)[0],chunk(arr2,10)[0],chunk(arr3,10)[0],chunk(arr4,10)[0]])
      }});
      const myChart = echarts.init(document.getElementById('chart2'));
      myChart.setOption(option(...arr));
    return ()=>{};
  },[])

  useEffect(()=>{
      const myChart = echarts.init(document.getElementById('chart2'));
      myChart.setOption(option(...arr));
    return ()=>{}
  },[arr])

  const pageChange=(page,size)=>{
    page=page-1;
    if(data&&data.length)
    setArr([chunk(data[0],10)[page],chunk(data[1],10)[page],chunk(data[2],10)[page],chunk(data[3],10)[page]])
  }


  return(
    <PageHeaderWrapper title={false}>
        <div id={'chart2'} className={styles.outchart}></div>
        <div className={styles.page}>
          <Pagination
            defaultCurrent={1}
            showSizeChanger={false} 
            showQuickJumper={true} 
            pageSize={10} 
            total={data[0]?data[0].length:0}
            onChange={pageChange}
            >
          </Pagination>
        </div>
    </PageHeaderWrapper>
  )
}
export default connect(({estic})=>{return { estic }})(Page);