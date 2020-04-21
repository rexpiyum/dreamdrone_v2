import React from "react";
import styled from "styled-components";
import {theme} from "../../config/colorTheme";

const Text = styled.p`
  font-size: 1.8vw;
  font-family: 'Roboto', serif;
  font-weight: 700;
  color:${theme.black};
  width:100%;
  margin:0;
  text-align:left;
`;

export default function Prompt(props){
    return <Text>{props.text}</Text>
        
}