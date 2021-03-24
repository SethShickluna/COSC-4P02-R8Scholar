import React, { Component } from "react";
import { Container, Row, Col, Tab, Button } from "reactstrap";
import ReviewItem from "../components/ReviewItem";
import SecondaryNav from "../components/SecondaryNav";
import Tabs from "react-bootstrap/Tabs";
import cookie from "react-cookies";
import imageOne from "../assets/images/ben-sweet-2LowviVHZ-E-unsplash.jpg";
import $ from "jquery";
import EditNicknameForm from "../components/EditNicknameForm";
import EditPasswordForm from "../components/EditPasswordForm";
import axiosInstance from "../axiosApi";

const pageStyles = {
    margin: "0 auto",
    marginTop: "3%",
    width: "90%",
};


const pageBreak = {
    //this sets the margin for reviews and draws a line hovering under the titles
    marginBottom: "2%",
    marginTop: "2%",
    height: "1px",
    backgroundColor: "#dedede",
    border: "none",
};

const tabStyle = {
    paddingTop: "2.5%",
};

const imgStyle = {
    width: "100%",
    height: "200px",
};

//code for submitting a profile image
$(document).ready(function () {
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $(".profile-pic").attr("src", e.target.result);
                newImage = e.target.result; //set new image to result
                //this.setState({profile_picture : e.target.result}) //change the state object
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    $(".file-upload").on("change", function () {
        readURL(this);
    });

    $(".upload-button").on("click", function () {
        $(".file-upload").click();
    });
});
//end of this section of code.

export default class Profile extends Component {
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way
        this.state = {
            //all the content that is gonna be retrieved from the api stored here locally
            user: null,
            reviews: null,
        };

        //this.getAllReviews = this.getAllReviews.bind(this);
    }

    componentDidMount() {
        this.authenicateUser(); //check their token --otherwise send them off this page 
    }

    async authenicateUser() { 
        try {
            const response = await axiosInstance.post('/token/refresh/', {
                refresh: localStorage.getItem('refresh_token') 
            });
            this.getUser(); 
            return response;//this is good we can stay 
        } catch (error) {
            this.props.history.push('/login');
        }
    }

    async getUser(){
        try {
            let response = await axiosInstance.get("/get-user/" + "?email=" + cookie.load("email"));
            const user = response.data;
            this.setState({
                user: user,
            });
            //get a users reviews 
            console.log("Getting Reviews"); 
            return response;
        }catch(error){
            console.log("Hello error: ", JSON.stringify(error, null, 4));
            // throw error; todo
        }
    }

    getAllReviews() {
        console.log("Needs backend implementation")
    }


    verifyUser() {
        var code = prompt(
            "Enter the 6 digit code emailed to " + this.state.user.email
        );
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                verification_code: code,
            }),
        };
        fetch("/api/verify-user?email=" + this.state.user.email, request).then(
            (response) => {
                if (response.ok) {
                    //reload page
                    alert("Success");
                    window.location.reload();
                } else {
                    alert("Invalid Code!");
                }
            }
        );
    }

    render() {
        return(
            <div>
                <SecondaryNav />
                {this.state.user ? (
                    <div style={pageStyles}>
                        <Container fluid="md">
                            <Row align="center">
                                <Col>
                                    {!this.state.user.is_verified ? (
                                        <div>
                                            <h2>
                                                Your account is not verfied!
                                            </h2>
                                            <Button
                                                onClick={this.verifyUser}
                                                color="info"
                                                size="lg"
                                            >
                                                Verify Now
                                            </Button>
                                        </div>
                                    ) : null}
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "3%" }}>
                                <Col sm={4}>
                                    <div name="title">
                                        {/*insert image edit, accept image and input it */}
                                        <h1 style={{ textAlign: "center" }}>
                                            {this.state.user.nickname}
                                        </h1>
                                    </div>
                                    <div style={pageBreak} /> {/* underline */}
                                    <div name="avg-rating-container">
                                        <div name="avg-rating-title">
                                            <h4 style={{ textAlign: "center" }}>
                                                Profile
                                            </h4>
                                        </div>
                                        <div
                                            style={{ textAlign: "center" }}
                                            name="avg-rating"
                                        ></div>
                                    </div>
                                    <div
                                        name="lecture-rating-container"
                                        style={{ marginTop: "25px" }}
                                    >
                                        {" "}
                                        {/*This container is for profile picture */}
                                        <div name="lecture-rating-title">
                                            {/*<h4 style={{ textAlign: 'center' }}> {Date()} </h4>*/}
                                        </div>
                                        <div
                                            style={{ textAlign: "center" }}
                                            name="lecture-rating"
                                        >
                                            <img
                                                className="profile-pic"
                                                src={imageOne}
                                                style={imgStyle}
                                            />
                                        </div>
                                    </div>
                                    <div style={pageBreak} /> {/* underline */}
                                </Col>

                                <Col sm={7}>
                                    {" "}
                                    {/*change this section to one with 2 tabs , change the state form.*/}
                                    <Tabs
                                        style={tabStyle}
                                        defaultActiveKey="reviews"
                                        transition={false}
                                    >
                                        <Tab eventKey="reviews" title="Reviews">
                                            {/*<Button onClick ={this.changeConstant} >Reload</Button>*/}
                                            {this.state.reviews !== null ? (
                                                this.state.reviews.map(
                                                    (item, index) => (
                                                        <ReviewItem
                                                            id={index}
                                                            key={
                                                                "course-review" +
                                                                index
                                                            }
                                                            reviewItem={item}
                                                        />
                                                    )
                                                )
                                            ) : (
                                                <div
                                                    style={{
                                                        marginLeft: "20px",
                                                    }}
                                                >
                                                    No reviews yet! Be the first
                                                    to leave one?
                                                </div>
                                            )}
                                        </Tab>

                                        <Tab
                                            eventKey="edit-profile"
                                            title="Change Password"
                                        >
                                            {" "}
                                            {/*Edit password form */}
                                            {cookie.load("isLoggedIn") ===
                                            "true" ? (
                                                <EditPasswordForm>
                                                    {" "}
                                                </EditPasswordForm> //custom password change form
                                            ) : (
                                                <div
                                                    style={{
                                                        marginLeft: "20px",
                                                    }}
                                                >
                                                    Please log in or signup to
                                                    edit your profile
                                                </div>
                                            )}
                                        </Tab>

                                        <Tab
                                            eventKey="edit-nickname"
                                            title="Change Nickname"
                                        >
                                            {" "}
                                            {/*Edit nickname form */}
                                            {cookie.load("isLoggedIn") ===
                                            "true" ? (
                                                <EditNicknameForm></EditNicknameForm> //custom password change form
                                            ) : (
                                                <div
                                                    style={{
                                                        marginLeft: "20px",
                                                    }}
                                                >
                                                    Please log in or signup to
                                                    edit your profile
                                                </div>
                                            )}
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                ) : null}
            </div>
        );
    }
}
