import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Accordion, Button, ListGroup, ListGroupItem} from 'react-bootstrap'; 
import StarRatings from 'react-star-ratings';


const noCommentMessage = "No comments yet!";


export default class ReviewItem extends Component {

    //props is going to consist of the review item passed by the course 
    constructor(props){
        super(props); 
        //props contains object called reviewItem containing 
        /*
        -Title 
        -Content
        -Rating 
        -User
        -Comments (object)
        */
    }

    //the JSX that is rendered when this file is imported as a component 
    render() {
        return (
            <div className="App">
                {/* container (card )which includes a title section + rating and a content section + button to see comments */}
                    <Card style={{marginTop: '4%'}}>
                        <Accordion>
                            <Card.Body>
                                <Card.Title>{this.props.reviewItem.title}<p style={{float: "right"}}>{new Date().getFullYear()}</p></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{this.props.reviewItem.user + " "} 
                                    <StarRatings
                                        rating={this.props.reviewItem.rating}
                                        starDimension="25px"
                                        starSpacing="5px"
                                        starRatedColor="red"
                                        numberOfStars={5}
                                        name='avgRating'
                                    />
                                </Card.Subtitle>
                                <Card.Text>
                                    {this.props.reviewItem.content}
                                </Card.Text>
                                <Accordion.Toggle as={Button} variant="danger" eventKey="0">
                                    Show Comments
                                </Accordion.Toggle>
                            </Card.Body>
                            <Accordion.Collapse eventKey="0">
                                <ListGroup >
                                    {this.props.reviewItem.comments != null ?
                                        this.props.reviewItem.comments.map((item, index) => 
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