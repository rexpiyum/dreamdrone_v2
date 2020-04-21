import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import logo from '../drone.png';
import {theme} from "../colorTheme";
import DroneStory from "./DroneStory";
import {devices} from "../devices.js"





const slide = keyframes`
  from {
      opacity: 0;
      // transform: translateY(5vh);
  }
  to {
      opacity: 1;
      // transform: translateY(0);
  }
`

const StoryImage = styled.img`
  max-height:60vh;
  width: auto;
  height: auto;
  margin:auto;

  @media ${devices.mobile} {
    width:95vw;
    height: auto;
  }
  

`;

const StoryText = styled.h1`
  font-size: 2.5vw
  margin: auto;
font-family: "Nunito";
font-weight: 900
color:${theme.primaryColor};

@media ${devices.mobile} {
  font-size: 6vw
  
}

`;

const StoryBoard = styled.div`
height:100vh
display:flex;
flex-direction:column;
justify-content:space-evenly;
animation: ${slide} 4s ease;

@media ${devices.mobile} {
  width:95vw;
  margin:auto;
  
}
`;


const StartButton = styled.button`
border-radius: 0.5vw;
border: solid 1px ${theme.secondaryColor};
background-color:#ffffff;
// height:5vw;
// max-height:5vw;
transition: transform .3s;
cursor: pointer;
text-align: center;
vertical-align: middle;
padding:1vw;
background-color:${props => props.fill?theme.secondaryColor :'#ffffff'};
color: ${props => props.fill? '#ffffff': theme.secondaryColor};
display:inline;

font-size: 1.5vw
margin: auto 1vw;
margin-bottom: 1vw;
font-family: "Nunito";
font-weight: 900
outline:none;

@media ${devices.mobile} {
  display:block;
  margin:4vw auto;
  padding:2vw;
  font-size: 4vw
}

`;

const SampleStory = styled.div`
max-height:60vh
display:flex;
justify-content:space-evenly;

@media ${devices.mobile} {
  max-height:60vw
  width:95vw;
  margin:auto;
  
}
`;

const SampleStoryContent = styled.div`
// height:60vh
width:40vw;
display:column;
margin:auto;
margin-top:10vh;
// background-color:#D9D9D9;
padding:2.5vw;
border: 3px solid #D9D9D9;
border-radius: 5% 10% 5% 4% / 2% ;

@media ${devices.mobile} {
  width:90vw;
  margin-top:2vh;
  margin:auto;
  
}
`;

const Arrow = styled.div`
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 20px solid ${props => props.position == 1 ? '#efefef' : 'transparent'};
  border-right: 20px solid ${props => props.position == 1 ? 'transparent' : '#efefef'};
  border-top: 20px solid transparent;
  border-bottom: 20px solid #efefef;
  left: ${props => props.position == 0 ? 10 : props.position == 1 ? 50 : 90}%;
  top: -40px;
`;

const SampleStoryImage = styled.img`
  
  max-height:60vh;
  width: auto;
  height: auto;
  margin:auto;
`;

const SampleStoryText = styled.h1`
  font-size: 1.9vw
  margin: 1vh auto;
font-family: 'Caveat', cursive;
font-weight: 400;
text-align:left;

@media ${devices.mobile} {
  font-size: 5vw
  margin:auto;
}
`;

const SampleStoryTile = styled.h1`
  font-size: 2.5vw
  margin: 1vh auto;
font-family: 'Caveat', cursive;
font-weight: 900;

@media ${devices.mobile} {
  font-size: 8vw
  margin:auto;
}
`;




const Story = [
  { text: "This is a drone. It can fly as high as you want.", imgSrc: require('../story1.jpg') },
  { text: "It can fly over trees, roads, or buildings...", imgSrc: require('../story2.jpg') },
  { text: "You can control it from below.", imgSrc: require('../story3.jpg') },
  { text: "You can add cool superpowers and turn it into your dream drone.", imgSrc: require('../story4.jpg') }
  // {text: "And, you can tell us a story about your  dream drone.", imgSrc: require('../story5.jpg') }

];

var intervelRef = null;

const boards = [
  <StoryBoard><StoryImage src={require('../story1.jpg')} alt="logo" ></StoryImage><StoryText>{"This is a drone. It can fly as high as you want."}</StoryText></StoryBoard>,
  <StoryBoard><StoryImage src={require('../story2.jpg')} alt="logo" ></StoryImage><StoryText>{"It can fly over trees, roads, or buildings..."}</StoryText></StoryBoard>,
  <StoryBoard><StoryImage src={require('../story3.jpg')} alt="logo" ></StoryImage><StoryText>{"You can control it from below."}</StoryText></StoryBoard>,
  <StoryBoard><StoryImage src={require('../story4.jpg')} alt="logo" ></StoryImage><StoryText>{"You can add cool superpowers and turn it into your dream drone..."}</StoryText></StoryBoard>,
  

]

var boardDisplay = []


export default class StartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyIndex: 0
    };
  }

  componentDidMount() {
    document.title="Dream Drone"
    this.setState({ storyIndex: 0 });
    intervelRef = setInterval(this.runStorySequence, 5000)
  }

  componentDidUpdate() {
    this.end.scrollIntoView({ behavior: "smooth" });
  }

  render() {

    return (
      <div ref="bottom">
        {boards.map((item, key) =>
          this.state.storyIndex >= key && item
        )}
        {(this.state.storyIndex == boards.length  ) && 
          <StoryBoard>
          <SampleStory>
            {/* <SampleStoryImage src={require('../story5.jpg')} alt="logo" ></SampleStoryImage> */}
            <SampleStoryContent>
              <SampleStoryTile>{"Study Drone Bud"}</SampleStoryTile>
              <SampleStoryText>This drone is flown all over campus or office space. Its goal is to create the perfect environment for productivity. Have your office/study space be the perfect temperature. Ask it any question that you have and it will give you the right answer, it can also help you not get bored.
        Its night vision is ideal to use when walking home from those long study sessions.</SampleStoryText>
            </SampleStoryContent>
          </SampleStory>
          <StoryText>{"and then, you can write a cool story about your dream drone!"}</StoryText>
          <div><StartButton fill={true} onClick={() => this.startClick()}>+ Create your own dream drone!</StartButton>
          <StartButton onClick={() => this.props.history.push('/consent/view')}>View what others created</StartButton>
          </div>
          
          </StoryBoard>
        }
        <div ref={(el) => { this.end = el; }}></div>
      </div>
    )
    return null;
  }

  runStorySequence = () => {
    var index = this.state.storyIndex;
    if (index < boards.length) {
      if(index <boards.length-1){
        boardDisplay.push(boards[index])
      }
      index++;
      this.setState({ storyIndex: index });

    }
    else (clearInterval(intervelRef))
  }


  startClick() {
    this.props.history.push('/consent');

    // fetch('/users/',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify({
    //     }),
    //     headers: {
    //       'Accept': 'application/json, text/plain, */*',
    //       'Content-Type': 'application/json',
    //       'Mode': "CORS"
    //     }
    //   }).then(response => response.json())
    //   .then(data => {
    //     fetch('/drones/',
    //       {
    //         method: 'POST',
    //         body: JSON.stringify({createdBy:data._id}),
    //         headers: {
    //           'Accept': 'application/json, text/plain, */*',
    //           'Content-Type': 'application/json',
    //           'Mode': "CORS"
    //         }
    //       }).then(response => response.json())
    //       .then(data => {
    //         console.log(data);
    //         this.props.history.push('superpowers/' + data._id);
    //       }
    //       );

    //   }
    //   );
  }
}

