import React, { useEffect, useRef, useState, useDebugValue } from 'react';
import { Button, Col, Row, Slider } from 'antd'
import * as echarts from 'echarts';
import styled from 'styled-components';
import bar from '@/views/dashboard/options/bar'
import line from '@/views/dashboard/options/line'
import pie from '@/views/dashboard/options/pie'
import { CategoryGet, CategoryType, whereParms } from '@/api/course';

export interface IDashboardProps {

}

export default function Dashboard(props: IDashboardProps) {

  useEffect(() => {
    var myChart = echarts.init(document.getElementById('bar'));
    var lineChart = echarts.init(document.getElementById('line'));
    var pieChart = echarts.init(document.getElementById('pie'));


    CategoryGet({}).then(res=>{
      console.log(res);
      let list:CategoryType[] = res.data.results.filter((item:CategoryType)=>item.fatherId=='0-01')
      console.log(list);
      let data = list.map(item=>{
        return { value:Math.round(Math.random()*100+200),name:item.cateName}
      }) 
      
      pie.series[0].data=data
      pieChart.setOption(pie);
    })

    // 绘制图表
    myChart.setOption(bar);
    lineChart.setOption(line);
    setTimeout(() => {
      myChart.resize()
      lineChart.resize()
      pieChart.resize()
    }, 100);


    

    const handleSize = ()=>{
      myChart.resize()
      lineChart.resize()
      pieChart.resize()
    }
    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  }, [])


  return (
    <div>
      <Row>
        <Col span={24}>
          <Chart id='line'></Chart>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Chart id='bar'>
          </Chart>
        </Col>
        <Col span={12}>
          <Chart id='pie'></Chart>
        </Col>
      </Row>
    </div>
  );
}


const Chart = styled.div`
  height:300px;
  border:1px solid #f5f5f5;
`;
