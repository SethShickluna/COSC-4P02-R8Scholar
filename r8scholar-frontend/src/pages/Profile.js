import React, { Component } from "react";
import {Container, Row, Col, Tab, Button} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 
import ReviewItem from '../components/ReviewItem'; 
import Tabs from 'react-bootstrap/Tabs'; 
import StarRatings from 'react-star-ratings';
import ReviewForm from '../components/ReviewForm'; 
import cookie from 'react-cookies';
import imageOne from '../assets/images/brock-from-drone.jpeg';
import SignupForm from '../components/SignupForm';


const pageStyles={
    margin: '0 auto', 
    marginTop: '3%', 
    width: '90%', 
}; 

const buttonStyle={
    //height: '100vh',  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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

var curday = function(sp){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (mm+sp+dd+sp+yyyy);
    };

    const imgStyle={
        width:'100%', 
        height:'200px', 
    }

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
       

        //this.componentDidMount(); 
    }

    //TODO: GET req goes here that fetches data based on uid
    componentDidMount() {
        //this is just to have but will need to be slightly refactored 
        //once we talk to the back end people about how their stuff is named such as 'get-couse'
        fetch('/api/get-user' + '?code=' + this.name)
        .then((response) => response.json())
        .then((data) => {
            this.setState({ // the data.<variable> is just an example and will need to be changed to reflect what the backend returns 
                department: data.department, 
                code: data.code, 
                avgRating: data.avg_rating, 
                reviews: data.reviews, 
                courses: data.courses, 
                aliases: data.aliases, /*change the fields to match the state */
            });
        }); 
    }

  

    render() {
        return (
            <div style={pageStyles}>
                <Container fluid="md">
                    <Row> 
                        <Col sm={4}>
                            <div name="title"> 
                           
                            {/*insert image edit, accept image and input it */}
                                <h1 style={{textAlign: 'center'}}>{this.state.name}</h1>
                            </div>  
                            <div style={pageBreak}/> {/* underline */}

                            <div name="avg-rating-container">
                                <div name="avg-rating-title">
                                     
                                    <h4 style={{textAlign: 'center'}}>Profile Picture</h4>
                                </div>  
                                <div style={{textAlign: 'center'}} name="avg-rating">
                                    
                                </div>
                            </div>

                            <div name="lecture-rating-container" style={{marginTop: '25px'}}> {/*This container is for profile picture */}
                                <div name="lecture-rating-title">
                                    <h4 style={{textAlign: 'center'}}> {curday} </h4>
                                </div>  
                                <div style={{textAlign: 'center'}} name="lecture-rating">

                                <img
                        className="d-block w-100"
                        src={imageOne}
                        alt="First slide"
                        style={imgStyle}  />

                                </div>
                            </div>
                        

                            <div style={pageBreak}/> {/* underline */}

                            <div style={{marginTop: '25px'}} name="freq-course-container"> {/* change profile pic*/}
                                <div name="freq-course-title">
                                    <h4 style={{textAlign: 'center'}}>Change Profile Picture</h4>
                                </div> 

                                {cookie.load('isLoggedIn') === "true" ? 
                                        (<div name="freq-course-name" style={{textAlign: 'center'}}>
                                        <button>  <a href ="#" > Upload </a></button> {/*allow for input of a new image */}
                                      </div>)
                                        : (<div style={{marginLeft: "20px"}}>Please log in or signup to edit your profile</div>)
                                    }
                                    


                            </div>

                            <div style={pageBreak}/> {/* underline */}
                            
                        </Col>

                        <Col sm={7}> {/*change this section to one with 2 tabs , change the state form.*/}
                            <Tabs style={tabStyle} defaultActiveKey="reviews" transition={false}>

                                <Tab eventKey="reviews" title="Reviews">
                                {this.state.reviews.map((item, index) => 
                                            (<ReviewItem id={index} key={"professor-review"+index} reviewItem={item}/>)
                                        ) /* generate all the reviews for this page */} 
                                </Tab>
                        


                                <Tab eventKey="edit-profile" title="Edit Profile"> {/*Edit profile form */}
                                    {cookie.load('isLoggedIn') === "true" ? 
                                        (<SignupForm>  </SignupForm>) //change to a custom edit profile form.
                                        : (<div style={{marginLeft: "20px"}}>Please log in or signup to edit your profile</div>)
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
