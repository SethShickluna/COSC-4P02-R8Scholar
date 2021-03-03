import React, { Component } from "react";
import { Container, Row, Col, Tab, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReviewItem from '../components/ReviewItem';
import Tabs from 'react-bootstrap/Tabs';
import StarRatings from 'react-star-ratings';
import ReviewForm from '../components/ReviewForm';
import cookie from 'react-cookies';
import imageOne from '../assets/images/ben-sweet-2LowviVHZ-E-unsplash.jpg';
import EditProfileForm from '../components/EditProfileForm';
import $ from "jquery";



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
    color: 'white' , 
    background: 'red' , 
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
    backgroundColor: '#ecf0f1',
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
            name: "Username",
            email: "nash@brocku.ca",
            profile_picture: '',
            password: "myPassword",
            reviews: [
                {
                    title: "What a time to be alive !",
                    content: "If you put the work in and show that you actually want to be there, Bockus will do everything in his power to help you succeed. Otherwise you're SOL",
                    rating: 2.5,
                    user: "UserName",
                    comments: null,
                }
                ,
                {
                    title: "A second review from this same User !",
                    content: "Oh my goodness, This is a beautifil way to live.",
                    rating: 3.5,
                    user: "SAME USER",
                    comments: null,
                }
            ]

        }

        this.imageMaker=this.imageMaker.bind(this) //bInd imagemaker


        //this.componentDidMount(); 
    }

    //TODO: GET req goes here that fetches data based on uid
    componentDidMount() {
        //this is just to have but will need to be slightly refactored 
        //once we talk to the back end people about how their stuff is named such as 'get-couse'
        fetch('/api/get-user' + '?email=' + cookie.load('email'))
            .then((response) => response.json())
            .then((data) => {
                this.setState({ // the data.<variable> is just an example and will need to be changed to reflect what the backend returns 
                    department: data.department,
                    name: data.nickname, 
                    code: data.code,
                    avgRating: data.avg_rating,
                    //reviews: data.reviews,
                    //courses: data.courses,
                    //aliases: data.aliases, /*change the fields to match the state */
                });
            });
    }

    imageMaker(){ 
        //change state object 
        this.setState({profile_picture : newImage })
    }

//TODO : add a method to change profile picture in the state

    render() {
        return (
            <div style={pageStyles}>
                <Container fluid="md">
                    <Row>
                        <Col sm={4}>
                            <div name="title">

                                {/*insert image edit, accept image and input it */}
                                <h1 style={{ textAlign: 'center' }}>{this.state.name}</h1>
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

                                    <img className="profile-pic" src = {imageOne} style={imgStyle} onChange = {this.imageMaker} />
                                    

                                </div>
                            </div>


                            <div style={pageBreak} /> {/* underline */}

                            <div style={{ marginTop: '25px' }} name="freq-course-container"> {/* change profile pic*/}
                                <div name="freq-course-title">
                                    <h4 style={{ textAlign: 'left' }}>Change Profile Picture</h4>
                                </div>

                                {cookie.load('isLoggedIn') === "true" ?
                                    (<button style ={buttonStyle} align = 'center'> <div className="upload-button">Upload Image</div>
                                    <input className ="file-upload" type="file" accept="image/*" /> </button>)
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
                                (<ReviewItem id={index} key={"course-review"+index}reviewItem={item}/>)) 
                                : (<div style={{marginLeft: "20px"}}>No reviews yet! Be the first to leave one?</div>) 
                                /* generate all the reviews for this page */} 
                                </Tab>



                                <Tab eventKey="edit-profile" title="Edit Profile"> {/*Edit profile form */}
                                    {cookie.load('isLoggedIn') === "true" ?
                                        (<EditProfileForm> </EditProfileForm>) //change to a custom edit profile form.
                                        : (<div style={{ marginLeft: "20px" }}>Please log in or signup to edit your profile</div>)
                                    }

                                </Tab>

                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
