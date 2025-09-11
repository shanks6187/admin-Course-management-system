import * as echarts from 'echarts'
export default {
    title:{
        text:"课程分类",
        
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        left: 'center',
        bottom:0
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [{}]
        }
    ]
};

