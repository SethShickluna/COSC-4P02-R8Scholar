import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Form, Input, Button } from "reactstrap";
import cookie from "react-cookies";
import SecondaryNav from "../components/SecondaryNav";
import axiosInstance from "../axiosApi";

const title = {
    marginTop: "5%",
};

class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            user: null,
        };
        this.updateCodeValue = this.updateCodeValue.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
    }

    async componentDidMount() {
        //get the user
        try {
            let response = await axiosInstance.get("/get-user/" + "?email=" + cookie.load("email"));
            const user = response.data;
            if (user.is_verified) {
                this.props.history.push("/");
            } else {
                this.setState({ user: user });
            }
            return user;
        } catch (error) {
            this.props.history.push("/login"); //redirect to login if a valid token is not presented
        }
    }

    updateCodeValue(obj) {
        this.setState({
            code: obj.target.value,
        });
    }

    async verifyUser() {
        try {
            let response = await axiosInstance.post("/verify-user/", {
                email: this.state.user.email,
                verification_code: this.state.code,
            });
            alert("Success!");
            this.props.history.push("/");
            //Make so
            return response;
        } catch (error) {
            alert("Invalid code!");
        }
    }

    render() {
        return (
            <div>
                <SecondaryNav />
                <div>
                    <Container>
                        <Row align="center">
                            <Col>
                                <div style={title}>
                                    <h1>Verify your account</h1>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col align="center">
                                <div style={{ marginTop: "15%" }}>
                                    <Form>
                                        <h5>Please enter the code that was emailed to {cookie.load("email")}</h5>
                                        <Input placeholder="ex: HY7G9F" bsSize="lg" maxLength="50" onChange={this.updateCodeValue} />
                                        <Button onClick={this.verifyUser} style={{ marginTop: "5%" }} color="primary" size="lg">
                                            Verify Now!
                                        </Button>
                                    </Form>
                                </div>
                                <div style={{ marginTop: "15%" }}>
                                    <p>
                                        Didnt recieve an email? <a href="#">Resend</a> verification email
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default withRouter(Verification);
