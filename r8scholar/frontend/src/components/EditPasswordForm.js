import React, { Component } from 'react';
import cookie from "react-cookies"; 
import {
    FormGroup,
    Label,
    Input,
    FormText,
    Button
} from "reactstrap";
import axiosInstance from "../axiosApi"; 


const formStyle = {
    width: '30rem',
}


export default class EditPasswordForm extends Component {
    //make this a password form 
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            oldPassword: "",
            password: "",
            verifPassword: "",
        }

        //allows us to this "this" inside the methods 
        this.handleInput = this.handleInput.bind(this); 

        this.submitForm = this.submitForm.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

    handleInput(obj){
        this.setState({[obj.target.name]: obj.target.value}); 
    }


    //password boxes match and are at least 8 characters 
    checkPassword = () => {
        return this.state.password === this.state.verifPassword && this.state.password.length >= 10;
    }


    async submitForm (e) {
        e.preventDefault(); //stop a reload
        if(this.checkPassword){
            try { 
                const response = await axiosInstance.post('/change-password/', {
                    email: cookie.load("email"),
                    old_password: this.state.oldPassword, 
                    new_password: this.state.password, 
                });
                const message = response.data; 
                return message;
            }catch(error){
                throw error; 
            }
        }else{
            alert("Passwords did not match or did not meet minimum requirements!");
        }
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <h3>Change Password</h3>
                <div style={{marginBottom:"2%"}}></div>
                <FormGroup>
                    <Label for="examplePassword">Old Password</Label>
                    <Input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Current Password"
                    autoComplete="off"
                    onChange={this.handleInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">New Password</Label>
                    <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="New Password"
                    autoComplete="off"
                    onChange={this.handleInput}
                    />
                    <FormText color="muted">
                        Your password must be 10 digits, and contain 1 capital, lowercase & number
                    </FormText>
                </FormGroup>
                
                <FormGroup>
                    <Label for="examplePassword">Verify New Password</Label>
                    <Input
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