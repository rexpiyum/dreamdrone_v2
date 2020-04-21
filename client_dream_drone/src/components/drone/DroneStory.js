import React from "react";
import styled from "styled-components";
import { theme } from "../../config/colorTheme";

const Container = styled.div`
width:50vw;
margin:10vh auto;
`;

const Name = styled.p`
  font-size: 2.5vw
  margin:0;
  font-family: "Roboto";
  font-weight: 700
  text-align:center;
  text-transform:capitalize;
`;

const Story = styled.p`
font-size: 1.5vw
  margin:3vh 0;
  font-family: "Roboto Slab";
  font-weight: 300
  text-align:left;
  line-height:3vw;
`;





export default function DroneStory(props) {
    return <Container>
        <Name>{props.name}</Name>
        <Story>{props.story}</Story>
    </Container>
}