import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import clsx from "clsx";
import MainView from "./MainView";
import ControlPanel from "./ControlPanel";
import DetailView from "./DetailView";

const VideoBackground = ({dimension}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    videoElement.loop = true;
    videoElement.play();

    return () => {
      videoElement.pause();
      videoElement.removeEventListener('ended', handleLoop);
    };
  }, []);

  const handleLoop = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };
  const getSource=(dimension)=>{
    switch(dimension){
      case 1: return "../public/Sunny.mp4"
      case 2: return "../public/Windy.mp4"
      case 3: return "../public/Rainy.mp4"
      case 4: return "../public/Cloudy.mp4"
    }
      
  }
  return (
    <div>
      <video ref={videoRef} onEnded={handleLoop}>
        <source src={getSource(dimension)} type="video/mp4" />
      </video>
    </div>
  );
};
export default function App() {

  const [startyear, setStartyear] = React.useState(2013);
  const [endyear, setEndyear] = React.useState(2023);
  const [dimension, setDimension]=React.useState(1);
  const setGlobalStart = (value) => {
    setStartyear(value);
  }
  const setGlobalEnd = (value) =>{
    setEndyear(value);
  }
  const setGlobalDim = (value) =>{
    setDimension(value);
  }
  return (
    <><VideoBackground dimension={dimension}/>
    <ControlPanel setStartyear={setGlobalStart} setEndyear={setGlobalEnd} setDimension={setGlobalDim}/>
    <MainView startyear={startyear} endyear={endyear} dimension={dimension}/>
    <DetailView /></>
  );
}


