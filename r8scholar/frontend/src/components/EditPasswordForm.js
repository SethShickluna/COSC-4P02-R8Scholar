import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
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
            formComplete: false,
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
                    email: this.state.email,
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
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Change Password</Card.Header>
                    <Card.Body>
                    <Form.Group controlId="formGroupPasswordEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" onChange={this.handleInput} placeholder="Enter your email" />
                            </Form.Group>
                        <Form onSubmit={this.submitForm}>
                            <Form.Group controlId="formGroupOldPassword">
                                <Form.Label>Enter Old Password</Form.Label>
                                <Form.Control name="oldPassword" type="password" onChange={this.handleInput} placeholder="Enter old password..." />
                            </Form.Group>
                            <Form.Group controlId="formGroupNewPassword">
                                <Form.Label>Enter New Password</Form.Label>
                                <Form.Control name="password" type="password" onChange={this.handleInput} placeholder="Enter new password..." />
                            </Form.Group>

                            <Form.Group controlId="formGroupVerifyPassword">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control name="verifPassword" type="password" onChange={this.handleInput} placeholder="Confirm password..." />
                            </Form.Group>

                            <Button type="submit" variant="primary">
                                Update Password
                            </Button>

                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}