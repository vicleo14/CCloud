import { MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBInput, MDBMask } from "mdbreact";
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./login.css";

class Login extends React.Component {

    render() {
        return (
            <div id="login">
                <Navbar></Navbar>
                <div id="login_bg" className="view">
                    <MDBMask className="d-flex align-items-center example-parent gradient">
                        <div className="row">
                            <div className="col-md-1 col-sm-12"></div>
                            <div className="col-md-5 col-sm-12 align-self-center">
                                <div className="white-text text-center text-md-left">
                                    <h1 className="h1-responsive font-weight-bold">
                                        Login right now!{" "}
                                    </h1>
                                    <hr className="hr-light" />
                                    <h6 className="mb-4">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                                        veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                                        molestiae, quisquam iste, maiores. Nulla.
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-5 col-sm-12 align-self-center">
                                <MDBCard id="classic-card">
                                    <MDBCardBody className="z-depth-2 white-text">
                                        <h3 className="text-center">
                                            <MDBIcon icon="user" /> Login:
                                        </h3>
                                        <hr className="hr-light" />
                                        <MDBInput
                                            className="white-text"
                                            label="Email"
                                            icon="envelope"
                                            group
                                            type="email"
                                            validate
                                            error="wrong"
                                            success="right"
                                        />
                                        <MDBInput
                                            className="white-text"
                                            label="Password"
                                            icon="lock"
                                            group
                                            type="password"
                                            validate
                                        />
                                        <div className="text-center mt-4 white-text">
                                            <Link to="/cloud"><MDBBtn color="indigo">Login</MDBBtn></Link>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </div>
                            <div className="col-md-1 col-sm-12"></div>
                        </div>
                    </MDBMask>
                </div>
            </div >
        );
    }
}

export default Login;