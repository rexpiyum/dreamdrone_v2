import React, { Component } from "react";
import styled from "styled-components";
import Button from "./Button";

import {theme} from "../colorTheme";
import {devices} from "../devices.js"


const Wrapper = styled.div`
  border-radius:1vw;
   border: solid 1px ${theme.secondaryColor};
  width:35vw;
  height:35vw;
  max-height:35vw;
  transition: transform .3s;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  overflow:scroll;
  padding:0.1vw;
  background-color:#ffffff;

  &:hover{
    transform: scale(1.04);

  }

  @media ${devices.mobile} {
    height: auto;
    width:95vw;
    height:70vh;
    max-height:70vh;
    margin:3vh;
  }
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
      <Wrapper onMouseLeave={(ev) => {this.changeHandler(); }}>
        <DroneName
          placeholder={this.state.droneNamePlaceholder}
          onClick={(ev) => { this.setState({ droneNamePlaceholder: "" }) }}
          onBlur={(ev) => { this.setState({ droneNamePlaceholder: NAME_PLACEHOLDER }); this.changeHandler();}}
          value={this.state.droneName}
          onChange={(ev) => this.onDroneNameChange(ev)}>
        </DroneName>

        <Description
          placeholder={this.state.droneStoryPlaceholder}
          onClick={(ev) => { this.setState({ droneStoryPlaceholder: "" }) }}
          onBlur={(ev) => { this.setState({ droneStoryPlaceholder: STORY_PLACEHOLDER });}}
          value={this.state.droneStory}
          onChange={(ev) => this.onDroneStoryChange(ev)}>
        </Description>
        <AutoSave>{this.state.autoSave}</AutoSave>

        {/* {this.renderAddButton()} */}
      </Wrapper>
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

  renderAddButton() {
   
    if (this.state.droneName.length > 0 && this.state.droneStory.length > 0) {
      return <AddButton onClick={() => this.handleAddClick()}>Add</AddButton>
    }
    return null;
  }

  handleAddClick() {
    fetch('/features/',
      {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Mode': "CORS"
        }
      }).then(response => response.json())
      .then(data => {
        this.props.clickHandler(data);
        this.clear();
      }
      );
  }

  clear() {
    this.setState({ title: "", description: "" })
  }
}

export default NewStory;
