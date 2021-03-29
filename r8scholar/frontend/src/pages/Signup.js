import React, { Component } from 'react'; 
import { 
  Button, 
  Card, 
  Form, 
  Input, 
  Container, 
  Row, 
  Col, 
  UncontrolledTooltip, 
  FormGroup, 
  Alert, 
  Spinner
} from "reactstrap";
import cookie from 'react-cookies'; 
import axiosInstance from "../axiosApi"; 
import Navbar from "../components/Navbar";

const warningStyle = { 
    color : "white", 
    fontWeight: "200", 
    fontSize: "16px",
}

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "", 
            nickname: "", 
            password: "", 
            verifPassword: "", 
            validEmail: false, 
            validPassword: false, 
            validPassword2: false, 
            validNickname: false, 
            invalidInfo: false, 
            incomplete: false,
            loading: false,
        }

        //allows us to this "this" inside the methods 
        this.handleInput = this.handleInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.authenticateLogin = this.authenticateLogin.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onDismiss2 = this.onDismiss.bind(this);

        this.checkPassword = this.checkPassword.bind(this); 
        this.checkEmail = this.checkEmail.bind(this);
        this.checkNickname = this.checkNickname.bind(this);
    }

    handleInput(obj){
        this.checkCredentials(obj.target.name, obj.target.value); 
        this.setState({[obj.target.name]: obj.target.value}); 
    }

    checkCredentials(name, value){
		switch(name){
			case "password":
				this.checkPassword(value); 
				break; 
			case "nickname":
				this.checkNickname(value); 	
				break; 
            case "verifPassword":
                this.verifyPassword(value); 
                break; 
			default: 
				this.checkEmail(value); 
				break; 
		}
    }

    verifyPassword = (password) => { 
        this.setState({validPassword2: password === this.state.password}); 
        return password === this.state.password;
    }

    checkEmail = (email) => {
        //first check @brocku.ca
        let length = email.length; 
        if(length > 10){ // otherwise the next line would be problematic 
            if(email.substring(length - 10, length) === "@brocku.ca"){ 
				this.setState({validEmail: true}); 
                return true; 
            }
        }
        //email no good 
		this.setState({validEmail: false}); 
        return false;
    }

    //password boxes match and are at least 10 characters 
    checkPassword = (password) => {
		let length = password.length >= 10; 
        let capital = password.toUpperCase() !== password; 
        let lower = password.toLowerCase() !== password;
        let number =  /\d/.test(password);
        this.setState({validPassword: (length && capital && lower && number), validPassword2: password === this.state.verifPassword}); 
        return length && capital && lower && number;
    }

    //min 4 character username 
    checkNickname = (name) => {
        this.setState({validNickname:  name.length >= 4})
        return name.length >= 4; 
    }

    async submitForm(e) {
        e.preventDefault(); //stop a reload
       
        if(this.checkEmail(this.state.email) && this.checkNickname(this.state.nickname) && this.checkPassword(this.state.password)){
            try {
                this.setState({loading: true});
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
                this.setState({invalidInfo: true})
            }
        }else{
            this.setState({incomplete: true})
        }
        this.setState({loading: false});
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
    
    onDismiss(){
        this.setState({invalidInfo: !this.state.invalidInfo});
    }

    onDismiss2(){
        this.setState({incomplete: !this.state.incomplete});
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
                <div style={{marginTop: "5%"}}/>
            </Row>
            <Row>
                <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                    <Alert color="danger" isOpen={this.state.invalidInfo} toggle={this.onDismiss}>
                        <b>That email or nickname is in use! Please enter new information and try again.</b>
                    </Alert>
                    <Alert color="danger" isOpen={this.state.incomplete} toggle={this.onDismiss2}>
                        <b>Please fill out the required fields before submitting!</b>
                    </Alert>
                    <h3 className="title mx-auto">Create an Account</h3>

                    {this.state.loading ? 
                        <div>
                            <h6 style={{color: "white"}}>One moment please. </h6>
                            <Col align="center">
                                <Spinner color="black"/>
                            </Col>
                        </div>
                    :
                    <Form className="register-form" onSubmit={this.submitForm}>
                    <FormGroup>
                        <label>Email</label>
                        <Input placeholder="email@brocku.ca" valid={this.state.validEmail} invalid={!this.state.validEmail}
                        name="email" id="email" type="text" onChange={this.handleInput}/>
                        <UncontrolledTooltip placement="right" target="email">
                        Please use the email given by Brock University, ending in '@brocku.ca'
                        </UncontrolledTooltip>
                    </FormGroup>
                    
                    <label>Nickname</label>
                    <Input placeholder="Nickname" valid={this.state.validNickname} invalid={!this.state.validNickname} 
                    name="nickname" id="nickname" type="text" onChange={this.handleInput}/>
                    <UncontrolledTooltip placement="right" target="nickname">
                        Nicknames must be at least 4 characters long. Make sure it's appropriate!
                    </UncontrolledTooltip>
                    <label>Password</label>
                    <Input placeholder="Password" valid={this.state.validPassword} invalid={!this.state.validPassword} 
                    id="password"name="password"type="password" onChange={this.handleInput}/>
                    <UncontrolledTooltip style={{minWidth: "70px"}} placement="right" target="password">
                        <h5>Password Requirements: </h5>
                        <ul>
                            <li>At least 1 uppercase</li>
                            <li>At least 1 lowercase</li>
                            <li>At least 1 number</li>
                            <li>At least 10 characters</li>
                        </ul>
                    </UncontrolledTooltip>
                    <label>Password</label>
                    <Input placeholder="Re-Enter Password" valid={this.state.validPassword2} invalid={!this.state.validPassword2} 
                    name="verifPassword"type="password" onChange={this.handleInput}/>

                    <FormGroup>
                         <Button block type="submit" id="button1"className="btn-round" color="info">
                            Register
                        </Button>
                    </FormGroup>
                   
                    </Form> }
                    
                    <h6 style={{color: "white"}}>We <strong>strongly</strong> reccomend that you use a different password than your Brock Univeristy accounts. </h6>
                </Card>
                </Col>
            </Row>
        </Container>
      </div>
    </>
    )}
}
