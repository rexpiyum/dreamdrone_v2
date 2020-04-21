import React, { Component } from "react";
import styled from "styled-components";
import Feature, { FeatureType as FeatureTypes } from "./Feature";
import DroneStory from "./DroneStory"
import LoadingWidget from "./LoadingWidget"
import ReadOnlyFeature from "./PrintableReadOnlyFeature"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { isGibberish } from "../utils.js"
import { devices } from "../devices.js"
import { CSVLink, CSVDownload } from "react-csv";




import { theme } from "../colorTheme";
import logo from '../drone.png';

const Wrapper = styled.div`
  width:100%;
`;

const Header = styled.div`
  width:100%;
  height: 12vh;
  // background-color: ${theme.primaryColor};
  background-color: white;
  z-index:100;
  position:fixed;
  top:0;
  
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
`;

const ContentWrapper = styled.div`
  margin:auto;
  position:relative;
  display:flex
  justify-content:space-around;
  height: 94vh;

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

`;

const Row = styled.div`


`;

const RowHeader = styled.h3`
font-size: 1.5vw
margin: auto ;
font-family: 'Nunito';
font-weight:700;
color: ${theme.primaryColor};
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
`;


const FeatureSet = styled.div`
  width:100vw;
  display:flex
  justify-content:space-between;
  margin:10px;
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
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  
  
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
`;

const Dot = styled.div`
  width:1vw;
  height:1vw;
  background-color:${props => props.selected ? theme.secondaryColor : '#DCDCDC'};
  border-radius:5vw;
`;

const TitleText = styled.h1`
  font-size: 2vw
  margin:auto;
  margin-top:15vh;
  margin-bottom:3vh;

font-family: "Nunito";
font-weight: 900
color:${theme.primaryColor};

@media ${devices.mobile} {
  font-size:4.5vw;  
}
`;

const Message = styled.p`
font-size: 1.3vw
 
  margin-bottom:1vh;
  margin-top:2vh;
  font-family: "Roboto";
  font-weight: 400;
  // color:${theme.primaryColor};
  text-align:center;
  padding:0.5vw;
`;

const CreateButton = styled.button`
position:absolute;
right:2vh;
top:2vh;
border-radius:.8vw;
border: solid 2px #ffffff;
background-color:${theme.secondaryColor};
min-width:15vw;
height:8vh;
transition: transform .3s;
cursor: pointer;
text-align: center;
vertical-align: middle;
overflow:scroll;
padding:0.5vw;
font-size: 1.5vw;
font-family: "Nunito";
font-weight: 700
color:#ffffff;
outline:none;

@media ${devices.mobile} {
  font-size: 4vw;
  width:auto;
  height:auto;
  padding:4vw 2vw;
}

`;




const STORY_PLACEHOLDER = "Add your story";

const STORY_PROMPT = "Add your own story about this drone. Where does it fly? What does it do there and why?"

const DRONE_SET_SIZE = 20;
const VISIBLE_DRONES_COUNT = 1;

const LEFT_FACTOR = 26;
const TOP_FACTOR = 13;
const LEFT_0 = 6.5;
const TOP_0 = 6.5;

var dronePool = [];

class AllStoriesView extends Component {
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
      renderStoryInput: false,
      createButtonText: "+ Create your own dream drone",

      featureCount:{},
      features:[],
      featureCSV:[]
    };
  }

  componentDidMount() {
    document.title = "Dream Drone"
    window.scrollTo(0, 0)


    //fetch features, populate the feature pool, populate featureset

    fetch("/features")
      .then(response => response.json())
      .then(features => {
        this.setState({features:features})
        var featureCount = {};
        for (var i = 0; i < features.length; i++) {
          featureCount[features[i]._id] = 0;
        }
        fetch("/drones")
          .then(response => response.json())
          .then(data => {
            for (var i = 0; i < data.length; i++) {
              fetch("/drones/" + data[i]._id)
                .then(response => response.json())
                .then(data => {

                  !data.isFlagged && data.name && !isGibberish(data.name, 5) && dronePool.push(data);

                  for (var i = 0; i < data.features.length; i++) {
                    if(!data.features[i].isFlagged){
                    featureCount[data.features[i]._id] += 1;
                    }
                  }

                  this.setState({featureCount:featureCount})

                  if (dronePool.length > DRONE_SET_SIZE) {
                    this.setDroneSet(DRONE_SET_SIZE)
                  }
                });
            }

          });


      });




    //fetch the drone data using id
    // fetch("/drones/" + this.props.match.params.id)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.setState({ drone: data });
    //   });


  }

  // updateDrone() {
  //   fetch('/drones/' + this.state.drone._id,
  //     {
  //       method: 'PUT',
  //       body: JSON.stringify(this.state.drone),
  //       headers: {
  //         'Accept': 'application/json, text/plain, */*',
  //         'Content-Type': 'application/json',
  //         'Mode': "CORS"
  //       }
  //     }).then(response => response.json())
  //     .then(data => { console.log(data) }
  //     );
  // }

  render() {


    // if (this.state.drone == null) return <LoadingWidget></LoadingWidget>;

    if (!this.state.droneSet.length > 0) return <LoadingWidget></LoadingWidget>;
    return (
      <Wrapper>

        <CreateButton onClick={()=>{this.createCSV()}}>Create CSV</CreateButton>

        <CSVLink 
        data={this.state.featureCSV}
        filename={"drone_features.csv"}
        >Download CSV</CSVLink>
        
        {this.state.features.map((item, key) =>
        !item.isFlagged&&<ReadOnlyFeature
        title={item.title + " " + this.state.featureCount[item._id]}
        description = {item.description}
        >
        </ReadOnlyFeature>
          , this)}
        
        <ContentWrapper>
          <DroneStroryWrpper>
            {this.state.droneSet.map((item, key) =>
              <DroneStory drone={item}
                index={this.state.visiblefeatureIndex + key}
                callback={this.writeCallbackHandler.bind(this)}
                selected={this.state.position == key}
                disabled={this.state.position >= 0 || this.state.position != key}
              ></DroneStory>
              , this)}
          </DroneStroryWrpper>

        </ContentWrapper>
      </Wrapper>
    )
  }

  createCSV(){

    var printCSV = []

    this.state.features.map((item, key) =>{
      if(!item.isFlagged){

      let featureObj = {
        title:item.title.replace(/(\r\n|\n|\r)/gm, ""),
        description: item.description.replace(/(\r\n|\n|\r)/gm, ""),
        count: this.state.featureCount[item._id]
      }
      printCSV.push(featureObj)
      }
      
    })

    printCSV.sort((a,b)=>{
      return (b.count - a.count)
    })
    this.setState({featureCSV:printCSV})
    alert(JSON.stringify(this.state.featureCSV))

  }

  createButton() {
    this.setState({ createButtonText: "Setting up..." })
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
            body: JSON.stringify({ createdBy: data._id }),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Mode': "CORS"
            }
          }).then(response => response.json())
          .then(data => {
            console.log(data);
            this.props.history.push('../superpowers/' + data._id);
          }
          );

      }
      );
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
    //droneSet = dronePool.splice(0, length)
    droneSet = dronePool;
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

export default AllStoriesView;
