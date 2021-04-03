import React, { Component } from "react";
import cookie from "react-cookies";
import { FormGroup, Label, Input, FormText, Button, Alert, UncontrolledTooltip } from "reactstrap";
import axiosInstance from "../axiosApi";
import { MdInfoOutline } from "react-icons/md";

export default class EditPasswordForm extends Component {
    //make this a password form
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            oldPassword: "",
            password: "",
            verifPassword: "",
            invalidPassword: false,
            success: false,
            badPassword: false,
            validPassword: false,
            validVerifPassword: false,
        };

        //allows us to this "this" inside the methods
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onDismiss2 = this.onDismiss2.bind(this);
        this.onDismiss3 = this.onDismiss3.bind(this);

        this.checkPassword = this.checkPassword.bind(this);
        this.verifyPassword = this.verifyPassword.bind(this);
    }

    handleInput(obj) {
        this.verifyFields(obj.target.name, obj.target.value);
        this.setState({ [obj.target.name]: obj.target.value });
    }

    verifyFields(name, value) {
        switch (name) {
            case "password":
                this.checkPassword(value);
                break;
            case "verifPassword":
                this.verifyPassword(value);
                break;
        }
    }

    verifyPassword = (password) => {
        this.setState({ validVerifPassword: password === this.state.password });
        return password === this.state.password;
    };

    async submitForm(e) {
        e.preventDefault(); //stop a reload
        if (this.checkPassword(this.state.password)) {
            try {
                const response = await axiosInstance.post("/change-password/", {
                    email: cookie.load("email"),
                    old_password: this.state.oldPassword,
                    new_password: this.state.password,
                });
                const message = response.data;
                this.setState({ success: true });
                return message;
            } catch (error) {
                console.log(error.message);
                switch (error.message) {
                    case "Request failed with status code 500":
                        this.setState({ nameTaken: true });
                        break;
                    default:
                        this.setState({ invalidPassword: true });
                        break;
                }
            }
        } else {
            this.setState({ badPassword: true });
        }
    }

    checkPassword = (password) => {
        let length = password.length >= 12;
        let capital = password.toUpperCase() !== password;
        let lower = password.toLowerCase() !== password;
        let number = /\d/.test(password);
        this.setState({ validPassword: length && capital && lower && number, validVerifPassword: password === this.state.verifPassword });
        return length && capital && lower && number;
    };

    onDismiss() {
        this.setState({ invalidPassword: !this.state.invalidPassword });
    }

    onDismiss2() {
        this.setState({ success: !this.state.success });
    }

    onDismiss3() {
        this.setState({ badPassword: !this.state.badPassword });
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <Alert color="danger" isOpen={this.state.invalidPassword} toggle={this.onDismiss}>
                    <b>Invalid password(s). Ensure your password(s) were typed correctly and try again.</b>
                </Alert>
                <Alert color="danger" isOpen={this.state.badPassword} toggle={this.onDismiss3}>
                    <b>Your new password does not meet the minimum requirements! A r8scholar password must be 12 digits, and contain 1 capital, lowercase, number & symbol.</b>
                </Alert>
                <Alert color="success" isOpen={this.state.success} toggle={this.onDismiss2}>
                    <b>Good to go! Your password was changed successfully.</b>
                </Alert>
                <h3>Change Password</h3>
                <div style={{ marginBottom: "2%" }}></div>
                <FormGroup>
                    <Label for="examplePassword">Old Password</Label>
                    <Input type="password" name="oldPassword" id="oldPassword" placeholder="Current Password" autoComplete="off" onChange={this.handleInput} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">New Password</Label>
                    <MdInfoOutline id="password-tooltip" style={{ marginLeft: "5px", marginBottom: "3px" }} />
                    <Input
                        valid={this.state.validPassword}
                        invalid={!this.state.validPassword}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="New Password"
                        autoComplete="off"
                        onChange={this.handleInput}
                    />
                    <UncontrolledTooltip style={{ minWidth: "70px" }} placement="right" target="password-tooltip">
                        <h5>Password Requirements: </h5>
                        <ul>
                            <li>1 Uppercase</li>
                            <li>1 Lowercase</li>
                            <li>1 Number</li>
                            <li>1 Symbol </li>
                            <li>At least 12 characters</li>
                        </ul>
                    </UncontrolledTooltip>
                </FormGroup>

                <FormGroup>
                    <Label for="examplePassword">Verify New Password</Label>
                    <Input
                        valid={this.state.validVerifPassword}
                        invalid={!this.state.validVerifPassword}
                        type="password"
                        name="verifPassword"
                        id="verifPassword"
                        placeholder="Verify New Password"
                        autoComplete="off"
                        onChange={this.handleInput}
                    />
                </FormGroup>
                <Button color="primary" type="submit">
                    Change Password
                </Button>
            </form>
        );
    }
}
