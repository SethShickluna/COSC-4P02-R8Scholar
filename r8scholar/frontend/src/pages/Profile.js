import React, { Component } from "react";
import { Container, Row, Col, Tab, Button } from 'reactstrap';
import ReviewItem from '../components/ReviewItem';
import SecondaryNav from '../components/SecondaryNav';
import Tabs from 'react-bootstrap/Tabs';
import cookie from 'react-cookies';
import imageOne from '../assets/images/ben-sweet-2LowviVHZ-E-unsplash.jpg';
import EditProfileForm from '../components/EditProfileForm';
import $ from "jquery";
import EditNicknameForm from "../components/EditNicknameForm";



const pageStyles = {
    margin: '0 auto',
    marginTop: '3%',
    width: '90%',
};

const buttonStyle = {
    //height: '100vh',  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    background: 'red',
}

const pageBreak = {
    //this sets the margin for reviews and draws a line hovering under the titles 
    marginBottom: '2%',
    marginTop: '2%',
    height: '1px',
    backgroundColor: '#dedede',
    border: 'none',
}

const tabStyle = {
    paddingTop: '2.5%',
}

const imgStyle = {
    width: '100%',
    height: '200px',
}

var newImage;


//code for submitting a profile image
$(document).ready(function () {
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
                newImage = e.target.result; //set new image to result 
                //this.setState({profile_picture : e.target.result}) //change the state object
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    $(".file-upload").on('change', function () {
        readURL(this);
    });

    $(".upload-button").on('click', function () {
        $(".file-upload").click();
    });
});
//end of this section of code. 

export default class Profile extends Component {
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way 
        this.state = { //all the content that is gonna be retrieved from the api stored here locally
            user: null,
            reviews: []
        }

        this.imageMaker = this.imageMaker.bind(this) //bInd imagemaker
        this.verifyUser = this.verifyUser.bind(this);
    }

    componentDidMount() {
        fetch('/api/get-user' + '?email=' + cookie.load('email'))
            .then((response) => response.json())
            .then((data) => {
                this.setState({ // the data.<variable> is just an example and will need to be changed to reflect what the backend returns 
                    user: data,
                });
            });
    }

    imageMaker() {
        //change state object 
        this.setState({ profile_picture: newImage })
    }

    verifyUser() {
        var code = prompt("Enter the 6 digit code emailed to " + this.state.user.email);
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                verification_code: code,
            }),
        };
        fetch("/api/verify-user?email=" + this.state.user.email, request)
            .then((response) => {
                if (response.ok) {
                    //reload page 
                    alert("Success");
                    window.location.reload();
                } else {
                    alert("Invalid Code!");
                };
            });
    }

    render() {
        return (
            <div>

                <SecondaryNav />
                {this.state.user ?
                    <div style={pageStyles}>
                        <Container fluid="md">
                            <Row align="center">
                                <Col>
                                    {!this.state.user.is_verified ?
                                        <div>
                                            <h2>Your account is not verfied!</h2>
                                            <Button onClick={this.verifyUser} color="info" size="lg">
                                                Verify Now
                                </Button>
                                        </div>
                                        :
                                        null}
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "3%" }}>
                                <Col sm={4}>
                                    <div name="title">

                                        {/*insert image edit, accept image and input it */}
                                        <h1 style={{ textAlign: 'center' }}>{this.state.user.nickname}</h1>
                                    </div>
                                    <div style={pageBreak} /> {/* underline */}

                                    <div name="avg-rating-container">
                                        <div name="avg-rating-title">

                                            <h4 style={{ textAlign: 'center' }}>Profile Picture</h4>
                                        </div>
                                        <div style={{ textAlign: 'center' }} name="avg-rating">

                                        </div>
                                    </div>

                                    <div name="lecture-rating-container" style={{ marginTop: '25px' }}> {/*This container is for profile picture */}
                                        <div name="lecture-rating-title">
                                            {/*<h4 style={{ textAlign: 'center' }}> {Date()} </h4>*/}
                                        </div>
                                        <div style={{ textAlign: 'center' }} name="lecture-rating">

                                            <img className="profile-pic" src={imageOne} style={imgStyle} onChange={this.imageMaker} />


                                        </div>
                                    </div>


                                    <div style={pageBreak} /> {/* underline */}

                                    <div style={{ marginTop: '25px' }} name="freq-course-container"> {/* change profile pic*/}
                                        <div name="freq-course-title">
                                            <h4 style={{ textAlign: 'left' }}>Change Profile Picture</h4>
                                        </div>

                                        {cookie.load('isLoggedIn') === "true" ?
                                            (<button style={buttonStyle} align='center'> <div className="upload-button">Upload Image</div>
                                                <input className="file-upload" type="file" accept="image/*" /> </button>)
                                            : (<div style={{ marginLeft: "20px" }}>Please log in or signup to edit your profile</div>)
                                        }


                                    </div>

                                    <div style={pageBreak} /> {/* underline */}

                                </Col>

                                <Col sm={7}> {/*change this section to one with 2 tabs , change the state form.*/}
                                    <Tabs style={tabStyle} defaultActiveKey="reviews" transition={false}>

                                        <Tab eventKey="reviews" title="Reviews">
                                            {this.state.reviews !== null ?
                                                this.state.reviews.map((item, index) =>
                                                    (<ReviewItem id={index} key={"course-review" + index} reviewItem={item} />))
                                                : (<div style={{ marginLeft: "20px" }}>No reviews yet! Be the first to leave one?</div>)
                                /* generate all the reviews for this page */}
                                        </Tab>



                                        <Tab eventKey="edit-profile" title="Change Password"> {/*Edit password form */}
                                            {cookie.load('isLoggedIn') === "true" ?
                                                (<EditProfileForm> </EditProfileForm>) //change to a custom edit profile form.
                                                : (<div style={{ marginLeft: "20px" }}>Please log in or signup to edit your profile</div>)
                                            }
                                        </Tab>


                                        <Tab eventKey="edit-nickname" title="Change Nickname"> {/*Edit nickname form */}
                                            {cookie.load('isLoggedIn') === "true" ?
                                                (<EditNicknameForm></EditNicknameForm>) //change to a custom edit profile form.
                                                : (<div style={{ marginLeft: "20px" }}>Please log in or signup to edit your profile</div>)
                                            }
                                        </Tab>

                                    </Tabs>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    : null}
            </div>
        );
    }
}
