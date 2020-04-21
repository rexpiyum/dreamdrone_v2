import React from "react";
import styled from "styled-components";
import { theme } from "../../../config/colorTheme";

const Container = styled.div`
width:100vw;
display:flex;
justify-content:flex-start;
position: -webkit-sticky;
position: sticky;
top: 0;
z-index:200;
background-color:${theme.white}
`;

const TextContainer = styled.div`
width:80vw;
margin:none;
`;

const ButtonContainer = styled.div`
width:20vw;
display:flex;
justify-content:flex-end;
padding-right:2vw;
`;

const TextWrapper = styled.div`
text-align:left;
`;

const Text = styled.p`
  font-size: 2.5vw;
  font-family: 'Roboto', serif;
  font-weight: 900;
  background-color:${theme.primaryColor};
  color:${theme.white};
  width:auto;
  margin:0;
  padding:1vh 2vh;
  text-align:left;
  display:inline-block;
`;

const Button = styled.img`
width:3.8vw;
height:3.8vw;
margin:0.8vw 0.8vw;
cursor:pointer;
transition:transform 0.2s;

&:hover{
  transform: scale(1.08);
}
`;

export default function Header(props) {
  return <Container>
  <TextContainer><TextWrapper><Text>{props.text}</Text></TextWrapper></TextContainer>
    <ButtonContainer>
      {(props.onBackCallback || props.disableBack) && <Button onClick={()=> props.onBackCallback()} src={props.disableBack? require("./assets/back_icon_disabled.svg"):require("./assets/back_icon.svg")}></Button>}
      {(props.onNextCallback || props.disableNext) && <Button onClick={()=> props.onNextCallback()} src={props.disableNext? require("./assets/next_icon_disabled.svg"):require("./assets/next_icon.svg")}></Button>}
      {(props.onDoneCallback || props.disableDone) && <Button onClick={()=> props.onDoneCallback()} src={props.disableDone? require("./assets/done_icon_disabled.svg"):require("./assets/done_icon.svg")}></Button>}
    </ButtonContainer>
  </Container>
}