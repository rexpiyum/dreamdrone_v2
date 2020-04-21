import React, { Component } from "react";
import styled,{keyframes} from "styled-components";
import {theme} from "../colorTheme";
import {devices} from "../devices.js"



const slide = keyframes`
  from {
      opacity: 0;
      transform: translateY(20px);
  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
`

const Wrapper = styled.div`
  position:relative;
  border-radius:2vw;
  border: solid 1px ${theme.secondaryColor};
  width:12vw;
  height:12vw;
  max-height:12vw;
  transition: transform .3s;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  overflow:scroll;
  background-color:#ffffff;
  &:hover{
    transform: scale(1.04);

  }
  margin:0.8vw;
  box-shadow: 0.4vw 0.4vw ${theme.secondaryColor};

  @media ${devices.mobile} {
    width:30vw;
    height:30vw;
    max-height:30vw;
  }
`;

const Title = styled.h3`
  font-size: 1.2vw
  margin: 0.5vw;
  font-family: "Nunito";
  font-weight: 700
  animation: ${slide} 1s ease;

  @media ${devices.mobile} {
    font-size: 3vw
  }
`;

const Description = styled.p`
  font-size: 1.1vw;
  font-family: "Roboto";
  font-weight: 400;
  margin: 1vw 0.5vw;
  animation: ${slide} 2s ease;

  @media ${devices.mobile} {
    font-size: 2.5vw
  }
`;

const Overlay = styled.div`
width:12vw;
height:12vw;
max-height:12vw;
transition: transform .3s;
cursor: pointer;
text-align: center;
vertical-align: middle;
overflow:scroll;
// background:${theme.secondaryColor};
opacity: 0.95;
position:absolute;
top:0;
left:0;
display: flex;
align-items: center;

@media ${devices.mobile} {
  width:30vw;
  height:30vw;
  max-height:30vw;
}

`;

const FeatureButton = styled.button`
 border-radius:.8vw;
border: solid 2px #ffffff;
background-color:${theme.secondaryColor};
max-height:3vw;
transition: transform .3s;
cursor: pointer;
text-align: center;

overflow:scroll;
margin:auto;
margin-bottom:1vw;
font-size: 1.2vw
font-family: "Nunito";
font-weight: 900
color:#ffffff;
outline:none;

@media ${devices.mobile} {
  font-size: 3vw
  width:auto;
  height:auto;
  max-height:none;
  padding:2vw 2vw;
}
`;


export const FeatureType = {selectable: 1, removable: 2, disabled: 3, placeHolder:4};

class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay:false
    };
  }

  render() {
    let overlay = null;
    if(!(this.props.featureType == FeatureType.disabled) && this.state.overlay){
      overlay = <Overlay>
        <FeatureButton onClick={()=>{this.setState({overlay:false}); this.props.clickHandler(this.props)}}>{this.props.featureType == FeatureType.selectable ? "Add to drone" : "Remove"}</FeatureButton>
      </Overlay>
    }
    return (
      <Wrapper isDisabled={this.props.featureType == FeatureType.disabled} onTouchStart={() => {this.setState({overlay:true})}} onMouseEnter={() => {this.setState({overlay:true})}} onMouseLeave={() => {this.setState({overlay:false})}}>
        <Title>{this.props.title}</Title>
        <Description>{this.props.description}</Description>
        {overlay}
      </Wrapper>
  )

    return null;
  }
}

export default Feature;
