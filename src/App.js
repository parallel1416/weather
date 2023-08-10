import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import Histogram_and_Piechart from './Histogram&Piechart'
import LineChart from './line_chart';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Visibility from './visibility_echarts';
import Uvindex from './uvindex';
import UvindexPie from './uvindexPie';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Conditions from './conditions';
import Select from '@mui/material/Select';


export default function App() {

  const [dimension, setDimension]=useState(3);
  const [startyear, setStartyear] = useState(2013);
  const [endyear, setEndyear] = useState(2023);
  /*const [date, setDate] = useState([
    dayjs('2013-01-01'),
    dayjs('2023-08-01'),
  ]);*/
  let content;
  switch ({dimension}){
    case 1: 
      content=<Histogram_and_Piechart startyear={startyear} endyear={endyear}/>;
      break;
    case 2: 
      content=<LineChart startyear={startyear} endyear={endyear}/>;
      break;
    case 3:
      content=<div><Uvindex/><UvindexPie/></div>;
      break;
    case 4:
      content=<Visibility/>;
      break;
    default:
      content=<Histogram_and_Piechart startyear={startyear} endyear={endyear}/>;
      break;
  }


  return (
    <><div className='root'>

      <div className='App-header'><h3>Weather of Beijing</h3></div>
      <div className='column'>
        <div>
          From:
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={startyear}
              onChange={(e) => setStartyear(e.target.value)}
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
              onChange={(e) => setEndyear(e.target.value)}
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
        <ToggleButtonGroup
          orientation='vertical'
          value={dimension}
          exclusive
          onChange={(e) => setDimension(e.target.value)}
        >
          <ToggleButton value={1}>Temperature Max</ToggleButton>
          <ToggleButton value={2}>Temperature Flux</ToggleButton>
          <ToggleButton value={3}>Uv Index</ToggleButton>
          <ToggleButton value={4}>Conditions</ToggleButton>
        </ToggleButtonGroup>
      </div>

    </div>
      <div className='column.middle'>
        <Uvindex/>

      </div>
      </>
  );
}

/*
        <Histogram_and_Piechart startyear={startyear} endyear={endyear}/>;
        <UvindexPie/>
        
        <Visibility/>
        <LineChart startyear={startyear} endyear={endyear}/>
*/