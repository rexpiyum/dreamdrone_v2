import React from "react";
import styled from "styled-components";
import {theme} from "../../config/colorTheme";

const Text = styled.textarea`
  font-size: 1.5vw;
  font-family: 'Roboto Slab', serif;
  font-weight: 300;
  color:${theme.black};
  width:100%;
  margin:0;
  padding:1.5vw;
  text-align:left;
  resize: none;
  overflow: auto;
  outline: none;
  border: solid 1px ${theme.accentColor};
  border-radius:1vw;
`;

export default function TextArea(props){

    return <Text 
            placeholder = {props.placeholder}
            onClick={ev=>props.onClickCallback && props.onClickCallback(ev)}
            onBlur={ev=>props.onBlurCallback && props.onBlurCallback(ev)}
            onChange={ev=>props.onChangeCallback && props.onChangeCallback(ev)} value={props.value}
            rows={props.rows || 1}
            >
        </Text>
        
}