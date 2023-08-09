import React, {useContext} from 'react';
import Histogram from "./histogram";
import LineChart from './line_chart';
import Box from '@mui/material/Box';


function MainView ({startyear, endyear, dimension}){
    switch (dimension){
        case 1: return <Histogram/>;
        case 2: return <LineChart/>;
        default: return (<Box><p>SELECT A DIMENSION TO BEGIN</p></Box>);
    }
        

    
}

export default MainView;