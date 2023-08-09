import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import clsx from "clsx";
import { styled } from "@mui/system";
import MainView from "./MainView";
import ControlPanel from "./ControlPanel";
import DetailView from "./DetailView";

const VideoBackground = ({dimension}) => {
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
      <video ref={videoRef} 
        onEnded={handleLoop} 
        autoplay="true"
        muted="muted">
        <source src={getSource(dimension)} type="video/mp4" />
      </video>
    </div>
  );
};

const useStyles = styled(theme => ({
  root: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
  },
  view: {
      border: '1px solid black',
      borderRadius: '5px',
  },
  controlPanel: {
      position: 'absolute',
      top: 70,
      height: 100,
      left: 70,
      width: 100,
  },
  mainView: {
      position: 'absolute',
      top: 70,
      bottom: 400,
      left: 180,
      right: 70,
  },
  detailView: {
      position: 'absolute',
      bottom: 70,
      height: 320,
      left: 180,
      right: 70,
  },
}))

export default function App() {

  const [startyear, setStartyear] = React.useState(2013);
  const [endyear, setEndyear] = React.useState(2023);
  const [dimension, setDimension]=React.useState(1);
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <VideoBackground dimension={dimension}/>
    <div className={clsx(classes.view, classes.controlPanel)}><ControlPanel handleToggle={setDimension} handlestChange={setStartyear} handleedChange={setEndyear}/></div>
    <div className={clsx(classes.view, classes.mainView)}><MainView startyear={startyear} endyear={endyear} dimension={dimension}/></div>
    <div className={clsx(classes.view, classes.detailView)}><DetailView /></div>
    </div>
  );
}
