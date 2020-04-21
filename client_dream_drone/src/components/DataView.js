import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import Drone from "./Data_Drone";
import {isGibberish} from "../utils.js";



import {theme} from "../colorTheme"
import { CSVLink, CSVDownload } from "react-csv";
import { doesNotReject } from "assert";


// import {devices} from "../devices";

const Wrapper = styled.div`
  position:relative;
  display:flex;  
  height:80vh;
  width:100vw;
  margin:5vh 0;
  padding-bottom:5vh
`;

const DroneWrapper = styled.div`
  display:flex;  
`;

const ToggleButton = styled.div`
  background-color: ${props => props.flagged?'red':'green'};
  padding:1vw;
  margin:1vw;
`;

const FilterButton = styled.div`
  
  background-color:yellow;
  position:absolute;
  z-index:100;
  top:0;
  right:0;
  width:20vw;
  height:3vw;

`;

const LeftWrapper = styled.div`
  margin:auto 1vw;
  padding:2vw;
  // border-radius:2vw;
  // border: solid 1px ${theme.primaryColor};
  
  height:95vh;
  width:30vw;
  overflow:scroll;
`;

const RightWrapper = styled.div`
  margin:auto 1vw;
  padding:1vw;
  border-radius:2vw;
  // border: solid 1px ${theme.primaryColor};
  
  height:95vh;
  width:68vw;
  overflow:scroll;
`;

const DroneListItem = styled.div`
  margin:1vw;
  padding:1vw;
  border-radius: 0.5vw;
  border: solid 1px ${theme.primaryColor};

  &:hover{
    transform: scale(1.04);

  }
`;


const DroneImage = styled.img`
  height: 30vw;
  width: 30vw;
  max-height:85vh;
  max-width:85vh;
  margin: auto;
  margin-left:2vw
`;

const Overlay = styled.div`
position:absolute;
top:0;
left:0;
height: 25vw;
  width: 25vw;
  max-height:85vh;
  max-width:85vh;
`;

const FixedFeatureWrapper = styled.div`
position:absolute;
top: ${props => props.top}vw;
left: ${props => props.left}vw;
margin:auto;
`;

const DroneName = styled.h2`
font-size: 2.2vw;
  font-family: "Roboto";
  font-weight: 400;
  text-align:center;
`;

const StoryWrapper = styled.div`
width: 40vw;
overflow:scroll;
`;

const MainStory = styled.div`
  font-size: 1.2vw;
  font-family: "Roboto";
  font-weight: 400;
  resize: none;
  resize: none;
  border: none;
  outline: none;
  text-align:center;
  height:auto;
  margin-top:2vh;
  width: 35vw;
  border-radius:1vw;
   border: solid 1px ${theme.primaryColor};
   padding:2vw;
`;

const SubStory = styled.div`
  font-size: 1.2vw;
  font-family: "Roboto";
  font-weight: 400;
  resize: none;
  resize: none;
  border: none;
  outline: none;
  text-align:center;
  width:35vw;
  background-color:#D9D9D9;
  margin: 2vh 0;
  border-radius: 1vw;
  padding:1vw 2vw;
`;

const WriteButton = styled.button`
border-radius:.8vw;
border: solid 2px #ffffff;
background-color:${theme.secondaryColor};
height:3vw;
min-width:15vw;
max-height:3vw;
transition: transform .3s;
cursor: pointer;
text-align: center;
vertical-align: middle;
overflow:scroll;
padding:0.5vw;
margin: 2vh auto;
font-size: 1.2vw
font-family: "Nunito";
font-weight: 700
color:#ffffff;
outline:none;
`;

const appear = keyframes`
  from {
      opacity: 0;
      
  }
  to {
      opacity: 1;
      
  }
`
const StoryInputWrapper = styled.div`
position:relative;
  background-color: #D9D9D9;
  border: solid 1px #BABABA;
  margin: 5vh auto;
  border-radius: 1vw;
  animation: ${appear} 1s ease;
`;

const StoryInput = styled.textarea`
font-size: 1.3vw
font-family: "Nunito";
font-weight: 500
width:35vw;
height: 30vh;
background-color:#D9D9D9;
resize: none;
  border: none;
  overflow: auto;
  outline: none;
  text-align:center;
`;

const StoryPrompt = styled.p`
font-size: 1.3vw
 
 
  font-family: "Roboto";
  font-weight: 700;
  padding:2vw;
 
  text-align:center;
`;

const AutoSave = styled.p`
font-size: 1vw
font-family: "Nunito";
font-weight: 500;
text-align:right;
margin-right:1vw;
color:#008920
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




const csvData = [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];


class DataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drones:null,
      selectedDrone:null,
      filter:false,
      dronesCSV:[]
    };
  }
  componentDidMount() {

    fetch('/drones/',
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Mode': "CORS"
            }
          }).then(response => response.json())
          .then(data => {
            let i = 0;
            data.forEach(drone => {
              if (!drone.isFlagged && (isGibberish(drone.name,5) || isGibberish(drone.mainStory.text,15))){
                
                this.updateDrone({isFlagged:true},drone._id,i)
              }
              //else this.updateDrone({isFlagged:false},drone._id)
              i++;
            });
            this.setState({drones:data})
            this.populateDroneCSV();
           }
           
          );

          
  }

  populateDroneCSV(){
    let dronesCSV = []
  
    this.state.drones.forEach(drone => {
      if (!drone.isFlagged){
        let subStories = ""
        let features = ""
        drone.features.forEach(feature =>{
          features += feature.title.replace(/(\r\n|\n|\r)/gm, "") +" | "
        })

        drone.subStories.forEach(story =>{
          if(!story.isFlagged){
          subStories += " "+story.text +"\n"
          }
        })

        let droneObj = {
          id:drone._id,
          name:drone.name, 
          superPowers: features, 
          mainStory:drone.mainStory.text.replace(/(\r\n|\n|\r)/gm, ""), 
          // subStories: subStories,
          // createdDate: drone.createdDate,
          // createdBy: JSON.stringify(drone.createdBy)
        }
        dronesCSV.push(droneObj)
      }
    });
    this.setState({dronesCSV:dronesCSV})
  }

  updateDrone(body,id,key) {
    fetch('/drones/'+id,
          {
            method: 'PUT',
            body:JSON.stringify(body),
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Mode': "CORS"
            }
          }).then(response => response.json())
          .then(data => {
          let drones =  this.state.drones;
          drones[key].isFlagged = data.isFlagged;
          this.setState({drones:drones})
          this.populateDroneCSV();
           }
          );
  }

 

  render() {
    if (this.state.drones == null) return null;
    return (
      <div>
        <CSVLink 
        data={this.state.dronesCSV}
        filename={"drone_data.csv"}
        >Download CSV</CSVLink>
        <FilterButton onClick={()=>this.setState({filter:!this.state.filter})}>{this.state.filter?'Turn Off Gib Filter' : 'Turn On Gib Filter'}</FilterButton>
     
      <Wrapper>
        <LeftWrapper>
          {this.state.drones.slice(0).reverse().map((item, key) => 
          !(this.state.filter&&item.isFlagged)&&<DroneWrapper><ToggleButton onClick={()=>this.updateDrone({isFlagged:!item.isFlagged},item._id,this.state.drones.length-key-1)} flagged={item.isFlagged}></ToggleButton><DroneListItem onClick={()=> {this.setState({selectedDrone:item})}}>{item._id +": "+item.name}</DroneListItem></DroneWrapper>)}
        </LeftWrapper>
        <RightWrapper>
        {(this.state.selectedDrone != null) && <Drone filter ={this.state.filter} drone={this.state.selectedDrone}></Drone>}
        </RightWrapper>
      </Wrapper>
      </div>
    )
    
  }



  

}

export default DataView;
