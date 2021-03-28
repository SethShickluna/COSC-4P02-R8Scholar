import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { BsFillExclamationCircleFill } from 'react-icons/bs';
import EditReviewForm from './EditReviewForm';
import ReportReviewForm from './ReportReviewForm';


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
       this.state = { 
           review_id: this.props.reviewItem.review_id, //getting the id for the review item
       }
       //console.log(this.props.reviewItem)
       this.hide = this.hide.bind(this);
    }

    openFullReview(){

    }

        
    hide = () => {
        var x = document.getElementById("hiddenDIV");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }

      hide2 = () => {
        var x = document.getElementById("hiddenDIV2");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
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
                        <div><Button onclick={this.openFullReview} color="success">View Comments</Button></div>
                        
                        <div  style ={{marginTop:'2%',float:'left'}}> <Button  onClick = {this.hide} color = "danger"> Edit Review</Button> </div>  {/*Insert a form with edit review */}
                     <div style={{float:'right', marginTop:'2%'}}><Button  onClick={this.hide2}><BsFillExclamationCircleFill></BsFillExclamationCircleFill> Report</Button> </div> {/*Insert a form with dropdown */}
                     <div style={{display:'none'}} id="hiddenDIV" >
                     <EditReviewForm review = {this.props.reviewItem}> </EditReviewForm>
                     </div>
                    <div style={{display:'none'}} id="hiddenDIV2" >
                        <ReportReviewForm review ={this.props.reviewItem}></ReportReviewForm>

                    </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}