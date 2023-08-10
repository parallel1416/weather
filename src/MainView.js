import React from 'react';
import Histogram_and_Piechart from './Histogram&Piechart'
import LineChart from './line_chart';
import Box from '@mui/material/Box';


function MainView ({date, dimension}){
    let content;
    switch (dimension){
        case 1: content=<Histogram_and_Piechart date={date}/>;
        case 2: content=<LineChart date={date}/>;
        default: content=<Box><p>SELECT A DIMENSION TO BEGIN</p></Box>;
    }
    return <div>{content}</div>;

    
}

export default MainView;