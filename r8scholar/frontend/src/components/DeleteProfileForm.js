import React, { Component } from "react";
import cookie from "react-cookies";
import { FormGroup, Label, Input, Button } from "reactstrap";
import axiosInstance from "../axiosApi";

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
    } catch (e) {
        console.log(e);
    }
}

const checkboxStyle = {
    borderColor: "#51cbce",
    verticalAlign: "middle",
    marginRight: "10px",
    height: "20px",
};

export default class DeleteProfileForm extends Component {
    //make this a password form
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmed: false,
        };
        //allows us to this "this" inside the methods

        // NOTE: THIS CAN BEREMOVED IF FUNCTIONS ARE
        // CHANGED TO ANONYMOUS
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
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
                throw error;
            }
        } else {
            alert(
                "Please confirm that you wish to permanently delete your profile and reviews"
            );
        }
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <h3>Delete Profile</h3>
                <div style={{ marginBottom: "2%" }}/>
                <FormGroup>
                    <Label for="password">Confirm password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password..."
                        autoComplete="off"
                        onChange={this.handleInput}
                    />
                    <FormGroup check>
                    <div style={{ marginBottom: "1%" }}/>
                    <Label className="form-check-label">
                        <Input onClick={this.handleCheckbox} className="form-check-input" type="checkbox" value=""/>
                        I am aware that my account and each review and comment associated with it will be deleted.
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </Label>
        </FormGroup>
                </FormGroup>
                <Button
                    style={{
                        backgroundColor: "#d35650",
                        borderColor: "#d35650",
                    }}
                    type="submit"
                >
                    Delete Profile
                </Button>
            </form>
        );
    }
}
