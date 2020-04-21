import React, { Component } from "react";
import styled, { keyframes } from "styled-components";


import {theme} from "../colorTheme"
import {isGibberish} from "../utils.js"
import { runInThisContext } from "vm";


// import {devices} from "../devices";

const Wrapper = styled.div`
  position:relative;
  display:flex;  
  margin:1vw;
  border: solid 1px ${theme.primaryColor};
`;

const P = styled.p`
  text-align:left; 
  margin:1vw;
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
  border: solid 1px ${theme.primaryColor};
  
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

const ToggleButton = styled.div`
  background-color: ${props => props.flagged?'red':'green'};
  min-width:3vw;
`;

class Data_Feature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlagged:null
  }
  }

  componentDidMount(){
    this.setState({isFlagged:this.props.feature.isFlagged})
    this.catchGibberish();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.feature._id !== prevProps.feature._id) {
      this.setState({isFlagged:this.props.feature.isFlagged})
      this.catchGibberish();
    }
  }

  catchGibberish(){
    if(!this.state.isFlagged){
      isGibberish(this.props.feature.description, 5) && this.updateFeature({isFlagged:true})
    }
  }
  

updateFeature(body) {
    fetch('/features/'+this.props.feature._id,
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
            
           this.setState({isFlagged:data.isFlagged})
           }
          );
  }

  render() {

    if (this.state.isFlagged == null){
      return null;
    }
    return (
      !(this.props.filter&&this.props.feature.isFlagged)&&this.props.feature.title && this.props.feature.description&&<Wrapper>
        <ToggleButton 
        onClick={()=>this.updateFeature({isFlagged:!this.state.isFlagged})}
        flagged={this.state.isFlagged}></ToggleButton>
        <P><strong>{this.props.feature.title}</strong> {":"+ this.props.feature.description}</P>
        
      </Wrapper>
    )
    
  }
}

export default Data_Feature;
