import React, { Component } from 'react'; 
import { Button, Card, Form, Input, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import {Link} from "react-router-dom";
import cookie from 'react-cookies'; 
import axiosInstance from "../axiosApi"; 
import Navbar from "../components/Navbar";

export default class Signup extends Component {
    constructor(props) {
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
        this.authenticateLogin = this.authenticateLogin.bind(this);

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
                console.log(response);
                switch(response.status){
                    case 201:
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
        }
    }

    toolTip(){
        console.log("email selected");
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
                <h3 className="title mx-auto">Create an Account</h3>
                <Form className="register-form" onSubmit={this.submitForm}>
                  <label>Email</label>
                  <Input placeholder="Email" name="email" id="email" type="text" onChange={this.handleInput}/>
                  <UncontrolledTooltip placement="right" target="email">
                      Please use the email given by Brock University, ending in '@brocku.ca'
                  </UncontrolledTooltip>
                  <label>Nickname</label>
                  <Input placeholder="Nickname" name="nickname" id="nickname" type="text" onChange={this.handleInput}/>
                  <UncontrolledTooltip placement="right" target="nickname">
                      Nicknames must be at least 4 characters long. Make sure it's appropriate!
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
                  <label>Password</label>
                  <Input placeholder="Re-Enter Password" name="verifPassword"type="password" onChange={this.handleInput}/>
                  <Button block type="submit" className="btn-round" color="info">
                    Register
                  </Button>
                </Form>
                <div className="login">
                <Link to="/login">
                    <Button color="info" className="btn-link">
                        Have an account? Login Here
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
