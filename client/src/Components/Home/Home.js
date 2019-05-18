import { MDBBtn, MDBCol, MDBContainer, MDBMask, MDBRow } from "mdbreact";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./home.css";

class Home extends React.Component {
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  render() {
    return (
      <div id="home">
        <Navbar></Navbar>
        <div id="home_bg" className="view">
          
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer className="px-md-3 px-sm-0">
              <MDBRow>
                <MDBCol md="12" className="mb-4 white-text text-center">
                  <h3 className="display-3 font-weight-bold mb-0 pt-md-5">
                    CCloud{" "}
                  </h3>
                  <hr className="hr-light my-4 w-75" />
                  <h4 className="subtext-header mt-2 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    deleniti consequuntur nihil.
                  </h4>
                  <Link to="/login"><MDBBtn outline rounded color="white">Log in</MDBBtn></Link>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </div>
      </div>
    );
  }
}

export default Home;