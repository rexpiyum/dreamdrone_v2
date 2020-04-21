import React from "react"
import styled from "styled-components"
import { theme } from "../../config/colorTheme"
import Button from "../commons/Button"
import {animationKeyFrames} from "../../config/keyframes"

const Container = styled.div`
width:100vw;
display:flex;
justify-content:flex-start;
position: -webkit-sticky;
position: sticky;
top: 0;
z-index:200;
background-color:#ffffff;
animation: ${animationKeyFrames.fadeIn} 0.8s;
`;

const TextContainer = styled.div`
width:75vw;
margin:none;
margin-left:7vw;
`;

const ButtonContainer = styled.div`
width:25vw;
right:0;
`;

const Word = styled.p`
font-family: Roboto;
font-style: normal;
font-weight: 900;
font-size: 1.5vw;
letter-spacing: 0.01em;
color: #020202;
display:inline;
color:${(props) => props.highlight ? '#ffffff' : '#020202'};
background-color:${(props) => props.highlight ? '#FFC709' : 'none'};
padding:0.2vw 1vw;
margin-left:none;
`;

const Line = styled.div`
  width:90vw;
  margin:2vw auto;
  text-align:left;
`;

export default function LandingPageHeader(props) {
  return <Container>
  <TextContainer>
      {/* <Line>
          <Word>Let's</Word>
          <Word highlight={true}>Envision</Word>
          <Word>Future Drones</Word>
          <Word highlight={true}>Together!</Word>
          </Line> */}
      </TextContainer>
    <ButtonContainer onClick={() => props.onCreateClick()}>
        <Button small={true} text={"+ Create your dream drone"}></Button>
        </ButtonContainer>
  </Container>
}