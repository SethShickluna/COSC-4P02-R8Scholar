import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';


const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
}


export default class EditProfileForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            verifPassword: "",
            email: "",
            termsAgreed: false,
            formComplete: false,
        }

        //allows us to this "this" inside the methods 
        this.updateEmailInput = this.updateEmailInput.bind(this);
        this.updatePasswordInput = this.updatePasswordInput.bind(this);
        this.updateUsernameInput = this.updateUsernameInput.bind(this);
        this.updateVerifyPasswordInput = this.updateVerifyPasswordInput.bind(this);
        this.checkboxUpdate = this.checkboxUpdate.bind(this);

        this.submitForm = this.submitForm.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
    }

    updateEmailInput(obj) {
        this.setState({
            email: obj.target.value,
            formComplete: (this.checkPassword() && this.checkUsername() && this.checkEmail()),
        });
    }

    updateUsernameInput(obj) {
        this.setState({
            username: obj.target.value,
            formComplete: (this.checkPassword() && this.checkUsername() && this.checkEmail()),
        });
    }

    updatePasswordInput(obj) {
        this.setState({
            password: obj.target.value,
            formComplete: (this.checkPassword() && this.checkUsername() && this.checkEmail()),
        });
    }

    updateVerifyPasswordInput(obj) {
        this.setState({
            verifPassword: obj.target.value,
            formComplete: (this.checkPassword() && this.checkUsername() && this.checkEmail()),
        });
    }

    checkboxUpdate(obj) {
        this.setState({
            formComplete: (this.checkPassword() && this.checkUsername() && this.checkEmail()),
            termsAgreed: this.target.value,
        })

    }

    checkEmail = () => {
        //first check @brocku.ca
        let length = this.state.email.length;
        if (length > 10) { // otherwise the next line would be problematic 
            if (this.state.email.substring(length - 10, length) === "@brocku.ca") {
                //check backend to make sure that email hasnt been used
                let emailInUse = false;
                //do the api call & set emailInUse to the response 

                return !emailInUse; // if the email is in use return false cause that email failed the test and vice versa 
            }
        }
        //email no good 
        return false;
    }

    //password boxes match and are at least 8 characters 
    checkPassword = () => {
        return this.state.password === this.state.verifPassword && this.state.password.length > 7;
    }

    //min 4 character username (this is becuase i really want the username 'seth' but open to discussion of course)
    checkUsername = () => {
        return this.state.username.length > 3;
    }

    submitForm = () => {
        //good to go?
        if (this.checkEmail() && this.checkPassword() && this.checkUsername()) { // passwords match, email stuff all worked out 
            //send info to the back end and create the account 
            //route to confirmation page 
            alert("Success! Confirmation email sent to " + this.state.email + ".");
        }
    }

    render() {
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Edit Profile</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Change Email address</Form.Label>
                                <Form.Control type="email" onChange={this.updateEmailInput} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>New Username(Nickname)</Form.Label>
                                <Form.Control type="username" onChange={this.updateUsernameInput} placeholder="Username" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label> New Password</Form.Label>
                                <Form.Control type="password" onChange={this.updatePasswordInput} placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formGroupVerifPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" onChange={this.updateVerifyPasswordInput} placeholder="Password" />
                            </Form.Group>
                            <Form.Group>
                                <input type="checkbox" id="agree" onChange={this.checkboxUpdate} />
                                <label htmlFor="agree">   I agree to <b>terms and conditions</b></label>
                            </Form.Group>
                            <Button disabled={!this.state.formComplete} onClick={this.submitForm} variant="danger">
                               Update Profile
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}