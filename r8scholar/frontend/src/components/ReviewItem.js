import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardTitle, CardText, ListGroupItem, Button, Row, Col, Label } from "reactstrap";
import StarRatings from "react-star-ratings";
import ReportForm from "./ReportReviewForm";
import EditForm from "./EditReviewForm";
import CommentForm from "./CommentForm";
import { BsFillTrashFill } from "react-icons/bs";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import axiosInstance from "../axiosApi";

const reviewTitle = {
    color: "black",
    fontSize: "22px",
    fontWeight: "300",
};

//props contains object called reviewItem containing
/*
        -Title {this.props.reviewItem.title}
        -Content {this.props.reviewItem.content}
        -Rating rating={this.props.reviewItem.rating}
        -User {this.props.reviewItem.nickname}
        -reviewID {this.props.reviewItem.reviewID}
        -Comments (object)
        */
//second props contains a boolean value which determines of the edit button should be there
//this.props.isOwner
export default class ReviewItem extends Component {
    //props is going to consist of the review item passed by the course
    constructor(props) {
        super(props);
        console.log(props);
        this.delete = this.delete.bind(this);
    }

    async delete() {
        try {
            let response = await axiosInstance.post("/delete-review/", {
                review_id: this.props.reviewItem.review_id,
            });
            window.location.reload();
            return response.status;
        } catch (error) {
            console.log(error.message);
        }
    }

    async vote(value) {
        try {
            let response;
            if (value.target.id === "upvote") {
                response = await axiosInstance.post("/upvote-review/", {
                    review_id: this.props.reviewItem.review_id,
                });
                window.location.reload();
            } else {
                response = await axiosInstance.post("/downvote-review/", {
                    review_id: this.props.reviewItem.review_id,
                });
                window.location.reload();
            }
            return response.status;
        } catch (error) {
            console.log(error.message);
        }
    }

    //the JSX that is rendered when this file is imported as a component
    render() {
        return (
            <div className="App">
                {/* container (card )which includes a title section + rating and a content section + button to see comments */}
                <Card>
                    <CardHeader>
                        <Row>
                            <Col className="col-md-7" align="left">
                                <p style={reviewTitle}>{this.props.reviewItem.title}</p>
                            </Col>
                            {/* If user is logged in show edit review and delete review buttons, if logged out show up/down votes */}
                            <Col className="col-md-5" align="right">
                                {this.props.isOwner ? (
                                    <div style={{ marginTop: "10px" }}>
                                        <EditForm type={this.props.type} review={this.props.reviewItem} />
                                        <Button style={{ marginLeft: "5px" }} color="danger" className="btn-round" type="button" onClick={this.delete}>
                                            <BsFillTrashFill /> Delete
                                        </Button>
                                    </div>
                                ) : (
                                    <div style={{ marginTop: "10px" }}>
                                        <Label disabled="true" style={{ marginRight: "15px", fontWeight: "bold", fontSize: "20px", color: "#000000", boxShadow: "5%" }} className="votes">
                                            0
                                        </Label>
                                        <Button
                                            style={{ marginLeft: "5px", borderRadius: "45%", borderColor: "#f1f1ee", backgroundColor: "#f1f1ee", color: "#77dd77", boxShadow: "5%" }}
                                            className="btn-round"
                                            type="button"
                                            id="upvote"
                                            onClick={this.vote}
                                        >
                                            <MdThumbUp className="upvote" size="20px" />
                                        </Button>
                                        <Button
                                            style={{ marginLeft: "5px", borderRadius: "45%", borderColor: "#f1f1ee", backgroundColor: "#f1f1ee", color: "#f5593d" }}
                                            className="btn-round"
                                            type="button"
                                            id="downvote"
                                            onClick={this.vote}
                                        >
                                            <MdThumbDown className="downvote" size="20px" />
                                        </Button>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                            <h6>{this.props.reviewItem.nickname}</h6>{" "}
                            <StarRatings rating={this.props.reviewItem.rating} starDimension="30px" starSpacing="10px" starRatedColor="#3498db" numberOfStars={5} name="instructorRating" />
                        </CardTitle>
                        <CardText>
                            <h5>{this.props.reviewItem.content}</h5>
                        </CardText>
                    </CardBody>
                    <ListGroupItem>
                        <Row>
                            <Col align="left">
                                <CommentForm review={this.props.reviewItem}> </CommentForm>
                            </Col>
                            <Col align="right">
                                <ReportForm reviewID={this.props.reviewItem.review_id} />
                            </Col>
                        </Row>
                    </ListGroupItem>
                </Card>
            </div>
        );
    }
}
