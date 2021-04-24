import React, { Component } from "react";
import cookie from "react-cookies";
import { FormGroup, Label, Input, Button, Alert, Collapse } from "reactstrap";
import axiosInstance from "../axiosApi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

async function handleLogout() {
    try {
        const response = await axiosInstance.post("/logout/", {
            refresh_token: localStorage.getItem("refresh_token"),
        });
        cookie.save("isLoggedIn", "false", { path: "/" });
        cookie.save("email", "", { path: "/" });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axiosInstance.defaults.headers["Authorization"] = null;
        window.location.href = "/";
        return response;
    } catch (error) {
        throw error;
    }
}

export default class DeleteProfileForm extends Component {
    //make this a password form
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            invalidPassword: false,
            confirmed: false,
            alertConfirm: false,
            isOpen: false,
        };
        //allows us to this "this" inside the methods

        // NOTE: THIS CAN BEREMOVED IF FUNCTIONS ARE
        // CHANGED TO ANONYMOUS
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onDismiss2 = this.onDismiss2.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    handleInput(obj) {
        this.setState({ [obj.target.name]: obj.target.value });
    }

    handleCheckbox = () => {
        this.setState({
            confirmed: !this.state.confirmed,
        });
    };

    async submitForm(e) {
        e.preventDefault(); //stop a reload
        if (this.state.confirmed) {
            try {
                const response = await axiosInstance.post("/delete-profile/", {
                    email: cookie.load("email"),
                    password: this.state.password,
                });
                const message = response.data;
                handleLogout();
                return message;
            } catch (error) {
                this.setState({ invalidPassword: true });
            }
        } else {
            this.setState({ alertConfirm: true });
        }
    }

    onDismiss() {
        this.setState({ invalidPassword: !this.state.invalidPassword });
    }

    onDismiss2() {
        this.setState({ alertConfirm: !this.state.alertConfirm });
    }

    toggleMenu() {
        this.setState((prev) => ({ isOpen: !prev.isOpen }));
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <Alert color="danger" isOpen={this.state.invalidPassword} toggle={this.onDismiss}>
                    <b>Invalid password. Ensure your password was typed correctly and try again.</b>
                </Alert>
                <Alert color="danger" isOpen={this.state.alertConfirm} toggle={this.onDismiss2}>
                    <b>Please confirm that you wish to delete your r8scholar account.</b>
                </Alert>
                <h3 onClick={this.toggleMenu} style={{ display: "inline-block" }}>
                    Delete Profile
                    {this.state.isOpen ? <MdKeyboardArrowUp style={{ marginTop: "-9px" }} size="40px" /> : <MdKeyboardArrowDown style={{ marginTop: "-9px" }} size="40px" />}
                </h3>
                <Collapse isOpen={this.state.isOpen}>
                    <div style={{ marginBottom: "50px" }} />
                    <FormGroup>
                        <Label for="password">Confirm password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password..." autoComplete="off" onChange={this.handleInput} />
                        <FormGroup check>
                            <Label className="form-check-label" style={{ margin: "5% 3%" }}>
                                <Input onClick={this.handleCheckbox} className="form-check-input" type="checkbox" value="" />I am aware that my account and each review and comment associated with it
                                will be deleted.
                                <span className="form-check-sign">
                                    <span className="check"></span>
                                </span>
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <Button color="danger" type="submit">
                        Delete Profile
                    </Button>
                    <div style={{ marginBottom: "50px" }} />
                </Collapse>
            </form>
        );
    }
}
