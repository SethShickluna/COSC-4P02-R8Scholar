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


export default class EditNicknameForm extends Component {
//make  a password form 
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            nickname: "",
            formComplete: false
        }

        //allows us to this "this" inside the methods 
        this.handleInput = this.handleInput.bind(this);

        this.submitForm = this.submitForm.bind(this);
        this.checkNickname = this.checkNickname.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

    handleInput(obj){
        this.setState({[obj.target.name]: obj.target.value}); 
    }

    checkPassword = () => {
        return this.state.password.length  > 7;
    }

    //min 4 character username (this is becuase i really want the username 'seth' but open to discussion of course)
    checkNickname = () => {
        return this.state.nickname.length >= 4; 
    }

    async submitForm (e) {
        e.preventDefault(); //stop a reload
        if(this.checkNickname){
            try { 
                const response = await axiosInstance.post('/change-nickname/', {
                    email: cookie.load("email"),
                    password: this.state.password, 
                    nickname: this.state.nickname, 
                });
                const message = response.data; 
                window.location.reload();
                return message;
            }catch(error){
                throw error; 
            }
        }else{
            alert("Nickname is too short!");
        }
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <h3>Change Nickname</h3>
                <div style={{marginBottom:"2%"}}></div>
                <FormGroup>
                    <Label for="nickname">New Nickname</Label>
                    <Input
                    type="text"
                    name="nickname"
                    id="nickname"
                    placeholder="New Nickname"
                    autoComplete="off"
                    onChange={this.handleInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="New Password"
                    autoComplete="off"
                    onChange={this.handleInput}
                    />
                </FormGroup>
                
                <Button color="primary" type="submit">
                    Change Nickname
                </Button>
            </form>
        );
    }
}