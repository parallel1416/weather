import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import clsx from "clsx";
import { styled } from "@mui/system";
import MainView from "./MainView";
import ControlPanel from "./ControlPanel";
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


export function VideoBackground ({dimension}) {
  const videoRef = useRef(null);
  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.loop = true;
    videoElement.muted =true;
    videoElement.play();

    return () => {
      videoElement.pause();
      videoElement.removeEventListener('ended', handleLoop);
    };
  }, []);

  const handleLoop = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.muted = true;
    videoRef.current.play();
  };
  const getSource=({dimension})=>{
    switch(dimension){
      case 1: return "../public/Sunny.mp4"
      case 2: return "../public/Windy.mp4"
      case 3: return "../public/Rainy.mp4"
      case 4: return "../public/Cloudy.mp4"
    }
      
  }
  return (
    <div>
      <video ref={videoRef} 
        onEnded={handleLoop} 
        autoplay="true"
        muted="muted">
        <source src={getSource(dimension)} type="video/mp4" />
      </video>
    </div>
  );
};


export default function App() {

  const [dimension, setDimension]=useState(1);
  const [date, setDate] = useState([
    dayjs('2013-01-01'),
    dayjs('2023-08-01'),
  ]);

  return (
    <div className='root'>
      <div><VideoBackground dimension={dimension}/></div>
      
      <div className='App-header'><h3>Weather of Beijing</h3></div>
      <div className='column'>
        <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem component="DateRangePicker">
            <DateRangePicker
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </DemoItem>
        </LocalizationProvider></div>
        <div><ControlPanel handleToggle={setDimension}/></div>
      </div>
      
      <div className='column.right'><MainView date={date} dimension={dimension}/></div>
    </div>
  );
}
