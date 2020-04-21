import React, { Component } from "react";
import styled from "styled-components";
import {theme} from "../config/colorTheme";

import DroneStory from "./DroneStory"
import LoadingWidget from "./LoadingWidget";




const ThankYouText = styled.h1`
  font-size: 5vw
  margin:auto;
  margin-top:15vh;
  font-family: "Roboto";
  font-weight: 900
  color:${theme.accentColor};
`;

const Message = styled.p`
font-size: 1.5vw
 
  margin-bottom:1vh;
  margin-top:6vh;
  font-family: "Roboto";
  font-weight: 400;
  // color:${theme.primaryColor};
  text-align:center;
`;




export default class DoneView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drones:null
    };
  }



  componentDidMount(){
    document.title="Dream Drone"
    fetch("/random/drones/99")
      .then(response => response.json())
      .then(data => {
        this.setState({drones:data})
        
      });
  }



  render() {
    return (
      <div>
        <ThankYouText>Done! </ThankYouText>
        <Message>Thanks again for you time.</Message>
        {/* {this.state.drones == null && <LoadingWidget></LoadingWidget>}
        {this.state.drones != null && this.state.drones.map((item, key) => 
            !item.isFlagged && <DroneStory drone={item}></DroneStory>
          )
        } */}
      </div>
    )
    return null;
  }
}

