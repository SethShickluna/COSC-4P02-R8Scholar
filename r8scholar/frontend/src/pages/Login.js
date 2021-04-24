import React, { Component } from "react";
import { Button, Card, Form, Input, FormGroup, Container, Row, Col, UncontrolledTooltip, FormFeedback, FormText } from "reactstrap";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import axiosInstance from "../axiosApi";
import Navbar from "../components/Navbar";
import PasswordReset from "../components/PasswordReset";
import { MdRemoveRedEye } from "react-icons/md";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            unauthorized: false,
            showPassword: false,
        };

        this.handleInput = this.handleInput.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleInput(obj) {
        this.setState({ [obj.target.name]: obj.target.value, unauthorized: false });
    }

    /**
     * need to display error codes to user: TODO
     * 401 = incorrect username or password
     */
    async submitForm(e) {
        e.preventDefault(); //stop a reload

        //attempt to get an authentication token via post request
        try {
            const response = await axiosInstance.post("/token/obtain/", {
                //note the use of async and await in this function
                email: this.state.email,
                password: this.state.password,
            });
            axiosInstance.defaults.headers["Authorization"] = "JWT " + response.data.access;
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);
            cookie.save("email", this.state.email, { path: "/" });
            cookie.save("isLoggedIn", "true", { path: "/" });
            this.props.history.push("/");
            return data;
        } catch (error) {
            this.setState({ unauthorized: true });
        }
    }

    toggleShowPassword() {
        this.setState((prev) => ({
            showPassword: !prev.showPassword,
        }));
    }

    render() {
        return (
            <>
                <Navbar />
                <div
                    className="page-header"
                    style={{
                        backgroundImage:
                            "url(https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcou.on.ca%2Fwp-content%2Fuploads%2F2015%2F04%2FBrock-University-Cairns-after-dusk.jpg&f=1&nofb=1)",
                    }}
                >
                    <div className="filter" />
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto" lg="4">
                                <Card className="card-register ml-auto mr-auto">
                                    <h3 className="title mx-auto">Sign In</h3>
                                    <Form className="register-form" onSubmit={this.submitForm}>
                                        <FormGroup>
                                            <label>Email</label>
                                            <Input placeholder="Email" invalid={this.state.unauthorized} name="email" id="email" type="text" onChange={this.handleInput} />
                                            <FormFeedback placement="right" tooltip>
                                                Invalid Username or Password
                                            </FormFeedback>
                                        </FormGroup>
                                        <FormGroup>
                                            <label>Password</label>
                                            <Input
                                                placeholder="Password"
                                                invalid={this.state.unauthorized}
                                                id="password"
                                                name="password"
                                                type={this.state.showPassword ? "text" : "password"}
                                                onChange={this.handleInput}
                                            />
                                            <MdRemoveRedEye className="pass-toggle" style={{ position: "absolute", color: "#000", top: "58px", right: "30px" }} onClick={this.toggleShowPassword} />
                                            <UncontrolledTooltip style={{ minWidth: "70px" }} placement="right" target="password">
                                                <h5>Password Requirements: </h5>
                                                <ul>
                                                    <li>At least 1 uppercase</li>
                                                    <li>At least 1 lowercase</li>
                                                    <li>At least 1 number</li>
                                                    <li>At least 10 characters</li>
                                                </ul>
                                            </UncontrolledTooltip>
                                        </FormGroup>
                                        <Button block type="submit" className="btn-round" color="info">
                                            Sign In
                                        </Button>
                                    </Form>
                                    <Link to="/signup">
                                        <Button color="info" className="btn-link" to="/signup">
                                            Need an account? Sign up Today!
                                        </Button>
                                    </Link>
                                    <PasswordReset />
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}
