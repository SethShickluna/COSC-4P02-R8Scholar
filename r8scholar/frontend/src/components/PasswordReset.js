import React, { Component } from "react";
import { Button, Card, Form, Input, FormGroup, Container, Row, Col, UncontrolledTooltip, FormFeedback, FormText } from "reactstrap";
import { MdCheckCircle } from "react-icons/md";
import axiosInstance from "../axiosApi";

export default class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            status: 0,
            unauthorized: false,
        };
        this.submitForm = this.submitForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.toggleStatus = this.toggleStatus.bind(this);
    }

    async submitForm(e) {
        e.preventDefault(); //stop a reload
        try {
            const response = await axiosInstance.post("/reset-password/", {
                email: this.state.email,
            });
            const message = response.data;
            this.toggleStatus();
            return message;
        } catch (error) {
            console.log(error.message);
            this.toggleStatus();
            this.setState({ unauthorized: true });
        }
    }

    async handleInput(e) {
        this.setState({ email: e.target.value });
    }

    toggleStatus() {
        this.setState((prev) => ({
            status: prev.status + 1,
        }));
    }

    render() {
        return this.state.status === 0 ? (
            <Button color="info" className="btn-link" onClick={this.toggleStatus}>
                Forgot your password? Reset it!
            </Button>
        ) : this.state.status % 2 === 1 ? (
            <>
                <Form className="reset-form" onSubmit={this.submitForm}>
                    <FormGroup>
                        <label>Confirm your email</label>
                        <Input placeholder="Email" invalid={this.state.unauthorized} name="email" id="email" type="text" onChange={this.handleInput} />
                        <FormFeedback placement="right" tooltip>
                            Invalid Email
                        </FormFeedback>
                    </FormGroup>
                    <Button style={{ marginTop: "50px" }} block type="submit" className="btn-round" color="info">
                        Reset password
                    </Button>
                </Form>
            </>
        ) : (
            <>
                <div style={{ margin: "20px 20px 10px 20px" }}>An email with a temporary password was sent to {this.state.email}</div>
                <MdCheckCircle style={{ alignSelf: "center", color: "#60ce32", height: "35px", width: "35px", margin: "10px 0px -15px 0px" }} />
                <Button color="info" className="btn-link" onClick={this.toggleStatus}>
                    Resend it!
                </Button>
            </>
        );
    }
}
