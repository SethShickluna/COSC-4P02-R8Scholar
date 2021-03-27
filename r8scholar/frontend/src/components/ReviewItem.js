import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText, ListGroupItem, Button, Row, Col } from 'reactstrap';;
import StarRatings from 'react-star-ratings';
import ReportForm from "./ReportReviewForm";
import EditForm from "./EditReviewForm"; 

const reviewTitle = {
    color: "black", 
    fontSize: "22px", 
    fontWeight: "300"
}



export default class ReviewItem extends Component {

    //props is going to consist of the review item passed by the course 
    constructor(props){
        super(props); 
        //props contains object called reviewItem containing 
        /*
        -Title {this.props.reviewItem.title}
        -Content {this.props.reviewItem.content}
        -Rating rating={this.props.reviewItem.rating}
        -User {this.props.reviewItem.nickname}
        -Comments (object)
        */
       //second props contains a boolean value which determines of the edit button should be there
       //this.props.isOwner
    }

    edit(){ 
        
    }

    //the JSX that is rendered when this file is imported as a component 
    render() {
        return (
            <div className="App">
                {/* container (card )which includes a title section + rating and a content section + button to see comments */}
                <Card>
                    <CardHeader>
                        <Row>
                            <Col className="col-md-10" align="left">
                                <p style={reviewTitle}>{this.props.reviewItem.title}</p>
                            </Col>
                            <Col className="col-md-2" align="right">
                                {this.props.isOwner ?
                                <div style={{marginTop:"10px"}}>
                                    
                                    <EditForm type={this.props.type} review={this.props.reviewItem}/>
                                </div>
                                : null} 
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <CardTitle><h6>{this.props.reviewItem.nickname}</h6> <StarRatings
                                        rating={this.props.reviewItem.rating}
                                        starDimension="30px"
                                        starSpacing="10px"
                                        starRatedColor="#3498db"
                                        numberOfStars={5}
                                        name='instructorRating'
                                    /></CardTitle>
                        <CardText><h5>{this.props.reviewItem.content}</h5></CardText>
                    </CardBody>
                    <ListGroupItem>
                        <Row>
                            <Col align="left">
                                <Button color="primary" onClick={this.report}>View Comments</Button>
                            </Col>
                            <Col align="right">
                                <ReportForm reviewID={this.props.reviewItem.review_id}/>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </Card>
            </div>
        );
    }
}