import React, { Component } from 'react';
import  {Link} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Accordion, Button, ListGroup, ListGroupItem} from 'react-bootstrap'; 


const noCommentMessage = "No comments yet!";

const cardStyle = {
    width: '60rem', 
    padding: '20px', 
    marginTop: '17px',
}

export default class ReviewItem extends Component {

    //props is going to consist of the review item passed by the course 
    constructor(props){
        super(props); 
    }

    //the JSX that is rendered when this file is imported as a component 
    render() {
        return (
            <div className="App">
                {/* container (card )which includes a title section + rating and a content section + button to see comments */}
                    <Card style={cardStyle}>
                        <Accordion>
                            <Card.Body>
                                <Card.Title>{this.props.review.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{this.props.review.user + " - " + this.props.review.rating + "/5"} </Card.Subtitle>
                                <Card.Text>
                                    {this.props.review.content}
                                </Card.Text>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Show Comments
                                </Accordion.Toggle>
                            </Card.Body>
                            <Accordion.Collapse eventKey="0">
                                <ListGroup >
                                    {this.props.review.comments != null ?
                                        this.props.review.comments.map((item, index) => 
                                            <ListGroupItem key={index}>
                                                {item.content}
                                            </ListGroupItem> )
                                        : "No comments yet!"} 
                                </ListGroup>
                            </Accordion.Collapse>
                        </Accordion>    
                    </Card>
            </div>
        );
    }
}