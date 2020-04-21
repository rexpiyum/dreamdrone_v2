import React, { Component } from "react";
import styled from "styled-components";
import Button from "./Button";

import {theme} from "../colorTheme";
import {devices} from "../devices.js"


const Wrapper = styled.div`
  border-radius:2.5vw;
  border: solid 2px ${theme.secondaryColor};
  width:18vw;
  height:18vw;
  max-height:18vw;
  transition: transform .3s;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  overflow:scroll;
  padding:0.5vw;
  background-color:#ffffff;

  &:hover{
    transform: scale(1.04);

  }
  box-shadow: 0.3vw 0.3vw ${theme.secondaryColor};

  @media ${devices.mobile} {
    width:50vw;
    height:50vw;
    max-height:50vw;
  }
`;

const Title = styled.textarea`
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
    margin: 2vw auto;
    margin-bottom:0;
    font-size: 4vw;
  }
`;

const Description = styled.textarea`
  font-size: 1.2vw;
  font-family: "Roboto";
  font-weight: 400;
  resize: none;
  resize: none;
  border: none;
  overflow: auto;
  outline: none;
  text-align:center;
  min-height:52%;

  @media ${devices.mobile} {
    font-size: 3vw;
    text-align:center;
    margin: 1vw auto;
    width:95%;
    min-height:40%;

  }
`;

const AddButton = styled.button`
border-radius:.8vw;
border: solid 1px ${props => props.disabled?'lightgrey':theme.secondaryColor};
background-color:#ffffff;
transition: transform .3s;
cursor: ${props => props.disabled?'not-allowed':'pointer'};
text-align: center;
vertical-align: middle;
padding:0.5vw 1vw;
&:hover{
  transform: scale(1.04);
   background-color:${props => props.disabled?'#ffffff':theme.secondaryColor};
  color:${props => props.disabled?'lightgrey':'#ffffff'};
}
font-size: 1.2vw
margin:auto;
margin-bottom: 0vw;
font-family: "Nunito";
font-weight: 900
color:${props => props.disabled?'lightgrey':theme.secondaryColor};
outline:none;

@media ${devices.mobile} {
  font-size: 3vw;
  margin: 1vw auto;
  padding:2vw;

}
`;

const TITLE_PLACEHOLDER = "Superpower Name";
const DESCRIPTION_PLACEHOLDER = "Breifly describe what this superpower is.";

class NewFeature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      titlePlaceholder: TITLE_PLACEHOLDER,
      description: "",
      descriptionPlaceholder: DESCRIPTION_PLACEHOLDER
    };
  }

  saveNewFeature() {

  }

  render() {
    return (
      <Wrapper>
        <Title
          placeholder={this.state.titlePlaceholder}
          onClick={(ev) => { this.setState({ titlePlaceholder: "" }) }}
          onBlur={(ev) => { this.setState({ titlePlaceholder: TITLE_PLACEHOLDER }) }}
          value={this.state.title}
          onChange={(ev) => this.onTitleChange(ev)}
          onKeyPress={(ev)=>this.onTitleKeyPress(ev)}>
        </Title>

        <Description
          ref="description"
          placeholder={this.state.descriptionPlaceholder}
          onClick={(ev) => { this.setState({ descriptionPlaceholder: "" }) }}
          onBlur={(ev) => { this.setState({ descriptionPlaceholder: DESCRIPTION_PLACEHOLDER }) }}
          value={this.state.description}
          onChange={(ev) => this.onDescriptionChange(ev)}>
        </Description>

        {this.renderAddButton()}
      </Wrapper>
    )
    return null;
  }

  onTitleChange(ev) {
    this.setState({ title: ev.target.value });
  }

  onTitleKeyPress(ev){
    if(ev.key === 'Enter') {
      ev.preventDefault();
      this.refs.description.focus();
    }
  }

  onDescriptionChange(ev) {
    this.setState({ description: ev.target.value });
  }

  renderAddButton() {
    if (this.state.title.length > 0 && this.state.description.length > 0) {
      return <AddButton disabled={false}onClick={() => this.handleAddClick()}>Add to drone</AddButton>
    }
    return <AddButton disabled={true}>Add to drone</AddButton>
  }

  handleAddClick() {
    fetch('/features/',
      {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Mode': "CORS"
        }
      }).then(response => response.json())
      .then(data => {
        this.props.clickHandler(data);
        this.clear();
      }
      );
  }

  clear() {
    this.setState({ title: "", description: "" })
  }
}

export default NewFeature;
