import React, { Component } from 'react'; 
import {Form, Button, Card} from 'react-bootstrap'; 
import cookie from 'react-cookies'; 
import {Link, withRouter} from 'react-router-dom'; 
import axiosInstance from "../axiosApi";

import CustomPopover from "./CustomPopover";



const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
}

const buttonStyle = {
    justifyContent: 'center',
    marginRight: '13px', 
}

class LoginForm extends Component {
    
    constructor(props){
        super(props); 
        this.state = { 
            email: "", 
            password: "", 
        }
        
        this.handleInput = this.handleInput.bind(this);

        this.submitForm = this.submitForm.bind(this); 
    }

    handleInput(obj){
        this.setState({[obj.target.name]: obj.target.value}); 
    }

    
    /**
     * need to display error codes to user: TODO
     * 401 = incorrect username or password 
    */
    async submitForm (e) {
        e.preventDefault(); //stop a reload
        
        //attempt to get an authentication token via post request 
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
            this.props.history.push('/');
            return data;
        }catch(error){
            throw error; 
        }
    }

    render() { 
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Sign In</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.submitForm}>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" onChange={this.handleInput} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" onChange={this.handleInput} placeholder="Password" />
                            </Form.Group>
                            <Button style={buttonStyle}variant="primary" type="submit">
                                Sign In
                            </Button>
                            <Button style={buttonStyle} variant="primary" as={Link} to='/Signup'>
                                Register
                            </Button>
                            <div style={{marginTop:"2%"}}/>
                            <CustomPopover index={1}/>
                        </Form>
                    </Card.Body>
                </Card>


            </div>
        ); 
    }
}

export default withRouter(LoginForm); 