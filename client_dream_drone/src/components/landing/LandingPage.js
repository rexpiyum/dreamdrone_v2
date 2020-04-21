import React, { Component } from "react";
import styled, { keyframes } from "styled-components"
import LandingAnimation from "./LandingAnimation"
import LandingPageHeader from "./LandingPageHeader"
import Button from "../commons/Button"
import { theme } from "../../config/colorTheme"
import { animationKeyFrames } from "../../config/keyframes"
import StoryWidget from "./StoryWidget"

const Container = styled.div`
  width:100vw;
`;

const ContentContainer = styled.div`
animation: ${animationKeyFrames.fadeIn} 2s
`;

const Description = styled.div`
  width:60vw;
  margin:8vw;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 2.5vw;
  line-height: 4.1vw;
  text-align:left;
  color:${theme.black}
`;

const Step = styled.div`
  display:flex;
  justify-content:space-around;
  align-items:flex-start;
  margin: 15vw 8vw;
  width:90vw;
`;

const StepImage = styled.img`
  width: 40vw;
  height: auto;
  margin:auto;
`;

const StepTextContainer = styled.div`
width:40vw;
text-align:left;
`;

const StepCount = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 1.8vw;
line-height: 2vw;
letter-spacing: 0.03em;
padding-bottom:1vw;
color:${theme.black}
`;

const StepTitle = styled.div`
font-family: Roboto;
font-style: normal;
font-weight: 900;
font-size: 2.2vw;
line-height: 3.2vw;
padding-bottom:1vw;
color:${theme.black}
`;

const StepDescription = styled.div`
font-family: Roboto Slab;
font-style: normal;
font-weight: 300;
font-size: 1.3vw;
line-height: 2.3vw;
letter-spacing: 0.03em;
color:${theme.black}
`;

const ButtonContainer = styled.div`
  margin:auto;
  width:30vw;
  padding-bottom:10vw;
`;


export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: true,
      renderHeader:false
    };

    window.addEventListener('scroll', (event) => {
      if(window.scrollY> window.innerHeight) this.setState({renderHeader:true})
      // else this.setState({renderHeader:false})
    });

  }

  render() {

    return (
      <Container>
      {!this.state.renderHeader &&<LandingAnimation onAnimationEndCallback={()=>{this.setState({animation:false});}}></LandingAnimation>}
        {!this.state.animation && <ContentContainer>
          <div ref={(el) => { this.end = el; }}></div>
          {this.state.renderHeader && <LandingPageHeader onCreateClick={()=>this.props.history.push('/consent')}></LandingPageHeader>}
          <Description>
            DreamDrone.org is a place to collectively envision future drone technologies. It provides fun and simple steps to express our desires, aspirations and fears about future drones.
          </Description>
          <Step>
            <StepTextContainer>
              <StepCount>Step 1</StepCount>
              <StepTitle>Create your dream drone by giving superpowers</StepTitle>
              <StepDescription>
              Create a fictional drone that you would like to see in the future by giving it imaginery features - we call them "superpowers." Assume anything is possible and feasible in the real world. Let your imagination flow!
              </StepDescription>
            </StepTextContainer>
            <StepImage src={require('./assets/step1_image.svg')}></StepImage>
          </Step>

          <Step>
            <StepTextContainer>
              <StepCount>Step 2</StepCount>
              <StepTitle>Write a little story about your dream drone</StepTitle>
              <StepDescription>
              Imagine a future scenario involving your dream drone. Write it as a little story.
              </StepDescription>
            </StepTextContainer>
            {/* <StepImage src={require('./assets/drone_stories_chaperone.png')}></StepImage> */}
            <StoryWidget></StoryWidget>
          </Step>

          <Step>
            <StepTextContainer>
              <StepCount>Step 3</StepCount>
              <StepTitle>Respond to other’s dream drone stories</StepTitle>
              <StepDescription>
              Comment on dream drone stories created by others. Think about positives AND adverse consequences.
              </StepDescription>
            </StepTextContainer>
            <StepImage src={require('./assets/step3_image.svg')}></StepImage>
          </Step>

          <ButtonContainer onClick={() => this.props.history.push('/consent')}>
            <Button text={"+ Create your dream drone"}></Button>
          </ButtonContainer>
        </ContentContainer>}
      </Container>

    )
    return null;
  }
}

