import React from 'react';
import Button from "@mui/material/Button";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';


function ControlPanel ({handleToggle}){

    const handleRender=()=>{

    }
    return (<>
        <Box
            sx={{}}>
        <div>
            <h3>Weather of Beijing</h3>
        </div>
        <ToggleButtonGroup
            orientation='vertical'
            //value={dimension}
            exclusive
            onChange={(e) => handleToggle(e.target.value)}
            >
            <ToggleButton value={1}>Temperature Max</ToggleButton>
            <ToggleButton value={2}>Temperature Flux</ToggleButton>
            <ToggleButton value={3}>Precipitation</ToggleButton>
            <ToggleButton value={4}>Conditions</ToggleButton>
        </ToggleButtonGroup>
        <div><Button variant='contained' onClick={handleRender}>Render</Button></div>
        </Box>
        </>);
}

export default ControlPanel;