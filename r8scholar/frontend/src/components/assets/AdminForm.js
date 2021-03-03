import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';


const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
}

export default class AdminForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "", 
            type: "", 
            formComplete: false,

        }
        this.updateNameInput = this.updateNameInput.bind(this); //updateName input
        this.updateTypeInput = this.updateTypeInput.bind(this);

        this.checkName = this.checkName.bind(this);
        this.checkType = this.checkType.bind(this);

    } 
    updateNameInput(obj) {
        this.setState({
            name: obj.target.value,
            formComplete: (this.checkName() && this.checkType()),
        });
    }

    updateTypeInput(obj) {
        this.setState({
            type: obj.target.value,
            formComplete: (this.checkName() && this.checkType()),
        });
    }

    checkName = () => {
        return this.state.name.length > 3;
    }

    checkType = () => {
        return this.state.type === "Student"||"Course"||"Professor"||"Department";
    }

    submitForm = () => {
        //good to go?
        if (this.checkName() && this.checkType()) { // passwords match, email stuff all worked out 
            //send info to the back end and create the account 
            //route to confirmation page 
            alert("Success! ");
        }
    }

    render() {
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Create Review Item</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formGroupName">
                                <Form.Label>Entity Name</Form.Label>
                                <Form.Control type="name" onChange={this.updateNameInput} placeholder="Enter name..." />
                            </Form.Group>
                            <Form.Group controlId="formGroupType">
                                <Form.Label>Enitity Type</Form.Label>
                                <Form.Control type="type" onChange={this.updateTypeInput} placeholder="Type..." />
                            </Form.Group>
                            <Button disabled={!this.state.formComplete} onClick={this.submitForm} variant="danger">
                              Add Entity
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
} 