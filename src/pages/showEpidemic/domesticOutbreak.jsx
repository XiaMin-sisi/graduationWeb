import React, { useState,useEffect} from 'react';
import styles from './index.less';
import {connect} from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import echartsDS from '@/assets/china';
import * as echarts from 'echarts';



const Page=(props)=>{
  let {dispatch}=props;
  const [data,setData]=useState([]);
  const option =(data=[],data2=[],data3=[])=>{
    let max=0;
    if(data&&data.length)
    data.map((val)=>{
      if(val.value>max)
        max=val.value;
      return 0;
    })

    return  {
    title: {
      text: '全国疫情数据',
      left: 'center',
      textStyle: {
        color: '#fff'
      },
      top: "5%"
    },
    tooltip: {
      trigger: 'item',
      formatter:(par)=>{
        let name=par.name;
        let line1="现存病例："+data.filter((val)=>val.name==name)[0].value+"<br/>";
        let line2="疑似病例："+data2.filter((val)=>val.name==name)[0].value+"<br/>";
        let line3="累计病例："+data3.filter((val)=>val.name==name)[0].value+"<br/>";
        return name+"<br/>"+'<span style="color:red">'+line1+'</span>'+'<span style="color:orange">'+line2+'</span>'+'<span style="color:blue">'+line3+'</span>';
      }
    },
  visualMap: {
    type : "continuous",
    min: 0,
    max: max,
    text: ['现存病例-高','现存病例-低'],
    realtime: false,
    calculable: true,
    inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
    },
    seriesIndex:0
},
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['全国疫情数据']
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: '现存病例',
        type: 'map',
        mapType: 'china',
        roam: false,
        label: {
          show: true,
          color: 'rgb(249, 249, 249)'
        },
        data: data||[],
        itemStyle: {
          normal: {
            areaColor: "rgba(43, 196, 243, 0.42)",
            borderColor: "rgba(43, 196, 243, 1)",
            borderWidth: 1
          },
          emphasis: {
            areaColor: "#2B91B7"
          }
        }
      },
    ]
  };}
  
  useEffect(()=>{
      dispatch({type:"estic/getEsticData",payload:{},callback:({data})=>{
       let arr1=[];
       let arr2=[];
       let arr3=[];
       data.map((val)=>{
          arr1.push({name:val.province,value:val.currentCount});
          arr2.push({name:val.province,value:val.suspectedCount});
          arr3.push({name:val.province,value:val.count});
         return 0;
       })
       setData([arr1,arr2,arr3])
      }});
      const myChart = echarts.init(document.getElementById('chart'));
      echarts.registerMap("china",echartsDS());
      myChart.setOption(option(...data));
    return ()=>{};
  },[])

  useEffect(()=>{
      const myChart = echarts.init(document.getElementById('chart'));
      echarts.registerMap("china",echartsDS());
      myChart.setOption(option(...data));
    return ()=>{}
  },[data])

  


  return(
    <PageHeaderWrapper title={false}>
      <div className={styles.bigBox}>
        {/*<img src="http://localhost:3002/static/index" alt="" />*/}
        <div className={styles.map1}>
        </div>
        <div className={styles.map2}>
        </div>
        <div className={styles.map3}>
        </div>
        <div id={'chart'} className={styles.chart}>
        </div>
      </div>
    </PageHeaderWrapper>
  )
}
export default connect(({estic})=>{return { estic }})(Page);










// import React from 'react';
// import { PageHeaderWrapper } from '@ant-design/pro-layout';
// import ProTable from '@/components/proTable'
// import {Upload,Button} from 'antd';
// import {UploadOutlined} from '@ant-design/icons';
// import style from './index.less'
// import {connect} from 'dva';
// const DomesticOut=(props)=>{
//   const {dispatch}=props;
//   const beforeUpload=(file)=>{
//       console.log(file);
//       dispatch({type:'upload/uploadImg',payload:{file:file}});
//       return false
//   }

//   return(
//    <PageHeaderWrapper title={false} style={{backgroundImage:`url(http://localhost:3002/downLoad/index)`}}>
//      {/*Hello --  Hello--国内疫情*/}
//      {/*<Upload beforeUpload={beforeUpload} showUploadList={false}>*/}
//      {/*  <Button icon={<UploadOutlined />} >Click to Upload</Button>*/}
//      {/*</Upload>*/}
//      {/*<Upload action={"/upload/index"} name="file" headers={{'Content-Type':`mulitipart/form-data`}}>*/}
//      {/*  <Button icon={<UploadOutlined />} >Click to Upload</Button>*/}
//      {/*</Upload>*/}

//       <ProTable>

//       </ProTable>

//    </PageHeaderWrapper>
//   )
// }
// export default  connect(({ upload })=> {
//   return upload;
// })(DomesticOut)
