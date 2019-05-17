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
                        <MDBCol md="2" sm="12" className="text-wrap text-truncate border-right justify-content-sm-center">
                            <MDBBtn className="blue-gradient"><MDBIcon icon="plus" className="pr-2" />Upload</MDBBtn>
                            <Sidebrowser/>
                        </MDBCol>
                        <MDBCol className="d-block d-md-none border-top"></MDBCol>
                        <MDBCol md="10" sm="12">
                            <Browser />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}

export default Cloud;