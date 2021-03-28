import React, { Component } from "react";
import cookie from "react-cookies";
import { FormGroup, Label, Input, FormText, Button } from "reactstrap";
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
            passowrd: "",
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
        this.setState((prevState) => ({
            confirmed: !prevState.confirmed,
        }));
    };

    async submitForm(e) {
        e.preventDefault(); //stop a reload
        if (this.state.confirmed) {
            try {
                handleLogout();
                const response = await axiosInstance.post("/delete-profile/", {
                    email: cookie.load("email"),
                    passsord: this.state.passsord,
                });
                const message = response.data;
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
                <div style={{ marginBottom: "2%" }}></div>
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
                    <Label
                        for="checkbox"
                        style={{ wordWrap: "break-word", marginTop: "20px" }}
                        onClick={this.handleCheckbox}
                    >
                        <Button
                            class="checkbox"
                            id="confirmation"
                            style={checkboxStyle}
                            color={this.state.confirmed && "primary"}
                            size="sm"
                            onClick={this.handleCheckbox}
                        />
                        I am aware that my profile will be deleted permanently
                        and that all reviews will be removed.
                    </Label>
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
