import './App.css';
import React from 'react';
import clsx from "clsx";
import MainView from "./MainView";
import ControlPanel from "./ControlPanel";
import DetailView from "./DetailView";


function App() {
  return <div>
      <div class="controlPanel"><ControlPanel/></div>
      <div class="mainView"><MainView/></div>
      <div class="detailView"><DetailView/></div>
  </div>;
}

export default App;
