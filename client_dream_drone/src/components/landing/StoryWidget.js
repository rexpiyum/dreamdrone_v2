import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { theme } from "../../config/colorTheme"
import Button from "../commons/Button"
import {animationKeyFrames} from "../../config/keyframes"

const Container = styled.div`
width:55vw;
// background-color:${theme.primaryColor20};
overflow-x: scroll;
position:relative;
`;


const StoryContainer = styled.div`
width:135vw;
margin-top:0
`;
const StoryWrapper = styled.div`
display:inline-block;
float:left;
width:45vw;
margin-left:0;
margin-top:0
max-height:40vw;
overflow:scroll;
`;

const Text = styled.div`
margin:auto;
width:40vw;
font-family: 'Patrick Hand', cursive;
font-style: normal;
font-weight: 200;
font-size: 1.5vw;
line-height:2.3vw;
letter-spacing: 0.03em;
color: #020202;
text-align:left;
padding-bottom:5vw;
`;

const Image = styled.img`
width:90%;
`;

const Fadeout = styled.div`
position: absolute; 
    bottom: 0;
    width:135vw;
    height: 5vw;
    background: -webkit-linear-gradient(
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 100%
    );
    z-index:200;

`;

const storyText = 
    [
    "A kid who lost a leg in mine field receives a kit with a bunch of easy to assemble parts and a some drawings on how to build a flying structure from plastic bottles. Soon his drone flies above an area where mines are suspected. It maps automatically the field and sends its finding through the internet satellite constellatin, and update a map accessible from any smartphone, from a danger warning app, or from the tiny computer that he received with the kit.",
    "It is early morning in the New York city. NYPD just received a call about a bank robbery and the suspects driving a blue Mustang along interstate 86. NYPD deploys 20 hot pursuit drones over the highway. One of the them detects the Mustang and starts to follow. Mustang takes an exit and drives along a narrow bendy road. Mustang takes sharp turns but the drone is keeping up with it. NYPD officers watches the live footage from the long range feed and command the drone to emit its laser beam. Drone emits the beam at the right time, car engine stops. Before the suspects even know drone launces a net on to the car. No one is harmed, no one can move. NYPD catches the suspects.",
    "I am a free man with free thoughts. I wander leisurely anywhere where my mind tells. My chaperone reads my mind, shows me the path with its laser beams, helps me to reach the destination my mind wants."
   
]


    const images = [
        <Image src={require("./assets/drone_stories_mines.png")}></Image>,
        <Image src={require("./assets/drone_stories_nypd.png")}></Image>,
        <Image src={require("./assets/drone_stories_chaperone.png")}></Image>
    ]
export default function StoryWidget(props) {

    const [index, setIndex] = useState(0);

  return <Container>
      <StoryContainer>
      {images.map(
              (value, index)=>
                <StoryWrapper>
                    {value}
                    <Text>{storyText[index]}</Text>
                </StoryWrapper>
          )}
     </StoryContainer> 
     <Fadeout></Fadeout>  
  </Container>
}