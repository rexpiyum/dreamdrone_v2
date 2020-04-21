import React, { Component } from "react";
import styled from "styled-components";
// import {devices} from "../devices";


const Wrapper = styled.div`
  border-radius:.8vw;
  border: solid 1px #ffffff;
  background-color:#d1119c;
  width:6vw;
  height:3vw;
  max-height:3vw;
  transition: transform .3s;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  overflow:scroll;
  padding:0.5vw;

  &:hover{
    transform: scale(1.04);

  }

  font-size: 1.2vw
  margin: 0.2vw;
  font-family: "Nunito";
  font-weight: 700
  color:#ffffff;
`;



class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Wrapper>{this.props.Text}</Wrapper>
  )

    return null;
  }



}

export default Button;
