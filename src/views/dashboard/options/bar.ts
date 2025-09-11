import * as echarts from 'echarts'

let xdata = []
let ydata = []

for (let index = 9; index <= 17; index++) {
    xdata.push(`${index}:00`)
    let rannum = Math.round(Math.random() * 1500 + 500)
    ydata.push(rannum)
}
export default {
    title: {
        text: '在线学习人数'
    },
    grid:{
        bottom: "10%",
        right: "5%",
        top: "20%",
        left: "10%"
    },
    tooltip: {},
    xAxis: {
        data: xdata
    },
    yAxis: {},
    series: [
        {
            name: '学习人数',
            type: 'bar',
            data: ydata,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                ])
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#2378f7' },
                        { offset: 0.7, color: '#2378f7' },
                        { offset: 1, color: '#83bff6' }
                    ])
                }
            }
        }
      ]
}