import React, { Component } from "react";
import styled from "styled-components";
import Feature, { FeatureType as FeatureTypes } from "./Feature";
import DroneStory from "./DroneStory"
import LoadingWidget from "./LoadingWidget"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {isGibberish} from "../utils.js"
import {devices} from "../devices.js"


import {theme} from "../colorTheme";
import logo from '../drone.png';

const Wrapper = styled.div`
  width:100%;
`;

const Header = styled.div`
  width:100%;
  height: 6vh;
  background-color: ${theme.primaryColor};
  display:flex;
  justify-content:space-around;
  z-index:100;

  @media ${devices.mobile} {
    height: auto;
  }
  
`;

const HeaderText = styled.h2`
font-size:3vh;
width:80vw;
text-align:left;
font-family: 'Nunito';
font-weight:700;
color:#ffffff;
margin:auto 5vw;
letter-spacing: 0.1px

@media ${devices.mobile} {
  font-size:4vw;
  width:60vw;
  text-align:left;
  font-family: 'Nunito';
  font-weight:700;
  color:#ffffff;
  margin:1vw;
  letter-spacing: 0.1px
  padding:2vw;
}

`;

const ContentWrapper = styled.div`
  margin:auto;
  position:relative;
  display:flex
  justify-content:space-around;
  height: 94vh;

  @media ${devices.mobile} {
    flex-direction:column;
    height:auto;
  }

`;

const DroneWrapper = styled.div`
  position:relative;
  margin:auto;
`;

const DroneImage = styled.img`
  height:40vw;
  width:40vw;
  max-height:85vh;
  max-width:85vh;

  @media ${devices.mobile} {
    height:80vw;
    width:80vw;
    max-height:75vh;
    max-width:75vh;
    margin-top:2vh;
  }
`;

const Overlay = styled.div`
position:absolute;
top:0;
left:0;
max-height:50vh;
max-width:30vh;
background-color:yellow;
`;

const FixedFeatureWrapper = styled.div`
position:absolute;
top: ${props => props.top}vw;
left: ${props => props.left}vw;
`;


const RowWrapper = styled.div`
  display:flex
  justify-content:space-around;
  flex-direction:column;

  @media ${devices.mobile} {
    margin:auto;
  }

`;

const Row = styled.div`
@media ${devices.mobile} {
  width:95vw;
}

`;

const RowHeader = styled.h3`
font-size: 1.5vw
margin: auto ;
font-family: 'Nunito';
font-weight:700;
color: ${theme.primaryColor};

@media ${devices.mobile} {
  padding-top:4vw;
  font-size: 5vw;
}
`;

const CircleButton = styled.button`
border-radius:100%;
border: solid 1px ${theme.secondaryColor};
background-color:${theme.secondaryColor};
width:3vw;
height:3vw;
max-height:3vw;
transition: transform .3s;
cursor: pointer;
text-align: center;
vertical-align: middle;

&:hover{
  transform:scale(1.1)

}
font-size: 1.2vw
margin: auto;
font-family: "Nunito";
font-weight: 900
color:#ffffff;
outline:none;

@media ${devices.mobile} {
  width:8vw;
  height:8vw;
  max-height:8vw;
  font-size: 5vw
}

`;

const Button = styled.button`
border-radius:0.5vw;
border: solid 1px ${theme.primaryColor};
background-color:#ffffff;
min-width:7vw;
height:2.3vw;
max-height:2.3vw;
transition: transform .3s;
cursor: pointer;
text-align: center;
vertical-align: middle;

&:hover{
  background-color:${theme.secondaryColor};
  color:#ffffff;
  border: solid 1px ${theme.primaryColor};
}
font-size: 1.2vw
margin: auto 1vw;
font-family: "Nunito";
font-weight: 900
color:${theme.primaryColor};
outline:none;

@media ${devices.mobile} {
  width:20vw;;
  height:auto;
  max-height:10vw;
  font-size: 4vw
  
}

`;


const FeatureSet = styled.div`
  width:100vw;
  display:flex
  justify-content:space-between;
  margin:10px;

  @media ${devices.mobile} {
    margin:auto;
    width:90vw;
  }
`;

const OverlayFeatureSet = styled.div`
  width:25vw;
  display:flex
  justify-content:space-around;
  margin:10px;
`;

const FeatureWrapper = styled.div`
  margin-bottom: 5px;
`;

const DroneStroryWrpper = styled.div`
  width:90vw;
  display:flex
  justify-content:space-around;
`;

const StoryInputWrapper = styled.div`
position:relative;
  width: 70vw;
  min-height: 40vh;
  background-color: #efefef;
  margin: 5vh auto;
  border-radius: 2vw;
`;

const StoryInput = styled.textarea`
font-size: 2vw
margin: 5vh;
font-family: "Nunito";
font-weight: 500
color:${theme.primaryColor};
width: 60vw;
height: 30vh;
background-color:#efefef;
resize: none;
  border: none;
  overflow: auto;
  outline: none;
  text-align:center;
`;

const StoryPrompt = styled.p`
font-size: 1.3vw
 
  margin: auto;
  font-family: "Roboto";
  font-weight: 400;
  padding:2vw;
 
  text-align:center;
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

const DotWrapper = styled.div`
  width: 15vw;
  height: 2vw;
  margin:auto;
  display:flex;
  justify-content:space-around;

  @media ${devices.mobile} {
    width: 30vw;
  height: 3vw;
  }
`;

const Dot = styled.div`
  width:1vw;
  height:1vw;
  background-color:${props => props.selected ? theme.secondaryColor : '#DCDCDC'};
  border-radius:5vw;

  @media ${devices.mobile} {
    width:2vw;
    height:2vw;
  }
`;




const STORY_PLACEHOLDER = "Add your story";

const STORY_PROMPT = "Add your own story about this drone. Where does it fly? What does it do there and why?"

const DRONE_SET_SIZE = 9;
const VISIBLE_DRONES_COUNT = 1;

const LEFT_FACTOR = 26;
const TOP_FACTOR = 13;
const LEFT_0 = 6.5;
const TOP_0 = 6.5;

var dronePool = [];

class SelectStoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblefeatureIndex: 0,
      visibleFetures: [],
      droneSet: [],
      selectedFetures: [],
      drone: null,
      droneStory: "",
      droneStoryPlaceholder: STORY_PLACEHOLDER,
      position: -1,
      renderStoryInput: false
    };
  }

  componentDidMount() {
    document.title="Dream Drone"
    
    //fetch features, populate the feature pool, populate featureset
    fetch("/random/drones/99")
      .then(response => response.json())
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          fetch("/drones/" + data[i]._id)
            .then(response => response.json())
            .then(data => {
              
              !data.isFlagged && data.name && !isGibberish(data.name,5)&&dronePool.push(data);

              if(this.state.droneSet.length<=0 && dronePool.length>DRONE_SET_SIZE){
                this.setDroneSet(DRONE_SET_SIZE)
              }
            });
        }
        
      });

    //fetch the drone data using id
    fetch("/drones/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        this.setState({ drone: data });
      });

      
  }

  updateDrone() {
    fetch('/drones/' + this.state.drone._id,
      {
        method: 'PUT',
        body: JSON.stringify(this.state.drone),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Mode': "CORS"
        }
      }).then(response => response.json())
      .then(data => { console.log(data) }
      );
  }

  render() {

    
    if (this.state.drone == null) return <LoadingWidget></LoadingWidget>;

    if(!this.state.droneSet.length>0) return <LoadingWidget></LoadingWidget>;

    return (
      <Wrapper>
        <Header>
          <Button onClick={() => { this.props.history.push('../story/' + this.state.drone._id) }}>Back</Button>
          <HeaderText>Step 3 of 3: Write a story about someone else’s dream drone.</HeaderText>
          {this.renderButton()}
        </Header>
        <ContentWrapper>


          <RowWrapper>

            <Row>
              {/* <RowHeader>Pick a dream drone and add a story to it</RowHeader> */}
              <FeatureSet>
                <CircleButton onClick={() => this.handlePreviousClick()}>{'<'}</CircleButton>
                <DroneStroryWrpper>
                  {this.state.droneSet.slice(this.state.visiblefeatureIndex, this.state.visiblefeatureIndex + VISIBLE_DRONES_COUNT).map((item, key) =>
                    <DroneStory drone={item}
                      index={this.state.visiblefeatureIndex + key}
                      callback={this.writeCallbackHandler.bind(this)}
                      selected={this.state.position == key}
                      disabled={this.state.position >= 0 || this.state.position != key}
                    ></DroneStory>
                    , this)}
                </DroneStroryWrpper>

                <CircleButton onClick={() => this.handleNextClick()}>></CircleButton>
              </FeatureSet>
            </Row>
            {!this.state.renderStoryInput && <Row>
              <DotWrapper>
                {this.renderScrollDots()}
              </DotWrapper>
            </Row>}
          </RowWrapper>
        </ContentWrapper>


        {/* {this.state.renderStoryInput && <StoryInputWrapper ref="bottom">
          <StoryPrompt>{STORY_PROMPT}</StoryPrompt>
          <StoryInput
            placeholder={this.state.droneStoryPlaceholder}
            onClick={(ev) => { this.setState({ droneStoryPlaceholder: "" }) }}
            onBlur={(ev) => { this.setState({ droneStoryPlaceholder: STORY_PLACEHOLDER }); }}
            value={this.state.droneStory}
            onChange={(ev) => this.onDroneStoryChange(ev)}>
          </StoryInput>
          <Arrow position={this.state.position}></Arrow>
        </StoryInputWrapper>} */}

      </Wrapper>
    )
  }

  renderButton() {
    if (this.state.drone.features.length > 0) {
      return <Button onClick={() => { this.props.history.push('../complete/' + this.state.drone.createdBy._id) }}>Submit</Button>
    }
    return null;
  }

  writeCallbackHandler() {

  }

  onDroneStoryChange(ev) {
    this.setState({ droneStory: ev.target.value });
  }


  handleNextClick() {
    let index = this.state.visiblefeatureIndex;
    if (index != null && (index + VISIBLE_DRONES_COUNT) < this.state.droneSet.length) {
      this.setState({ visiblefeatureIndex: (index + VISIBLE_DRONES_COUNT) })
    }
  }

  handlePreviousClick() {
    let index = this.state.visiblefeatureIndex;
    if (index != null && (index - VISIBLE_DRONES_COUNT) >= 0) {
      this.setState({ visiblefeatureIndex: (index - VISIBLE_DRONES_COUNT) })
    }
  }

  setDroneSet(length) {
 
    var droneSet = [];
    droneSet = dronePool.splice(0, length)
    this.setState({ droneSet: droneSet });
  }


  renderScrollDots() {
    let dots = []
    let selected = false;
    let index = this.state.visiblefeatureIndex;


    for (let i = 0; i < DRONE_SET_SIZE / VISIBLE_DRONES_COUNT; i++) {
      selected = i == index / VISIBLE_DRONES_COUNT;
      dots.push(<Dot selected={selected}></Dot>)
    }
    return dots;
  }






}

export default SelectStoryView;
