import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import Feature from "./ReadOnlyFeature"

import logo from '../drone.png';

import {isGibberish} from "../utils.js"

import {theme} from "../colorTheme"

import {devices} from "../devices";

const DroneWrapper = styled.div`
  position:relative;
  display:flex;
  margin:auto 1vw;
  padding:1vw;
  border-radius:2vw;
  border: solid 2px ${theme.primaryColor};
  transition: transform .8s;
  height:80vh;
  width:80vw;
  &:hover{
    transform: scale(1.02);
  }
   margin:1vh;

   @media ${devices.mobile} {
    flex-direction:column;
    height:auto;
    width:70vw;
    margin:3vw auto;
  }
`;

const DroneImage = styled.img`
  height: 30vw;
  width: 30vw;
  max-height:85vh;
  max-width:85vh;
  margin: auto;
  margin-left:2vw

  @media ${devices.mobile} {
    height:65vw;
    width:65vw;
    max-height:75vh;
    max-width:75vh;
    margin-top:2vh;
  }
`;

const Overlay = styled.div`
position:absolute;
top:0;
left:0;
height: 25vw;
  width: 25vw;
  max-height:85vh;
  max-width:85vh;
`;

const FixedFeatureWrapper = styled.div`
position:absolute;
top: ${props => props.top}vw;
left: ${props => props.left}vw;
margin:auto;
`;

const DroneName = styled.h2`
font-size: 2.2vw;
  font-family: "Roboto";
  font-weight: 400;
  text-align:center;

  @media ${devices.mobile} {
    font-size: 5vw;
  }
`;

const StoryWrapper = styled.div`
width: 40vw;
overflow:scroll;

@media ${devices.mobile} {
  height:auto;
  width:70vw;
  max-height:75vh;
  max-width:75vh;
  margin:auto;


}
`;

const MainStory = styled.div`
  font-size: 1.2vw;
  font-family: "Roboto";
  font-weight: 400;
  resize: none;
  resize: none;
  border: none;
  outline: none;
  text-align:center;
  height:auto;
  margin-top:2vh;
  width: 35vw;
  border-radius:1vw;
   border: solid 1px ${theme.primaryColor};
   padding:2vw;

   @media ${devices.mobile} {
    width: 60vw;
    margin:auto;
    font-size: 3vw;
    padding:1vw;
  }
`;

const SubStory = styled.div`
  font-size: 1.2vw;
  font-family: "Roboto";
  font-weight: 400;
  resize: none;
  resize: none;
  border: none;
  outline: none;
  text-align:center;
  width:35vw;
  background-color:#D9D9D9;
  margin: 2vh 0;
  border-radius: 1vw;
  padding:1vw 2vw;

  @media ${devices.mobile} {
    width: 60vw;
    margin:auto;
    font-size: 3vw;
    padding:1vw;
  }
`;

const WriteButton = styled.button`
border-radius:.8vw;
border: solid 2px #ffffff;
background-color:${theme.secondaryColor};
height:3vw;
min-width:15vw;
max-height:3vw;
transition: transform .3s;
cursor: pointer;
text-align: center;
vertical-align: middle;
overflow:scroll;
padding:0.5vw;
margin: 2vh auto;
font-size: 1.2vw
font-family: "Nunito";
font-weight: 700
color:#ffffff;
outline:none;

@media ${devices.mobile} {
  width: auto;
  height:auto;
  max-height:none;
  margin:2vw auto;
  font-size: 5vw;
  padding:2vw;
}
`;

const appear = keyframes`
  from {
      opacity: 0;
      
  }
  to {
      opacity: 1;
      
  }
`
const StoryInputWrapper = styled.div`
position:relative;
  background-color: #D9D9D9;
  border: solid 1px #BABABA;
  margin: 5vh auto;
  border-radius: 1vw;
  animation: ${appear} 1s ease;

  @media ${devices.mobile} {
    width: 60vw;
    margin:5vw auto;
    font-size: 3vw;
    padding:1vw;
  }
`;

const StoryInput = styled.textarea`
font-size: 1.3vw
font-family: "Nunito";
font-weight: 500
width:35vw;
height: 30vh;
background-color:#D9D9D9;
resize: none;
  border: none;
  overflow: auto;
  outline: none;
  text-align:center;

  @media ${devices.mobile} {
    
    font-size: 3vw;

  }
`;

const StoryPrompt = styled.p`
font-size: 1.3vw
 
 
  font-family: "Roboto";
  font-weight: 700;
  padding:2vw;
 
  text-align:center;

  @media ${devices.mobile} {
    
    font-size: 3vw;

  }
`;

const AutoSave = styled.p`
font-size: 1vw
font-family: "Nunito";
font-weight: 500;
text-align:right;
margin-right:1vw;
color:#008920
`;



const Arrow = styled.div`
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 20px solid ${props => props.position == 1 ? '#efefef' : 'transparent'};
  border-right: 20px solid ${props => props.position == 1 ? 'transparent' : '#efefef'};
  border-top: 20px solid transparent;
  border-bottom: 20px solid #efefef;
  left: ${props => props.position == 0 ? 10 : props.position == 1 ? 50 : 90}%;
  top: -40px;
`;

const Dummy = styled.div``;



const STORY_PLACEHOLDER = "Add your story";

const STORY_PROMPT = "Add your own story about this drone. Where does it fly? What does it do there and why?"

var LEFT_FACTOR = 22;
var TOP_FACTOR = 11;
var LEFT_0 = 7.4;
var TOP_0 = 9.4;

var characterInputCount = 0;

class DroneStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      small: !props.selected,
      newSubStoryID: null,
      storyZoom: false,
      renderStoryInput: false,
      droneStory: "",
      newStories:{},
      autoSave:""
    };
  }
  componentDidMount() {
    
  }

  componentDidUpdate() {
    if(window.innerWidth < 800){
      LEFT_FACTOR = 60;
      TOP_FACTOR = 28;
      LEFT_0 = 7.2;
      TOP_0 = 9.6;
    }
    if (this.state.renderStoryInput) {
      this.end.scrollIntoView({ behavior: "smooth" });
    }
  }

  componentWillReceiveProps() {
    if(window.innerWidth < 800){
      LEFT_FACTOR = 60;
      TOP_FACTOR = 28;
      LEFT_0 = 7.2;
      TOP_0 = 9.6;
    }
    this.setState({ renderStoryInput: false, newSubStoryID: null, autoSave:"≥" })
  }

  render() {
    if(window.innerWidth < 800){
      LEFT_FACTOR = 60;
      TOP_FACTOR = 28;
      LEFT_0 = 7.2;
      TOP_0 = 9.6;
    }
    return (
      <div>
        <DroneWrapper ref="wrapper"
          small={this.state.small}
          onBlur={() => this.updateSubStory()}
        >
          <DroneImage
            small={this.state.small} src={logo} alt="logo" ></DroneImage>
          <Overlay small={this.state.small}>
            {this.props.drone.features.map((item, key) =>
              <FixedFeatureWrapper
                top={TOP_0 + TOP_FACTOR * (key - (key % 2)) / 2}
                left={LEFT_0 + LEFT_FACTOR * (key % 2) / 2}
              >
                <Feature title={item.title} description={item.description} index={key}></Feature>
              </FixedFeatureWrapper>
            )}
          </Overlay>
          <StoryWrapper>
            <DroneName>{this.props.drone.name}</DroneName>
            <MainStory>{this.props.drone.mainStory ? this.props.drone.mainStory.text : ""}</MainStory>


            {!this.state.renderStoryInput && <WriteButton onClick={() => { this.setState({ renderStoryInput: true }) }}>Add a story</WriteButton>}

            {this.state.renderStoryInput && <StoryInputWrapper ref={(el) => { this.end = el; }}>
              <StoryPrompt>{STORY_PROMPT}</StoryPrompt>
              <StoryInput
                placeholder={STORY_PLACEHOLDER}
                onBlur={(ev) => { this.updateSubStory() }}
                value={this.state.newStories[this.props.drone._id]}
                onChange={(ev) => this.onDroneStoryChange(ev)}>
              </StoryInput>
              {/* <Arrow position={this.state.position}></Arrow> */}
              <AutoSave>{this.state.autoSave}</AutoSave>
            </StoryInputWrapper>}

            <div >
            </div>


            {this.props.drone.subStories.map((item, key) =>
              !item.isFlagged && item.text && !isGibberish(item.text,50) &&<SubStory>{item.text}</SubStory>
            )}
          </StoryWrapper>
        </DroneWrapper>
      </div>
    )
    return null;
  }



  onDroneStoryChange(ev) {

    characterInputCount++;
    this.setState({ droneStory: ev.target.value });
    var newStories = this.state.newStories;
    newStories[this.props.drone._id] = ev.target.value
    this.setState({ newStories: newStories});
    if(!ev.target.value){
      this.setState({autoSave:""})
      this.updateSubStory();
    }
    if (characterInputCount > 10) {
      characterInputCount = 0;
      this.setState({autoSave:"Auto Saving..."})
      this.updateSubStory();
    }
  }


  updateSubStory() {
    if (this.state.newStories[this.props.drone._id]) {
      if (this.state.newSubStoryID != null) {
        fetch('/stories/' + this.state.newSubStoryID,
          {
            method: 'PUT',
            body: JSON.stringify({ text: this.state.droneStory }),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Mode': "CORS"
            }
          }).then(response => response.json())
          .then(data => {
            this.setState({autoSave:"Auto Saved"})
           }
          );
      } else {
        this.createNewStory()
      }
    }
  }

  createNewStory() {
    fetch('/stories/',
      {
        method: 'POST',
        body: JSON.stringify({ text: this.state.droneStory }),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Mode': "CORS"
        }
      }).then(response => response.json())
      .then(data => {
        if (!data._id) {
          return;
        }
        this.setState({ newSubStoryID: data._id });
        var drone = this.props.drone;
        if (!drone.subStories) {
          drone.subStories = [data._id];
        } else {
          drone.subStories.push(data._id)
        }
        this.setState({autoSave:"Auto Saved"})
        this.updateDrone(drone)
      }
      );
  }

  updateDrone(drone) {
    fetch('/drones/' + drone._id,
      {
        method: 'PUT',
        body: JSON.stringify(drone),
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






}

export default DroneStory;
