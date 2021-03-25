import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { BsFillExclamationCircleFill } from 'react-icons/bs';


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
       console.log(this.props.reviewItem)
       this.report = this.report.bind(this);
    }

    openFullReview(){

    }

    report = () => alert("Reported!");
        

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
                        <div><Button onclick={this.openFullReview} color="success">View Full Review</Button></div>
                        
                        <div /*add a check if the review is the user's */ style ={{marginTop:'2%',float:'left'}}> <Button color = "danger"> Edit Review</Button> </div>
                     <div style={{float:'right', marginTop:'2%'}}><Button  onClick={this.report}><BsFillExclamationCircleFill></BsFillExclamationCircleFill> Report</Button> </div> 
                    </CardBody>
                </Card>
            </div>
        );
    }
}