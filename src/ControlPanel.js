import React, {useContext} from 'react';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';

export function TimeSelector() {
  const [startyear, setStartyear] = React.useState('');
  const [endyear, setEndyear] = React.useState('');
  const handlestChange = (event) => {
    setStartyear(event.target.value);
  };
  const handleedChange = (event) => {
    setEndyear(event.target.value);
  };
  return (
    <div>
        From:
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={startyear}
          onChange={handlestChange}
          label="Year"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={2013}>2013</MenuItem>
          <MenuItem value={2014}>2014</MenuItem>
          <MenuItem value={2015}>2015</MenuItem>
          <MenuItem value={2016}>2016</MenuItem>
          <MenuItem value={2017}>2017</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
        </Select>
      </FormControl>
        To:
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={endyear}
          onChange={handleedChange}
          label="Year"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={2013}>2013</MenuItem>
          <MenuItem value={2014}>2014</MenuItem>
          <MenuItem value={2015}>2015</MenuItem>
          <MenuItem value={2016}>2016</MenuItem>
          <MenuItem value={2017}>2017</MenuItem>
          <MenuItem value={2018}>2018</MenuItem>
          <MenuItem value={2019}>2019</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

function ControlPanel(){
    const [dimension, setDimension]=React.useState('');
    const handleToggle=(event, newDimension)=>{
        setDimension(newDimension);
    };
    return (<>
        <Box
            sx={{width: 400, height: 800}}>
        <div>
            <h3>Weather of Beijing</h3>
        </div>
        <ToggleButtonGroup
            orientation='vertical'
            value={dimension}
            exclusive
            onChange={handleToggle}
            >
            <ToggleButton value="tempmax">Temperature Max</ToggleButton>
            <ToggleButton value="tempflux">Temperature Flux</ToggleButton>
            <ToggleButton value="precip">Precipitation</ToggleButton>
            <ToggleButton value="conditions">Conditions</ToggleButton>
        </ToggleButtonGroup>
        <TimeSelector/>
        <div><Button variant='contained'>Render</Button></div>
        </Box>
        </>);
}

export default ControlPanel;