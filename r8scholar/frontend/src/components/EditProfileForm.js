import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';


const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
}


export default class EditProfileForm extends Component {
//make this a password form 
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            verifPassword: "",
            formComplete: false,
        }

        //allows us to this "this" inside the methods 
        this.updatePasswordInput = this.updatePasswordInput.bind(this);
        this.updateVerifyPasswordInput = this.updateVerifyPasswordInput.bind(this);
        

        this.submitForm = this.submitForm.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        
    }


    updatePasswordInput(obj) {
        this.setState({
            password: obj.target.value,
            formComplete: (this.checkPassword()),
        });
    }

    updateVerifyPasswordInput(obj) {
        this.setState({
            verifPassword: obj.target.value,
            formComplete: (true),
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
            //route to confirmation page 
            alert("Success!");
        }
    }

    render() {
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Change Password</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Enter New Password</Form.Label>
                                <Form.Control type="password" onChange={this.updatePasswordInput} placeholder="Enter password..." />
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