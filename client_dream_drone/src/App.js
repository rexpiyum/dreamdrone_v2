import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from "react-router-dom";


import Root from "./components/Root";
import Features from "./components/AddFeaturesView";
import Story from "./components/AddStoryView";
import Select from "./components/SelectStoryView";
import StartView from "./components/StartView";
import FinishView from "./components/FinishView";
import DoneView from "./components/DoneView";
import ConsentView from "./components/ConsentView";
import TestView from "./components/TestView";
import DataView from "./components/DataView";
import AllStroriesView from "./components/AllStoriesView";
import PrintView from "./components/PrintView";
import ReactToStoryView from "./components/ReactToStoryView";
import LandingPage from "./components/landing/LandingPage";



function App() {
  return (
    <div className="App">
      <Switch>
          {/* <Route exact path="/" component={StartView} /> */}
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/superpowers/:id"
            component={Features}
          />
          <Route
            path="/story/:id"
            component={Story}
          />
          <Route
            path="/select/:id"
            component={Select}
          />
          <Route
            path="/react/:id"
            component={ReactToStoryView}
          />
          <Route
            path="/complete/:user_id"
            component={FinishView}
          />
          <Route
            path="/done"
            component={DoneView}
          />
          <Route
            path="/consent/:view?"
            component={ConsentView}
          />
          <Route
            path="/test"
            component={TestView}
          />
          <Route
            path="/data"
            component={DataView}
          />
          <Route
            path="/allstories/:user_id?"
            component={AllStroriesView}
          />
          <Route
            path="/print/"
            component={PrintView}
          />
        </Switch>
    </div>
  );
}

export default App;
