import React, { Component } from "react";
import styled from "styled-components";
import {theme} from "../colorTheme";
import {devices} from "../devices.js"



const Wrapper = styled.div`
  width: 60vw;
  margin:auto;
  margin-bottom:10vh;

  @media ${devices.mobile} {
    width: 90vw;
  }
`;
const Title = styled.h1`
  font-size: 3vw;
  margin: 6vh auto;
font-family: "Roboto";
font-weight: 900
color:${theme.black};

@media ${devices.mobile} {
  font-size: 5vw
}

`;

const Message = styled.p`
font-size: 1.2vw
  margin-bottom:1vh;
  margin-top:3vh;
  font-family: "Roboto Slab";
  font-weight: 300;
  line-height:2.2vw;
  // color:${theme.primaryColor};
  text-align:left;

  @media ${devices.mobile} {
    font-size: 2.5vw
  }

`;


const StartButton = styled.button`
border: solid 1px ${theme.secondaryColor};
background-color:#ffffff;
height:3vw;
width:10vw;
max-height:3vw;
transition: transform .3s;
cursor: pointer;
text-align: center;
vertical-align: middle;
  background-color:${theme.secondaryColor};
  color:#ffffff;



font-size: 1.3vw
margin: auto;
font-family: "Roboto";
font-weight: 900


outline:none;
margin-top:5vh;

@media ${devices.mobile} {
  font-size: 3.5vw;
  width:75vw;
  height: auto;
  padding:2vw;
  max-height:none;

}

`;

export default class ConsentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyIndex: 0
    };
  }

  componentDidMount() {
    document.title="Dream Drone"
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Wrapper>
        <Title>Before we proceed... </Title>
        <Message>This "dream drone" web platform is developed by the researchers from Social and Digital Systems Group at Arizona State University as a research tool to learn how crowd-generated fictions can shape future drone technologies. This platform will take between 15 - 20 minutes to navigate.</Message>
        <Message>Your participation is 100% voluntary and you may quit or exit at any time. However, all your answers up to that point will be shared with us anonymously. </Message>
        <Message>There are no foreseeable risks involved in participating in this study other than those
encountered in day-to-day life. At the end, you will be asked if you are interested
in participating in a follow-up interview. If you choose to provide contact information such as
your email address, your survey responses may no longer be anonymous to the researchers.
The contact information will be retained by the research team for up to three years. However, no
names or identifying information will be included in any publications or presentations.</Message>
        <Message>If you have any questions concerning the research study, please contact the research team: Piyum Fernando (<a href="mailto:pfernan4@asu.edu">pfernan4@asu.edu</a>) | Alejandra Rodriguez Vega (<a href="mailto:ale.rodriguez@asu.edu">ale.rodriguez@asu.edu</a>) | Stacey Kuznetsov (<a href="mailto:askuznet@asu.edu">askuznet@asu.edu</a>).</Message>
        <Message>If you have any questions about your rights as a participant in this research, or if you feel you have been placed at risk, you can contact the Chair of the Human Subjects Institutional Review Board, through the ASU Office of Research Integrity and Assurance, at (480) 965-6788.</Message>
        <Message>Click on the “Proceed” button below to start. By clicking “Proceed” you consent that <strong>you are at least 18 years of age</strong>. We thank you in advance for your time and effort!</Message>
        
        <StartButton onClick={() => this.startClick()}>Proceed</StartButton>
        
      </Wrapper>
    )
    return null;
  }


  startClick() {
   if (this.props.match.params.view) {
      this.props.history.push('/allstories');
      return
   }
    
    fetch('/users/',
      {
        method: 'POST',
        body: JSON.stringify({
        }),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Mode': "CORS"
        }
      }).then(response => response.json())
      .then(data => {
        fetch('/drones/',
          {
            method: 'POST',
            body: JSON.stringify({createdBy:data._id}),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Mode': "CORS"
            }
          }).then(response => response.json())
          .then(data => {
            console.log(data);
            this.props.history.push('superpowers/' + data._id);
          }
          );

      }
      );
  }
}

