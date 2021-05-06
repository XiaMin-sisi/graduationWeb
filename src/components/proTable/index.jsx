import React, { useEffect, useState } from 'react';
import style from './index.less';
import {Table,Row,Col,Form,Input,Select,DatePicker,Button} from 'antd'

const Item=Form.Item;
const { RangePicker } = DatePicker;
const ProTable=(props)=>{
  //属性示例
 /* const [form]=Form.useForm();
  const fieldItems=[
    {type:"input",label:"姓名",placeholder:"请输入。。",name:"userName"},
    {type:"select",label:"姓名",placeholder:"请输入。。",value:[{label:"张三",value:1},{label:"李四",value:2}],name:"asp"},
    {type:"date",label:"姓名",name:"java"},
    {type:"dateRange",label:"姓名",name:"php"}
    ];
  const topButton=(row)=>{
    return [
      <Button type={'primary'} onClick={()=>{console.log(row.userName)}} key={1}>姓名</Button>,
      <Button type={'primary'} onClick={()=>{console.log(row.chemicalsId)}} key={2}>年纪</Button>
    ]
  };
  const columns=[
    {
      title: '操作时间',
      dataIndex: 'time',
      key: 'time',
      render: text => {
        return <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>;
      },
    },
    {
      title: '操作人',
      dataIndex: 'userName',
      key: 'userName'
    }
  ];
  const dataSource=[
    {time:1618898336053,userName:"夏敏",status:"2",chemicalsName:"苹果",chemicalsId:"001"},
    {time:1618898336053,userName:"夏敏",status:"2",chemicalsName:"苹果",chemicalsId:"002"}
  ]
  const rowKey="chemicalsId";
  const selectType="radio";
  const totalCount=300;
  const onFinish=(params)=>{console.log(params)};*/

  let {
    form,//表单实例对象
    dataSource=[],//数据源,接受一个数组
    totalCount=0,//数据总条数，接受一个数字
    onFinish=({})=>{},//获取数据源的方法，接受一个方法。参数为搜索条件和页码条件
    columns=[],//表格的列表格式，接受一个数组
    fieldItems=[],//筛选条件，表格上方的搜索条件，接受一个数组，目前支持4种表单元素。input select date dateRange
    selectType="",//表格的可选类型 radio checkbox 默认不可选择
    topButton=()=>[],//列表头部的操作按钮，接受一个方法，返回一个数组。参数为所选择的rowList
    rowKey="",//表格的唯一标识，
    isPagination=true,//是否需要页码
  }=props

  //如果表格可以选择，用来保存所选择的行数据
  const [rowList,setRowList]=useState([]);

  //保存当前的pageSize、pageNum 不要用state保存，会有警告就很奇怪
  let pageSize=10;
  let pageNum=1;

  //页面一开始加载时调一次接口查询数据
  useEffect(()=>{
     search();
     return ()=>{};
  },[])

  //生成表单
  const createForm=()=>{
    if(fieldItems.length){
     return  fieldItems.map((item,index)=>{
        let formItem= <Input placeholder={item.placeholder}/>
        if(item.type=="select"){
          formItem=(
            <Select placeholder={item.placeholder}>
              {
                item.value.map(val=>{return (<Select.Option value={val.value} key={val.value}>{val.label}</Select.Option>)})
              }
            </Select>
          )
        }
        if(item.type=='date'){
          formItem=(
            <DatePicker picker={item.picker||"date"}  style={{width:"100%"}}></DatePicker>
          )
        }
        if(item.type=="dateRange"){
            formItem=<RangePicker picker={item.picker||"date"}  style={{width:"100%"}} />
        }
        return(
          <Col  {...formItemFormat} key={index}>
            <Item
              style={{width:"100%"}}
              label={item.label}
              name={item.name}
            >
              {formItem}
            </Item>
          </Col>
        )

      })
    }
    else {
      return null;
    }
  }

  //生成顶部操作按钮
  const createButton=()=>{
    if(selectType=="radio")
      return topButton(rowList[0]||{});
    else
      return topButton(rowList);
    return  topButton({})
  }

  //查询操作
  const search=()=>{
      if(fieldItems.length>0)
        onFinish({pageSize,pageNum,...form.getFieldsValue()});
      else
        onFinish({pageSize,pageNum});
  }

  //选中 / 取消 表格某一项的回调
    const onSelect=(row)=>{
    if(selectType=="radio"){
      setRowList([row]);
    }
    if(selectType=="checkbox")
    {
      let arr=rowList.filter((val)=>{ return val[rowKey]!=row[rowKey]});
      if(arr.length==rowList.length){
        setRowList([...rowList,row]);
        console.log([...rowList,row]);
      }
      else{
        setRowList([...arr]);
        console.log([...arr]);
      }
    }
  }

  //全选的回调
    const onSelectAll=(isAll,selectList)=>{
    if(isAll){
      console.log([...new Set([...selectList,...rowList])])
      setRowList([...new Set([...selectList,...rowList])])
    }
    else {
      let arr=rowList.filter((val)=>{
            !selectList.some((item)=>  item[rowKey]==val[rowKey])
      })
      console.log(arr)
      setRowList(arr);
    }
  }

  //行属性--点击、移入..
    const onRow=(row)=>{
        return {
          onClick:()=>{onSelect(row)}
        }
    }

  //配置
    const gutterSize={ xs: 8, sm: 16, md: 24, lg: 32 }
    const formItemFormat = { xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6};

    //表格选择配置
    const rowSelection= {
      type:selectType,
      onSelect:onSelect,
      onSelectAll:onSelectAll,
      selectedRowKeys:rowList.map(item=>item[rowKey])
    }

    //页码配置
    const pagination={
      total:totalCount,
      showSizeChanger: true,
      showQuickJumper:true,
      onChange:(page,size)=>{
          pageNum=page;
          pageSize=size;
          search();
      },
      showTotal:(total)=>{return `共 ${total} 条`},
    }

  return(
    <>
      {/*----筛选条件----*/}
      {fieldItems.length>0?
        <Form className={style.formBox} labelCol={{span:5}} wrapperCol={{span:19}} form={form}>
          <Row gutter={gutterSize} className={style.formRow}>
            {createForm()}
          </Row>
          <Row gutter={gutterSize} className={style.formRow}>
            <Col  span={8} offset={16} style={{textAlign:"right"}}>
              <Button style={{backgroundColor:"white",color:"black",marginRight:"16px"}} onClick={form.resetFields()}>重置</Button>
              <Button type={'primary'} onClick={search}>查询</Button>
            </Col>
          </Row>
        </Form>
        :null
      }
      {/*----筛选条件----*/}


      <Row style={{marginTop:16,backgroundColor:"white"}}>

        {/*额外操作*/}

        {topButton().length?
          <div className={style.topButton}>
            {createButton()}
          </div>
          :null
        }

        {/*表格*/}
        <Row style={{width:"100%"}}>
          <Table columns={columns}
                 dataSource={dataSource}
                 rowKey={rowKey}
                 rowSelection={selectType?rowSelection:null}
                 onRow={onRow}
                 pagination={isPagination?pagination:false}
                 style={{width:"100%"}}
          />
        </Row>

      </Row>

    </>
  )
};
export default ProTable;
