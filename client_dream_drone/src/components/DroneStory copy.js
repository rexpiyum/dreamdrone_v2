import React, { Component } from "react";
import styled from "styled-components";
import Button from "./Button";
import Feature from "./ReadOnlyFeature"

import logo from '../drone.png';


// import {devices} from "../devices";

const DroneWrapper = styled.div`
  position:relative;
  margin:auto 1vw;
  padding:1vw;
  border-radius:2vw;
  border: solid 1px #d1119c;
  transition: transform .8s;
  height:80vh;

  &:hover{
    transform: scale(1.02);

  }
 
`;

const DroneImage = styled.img`
  height: ${props => props.small ? 15 : 27}vw;
  width:${props => props.small ? 15 : 27}vw;
  max-height:85vh;
  max-width:85vh;
`;

const Overlay = styled.div`
position:absolute;
top:0;
left:0;
height: ${props => props.small ? 12 : 25}vw;
  width:${props => props.small ? 12 : 25}vw;
  max-height:85vh;
  max-width:85vh;
`;

const FixedFeatureWrapper = styled.div`
position:absolute;
top: ${props => props.small ? props.top/1.5+1.3 : props.top}vw;
left: ${props => props.small ? props.left/1.2-5 : props.left}vw;
margin:auto;
`;

const DescriptionWrapper = styled.div`
height:${props => props.small ? 'auto' : 20}vh;
width: ${props => props.small ? 21 : 38}vw;
overflow:scroll;
`;

const Description = styled.div`
  font-size: 1.2vw;
  font-family: "Roboto";
  font-weight: 400;
  resize: none;
  resize: none;
  border: none;
  outline: none;
  text-align:center;
  height:auto;
  margin-top:${props => props.small ? 6 : 2}vh;
  width: ${props => props.small ? 21 : 38}vw;
`;

const WriteButton = styled.button`
border-radius:.8vw;
border: solid 2px #ffffff;
background-color:#d1119c;
height:3vw;
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
`;


const StoryPrompt = styled.p`
font-size: 1.3vw
 
  margin-bottom:1vh;
  margin-top:6vh;
  font-family: "Roboto";
  font-weight: 400;
  // color:#d1119c;
  text-align:center;
`;





const LEFT_FACTOR = 24;
const TOP_FACTOR = 12;
const LEFT_0 = 8.4;
const TOP_0 = 4.5;

class DroneStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      small: !props.selected,
      storyZoom: false,
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
      <DroneWrapper
        small={this.state.small}
        onMouseEnter={() => (this.props.disabled || this.props.selected) && this.setState({ small: false })}
        onMouseLeave={() => (this.props.disabled || this.props.selected) && this.setState({ small: true })}
      >
        <DroneImage 
        small={this.state.small} src={logo} alt="logo" ></DroneImage>
        <Overlay small={this.state.small}>
          {this.props.drone.features.map((item, key) =>
            <FixedFeatureWrapper
              small={this.state.small}
              top={TOP_0 + TOP_FACTOR * (key - (key % 2)) / 2}
              left={LEFT_0 + LEFT_FACTOR * (key % 2) / 2}
            >
              <Feature title={item.title} description={item.description} index={key} small={this.state.small}></Feature>
            </FixedFeatureWrapper>
          )}
        </Overlay>
        <DescriptionWrapper small={this.state.small}>
        <Description small={this.state.small}>{this.props.drone.mainStory?this.props.drone.mainStory.text:""}</Description>
        </DescriptionWrapper>
        {!this.state.small && <WriteButton onClick={() => this.props.callback(this.props.index)}>Add a story</WriteButton>}
      </DroneWrapper>
  </div>
    )
    return null;
  }




}

export default DroneStory;
