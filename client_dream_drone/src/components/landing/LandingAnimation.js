import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const fadein = keyframes`
  from {
      opacity: 0;
      transform: translateY(2vh);
  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
`

const droneAnimation = keyframes`
  0%   {bottom:70vh;}
  10%  {bottom:55vh; rotate(1deg)}
  20%  {bottom:50vh; transform:rotate(2deg)}
  30%  {bottom:55vh; transform:rotate(-2deg)}
  40%  {bottom:58vh; transform:rotate(-4deg)}
  50%  {bottom:54vh; transform:rotate(-2deg)}
  60%  {bottom:50vh; transform:rotate(3deg)}
  70%  {bottom:45vh; transform:rotate(2deg)}
  88%  {bottom:7vh; transform:rotate(4deg)}
  92% {bottom:8vh; transform:rotate(1deg)}
  95% {bottom:6vh; transform:rotate(-2deg)}
  100% {bottom:5vh; transform:scale(1); transform:rotate(0deg)}
`

const leftCloudAnimation = keyframes`
  0%   {top:10vh;}
  10%  {top:10vh;left:19vw; rotate(1deg)}
  20%  {top:10vh; left:20vw; transform:rotate(20deg)}
  30%  {top:10vh; left:10;vw; transform:rotate(-2deg)}
  40%  {top:10vh; transform:rotate(5deg)}
  50%  {top:10vh;left:12vw; transform:rotate(-10deg)}
  60%  {top:10vh; transform:rotate(10deg)}
  70%  {transform:rotate(2deg)}
  88%  {transform:left:10vw; rotate(4deg)}
  92% {transform:rotate(1deg); left:8vw}
  95% {transform:rotate(-2deg)}
  100% {transform:scale(1);left:10vw; transform:rotate(0deg)}
`

const rightCloudAnimation = keyframes`
  0%   {top:10vh;}
  10%  {top:10vh;left:50vw; rotate(5deg)}
  20%  {top:10vh; left:50vw; transform:rotate(2deg)}
  30%  {top:10vh; left:53;vw; transform:rotate(-20deg)}
  40%  {top:10vh; transform:rotate(5deg)}
  50%  {top:10vh;left:50vw; transform:rotate(-10deg)}
  60%  {top:10vh; transform:rotate(10deg)}
  70%  {transform:rotate(2deg)}
  88%  {transform:left:55vw; rotate(4deg)}
  92% {transform:rotate(1deg); left:80vw}
  95% {transform:rotate(-2deg)}
  100% {transform:scale(1);left:80vw; transform:rotate(0deg)}
`

const EarthAnimation = keyframes`
  0%   {bottom:-21vh;}
  75%  {bottom:-21vh;}
  80%  {bottom:3vh;}
`

const StoryImage = styled.img`
  max-height:60vh;
  width: auto;
  height: auto;
  margin:auto;
`;

const Container = styled.div`
  width:100vw;
  height:100vh;
`;

const DroneImageContainer = styled.div`
position absolute;
margin:auto;
width:100vw;
bottom:5vh;
animation: ${droneAnimation} 7s linear;
`;

const DroneImage = styled.img`
  max-height:35vh;
  width: auto;
  height: auto;
  margin:auto;
`;

const LeftCloudImageContainer = styled.div`
position absolute;
margin:auto;
width:40vw;
top:-50vh;
left:20vw;
animation: ${leftCloudAnimation} 7s linear;
z-index:100;
opacity:0.8;
`;

const RightCloudImageContainer = styled.div`
position absolute;
margin:auto;
width:20vw;
top:-50vh;
left:50vw;
animation: ${rightCloudAnimation} 7s linear;
z-index:100;
opacity:0.8;
`;

const CloudImage = styled.img`
  max-height:18vh;
  width: auto;
  height: auto;
  margin:auto;
`;

const EarthImageContainer = styled.div`
position absolute;
margin:auto;
width:100vw;
bottom:5vh;
`;

const EarthImage = styled.img`
  max-height:18vh;
  width: auto;
  height: auto;
  margin:auto;
`;

const Word = styled.p`
font-family: Roboto;
font-style: normal;
font-weight: 900;
font-size: 7vw;
letter-spacing: 0.01em;
color: #020202;
display:inline;
color:${(props) => props.highlight ? '#ffffff' : '#020202'};
background-color:${(props) => props.highlight ? '#FFC709' : 'none'};
padding:0.2vw 1.2vw;
margin-left:none;
`;

const Line = styled.div`
  width:90vw;
  margin:2vw auto;
  text-align:left;
  animation: ${fadein} 1s linear;
`;

export default class LandingAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLines: false
    };
  }

  render() {
    return (
      <Container>
        {this.state.showLines && <Line><Word>Let's</Word><Word highlight={true}>Envision</Word></Line>}
        {this.state.showLines && <Line><Word>Future</Word> <Word>Drones</Word> <Word highlight={true}>Together</Word></Line>}

        <LeftCloudImageContainer>
          <CloudImage src={require('./assets/cloud_1_image.svg')}></CloudImage>
        </LeftCloudImageContainer>
        <RightCloudImageContainer>
          <CloudImage src={require('./assets/cloud_2_image.svg')}></CloudImage>
        </RightCloudImageContainer>
        <DroneImageContainer onAnimationEnd={() => {this.setState({ showLines: true }); setTimeout(()=>this.props.onAnimationEndCallback(),3000)}}>
          <DroneImage src={require('./assets/drone_image.svg')}></DroneImage>
        </DroneImageContainer>
        <EarthImageContainer>
          <EarthImage src={require('./assets/earth_image.svg')}></EarthImage>
        </EarthImageContainer>
      </Container>
    )
    return null;
  }
}

