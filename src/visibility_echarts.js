import React from 'react';
import * as echarts from "echarts"
import Data_json from './data_json';

class Visibility extends React.Component{
    constructor(){
        super()
    }
    componentDidMount(){
        
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 数据处理
        let date = [];
        let data = [];
        for (var i in Data_json){
            date.push(Data_json[i].datetime);
            data.push(Data_json[i].visibility);
        }
        
        // 指定图表的配置项和数据
        var option;     
        
        option = {
            tooltip: {
            trigger: 'axis',
            position: function (pt) {
            return [pt[0], '10%'];
            }
            },
            title: {
                left: 'center',
                text: 'Visibility'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                type: 'value',
                name: 'Visibility/km',
                boundaryGap: [0, '100%']
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 10
                },
                {
                    start: 0,
                    end: 10
                }
            ],
            series: [
                {
                    name: 'Visibility/km',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }
                        ])
                    },
                    data: data
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        option && myChart.setOption(option);
        
    }

    render(){
        return (
            <div className='ea'>
                 <div id="main" style={{width: "600px",height:"400px"}}></div>
            </div>
        )
    }
}

export default Visibility;