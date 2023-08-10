import React from "react";
import * as echarts from 'echarts';
import { alignProperty } from "@mui/material/styles/cssUtils";

export default class UvindexPie extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        var myChart=echarts.init(document.getElementById('ech'));
        
        //指定图表的配置项和数据
        var option={
            title:{
                text:'Maximal UV Index Day Count'
            },
            tooltip:{},
            legend:{
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            series:[{
                name: 'Max UV Index / day',
                type: 'pie',
                radius: [60, 250],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data: [
                    {
                        "value": 19,
                        "name": "2013"
                    },
                    {
                        "value": 20,
                        "name": "2014"
                    },
                    {
                        "value": 16,
                        "name": "2015"
                    },
                    {
                        "value": 22,
                        "name": "2016"
                    },
                    {
                        "value": 25,
                        "name": "2017"
                    },
                    {
                        "value": 16,
                        "name": "2018"
                    },
                    {
                        "value": 23,
                        "name": "2019"
                    },
                    {
                        "value": 26,
                        "name": "2020"
                    },
                    {
                        "value": 21,
                        "name": "2021"
                    },
                    {
                        "value": 25,
                        "name": "2022"
                    },
                    {
                        "value": 32,
                        "name": "2023"
                    }
                ]
            }]
        };

        option && myChart.setOption(option);
    }

    render(){
        return (
            <div alignProperty="right">
                <div id="ech" style={{ width: "1000px", height: "600px"}}>
                </div>
            </div>
        )
    }
}
