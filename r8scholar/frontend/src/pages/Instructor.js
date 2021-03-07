import React, { Component } from "react";
import {Container, Row, Col, Tab, Spinner} from 'reactstrap'; 
import ReviewItem from '../components/ReviewItem'; 
import Tabs from 'react-bootstrap/Tabs'; 
import StarRatings from 'react-star-ratings';
import ReviewForm from '../components/ReviewForm'; 
import cookie from 'react-cookies'; 
import SecondaryNav from '../components/SecondaryNav'; 

const pageStyles={
    margin: '0 auto', 
    marginTop: '3%', 
    width: '90%', 
}; 

const subRatingStyle = { 
    marginRight: "15px", 
    marginLeft: "15px", 
    marginTop:'2%',
    border: '2px #7f8c8d', 
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

export default class Course extends Component {6
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way 
        this.state = { //all the content that is gonna be retrieved from the api stored here locally
            name: this.props.match.params.profName,
            department: null, 
            rating: 0, 
            reviews: null,
            instructors: [],
            courses: [],
            valid: false,
            loaded: false,  
        } 

    }

    componentDidMount(){
        this.verifyInstructor(this.state.name); 
        this.getAllReviews(this.state.name);

        setTimeout(() => {
            this.getPopularChoices(); 
        }, 200);
    }

    verifyInstructor = async (myName) => {
        await fetch('/api/get-instructor' + '?name=' + myName)
        .then((response) => {
            if(response.ok){
                return response.json(); 
            }else{ 
                return null
            }   
        })
        .then((data) => {
            if(data != null){
                this.setState({
                    valid: true, 
                    name: data.name, 
                    rating: data.rating,
                    department: data.department,
                });
            }
        });
    }

    getPopularChoices = async() => { 
        const request = { 
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                department: this.state.department, 
                amount: 2, 
            }),
        }; 
        await fetch("/api/get-top-courses", request)
            .then((response) => {
                if(response.ok){ //yay
                    return response.json(); 
                }else{//nay 
                    return null
                }
            })
            .then((data) =>{
                this.setState({courses:data});
            });
        await fetch("/api/get-top-instructors", request)
            .then((response) => {
                if(response.ok){ //yay
                    return response.json(); 
                }else{//nay 
                    return null
                }
            })
            .then((data) =>{
                this.setState({instructors:data});
            });
    }   

    getAllReviews(myName) {
        //this is just to have but will need to be slightly refactored 
        //once we talk to the back end people about how their stuff is named such as 'get-course'
        return fetch('/api/get-reviews' + '?subject=' + myName)
        .then((response) => {
            if(response.ok){
                return response.json(); 
            }else{ 
                return null
            }   
        })
        .then((data) => {
            this.setState({
                reviews: data, 
                loaded: true, 
            })
        });
    }
    render() {
        return (
            <div>
            <SecondaryNav/>
                <div style={pageStyles}>
                {this.state.loaded?
                    <Container fluid="md">
                    {this.state.valid?
                        <Row> {/* title row, includes course name and reviews*/}
                            <Col align="center" sm={4}>
                                <div name="title">
                                    <b><h1>{this.state.name}</h1></b>
                                    <h5>Department of {this.state.department}</h5>
                                </div>  
                                <div style={pageBreak}/> {/* underline */}
    
                                <div name="avg-rating-container">
                                <div name="avg-rating-title">
                                        <h4 style={{textAlign: 'center'}}>Overall Rating</h4>
                                    </div>  
                                    <div style={{textAlign: 'center'}} name="avg-rating">
                                        {/* this displays average # of stars*/}
                                        <StarRatings
                                            rating={this.state.rating}
                                            starDimension="40px"
                                            starSpacing="10px"
                                            starRatedColor="#f1c40f"
                                            numberOfStars={5}
                                            name='avgRating'
                                        />
                                    </div>
                                </div>
    
                                <div name="sub-rating-box" style={subRatingStyle}>
                                
                                <div style={pageBreak}/> {/* underline */}
    
                                <div style={{marginTop: '25px'}} name="pop-prof-container">
                                    <div name="pop-professor-title">
                                    <h3 style={{textAlign: 'center'}}>Popular Instructors</h3>
                                    </div>   
                                    <div name="pop-prof-name" style={{textAlign: 'center'}}>
                                        {this.state.instructors !== null ?this.state.instructors.map((item) => 
                                        (<h4><a href={"/instructor/" + item.name}>{item.name}</a></h4>))
                                    :null}
                                    </div>
                                </div>
    
                                <div style={pageBreak}/> {/* underline */}
    
                                <div style={{marginTop: '25px'}} name="pop-course-container">
                                    <div name="pop-course-title">
                                        <h3 style={{textAlign: 'center'}}>Popular Courses</h3>
                                    </div>   
                                    <div name="pop-course-name" style={{textAlign: 'center'}}>
                                        {this.state.courses !== null ? 
                                         this.state.courses.map((item) => 
                                        (<h4><a href={"/course/" + item.name}>{item.name}</a></h4>)):
                                        null}
                                    </div>
                                </div>
    
                                <div style={pageBreak}/> {/* underline */}
    
                                <div style={{marginTop: '25px'}} name="pop-course-container">
                                    <div name="pop-course-title">
                                        <h3 style={{textAlign: 'center'}}>Department of <a href={"/department/"+this.state.department}>{this.state.department}</a></h3>
                                    </div>   
                                </div>
    
                                </div>
    
                                <div style={pageBreak}/> {/* underline */}
                                
                                
                                
                            </Col>
                            <Col sm={7}>
                                <Tabs style={tabStyle} defaultActiveKey="reviews" transition={false}>
                                    <Tab eventKey="reviews" title="Reviews">
                                    {this.state.reviews !== null ? 
                                    this.state.reviews.reverse().map((item, index) => 
                                    (<ReviewItem id={index} key={"course-review"+index}reviewItem={item}/>)) 
                                    : (<div style={{marginLeft: "20px"}}>No reviews yet! Be the first to leave one?</div>) 
                                    /* generate all the reviews for this page */} 
                                    </Tab>
                                    <Tab eventKey="forums" title="Forums">
                                        <h6>Nothing to show yet; come back soon!</h6>
                                    </Tab>
                                    <Tab eventKey="create-review" title="Create Review">
                                    {cookie.load('isLoggedIn') === "true" ? 
                                            (<ReviewForm name ={this.state.name} review="instructor"/>)
                                            : (<div style={{marginLeft: "20px"}}>Please log in or signup to create a review.</div>)
                                        }
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                        :<Row align='center'> {/**show message that course isnt found */}
                        <Col>
                            <h1>The instructor "{this.state.name + " "}" was not found.</h1>
    
                            <h5 style={{marginTop:'15%'}}><a href="/courses">Return to Instructors</a></h5>
                        </Col>
                    </Row>}
                    </Container>
                    :<Spinner color="dark"/>}
                </div>
                </div>
            );
    }
}
