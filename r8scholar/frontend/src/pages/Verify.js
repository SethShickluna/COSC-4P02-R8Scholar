import React, {Component} from 'react'; 
import {withRouter} from 'react-router-dom'; 
import {Container, Row, Col, Form, Input, Button} from 'reactstrap'; 
import cookie from 'react-cookies';
import SecondaryNav from '../components/SecondaryNav'; 

const title = { 
    marginTop: '5%', 
}

class Verification extends Component { 

    constructor(props){
        super(props); 
        this.state = { 
            user: null,
            code: "", 
        }; 
        this.updateCodeValue = this.updateCodeValue.bind(this); 
        this.verifyUser = this.verifyUser.bind(this); 
    }

    componentDidMount(){ 
        console.log
        fetch('/api/get-user' + '?email=' + cookie.load('email'))//get the info on the reviewer 
        .then((response) => {
            return response.json(); 
        })
        .then((data) => {
            this.setState({user: data})
        });
    }

    updateCodeValue(obj){
        this.setState({
            code: obj.target.value, 
        })
    }


    verifyUser(){ 
        if(this.state.user.is_verified){
            this.props.history.push('/');
        }else{
            const request = { 
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    verification_code: this.state.code,
                }),
            }; 
            fetch("/api/verify-user?email="+this.state.user.email, request)
            .then((response) => {
                if(response.ok){
                    //reload page 
                    alert("Success");
                    cookie.save("isLoggedIn", "true", {path:"/"}); 
                    cookie.save("email", this.state.email, {path: "/"}); 
                    this.props.history.push('/');
                }else{
                    alert("Invalid Code!");
                };
            });
        }
    }

    render(){ 
        return (
            <div>
                <SecondaryNav/>
            <div>
                <Container>
                    <Row align="center">
                        <Col>
                            <div style={title}>
                                <h1>Verify your account</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col align="center">
                            <div style={{marginTop:"15%"}}>
                                <Form>
                                    <h5>Please enter the code that was emailed to {cookie.load('email')}</h5>
                                    <Input placeholder="ex: HY7G9F" bsSize="lg" maxLength="50" onChange={this.updateCodeValue}/>
                                    <Button onClick={this.verifyUser}style={{marginTop: "5%"}}color="primary" size="lg">Verify Now!</Button>
                                </Form>
                            </div>
                            <div style={{marginTop:"15%"}}>
                                <p>Didnt recieve an email? <a href="#">Resend</a> verification email</p>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>
            </div>
        ) 
    }; 
}

export default withRouter(Verification); 