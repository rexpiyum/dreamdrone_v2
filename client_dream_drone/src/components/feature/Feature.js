import React, { Component } from "react";
import styled,{keyframes} from "styled-components";
import {theme} from "../../config/colorTheme"
import {devices} from "../../config/devices"
import {animationKeyFrames} from "../../config/keyframes"


const Container = styled.div`
  position:relative;
  border-radius:0.8vw;
  border: solid 2px ${(props)=> props.isAuthor? theme.secondaryColor:theme.primaryColor};
  width:18vw;
  height:${(props) => (props.featureType==FeatureType.removable|| props.featureType==FeatureType.disabled) && !props.expand? '8vh': '25vh'}
  transition: transform, height .3s;
  background-color:#ffffff;
  &:hover{
    transform: scale(1.04);

  }
  margin:0.5vw;
  overflow:hidden;

  @media ${devices.mobile} {
    width:30vw;
    height:30vw;
    max-height:30vw;
  }
`;

const TextContainer = styled.div`
  max-height: 10vw;
  margin:1.2vw;
  overflow:scroll;
`;
const Title = styled.h3`
  font-size: 1.2vw
  margin:0;
  font-family: "Roboto";
  font-weight: 700
  animation: ${animationKeyFrames.slideFromBottom} 1s ease;
  text-align:left;
  text-transform:capitalize;

  @media ${devices.mobile} {
    font-size: 3vw
  }
`;

const Description = styled.p`
  font-size: 1.1vw;
  font-family: 'Roboto Slab', serif;
  font-weight: 300;
  margin: 0.8vw 0;
  text-align:left;
//   animation: ${animationKeyFrames.slideFromBottom} 1s ease;
  padding-bottom:2vw;

  @media ${devices.mobile} {
    font-size: 2.5vw
  }
`;
const FeatureButton = styled.img`
position:absolute;
bottom:0.5vw;
right:0.5vw;
width:2vw;
height:2vw;
animation: ${animationKeyFrames.fadeIn} 0.5s ease;
cursor: pointer;


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
    return (
      <Container isAuthor = {this.props.isAuthor} expand={this.state.overlay} featureType={this.props.featureType} isDisabled={this.props.featureType == FeatureType.disabled} onTouchStart={() => {this.setState({overlay:true})}} onMouseEnter={() => {this.setState({overlay:true})}} onMouseLeave={() => {this.setState({overlay:false})}}>
        <TextContainer>
        <Title>{this.props.title}</Title>
        {(!(this.props.featureType==FeatureType.removable || this.props.featureType==FeatureType.disabled) || this.state.overlay) && <Description>{this.props.description}</Description>}
        </TextContainer>
        {!(this.props.featureType==FeatureType.disabled) && this.state.overlay && <FeatureButton src={this.props.featureType == FeatureType.selectable ? require('./assets/add_icon.svg'):require('./assets/remove_icon.svg')} onClick={()=>{this.setState({overlay:false}); this.props.clickHandler(this.props)}}></FeatureButton>}
      </Container>
  )
    return null;
  }
}

export default Feature;
