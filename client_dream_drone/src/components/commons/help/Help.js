import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../../config/colorTheme";
import { animationKeyFrames } from "../../../config/keyframes"

const Container = styled.div`
  position:absolute
  right:0;
  top:0;
  width:${(props) => props.expand ? "50vw" : "4vw"};
  background-color:${theme.accentColor};
  transition: width 0.5s;
  border-radius:2vw;
`;

const Icon = styled.img`
float: right;
width:4vw;
height:4vw;
cursor:pointer;
// animation: ${animationKeyFrames.heartBeat} 2.5s linear infinite alternate;
`;

const Body = styled.div`
animation: ${animationKeyFrames.fadeIn} 1s;
`;

export default function Prompt(props) {
  const [expand, setExpand] = useState(0);
  return <Container expand={expand}>
    <Icon
      onClick={() => { setExpand(!expand) }}
      src={expand ? require("./assets/remove_icon.svg") : require("./assets/help_icon.svg")}>
    </Icon>
    <Body>{expand?props.body:null}</Body>
  </Container>

}