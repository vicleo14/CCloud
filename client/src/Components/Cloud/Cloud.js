import React from "react";
import Navbrowser from "./Navbrowser/Navbrowser";
import Browser from "./Browser/Browser";
import "./cloud.css";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import Sidebrowser from "./Sidebrowser/Sidebrowser";

class Cloud extends React.Component {

    render() {
        return (
            <div id="cloud">
                <Navbrowser></Navbrowser>
                <MDBContainer fluid>
                    <MDBRow id="main-row">
                        <MDBCol md="3" sm="12" className="text-wrap text-truncate border-right">
                            <MDBRow style={{ height: "20px" }}>
                                <MDBCol></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="12" sm="12">
                                    <MDBBtn className="blue-gradient"><MDBIcon icon="plus" className="pr-2" />Upload</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol md="8" sm="12">
                                    <Sidebrowser />
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol className="d-block d-md-none border-top"></MDBCol>
                        <MDBCol md="9" sm="12">
                            <MDBRow style={{ height: "20px" }}>
                                <MDBCol></MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <Browser />
                                </MDBCol>
                            </MDBRow>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default Cloud;