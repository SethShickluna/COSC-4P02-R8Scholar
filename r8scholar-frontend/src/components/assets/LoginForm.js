import React, { Component } from 'react'; 
import {Form, Button, Card} from 'react-bootstrap'; 


const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
}

export default class LoginForm extends Component {
    render() { 
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Sign In</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="danger" type="submit">
                                Sign In
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        ); 
    }
}
