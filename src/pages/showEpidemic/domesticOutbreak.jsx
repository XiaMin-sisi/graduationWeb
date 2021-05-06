import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@/components/proTable'
import {Upload,Button} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import style from './index.less'
import {connect} from 'dva';
const DomesticOut=(props)=>{
  const {dispatch}=props;
  const beforeUpload=(file)=>{
      console.log(file);
      dispatch({type:'upload/uploadImg',payload:{file:file}});
      return false
  }

  return(
   <PageHeaderWrapper title={false} style={{backgroundImage:`url(http://localhost:3002/downLoad/index)`}}>
     {/*Hello --  Hello--国内疫情*/}
     {/*<Upload beforeUpload={beforeUpload} showUploadList={false}>*/}
     {/*  <Button icon={<UploadOutlined />} >Click to Upload</Button>*/}
     {/*</Upload>*/}
     {/*<Upload action={"/upload/index"} name="file" headers={{'Content-Type':`mulitipart/form-data`}}>*/}
     {/*  <Button icon={<UploadOutlined />} >Click to Upload</Button>*/}
     {/*</Upload>*/}

      <ProTable>

      </ProTable>

   </PageHeaderWrapper>
  )
}
export default  connect(({ upload })=> {
  return upload;
})(DomesticOut)
