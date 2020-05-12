import React, { Component } from "react";
import styled from "styled-components";
import Drone from "./drone/Drone"
import NewStory from "./story/NewStory"
import LoadingWidget from "./LoadingWidget";
import {isGibberish} from "../utils.js"
import {devices} from "../devices.js"
import Header from "./commons/header/Header"
import {theme} from "../config/colorTheme";



const Wrapper = styled.div`
  width:100%;
  position:relative;
`;

const ContentWrapper = styled.div`
  margin:auto;
  position:relative;

  @media ${devices.mobile} {
    flex-direction:column;
    height:auto;
  }

`;

const DroneContainer = styled.div`
  position:relative;
  margin:auto;
  height:54vh;
  overflow:visible;
  
`;

const RowWrapper = styled.div`
  display:flex
  justify-content:space-around;
  flex-direction:column;

  @media ${devices.mobile} {
    margin:auto;
  }

`;

const Row = styled.div`
  width:50vw;

  @media ${devices.mobile} {
    width:95vw;
  }
`;

const RowHeader = styled.h3`
font-size: 1.5vw
margin: 1vw;
font-family: 'Nunito';
font-weight:700;
color: ${theme.primaryColor};

@media ${devices.mobile} {
  padding-top:4vw;
  font-size: 5vw;
}
`;

const Button = styled.button`
border-radius:0.5vw;
border: solid 1px ${theme.primaryColor};
background-color:#ffffff;
min-width:7vw;
height:2.3vw;
max-height:2.3vw;
transition: transform .3s;
cursor: pointer;
text-align: center;
vertical-align: middle;

&:hover{
  background-color:${theme.secondaryColor};
  color:#ffffff;
  border: solid 1px ${theme.primaryColor};
}
font-size: 1.2vw
margin: auto 1vw;
font-family: "Nunito";
font-weight: 900
color:${theme.primaryColor};
outline:none;

@media ${devices.mobile} {
  width:20vw;;
  height:auto;
  max-height:10vw;
  font-size: 4vw
  
}
`;



const FeatureSet = styled.div`
  width:50vw;
  display:flex
  justify-content:space-around;
  margin:10px;

  @media ${devices.mobile} {
    margin:auto;
    width:90vw;
  }
`;

const OverlayFeatureSet = styled.div`
  width:25vw;
  display:flex
  justify-content:space-around;
  margin:10px;
`;

const FeatureWrapper = styled.div`
  margin-bottom: 5px;
`;

var LEFT_FACTOR = 26;
var TOP_FACTOR = 13;
var LEFT_0 = 6.5;
var TOP_0 = 6.5;

const STORY_PROMPT_TASK = "Give your dream drone a cool name, and write a story about it."
const STORY_PROMPT_DESCRIPTION = "Where does it fly? What does it do there and why?"



class AddStoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drone: null

    };
  }

  componentDidMount() {

    document.title="Dream Drone";
    window.scrollTo(0,0);
    //fetch the drone data using id
    fetch("/drones/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        var drone = data;
        if (!drone.mainStory) {
          fetch('/stories/',
            {
              method: 'POST',
              body: JSON.stringify({ text: "", createdBy:drone.createdBy._id }),
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Mode': "CORS"
              }
            }).then(response => response.json())
            .then(data => {
              drone.mainStory = data;
              this.setState({ drone: drone })
              this.updateDrone();
            }
            );
        } else {
          this.setState({ drone: drone })
          this.updateDrone();
        }
      });
  }

  updateDrone() {
    fetch('/drones/' + this.state.drone._id,
      {
        method: 'PUT',
        body: JSON.stringify(this.state.drone),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Mode': "CORS"
        }
      }).then(response => response.json())
      .then(data => { }
      );
  }

  updateStory(story) {

    fetch('/stories/' + this.state.drone.mainStory._id,
      {
        method: 'PUT',
        body: JSON.stringify({ text: story }),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Mode': "CORS"
        }
      }).then(response => response.json())
      .then(data => {
      }
      );
  }

  render() {
    if (this.state.drone == null) return <LoadingWidget></LoadingWidget>;

    return (
      <Wrapper>
         <Header text={"2. Give a Cool Name and Tell a Story"} 
         disableNext={this.isNextDisabled()}
         onNextCallback={this.getCallbackFunction()} 
         onBackCallback={()=>this.props.history.push('../superpowers/' + this.state.drone._id)}>
        </Header>
        <ContentWrapper>
          <DroneContainer>
            <Drone editable={false} drone={this.state.drone}></Drone>
          </DroneContainer>
          <NewStory name={this.state.drone.name} story={this.state.drone.mainStory.text} callback={this.callbackhandler.bind(this)} />
        </ContentWrapper>
      </Wrapper>
    )
  }

  isNextDisabled(){
    return !(this.state.drone.name && this.state.drone.mainStory.text && this.state.drone.mainStory.text.length > 0)
  }

  getCallbackFunction() {
    if (this.state.drone.name && this.state.drone.mainStory.text && this.state.drone.mainStory.text.length > 0) {
      return () => { this.props.history.push('../react/' + this.state.drone._id) }
    }
    return null
  }

  callbackhandler = (data) => {
    var drone = this.state.drone;
    drone.name = data.name;
    drone.mainStory.text = data.story;

    this.setState({ drone: drone })
    this.updateDrone();
    this.updateStory(data.story)
    

  }

}



export default AddStoryView;
