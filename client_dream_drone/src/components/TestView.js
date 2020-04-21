import React, { Component } from "react";
import styled from "styled-components";
import { theme } from "../colorTheme";



const HeaderContainer = styled.div`
  width:100%;
  position:fixed;

  z-index:100;
`;

const Header = styled.div`
  width:100%;
  height:10vh;
  background-color: #50c3f7;
`;

const SubHeader = styled.div`
  width:100%;
  height:8vh;
  background-color:white;
  box-shadow: 0px 2px 5px lightgrey;
`;

const ModuleContainer = styled.div`
  width:100%;
  
`;


const PlaceHolder = styled.div`
  width:100%;
  height:17vh;
`;


const Module = styled.div`
  width:100%;
  height:80vh;
  // background-color:lightgrey;
  box-shadow: 0px 1px 20px lightgrey;
  margin-bottom:5vh;
 
`;

const ScrollContainer = styled.div`
  width:100%;
  height:60vh;
  overflow:scroll;
`;

const FirstModule = styled.div`
  width:100%;
  max-height:88vh;
  // background-color:lightgrey;
  box-shadow: 0px 10px 5px lightgrey;
  margin-bottom:5vh;
  overflow:scroll;
  //padding-bottom:20vh;
`;

const Circle = styled.div`
  width:10vh;
  height:10vh;
  // background-color:#00BCD4;
  margin:2vh auto;
  border-radius:100vh;
  border: solid 5px lightgrey
`;

const CircleFull = styled.div`
  width:10vh;
  height:10vh;
  background-color:#FFA40C;
  margin:2vh auto;
  border-radius:100vh;
  border: solid 5px #FFA40C
`;

const CircleEnabled = styled.div`
  width:10vh;
  height:10vh;
  // background-color:#00BCD4;
  margin:2vh auto;
  border-radius:100vh;
  border: solid 5px #FFA40C
`;


const Title = styled.h1`
  font-size: 5vh
  margin: 2vh auto;
font-family: "Nunito";
font-weight: 900;
color:black;
`;

const TitleDisabled = styled.h1`
  font-size: 5vh
  margin: 2vh auto;
font-family: "Nunito";
font-weight: 900;
color:lightgrey;
`;








export default class TestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyIndex: 0
    };
  }



  render() {
    return (
      <div>
        <HeaderContainer>
          <Header></Header>
          <SubHeader></SubHeader>
        </HeaderContainer>
        <ModuleContainer>
          <FirstModule>
            <PlaceHolder></PlaceHolder>
            <Title>Module 1</Title>
            <ScrollContainer>
            <CircleFull></CircleFull>
            <CircleEnabled></CircleEnabled>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            </ScrollContainer>
          </FirstModule>

          <Module>
            <TitleDisabled>Module 2</TitleDisabled>
            <ScrollContainer>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            </ScrollContainer>
          </Module>

          {/* <Module>
            <TitleDisabled>Module 3</TitleDisabled>
            <ScrollContainer>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            <Circle></Circle>
            </ScrollContainer>
          </Module> */}
          

        </ModuleContainer>
      </div>
    )
    return null;
  }
}

