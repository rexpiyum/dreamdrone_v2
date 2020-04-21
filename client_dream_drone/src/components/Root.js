import React, { Component } from "react";
import styled from "styled-components";
import Feature from "./Feature";
import StartView from "./StartView";

const Wrapper = styled.div`
  margin: auto
  width: 100%;
  background-color:#f7f7f7;
`;

const BlocksContainer = styled.div`
  width: 80%;
  margin: auto;
`;

const Block = styled.div`
  margin :auto;
`;

const BlockName = styled.p`
  margin:auto;
`;

const BlockText = styled.textarea`
  width:100%;
  overflow: auto;
  font-size: 10px;
  height: 100px;

  &:hover{
    transform: scale(1.04);

  }
`;

const Header = styled.h1`


`;

const CreateBlockButton = styled.button`
`;

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks:[]
    };
  }

componentDidMount() {

}


render() {
    return (
      <div>
        {/* <Header>My Dream Drone</Header> */}
        <Wrapper>{this.renderMainContent()}</Wrapper>
      </div>
  )

    return null;
  }


renderMainContent(){
  return(
    
      <StartView/>
    
  );
}


}

export default Root;
