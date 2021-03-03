import React, { Component } from 'react'; 
import {Form, Button, Card} from 'react-bootstrap'; 
import cookie from 'react-cookies'; 
import {Link, withRouter} from 'react-router-dom'; 


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
            
        let length = this.state.email.length; 
        if(length > 10){ // otherwise the next line would be problematic 
            if(this.state.email.substring(length - 10, length) === "@brocku.ca"){
                const request = { 
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                        email: this.state.email, 
                        password: this.state.password, 
                    }),
                }; 
                fetch("/api/login/", request)
                .then((response) => {
                    if(response.ok){ //yay
                        cookie.save("isLoggedIn", "true", {path:"/"}); 
                        cookie.save("email", this.state.email, {path: "/"}); 
                        this.props.history.push('/');
                    }else{//nay 
                        alert("Invalid username or password please enter your information again.")
                    }
                });
               
            }
        }else{ 
            alert("Make sure to use a brock email!");
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
                            <Button style={buttonStyle}variant="primary" onClick={this.submitForm}>
                                Sign In
                            </Button>
                            
                            <Button style={buttonStyle} variant="primary" as={Link} to='/Signup'>
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>


            </div>
        ); 
    }
}

export default withRouter(LoginForm); 