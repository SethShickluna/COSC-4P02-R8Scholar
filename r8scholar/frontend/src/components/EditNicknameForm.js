import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';


const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
}


export default class EditNicknameForm extends Component {
//make  a password form 
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            nickname: "",
            formComplete: false
        }

        //allows us to this "this" inside the methods 
        this.updateNicknameInput = this.updateNicknameInput.bind(this);
        this.updatePasswordInput = this.updatePasswordInput.bind(this);

        this.submitForm = this.submitForm.bind(this);
        this.checkNickname = this.checkNickname.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
    }

  

    updateNicknameInput(obj) {
        this.setState({
            nickname: obj.target.value,
            formComplete:(true),
        });
    }

    updatePasswordInput(obj) {
        this.setState({
            password: obj.target.value,
            formComplete: (this.checkPassword()),
        });
    }

    checkPassword = () => {
        return this.state.password.length  > 7;
    }


    //min 4 character username (this is becuase i really want the username 'seth' but open to discussion of course)
    checkNickname = () => {
        return this.state.nickname.length >3
    }

    submitForm = () => {
        //good to go?
        //send new nickname to backend
        if (this.checkNickname) { 
            
            const request = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password: this.state.password,
                    nickname: this.state.nickname,
                }),
            };
            //fetch 
            fetch("/api/change-nickname", request)
                .then((response) => {
                    if (response.ok) { //yay
                        //good response 
                        alert("Success, nickname changed!");
                        this.props.history.push('/');
                    } else {//nay 
                        alert("Invalid password...");
                    }
                });
            
        }else{
            alert("Nickname is too short!")
        }
    }

    

    render() {
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Change Nickname</Card.Header>
                    <Card.Body>
                        <Form>

                        <Form.Group controlId="formGroupOldPassword">
                                <Form.Label>Enter Old Password</Form.Label>
                                <Form.Control type="password" onChange={this.updateOldPasswordInput} placeholder="Enter password..." />
                            </Form.Group>

                            <Form.Group controlId="formGroupNickname">
                                <Form.Label>Change Nickname</Form.Label>
                                <Form.Control type="username" onChange={this.updateNicknameInput} placeholder="Enter new nickname" />
                            </Form.Group>

                            <Button disabled={!this.state.formComplete} onClick={this.submitForm} variant="primary">
                               Update Nickname
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}