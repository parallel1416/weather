<<<<<<< Updated upstream
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

=======
import React, {useContext} from 'react';
import Histogram from "./histogram";
import Slider from '@mui/material/Slider';

const MainView=(startyear, endyear, dimension)=>{
    return (<>
        <div><Histogram/></div>
        </>);
}

>>>>>>> Stashed changes
export default MainView;