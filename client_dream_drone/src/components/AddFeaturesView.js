import React, { Component } from "react";
import styled from "styled-components";
import Feature, { FeatureType as FeatureTypes } from "./feature/Feature";
import NewFeature from "./feature/NewFeature";
import Drone from "./drone/Drone"
import LoadingWidget from "./LoadingWidget";
import {isGibberish} from "../utils.js"
import {devices} from "../devices.js"
import Header from "./commons/header/Header"


 import {theme} from "../config/colorTheme";

const Wrapper = styled.div`
  width:100%;
  position:relative;
`;

const ContentWrapper = styled.div`
  margin:auto;
  position:relative;

  @media ${devices.mobile} {
    flex-direction:column;
    height:auto;
  }

`;

const DroneContainer = styled.div`
  position:relative;
  margin:auto;
  height:54vh;
  overflow:visible;
  
`;

const FeatureContainer = styled.div`
height:38vh;
  display:flex
  @media ${devices.mobile} {
    margin:auto;
  }
`;

const CreateFeatureContainer = styled.div`
  width:30vw;
  background-color:${theme.secondaryColor20}
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: flex-start;

`;

const FeatureSetContainer = styled.div`
  width:70vw;
  background-color:${theme.primaryColor20};
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: flex-start;
`;

const RowHeader = styled.h3`
font-size: 1.2vw
font-family: 'Roboto';
font-weight:700;
text-transform:uppercase;
color: ${theme.black};
text-align:left;

@media ${devices.mobile} {
  padding-top:4vw;
  font-size: 5vw;
}

`;

const PaginationButton = styled.img`
width:2vw;
height:2vw;
cursor: pointer;
transition: transform .3s;
outline:none;
margin:auto 0.2vw;
&:hover{
  transform:scale(1.1);
}

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
margin: auto;
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
  display:flex
  justify-content:space-around;  
  @media ${devices.mobile} {
    margin:auto;
    width:90vw;
  }
`;

const DotWrapper = styled.div`
  width: 10vw;
  height: 1.8vh;
  margin: auto;
  display:flex;
  justify-content:space-around;

  @media ${devices.mobile} {
    width: 20vw;
    height: 3vw;
  }
`;

const Dot = styled.div`
  width:1.5vh;
  height:1.5vh;
  background-color:${props => props.selected ? theme.primaryColor : '#DCDCDC'};
  border-radius:5vw;

  @media ${devices.mobile} {
    width:2vw;
    height:2vw;
    margin: 4vw auto;
  }
`;


const FEATURE_SET_SIZE = 12;
var VISIBLE_FEATURES_COUNT = 3;

var LEFT_FACTOR = 26;
var TOP_FACTOR = 13;
var LEFT_0 = 6.5;
var TOP_0 = 6.5;

const dummyArrayOfFour = ["", "", "", ""];



var featurePool = [
  { title: "Night Vision", description: "Ability to  record videos in dark" },
  { title: "Thermal Cam", description: "A camera that can capture surface temperatures of objects below" },
  { title: "Time Travel Cam", description: "A camera that capture videos of past, present and future incidents" },
  { title: "X-Ray", description: "Ability to see through physical objects" },
  { title: "Night Visio 2", description: "Ability to  record videos in dark" },
  { title: "Thermal Cam 2", description: "A camera that can capture surface temperatures of objects below" },
  { title: "Time Travel Cam 2", description: "A camera that capture videos of past, present and future incidents" },
  { title: "X-Ray 2", description: "Ability to see through physical objects" },
  { title: "Night Visio 3", description: "Ability to  record videos in dark" },
  { title: "Thermal Cam 4", description: "A camera that can capture surface temperatures of objects below" },
  { title: "Time Travel Cam 5", description: "A camera that capture videos of past, present and future incidents" },
  { title: "X-Ray 6", description: "Ability to see through physical objects" },
  { title: "Night Visio 8", description: "Ability to  record videos in dark" },
  { title: "Thermal Cam 8", description: "A camera that can capture surface temperatures of objects below" },
  { title: "Time Travel Cam 8", description: "A camera that capture videos of past, present and future incidents" },
  { title: "X-Ray 8", description: "Ability to see through physical objects" }

];

class AddStoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblefeatureIndex: 0,
      visibleFetures: [],
      featureSet: [],
      selectedFetures: [],
      drone: null
    };

    
  }

  componentDidMount() {
    if(window.innerWidth < 800){
      VISIBLE_FEATURES_COUNT = 2;
      LEFT_FACTOR = 65;
      TOP_FACTOR = 32;
      LEFT_0 = 7.2;
      TOP_0 = 9.6;
    }
    document.title="Dream Drone";
    //fetch features, populate the feature pool, populate featureset
    fetch("/features/")
      .then(response => response.json())
      .then(data => {
        featurePool = data;
        this.setFeatureSet(FEATURE_SET_SIZE);
      });

    //fetch the drone data using id
    fetch("/drones/" + this.props.match.params.id)
      .then(response => response.json())
      .then(data => {
        this.setState({drone: data});
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

    if ((this.state.drone == null) && this.state.featureSet) return <LoadingWidget></LoadingWidget>;

    return (
      <Wrapper>
        <Header text={"1. Add Superpowers to your Dream Drone"} disableNext={this.state.drone.features.length<=0} onNextCallback={this.state.drone.features.length>0? ()=>this.props.history.push('../story/' + this.state.drone._id):null}>
        </Header>
        <ContentWrapper>
          <DroneContainer>
            <Drone featureClickHandler={this.handleFeaureClick.bind(this)} editable={true} drone={this.state.drone}></Drone>
          </DroneContainer>
          <FeatureContainer>
            <CreateFeatureContainer>
              <RowHeader>+ Create new superpower</RowHeader>
                <NewFeature createdBy={this.state.drone.createdBy} clickHandler={this.handleAddNewFeatureClick.bind(this)} />
            </CreateFeatureContainer>
            <FeatureSetContainer>
              <RowHeader>or, choose from what others have created</RowHeader>
              <FeatureSet>
                <PaginationButton src={require('./assets/left_arrow_icon.svg')} onClick={() => this.handlePreviousClick()}></PaginationButton>
                {this.state.featureSet.slice(this.state.visiblefeatureIndex, this.state.visiblefeatureIndex + VISIBLE_FEATURES_COUNT).map((item, key) =>
                  <Feature title={item.title} description={item.description} featureType={FeatureTypes.selectable} clickHandler={this.handleFeaureClick.bind(this)} index={this.state.visiblefeatureIndex + key}></Feature>
                  , this)}
                <PaginationButton src={require('./assets/right_arrow_icon.svg')} onClick={() => this.handleNextClick()}></PaginationButton>
              </FeatureSet>
                <DotWrapper>
                  {this.renderScrollDots()}
                </DotWrapper>
              </FeatureSetContainer>
          </FeatureContainer>
        </ContentWrapper>
      </Wrapper>
    )
  }

  renderButton() {
    if (this.state.drone.features.length > 0) {
      return <Button onClick={() => {this.props.history.push('../story/' + this.state.drone._id)}}>Next</Button>
    }
    return null;
  }

  renderScrollDots() {
    let dots = []
    let selected = false;
    let index = this.state.visiblefeatureIndex;
    

    for (let i = 0; i < FEATURE_SET_SIZE / VISIBLE_FEATURES_COUNT; i++) {
      selected = i == index/VISIBLE_FEATURES_COUNT;
      dots.push(<Dot selected={selected}></Dot>)
    }
    return dots;
  }

  handleFeaureClick = (feature) => {
    let drone = this.state.drone;
    if (feature.featureType == FeatureTypes.selectable) {
      if (drone.features.length >= 4){
        this.displayMaxFeaturesAlert();
        return
      }
      let featureSet = this.state.featureSet;
      drone.features.push(featureSet[feature.index]);
      if (featurePool.length) {
        featureSet[feature.index] = featurePool.pop();
        this.setState({ featureSet: featureSet });
      } else {
        //TODO: refresh pool
      }

    } else {
      drone.features.splice(feature.index, 1); //remove button action

    }
    this.setState({ drone: drone });
    this.updateDrone();
  }

  handleAddNewFeatureClick = (feature) => {
    let drone = this.state.drone;
    if (drone.features.length >= 4){
      this.displayMaxFeaturesAlert();
      return
    }
    drone.features.push(feature);
    this.setState({ drone: drone });
    this.updateDrone();
  }

  displayMaxFeaturesAlert(){
    alert("Your dream drone can have a maximum of 4 superpowers.");
  }

  handleNextClick() {
    let index = this.state.visiblefeatureIndex;
    if (index != null && (index + VISIBLE_FEATURES_COUNT) < this.state.featureSet.length) {
      this.setState({ visiblefeatureIndex: (index + VISIBLE_FEATURES_COUNT) })
    }
  }

  handlePreviousClick() {
    let index = this.state.visiblefeatureIndex;
    if (index != null && (index - VISIBLE_FEATURES_COUNT) >= 0) {
      this.setState({ visiblefeatureIndex: (index - VISIBLE_FEATURES_COUNT) })
    }
  }

  setFeatureSet(length) {
    var featureSet = [];
    for(var item of featurePool){
      if(!isGibberish(item.title,4) && !isGibberish(item.description,8)){
        featureSet.push(item);
        if(featureSet.length>= length) {
          break;
        }
      }
    };
    //featureSet = featurePool.splice(0, length)
    this.setState({ featureSet: featureSet });
  }






}

export default AddStoryView;
