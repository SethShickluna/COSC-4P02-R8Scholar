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
            nickname: "",
            formComplete: false
        }

        //allows us to this "this" inside the methods 
        this.updateNicknameInput = this.updateNicknameInput.bind(this);

        this.submitForm = this.submitForm.bind(this);
        this.checkNickname = this.checkNickname.bind(this);
    }

  

    updateNicknameInput(obj) {
        this.setState({
            nickname: obj.target.value,
            formComplete:(true),
        });
    }


    //min 4 character username (this is becuase i really want the username 'seth' but open to discussion of course)
    checkNickname = () => {
        return this.state.nickname.length >3
    }

    submitForm = () => {
        //good to go?
        if (this.checkNickname) {  
            alert("Success!");
        }
    }

    render() {
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Change Nickname</Card.Header>
                    <Card.Body>
                        <Form>
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