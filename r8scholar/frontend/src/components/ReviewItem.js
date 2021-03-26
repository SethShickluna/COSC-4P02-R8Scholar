import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import StarRatings from 'react-star-ratings';




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

    openFullReview(){

    }

    //the JSX that is rendered when this file is imported as a component 
    render() {
        return (
            <div className="App">
                {/* container (card )which includes a title section + rating and a content section + button to see comments */}
                <Card style={{marginTop:"3%"}}>
                    <CardHeader><h3>{this.props.reviewItem.title}</h3></CardHeader>
                    <CardBody>
                        <CardTitle>{this.props.reviewItem.nickname}</CardTitle>
                        <CardTitle><StarRatings rating={this.props.reviewItem.rating}
                                        starDimension="25px"
                                        starSpacing="5px"
                                        starRatedColor="#3498db"
                                        numberOfStars={5}
                                        name='avgRating'/></CardTitle>
                        <CardText><h5>{this.props.reviewItem.content}</h5></CardText>
                        <Button onclick={this.openFullReview} color="success">View Full Review</Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}