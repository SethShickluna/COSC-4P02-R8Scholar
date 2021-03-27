import React, { Component } from 'react';
import { Form, Button, Card } from 'reactstrap';


const formStyle = {
    //textAlign: 'center',
    width: '30rem',
    //justifyContent: 'center',
}

export default class RemoveItemForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "", 
            reason: "", 
            formComplete: false,

        }
        this.updateNameInput = this.updateNameInput.bind(this); //updateName input
        this.updateReasonInput = this.updateReasonInput.bind(this);

        this.checkName = this.checkName.bind(this);
        this.checkReason = this.checkReason.bind(this);

    } 
    updateNameInput(obj) {
        this.setState({
            name: obj.target.value,
            formComplete: (this.checkName() && this.checkReason()),
        });
    }

    updateReasonInput(obj) {
        this.setState({
            reason: obj.target.value,
            formComplete: (this.checkName() && this.checkReason()),
        });
    }

    checkName = () => {
        return this.state.name.length > 3;
    }

    checkReason = () => {
        return this.state.reason.length >1; //nonempty 
    }

    submitForm = () => {
        //good to go?
        if (this.checkName() && this.checkReason()) { // passwords match, email stuff all worked out 
            //send info to the back end and create the account 
            //route to confirmation page 
            alert("Success! ");
        }
    }

    render() {
        return (
            <div>
                <Card style={formStyle}>
                    <Card.Header as='h4'>Remove Review Item</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formGroupName">
                                <Form.Label>Entity Name</Form.Label>
                                <Form.Control type="name" onChange={this.updateNameInput} placeholder="Enter name..." />
                            </Form.Group>
                            <Form.Group controlId="formGroupReason">
                                <Form.Label>Reason</Form.Label>
                                <Form.Control type="reason" onChange={this.updateReasonInput} placeholder="Reason..." />
                            </Form.Group>
                            <Button disabled={!this.state.formComplete} onClick={this.submitForm} variant="danger">
                              Remove Entity
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
} 