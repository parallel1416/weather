import React, {useContext} from 'react';
import Button from "@mui/material/Button";

function ControlPanel(){
    return (<>
        <div>
            <h3>Weather of Beijing</h3>
        </div>
        <div>
        <Button variant='contained'>Temperature Max</Button></div>
        <div>
        <Button variant='contained'>Temperature Flux</Button></div>
        <div>
        <Button variant='contained'>Precipitation</Button></div>
        <div>
        <Button variant='contained'>Conditions</Button></div>
        </>);
}

export default ControlPanel;