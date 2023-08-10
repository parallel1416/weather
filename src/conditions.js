import React from 'react';
import * as echarts from "echarts"

class Conditions extends React.Component{
    constructor(){
        super()
    }
    componentDidMount(){
        
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option;
        setTimeout(function () {    
            option = {
                legend: {},
                title: {
                    text: 'Conditions'
                  },
                tooltip: {
                    trigger: 'axis',
                    showContent: false
                },
                dataset: {
                    source: [
                        ['product', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
                        ['Clear', 141, 177, 101, 105, 111, 123, 113, 136, 145, 134, 107],
                        ['Overcast', 3, 3, 6, 4, 1, 5, 4, 2, 4, 9, 22],
                        ['Cloudy', 152, 131, 180, 190, 199, 180, 186, 156, 129, 167, 178],
                        ['Rain/Snow', 69, 54, 78, 67, 54, 78, 62, 72, 87, 55, 58]
                    ]
                },
                xAxis: { 
                    type: 'category' 
                },
                yAxis: { 
                    name: 'Days',
                    gridIndex: 0 
                },
                grid: { top: '55%' },
                series: [
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: { focus: 'series' }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: { focus: 'series' }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: { focus: 'series' }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: { focus: 'series' }
                    },
                    {
                        type: 'pie',
                        id: 'pie',
                        radius: '30%',
                        center: ['50%', '25%'],
                        emphasis: {
                            focus: 'self'
                        },
                    label: {
                        formatter: '{b}: {@2012} ({d}%)'
                    },
                    encode: {
                        itemName: 'product',
                        value: '2012',
                        tooltip: '2012'
                    }
                    }
                ]
            };

            myChart.on('updateAxisPointer', function (event) {
                const xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    const dimension = xAxisInfo.value + 1;
                    myChart.setOption({
                        series: {
                            id: 'pie',
                            label: {
                                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                            },
                        encode: {
                            value: dimension,
                            tooltip: dimension
                        }
                        }
                    });
                }
            });

            myChart.setOption(option);
        });
        // 使用刚指定的配置项和数据显示图表。
        option && myChart.setOption(option);
        
    }

    render(){
        return (
            <div className='ee'>
                 <div id="main" style={{width: "600px",height:"500px"}}></div>
            </div>
        )
    }
}

export default Conditions