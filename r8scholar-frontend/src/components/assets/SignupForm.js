import React, { Component } from 'react'; 
import {Form, Button, Card} from 'react-bootstrap'; 


const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
}


export default class SignupForm extends Component {

    constructor(props){
        super(props); 
        this.state = {
            username: "", 
            password: "", 
            verifPassword: "", 
            email: "", 
            formComplete: false, 
        }

        //allows us to this "this" inside the methods 
        this.updateEmailInput = this.updateEmailInput.bind(this);
        this.updateUsernameInput = this.updateUsernameInput.bind(this);
        this.updatePasswordInput = this.updatePasswordInput.bind(this);
        this.updateVerifyPasswordInput = this.updateVerifyPasswordInput.bind(this); 
        this.submitForm = this.submitForm.bind(this);
        
        this.checkPassword = this.checkPassword.bind(this); 
        this.verifyEmail = this.verifyEmail.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
    }

    updateEmailInput(obj){
        this.setState({
            email: obj.target.value, 
            formComplete: (this.checkPassword() && this.checkUsername() && this.verifyEmail()),
        }); 
    }

    updateUsernameInput(obj){
        this.setState({
            username: obj.target.value, 
            formComplete: (this.checkPassword() && this.checkUsername() && this.verifyEmail()),
        }); 
    }

    updatePasswordInput(obj){ 
        this.setState({
            password: obj.target.value, 
            formComplete: (this.checkPassword() && this.checkUsername() && this.verifyEmail()),
        });
    }

    updateVerifyPasswordInput(obj){
        this.setState({
            verifPassword: obj.target.value, 
            formComplete: (this.checkPassword() && this.checkUsername() && this.verifyEmail()),
        });
    }

    verifyEmail = () => {
        //first check @brocku.ca
        //send to back to make sure this email hasnt been used 
        let length = this.state.email.length; 
        if(this.state.email !== null ){
            console.log(this.state.email.substring(length - 10, length)); 
            if(this.state.email.substring(length - 10, length) === "@brocku.ca"){
                //check backend to make sure that email hasnt been used
                let emailInUse = false; 
                if(emailInUse){
                    //its used 
                    return false; 
                }
                //good to go
                return true; 
            }
        }
        //email no good 
        return false;
    }

    checkPassword = () => {
        // perform all neccassary validations
        if (this.state.password === this.state.verifPassword) {
            if(this.state.password.length < 8){
                //less than 8 digits 
                return false; 
            }
            //good to go 
            return true; 
        }
        //passwords do not match  
        return false; 
    }

    checkUsername = () => {
        if(this.state.username.length < 5){ //this is arbitary right now -- bring up with group
            return true; 
        }
        //username too short
        return false; 
    }

    submitForm(){
        //good to go?
        if(this.verifyEmail() && this.checkPassword() && this.checkUsername()){ // passwords match, email stuff all worked out 
            //send info to the back end and create the account 
            //route to confirmation page 
            alert("Success! Confirmation email sent to " + this.state.email + "."); 
        }
    }

    render() { 
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Create Account</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" onChange={this.updateEmailInput} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" onChange={this.updateUsernameInput} minLength={4} placeholder="Username" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={this.updatePasswordInput} minLength={8} placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formGroupVerifPassword">
                                <Form.Label>Re-enter Password</Form.Label>
                                <Form.Control type="password" onChange={this.updateVerifyPasswordInput} minLength={8} placeholder="Password" />
                            </Form.Group>
                            <Button onClick={this.submitForm} variant="danger" type="submit">
                                Register 
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        ); 
    }
}
