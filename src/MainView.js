import React, {useContext} from 'react';
import Histogram from "./histogram";
import Slider from '@mui/material/Slider';

function MainView(){
    return (<>
        <Histogram/>
        <Slider defaultValue={50} valueLabelDisplay="on" />
        </>);
}

export default MainView;