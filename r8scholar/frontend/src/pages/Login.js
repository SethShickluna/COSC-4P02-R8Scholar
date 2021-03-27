import React, { Component } from 'react'; 
import { Button, Card, Form, Input, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import {Link} from "react-router-dom";
import cookie from 'react-cookies'; 
import axiosInstance from "../axiosApi"; 
import Navbar from "../components/Navbar";

export default class Login extends Component {
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
            <>
            <Navbar/>
            <div
                className="page-header"
                style={{
                backgroundImage:"url(https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcou.on.ca%2Fwp-content%2Fuploads%2F2015%2F04%2FBrock-University-Cairns-after-dusk.jpg&f=1&nofb=1)",
                }}
            >
        <div className="filter" />
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Sign In</h3>
                <Form className="register-form" onSubmit={this.submitForm}>
                  <label>Email</label>
                  <Input placeholder="Email" name="email" id="email" type="text" onChange={this.handleInput}/>
                  <UncontrolledTooltip placement="right" target="email">
                      Please use the email given by Brock University, ending in '@brocku.ca'
                  </UncontrolledTooltip> 
                  <label>Password</label>
                  <Input placeholder="Password" id="password"name="password"type="password" onChange={this.handleInput}/>
                  <UncontrolledTooltip  style={{minWidth: "70px"}} placement="right" target="password">
                      <h5>Password Requirements: </h5>
                      <ul>
                          <li>At least 1 uppercase</li>
                          <li>At least 1 lowercase</li>
                          <li>At least 1 number</li>
                          <li>At least 10 characters</li>
                      </ul>
                  </UncontrolledTooltip>
                  <Button block type="submit" className="btn-round" color="info">
                    Sign In
                  </Button>
                </Form>
                <div className="login">
                <Link to="/signup">
                    <Button color="info" className="btn-link">
                        Need an account? Sign up Today!
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
    )}
}
