import React, { Component } from "react";
import styled, { keyframes } from "styled-components";


import {theme} from "../colorTheme"
import {isGibberish} from "../utils.js"
import { runInThisContext } from "vm";

import Story from "./Data_Story"
import Feature from "./Data_Feature"


// import {devices} from "../devices";

const Wrapper = styled.div`
  position:relative;
  display:flex;  
  height:95vh;
  width:100vw;
`;

const LeftWrapper = styled.div`
  margin:auto 1vw;
  padding:2vw;
  // border-radius:2vw;
  // border: solid 1px ${theme.primaryColor};
  
  height:95vh;
  width:30vw;
  overflow:scroll;
`;

const RightWrapper = styled.div`
  margin:auto 1vw;
  padding:1vw;
  border-radius:2vw;
  border: solid 1px ${theme.primaryColor};
  
  height:95vh;
  width:68vw;

  overflow:scroll;
`;

const DroneListItem = styled.div`
  margin:1vw;
  padding:1vw;
  border-radius: 0.5vw;
  border: solid 1px ${theme.primaryColor};

  &:hover{
    transform: scale(1.04);

  }
`;

const ToggleButton = styled.div`
  background-color: ${props => props.flagged?'red':'green'};
`;

class Data_Drone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlagged:this.props.drone.isFlagged
    };
  }

  componentDidUpdate(){
    //this.setState({isFlagged:this.props.drone.isFlagged})
  }
  

updateDrone(body) {
    fetch('/drones/'+this.props.drone._id,
          {
            method: 'PUT',
            body:JSON.stringify(body),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Mode': "CORS"
            }
          }).then(response => response.json())
          .then(data => {
           this.setState({isFlagged:data.isFlagged})
           this.props.drone.isFlagged = data.isFlagged
           }
          );
  }

  render() {
    return (
      <div>
        <h2>{this.props.drone.name}</h2>
        <p>{JSON.stringify(this.props.drone.createdBy)}</p>
        {/* <ToggleButton 
        flagged={this.props.drone.isFlagged}>{this.props.drone.isFlagged? 'Containes Gibberish' : 'No Gibberish'}</ToggleButton> */}
        {this.props.drone.features.map((item, key)=>
            // <p><strong>{item.title}</strong> : {item.description}</p>
            <Feature feature={item}></Feature>
        )}
        {/* <p>{this.props.drone.mainStory && this.props.drone.mainStory.text}</p> */}
        {this.props.drone.mainStory && <Story filter ={this.props.filter} story={this.props.drone.mainStory}></Story>}

        {this.props.drone.subStories.map((item, key)=>
          <Story filter ={this.props.filter} story={item}></Story>
        )}
        
      </div>
    )
    
  }



  

}

export default Data_Drone;
