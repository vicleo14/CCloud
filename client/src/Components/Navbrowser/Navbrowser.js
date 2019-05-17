import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon } from "mdbreact";
import "./navbrowser.css";

class Navbrowser extends Component {

render() {
  return (
    <div id="navbrowser">
      <MDBNavbar color="info-color" dark expand="md">
        <MDBNavbarBrand>
        <MDBNavLink to='/'>
              <strong className="white-text">CCloud</strong>
            </MDBNavLink>
        </MDBNavbarBrand>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" className="mr-1" />Profile
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" right>
                  <MDBDropdownItem href="/">My account</MDBDropdownItem>
                  <MDBDropdownItem href="/">Log out</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
      </MDBNavbar>
    </div>
    );
  }
}

export default Navbrowser;