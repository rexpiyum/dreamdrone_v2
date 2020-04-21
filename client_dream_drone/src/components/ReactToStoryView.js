import React, { Component } from "react";
import styled from "styled-components";
import LoadingWidget from "./LoadingWidget"
import { isGibberish } from "../utils.js"
import { devices } from "../config/devices.js"
import Header from "./commons/header/Header"
import Drone from "./drone/Drone"
import DroneStory from "./drone/DroneStory"
import DroneReactions from "./drone/DroneReactions"



import { theme } from "../colorTheme";
import logo from '../drone.png';

const Wrapper = styled.div`
  width:100%;
`;

const ContentWrapper = styled.div`
  position:relative;
  margin:auto;
  position:relative;
  height:auto;

  @media ${devices.mobile} {
    flex-direction:column;
    height:auto;
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



const DroneStroryWrpper = styled.div`
  display:flex
  justify-content:space-around;
  width:100%;
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

class ReactToStoryView extends Component {
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
    document.title = "Dream Drone"

    //fetch features, populate the feature pool, populate featureset
    fetch("/random/drones/99")
      .then(response => response.json())
      .then(data => {
        for (var i = 0; i < data.length; i++) {
          fetch("/drones/" + data[i]._id)
            .then(response => response.json())
            .then(data => {

              !data.isFlagged && data.name && !isGibberish(data.name, 5) && dronePool.push(data);

              if (this.state.droneSet.length <= 0 && dronePool.length > DRONE_SET_SIZE) {
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

    if (!this.state.droneSet.length > 0) return <LoadingWidget></LoadingWidget>;

    return (
      <Wrapper>
        <Header text={"3.What do you think about someone else’s dream drone"} 
        onBackCallback={()=>this.props.history.push('../story/' + this.state.drone._id)}
        onDoneCallback={this.getNextCallbackFunction()}>
        </Header>
        <ContentWrapper>
          <DroneStroryWrpper>
            {this.state.droneSet.slice(this.state.visiblefeatureIndex, this.state.visiblefeatureIndex + VISIBLE_DRONES_COUNT).map((item, key) =>
              <div>
                <Drone drone={item}></Drone>
                <DroneStory name={item.name} story={item.mainStory ? item.mainStory.text : ""}></DroneStory>
              </div>
              , this)}
          </DroneStroryWrpper>
          <DroneReactions></DroneReactions>
        </ContentWrapper>

        {/* <RefreshButton onClick={() => { this.handleNextClick() }}>See a Different Drone</RefreshButton> */}

      </Wrapper>
    )
  }

  getNextCallbackFunction() {
      return () => this.props.history.push('../complete/' + this.state.drone.createdBy._id)
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

export default ReactToStoryView;
