import React, { Component } from "react";
import styled from "styled-components";
import Button from "./Button";
import {devices} from "../devices.js"


import {theme} from "../colorTheme";


const Wrapper = styled.div`
  border-radius:0.5vw;
  border: solid 1px ${theme.primaryColor};
  width:${props => props.small? 7:9}vw;
 height:3.25in
  text-align: center;
  overflow:scroll;
  padding:0.5vw;
  background-color:#ffffff;
  margin:0.5in ;
  
  @media ${devices.mobile} {
    width:25vw;
    height:25vw;
    max-height:25vw;
  }
`;

const Title = styled.div`
  font-size: 1.2vw
  margin: 0.2vw;
  font-family: "Nunito";
  font-weight: 700;
  resize: none;
  border: none;
  overflow: auto;
  outline: none;
  text-align:center;

  @media ${devices.mobile} {
    font-size: 3vw
  }
`;

const Description = styled.div`
  font-size: 1.1vw;
  font-family: "Roboto";
  font-weight: 400;
  resize: none;
  resize: none;
  border: none;
  overflow: auto;
  outline: none;
  text-align:center;
  min-height:40%;
  display:${props => props.small?'none' : 'block'}

  @media ${devices.mobile} {
    font-size: 2.5vw
  }
`;

class NewFeature extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Wrapper small={this.props.small}>
        <Title>{this.props.title}</Title>
        <Description small={this.props.small}>{this.props.description}</Description>
      </Wrapper>
    )
    return null;
  }
}

export default NewFeature;
