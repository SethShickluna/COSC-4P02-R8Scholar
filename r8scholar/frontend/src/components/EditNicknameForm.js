import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import axiosInstance from "../axiosApi"; 


const formStyle = {
    width: '30rem',
}


export default class EditNicknameForm extends Component {
//make  a password form 
    constructor(props) {
        super(props);
        this.state = {
            email: "",
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
        console.log("Hello")
        if(this.checkNickname){
            try { 
                const response = await axiosInstance.post('/change-nickname/', {
                    email: this.state.email,
                    password: this.state.password, 
                    nickname: this.state.nickname, 
                });
                const message = response.data; 
                console.log(message)
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
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Change Nickname</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.submitForm}>
                        <Form.Group controlId="formGroupNicknameEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" onChange={this.handleInput} placeholder="Enter your email" />
                            </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                                <Form.Label>Enter Password</Form.Label>
                                <Form.Control name="password" type="password" onChange={this.handleInput} placeholder="Enter your password..." />
                            </Form.Group>

                            <Form.Group controlId="formGroupNickname">
                                <Form.Label>Change Nickname</Form.Label>
                                <Form.Control name="nickname"type="username" onChange={this.handleInput} placeholder="Enter new nickname" />
                            </Form.Group>

                            <Button type="submit" variant="primary">
                               Update Nickname
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}