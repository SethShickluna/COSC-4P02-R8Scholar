import React, { Component } from 'react'; 
import {Form, Button, Card} from 'react-bootstrap'; 



const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
}

export default class LoginForm extends Component {

    constructor(props){
        super(props); 
        this.state = { 
            email: "", 
            password: "", 
        }
        this.updateEmailInput = this.updateEmailInput.bind(this);
        this.updatePasswordInput = this.updatePasswordInput.bind(this);

        this.submitForm = this.submitForm.bind(this); 
    }

    updateEmailInput(obj){
        this.setState({
            email: obj.target.value, 
        });
    }

    updatePasswordInput(obj){
        this.setState({
            password: obj.target.value, 
        });
    }


    submitForm = () => {
        //send info to backend 
            //this.state.email 
            //this.state.password
            
        let userIsVerified = true; 
        if(userIsVerified){ // replace with response from back end 
            //set login status to true 
            //have user stuff in local storage? 
            
            //route to home page 
        }else{ 
            alert("Invalid Email or Username. Please try again.")
        }
    }

    render() { 
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Sign In</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" onChange={this.updateEmailInput} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={this.updatePasswordInput} placeholder="Password" />
                            </Form.Group>
                            <Button variant="danger" onClick={this.submitForm}>
                                Sign In
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        ); 
    }
}
