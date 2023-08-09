import React, {useContext} from 'react';
import Histogram from "./histogram";
import LineChart from './line_chart';
import App from './App';
//import Slider from '@mui/material/Slider';

function MainView(){
    return (<>
        <LineChart/>
        <Histogram />
        </>);
}

export default MainView;