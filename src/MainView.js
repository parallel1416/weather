import React, {useContext} from 'react';
import Histogram_and_Piechart from "./Histogram&Piechart";
import LineChart from './line_chart';
import App from './App';
//import Slider from '@mui/material/Slider';

function MainView(){
    return (<>
    <Histogram_and_Piechart />
    <LineChart />
        </>);
}

export default MainView;