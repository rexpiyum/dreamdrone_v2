import React from "react";
import styled, {keyframes} from "styled-components";
import {theme} from "../../config/colorTheme";

const slideFromTop = keyframes`
0% {
    margin-top: 1vw;
    opacity:1;
}
70%{
    opacity:1;
}
100% {
    margin-top: 3vw;
    opacity:0;
}
`;

const Container= styled.div`
  color:${theme.white};
  border:1px solid ${theme.black}
  border-radius:2vw;
  width:3vw;
  height:5vw;
  position:fixed;
  bottom:3vw;
  right:3vw;
  z-index:200;

  &:hover{
      transform:scale(1.05);
  }
`;

const Dot= styled.div`
  background-color:${theme.black};
  border-radius:5vw;
  width:0.6vw;
  height:0.6vw;
  margin:auto;
  margin-top:1vw;
  z-index:200;
  animation: ${slideFromTop} 1.3s infinite;
`;



export default function ScrollDownMotionIcon(props){
    return <Container><Dot></Dot> </Container>
        
}