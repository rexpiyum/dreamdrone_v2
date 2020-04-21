import React, { Component } from "react";
import styled from "styled-components";
import TextArea from "../commons/TextArea"
import Prompt from "../commons/Prompt"
import Help from "../commons/help/Help"


import {theme} from "../../config/colorTheme";
import {devices} from "../../config/devices.js"


const Container = styled.div`
  width:60vw;
  position:relative;
  margin:auto;
  padding-bottom:5vw;

  @media ${devices.mobile} {
    height: auto;
    width:95vw;
    height:70vh;
    max-height:70vh;
    margin:3vh;
  }
`;

const HelpPromptContainer = styled.div`
position:relative;
  margin-top:5vw;
  margin-bottom:1vw;
  overflow:visible;
`;

const DroneName = styled.textarea`
  font-size: 2vw
  margin: 1vw;
  font-family: "Nunito";
  font-weight: 700;
  resize: none;
  border: none;
  overflow: auto;
  outline: none;
  text-align:center;

  @media ${devices.mobile} {
    font-size: 6vw
  }
`;

const Description = styled.textarea`
  font-size: 1.2vw;
  font-family: "Roboto";
  font-weight: 400;
  resize: none;
  border: none;
  overflow: auto;
  outline: none;
  text-align:center;
  min-height:60%;
  min-width:90%;
  margin-top:2vw;

  @media ${devices.mobile} {
    font-size: 4vw
    margin-top:1vw;
  }
`;

const AutoSave = styled.p`
font-size: 1vw
font-family: "Nunito";
font-weight: 500;
text-align:right;
margin-right:1vw;
color:#008920

@media ${devices.mobile} {
  font-size: 4vw
  font-weight: 700;
}
`;

const AddButton = styled.button`
border-radius:.8vw;
border: solid 1px ${theme.primaryColor};
background-color:#ffffff;
width:6vw;
height:3vw;
max-height:3vw;
transition: transform .3s;
cursor: pointer;
text-align: center;
vertical-align: middle;
padding:0.5vw;

&:hover{
  transform: scale(1.04);
  background-color:${theme.primaryColor};
  color:#ffffff;

}

font-size: 1.2vw
margin: 0.2vw;
font-family: "Nunito";
font-weight: 700
color:${theme.primaryColor};
outline:none;
`;

const NAME_PLACEHOLDER = "Drone name";
const STORY_PLACEHOLDER = "Tell us a story about your drone...";

 var characterInputCount = 0;

 const storyHelpText = "sfsdfsfsdfs"

class NewStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      droneName: "",
      droneNamePlaceholder: NAME_PLACEHOLDER,
      droneStory: "",
      droneStoryPlaceholder: STORY_PLACEHOLDER,
      autoSave:""
    };
  }

  componentDidMount(){
    if(this.props.name) this.setState({ droneName: this.props.name });
    if(this.props.story) this.setState({ droneStory: this.props.story });
  }

  render() {
    return (
      <Container onMouseLeave={(ev) => {this.changeHandler(); }}>
        
        <HelpPromptContainer>
        <Prompt text={"Give your dream drone a cool name"}></Prompt>
        </HelpPromptContainer>
        <TextArea
          onBlurCallback={(ev) => {this.changeHandler()}}
          value={this.state.droneName}
          onChangeCallback={(ev) => this.setState({droneName:ev.target.value})}>
          </TextArea>
          <HelpPromptContainer>
        <Prompt text={"Write a little story about an imaginery scenario involving your dream drone"}></Prompt>
        <Help body={<div>sfsfsfsfs</div>}></Help>
        </HelpPromptContainer>
         <TextArea
            rows = {15}
          value={this.state.droneStory}
          onChangeCallback={(ev) => this.onDroneStoryChange(ev)}>
        </TextArea>
       
      </Container>
    )
    return null;
  }

  onDroneNameChange(ev) {
    this.setState({ droneName: ev.target.value });
  }

  onDroneStoryChange(ev) {
    characterInputCount++;
    this.setState({ droneStory: ev.target.value });
    if(characterInputCount > 10 ) {
      characterInputCount = 0;
      this.setState({autoSave:"Auto Saving..."})
      this.changeHandler();
      setInterval(()=>this.setState({autoSave:"Auto Saved"}),1500)
    }
    //hack
    if(ev.target.value.length == 0){
      this.setState({autoSave:""})
      this.props.callback({name:this.state.droneName, story:""});
    }
  }

  changeHandler(){
    this.props.callback({name:this.state.droneName, story:this.state.droneStory});
  }
}

export default NewStory;
