import React, { Component } from "react";
import styled from "styled-components";
import Feature, {FeatureType} from "../feature/Feature";
import {devices} from "../../config/devices.js"
import {theme} from "../../config/colorTheme";
import logo from './assets/drone_image.svg';


const Container = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  justify-content:space-around;
  margin:auto;
  width:80vw;
  z-index:100;
`;

const DroneImage = styled.img`
  height:32vh;
  max-width:60vw;
  margin:auto;
  margin-top:8vh;

  @media ${devices.mobile} {
    height:80vw;
    width:80vw;
    max-height:75vh;
    max-width:75vh;
    margin-top:2vh;
  }
`;

const FeatureContainer = styled.div`
    display:flex
    width:auto;
    justify-content:center;
`;

class Drone extends Component {
  constructor(props) {
    super(props);
    this.state = {
        drone:null
    };
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

    return (
          <Container>
            <DroneImage src={logo} alt="logo" ></DroneImage>
            <FeatureContainer>
              {this.props.drone.features.map((item, key) =>
              <Feature isAuthor={item.createdBy == this.props.drone.createdBy._id} featureType={this.props.editable? FeatureType.removable : FeatureType.disabled} title={item.title} description={item.description} clickHandler={(featureProps)=> this.props.featureClickHandler(featureProps)} index={key}></Feature>
              )}
              </FeatureContainer>
          </Container>
    )
  }
}

export default Drone;
