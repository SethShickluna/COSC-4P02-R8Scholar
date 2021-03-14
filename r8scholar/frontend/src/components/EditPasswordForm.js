import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';


const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
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
        this.updateNewPasswordInput = this.updateNewPasswordInput.bind(this);
        this.updateOldPasswordInput = this.updateOldPasswordInput.bind(this);
        this.updateVerifyPasswordInput = this.updateVerifyPasswordInput.bind(this);
        this.updateEmailInput = this.updateEmailInput.bind(this);


        this.submitForm = this.submitForm.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

    //OLD PASSWORD
    updateNewPasswordInput(obj) {
        this.setState({
            password: obj.target.value,
            formComplete: (this.checkPassword()),
        });
    }
    //NEW PASSWORD
    updateOldPasswordInput(obj) {
        this.setState({
            oldPassword: obj.target.value,
            formComplete: (this.checkPassword()),
        });
    }
    //VERIFY PASSWORD
    updateVerifyPasswordInput(obj) {
        this.setState({
            verifPassword: obj.target.value,
            formComplete: (true),
        });
    }
//email input 
    updateEmailInput(obj){
        this.setState({
            email: obj.target.value, 
        });
    }




    //password boxes match and are at least 8 characters 
    checkPassword = () => {
        return this.state.password === this.state.verifPassword && this.state.password.length > 7;
    }


    submitForm = () => {
        //good to go?
        if (this.checkPassword()) { // passwords match
            //send info to the back end and change password  
            const request = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: this.state.email,
                    old_password: this.state.oldPassword,
                    new_password: this.state.password,
                }),
            };
            //fetch 
            fetch("/api/change-password", request)
                .then((response) => {
                    if (response.ok) { //yay
                        //good response 
                        alert("Success, password changed!");
                        this.props.history.push('/profile');
                    } else {//nay 
                        alert("Invalid password...");
                    }
                });
        } else {
            alert("Passwords did not meet requirements!");
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
                                <Form.Control type="email" onChange={this.updateEmailInput} placeholder="Enter your email" />
                            </Form.Group>
                        <Form>
                            <Form.Group controlId="formGroupOldPassword">
                                <Form.Label>Enter Old Password</Form.Label>
                                <Form.Control type="password" onChange={this.updateOldPasswordInput} placeholder="Enter old password..." />
                            </Form.Group>
                            <Form.Group controlId="formGroupNewPassword">
                                <Form.Label>Enter New Password</Form.Label>
                                <Form.Control type="password" onChange={this.updateNewPasswordInput} placeholder="Enter new password..." />
                            </Form.Group>

                            <Form.Group controlId="formGroupVerifyPassword">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control type="password" onChange={this.updateVerifyPasswordInput} placeholder="Confirm password..." />
                            </Form.Group>

                            <Button disabled={!this.state.formComplete} onClick={this.submitForm} variant="primary">
                                Update Password
                            </Button>

                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}