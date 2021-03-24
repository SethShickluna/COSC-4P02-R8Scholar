import React, { Component } from 'react'; 
import {Form, Button, Card} from 'react-bootstrap'; 
import {withRouter} from 'react-router-dom'; 
import cookie from 'react-cookies'; 
import CustomPopover from "./CustomPopover";


const formStyle = {
    width: '30rem',
}
class SignupForm extends Component {

    constructor(props){
        super(props); 
        this.state = {
            email: "", 
            username: "", 
            password: "", 
            verifPassword: "", 
        }

        //allows us to this "this" inside the methods 
        this.handleInput = this.handleInput.bind(this);

        this.submitForm = this.submitForm.bind(this);
        this.checkPassword = this.checkPassword.bind(this); 
        this.checkEmail = this.checkEmail.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
    }

    handleInput(obj){
        this.setState({[obj.target.name]: obj.target.value}); 
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
    

    //password boxes match and are at least 10 characters 
    checkPassword = () => {
        return this.state.password === this.state.verifPassword && this.state.password.length >= 10;
    }

    //min 4 character username 
    checkUsername = () => {
        return this.state.username.length >= 4; 
    }

    async submitForm(e) {
        e.preventDefault(); //stop a reload
       
        if(this.checkEmail() && this.checkUsername && this.checkPassword){
            try {
                const response = await axiosInstance.post('/user/create/', {
                    nickname: this.state.nickname,
                    email: this.state.email,
                    password: this.state.password
                });
                return response;
            } catch (error) {
                 console.log(error.stack);
            }
        }else{
            //tell the user uh oh 
        }
    }

    render() { 
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Create Account</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.submitForm}>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" onChange={this.handleInput} name="email"placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="username" oonChange={this.handleInput} name="username" placeholder="Username" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={this.handleInput} name="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formGroupVerifPassword">
                                <Form.Label>Re-enter Password</Form.Label>
                                <Form.Control type="password" onChange={this.handleInput} name="verifPassword" placeholder="Password" />
                            </Form.Group>
                            <Button type="submit" variant="primary">
                                Register 
                            </Button>
                            <div style={{marginTop:"2%"}}/>
                            <CustomPopover index={0}/>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        ); 
    }
}

export default withRouter(SignupForm); 