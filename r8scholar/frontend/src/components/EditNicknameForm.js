import React, { Component } from 'react';
import cookie from "react-cookies"; 
import {
    FormGroup,
    Label,
    Input,
    FormText,
    Button, Alert
} from "reactstrap";
import axiosInstance from "../axiosApi"; 


export default class EditNicknameForm extends Component {
//make  a password form 
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            nickname: "",
            validNickname: false,
            alertTriggered: false, 
            invalidPassword: false,
            nameTaken: false, 
        }

        //allows us to this "this" inside the methods 
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onDismiss2 = this.onDismiss2.bind(this);
        this.onDismiss3 = this.onDismiss3.bind(this);

        this.checkNickname = this.checkNickname.bind(this);
    }

    handleInput(obj){
        this.checkNickname(obj.target.value)
        this.setState({[obj.target.name]: obj.target.value}); 
    }

    //min 4 character username (this is becuase i really want the username 'seth' but open to discussion of course)
    checkNickname = (name) => {
        this.setState({validNickname: name.length >= 4})
        return name.length >= 4; 
    }

    async submitForm (e) {
        e.preventDefault(); //stop a reload
        if(this.checkNickname(this.state.nickname)){
            try { 
                const response = await axiosInstance.post('/change-nickname/', {
                    email: cookie.load("email"),
                    password: this.state.password, 
                    nickname: this.state.nickname, 
                });
                window.location.reload();
                return message;
            }catch(error){
                switch(error.message){
                    case "Request failed with status code 500":
                        this.setState({nameTaken: true}); 
                        break; 
                    default: 
                        this.setState({invalidPassword: true}); 
                        break;
                }
                
            }
        }else{
            this.setState({alertTriggered: true})
        }
    }

    onDismiss(){
        this.setState({alertTriggered: !this.state.alertTriggered});
    }

    onDismiss2(){
        this.setState({invalidPassword: !this.state.invalidPassword});
    }

    onDismiss3(){
        this.setState({nameTaken: !this.state.nameTaken});
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <Alert color="danger" isOpen={this.state.alertTriggered} toggle={this.onDismiss}>
                    <b>Your new Nickname is too short, make sure it is at least 4 characters.</b>
                </Alert>
                <Alert color="danger" isOpen={this.state.invalidPassword} toggle={this.onDismiss2}>
                    <b>Invalid password. Ensure your password was typed correctly and try again.</b>
                </Alert>
                <Alert color="danger" isOpen={this.state.nameTaken} toggle={this.onDismiss3}>
                    <b>That nickname has been taken. Please choose another nickname and try again.</b>
                </Alert>
                <h3>Change Nickname</h3>
                <div style={{marginBottom:"2%"}}></div>
                <FormGroup>
                    <Label for="nickname">New Nickname</Label>
                    <Input
                    valid={this.state.validNickname}
                    invalid={!this.state.validNickname}
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