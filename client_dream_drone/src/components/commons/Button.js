import React from "react";
import styled from "styled-components";
import {theme} from "../../config/colorTheme";

const Container= styled.div`
  font-size: ${(props=> props.small? '1.5vw' : '2.2vw')};
  font-family: 'Roboto', serif;
  font-weight: 900;
  color:${theme.white};
  background-color:${theme.accentColor}
  width:auto;
  margin:0;
  padding:${(props=> props.small? '0.4vw' : '1.5vw')};
  text-align:center;
  transition:transform 0.5s;
  cursor:pointer;

  &:hover{
      transform:scale(1.05);
  }
`;

export default function Button(props){
    return <Container small={props.small}>{props.text}</Container>
        
}