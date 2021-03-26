import React, { Component } from 'react'; 
import {Form, Button, Card} from 'react-bootstrap'; 
import {withRouter} from 'react-router-dom'; 
import cookie from 'react-cookies'; 
import CustomPopover from "./CustomPopover";
import axiosInstance from "../axiosApi"; 


const formStyle = {
    width: '30rem',
}
class SignupForm extends Component {

    constructor(props){
        super(props); 
        this.state = {
            email: "", 
            nickname: "", 
            password: "", 
            verifPassword: "", 
        }

        //allows us to this "this" inside the methods 
        this.handleInput = this.handleInput.bind(this);

        this.submitForm = this.submitForm.bind(this);
        this.checkPassword = this.checkPassword.bind(this); 
        this.checkEmail = this.checkEmail.bind(this);
        this.checkNickname= this.checkNickname.bind(this);
    }

    handleInput(obj){
        this.setState({[obj.target.name]: obj.target.value}); 
    }

    checkEmail = () => {
        //first check @brocku.ca
        let length = this.state.email.length; 
        if(length > 10){ // otherwise the next line would be problematic 
            if(this.state.email.substring(length - 10, length) === "@brocku.ca"){ 
                return true; 
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
    checkNickname = () => {
        return this.state.nickname.length >= 4; 
    }

    async submitForm(e) {
        e.preventDefault(); //stop a reload
       
        if(this.checkEmail() && this.checkNickname() && this.checkPassword){
            try {
                const response = await axiosInstance.post('/create-user/', {
                    nickname: this.state.nickname,
                    email: this.state.email,
                    password: this.state.password
                });
                switch(response.status){
                    case 201:
                        console.log("Created");
                        this.authenticateLogin(); 
                        break; 
                    default:
                        console.log("Something went wrong. Please enter your information again.")
                }
                return response;
            } catch (error) {
                console.log("Email or nickname already in use. Please enter different information");
            }
        }else{
           console.log("Invalid User Data");
        }
    }

    async authenticateLogin(){
        try { 
            const response = await axiosInstance.post('/token/obtain/', { //note the use of async and await in this function 
                email: this.state.email,
                password: this.state.password
            });
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            cookie.save('email', this.state.email, {path: '/'}); 
            cookie.save('isLoggedIn', "true", {path: '/'});
            this.props.history.push('/verify');
            return data;
        }catch(error){
            throw error; 
            alert("Invalid Username or Password!")
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
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control type="username" onChange={this.handleInput} name="nickname" placeholder="Username" />
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