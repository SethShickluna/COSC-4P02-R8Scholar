import React, { Component } from 'react'; 
import {Form, Button, Card} from 'react-bootstrap'; 
import {withRouter} from 'react-router-dom'; 


const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
}


class SignupForm extends Component {

    constructor(props){
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

        this.submitForm = this.submitForm.bind(this);
        this.checkPassword = this.checkPassword.bind(this); 
        this.checkEmail = this.checkEmail.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
    }

    updateEmailInput(obj){
        this.setState({
            email: obj.target.value, 
            formComplete: (this.checkPassword() && this.checkUsername() && this.checkEmail()),
        }); 
    }

    updateUsernameInput(obj){
        this.setState({
            username: obj.target.value, 
            formComplete: (this.checkPassword() && this.checkUsername() && this.checkEmail()),
        }); 
    }

    updatePasswordInput(obj){ 
        this.setState({
            password: obj.target.value, 
            formComplete: (this.checkPassword() && this.checkUsername() && this.checkEmail()),
        });
    }

    updateVerifyPasswordInput(obj){
        this.setState({
            verifPassword: obj.target.value, 
            formComplete: (this.checkPassword() && this.checkUsername() && this.checkEmail()),
        });
    }


    checkEmail = () => {
        //first check @brocku.ca
        let length = this.state.email.length; 
        if(length > 10){ // otherwise the next line would be problematic 
            if(this.state.email.substring(length - 10, length) === "@brocku.ca"){
                //check backend to make sure that email hasnt been used
                let emailInUse = false; 
                fetch('/api/get-user' + '?email=' + this.state.email)
                    .then((response) => {
                        if(response.ok){
                            alert("This email is already in use. Did you forget your password?")
                        }else{
                            emailInUse = false; 
                        }
                    }); 
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
        this.checkEmail(); 
        
        const request = { 
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.email, 
                nickname: this.state.username,
                password: this.state.password, 
            }),
        }; 
        fetch("/api/create-user", request)
        .then((response) => {
            switch(response.status){
                case 201: 
                    alert("Account created successfully!"); 
                    this.props.history.push('/');
                    break; 
                default:
                    alert("Something went wrong :/ " + response.statusText); 
            }
        });
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
                                <Form.Control type="username" onChange={this.updateUsernameInput} placeholder="Username" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={this.updatePasswordInput}  placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formGroupVerifPassword">
                                <Form.Label>Re-enter Password</Form.Label>
                                <Form.Control type="password" onChange={this.updateVerifyPasswordInput} placeholder="Password" />
                            </Form.Group>
                            <Button onClick={this.submitForm} variant="primary">
                                Register 
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        ); 
    }
}

export default withRouter(SignupForm); 