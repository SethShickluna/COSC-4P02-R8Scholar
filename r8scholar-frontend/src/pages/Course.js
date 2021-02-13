import React, { Component } from "react";
import {Container, Row, Col, Tab, Button} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 
import ReviewItem from '../components/ReviewItem'; 
import Tabs from 'react-bootstrap/Tabs'
import StarRatings from 'react-star-ratings';
import ReviewForm from '../components/ReviewForm'; 
import cookie from 'react-cookies'; 

const pageStyles={
    margin: '0 auto', 
    marginTop: '3%', 
    width: '90%', 
}; 

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

export default class Course extends Component {6
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way 
        this.state = { //all the content that is gonna be retrieved from the api stored here locally
            name: this.props.match.params.courseName,
            department: "COSC", 
            code: "2P03", 
            avgRating: 3.6, 
            lectureRating: 2.5, 
            instructorRating: 4.8, 
            homeworkRating: 3.2, 
            reviews:[ 
                {//reviews would be an object 
                    title: "Difficult but Important course!",
                    content: "COSC 2P03 is one of the most foundational courses in the program. It opens the door to the rest of the computer science department and tests your knowledge. Beware, it can be quite tricky.",
                    rating: 3.9, 
                    user: "seth", 
                    comments: null, 
                }, 
            
            ],  
            instructors: [
                "Dave Bockus", 
                "Earl Foxwell", 
            ], //another object 
            aliases: "", 
        }
        //this.componentDidMount(); 
    }

    //TODO: GET req goes here that fetches data based on uid
    componentDidMount() {
        //this is just to have but will need to be slightly refactored 
        //once we talk to the back end people about how their stuff is named such as 'get-couse'
        fetch('/api/get-course' + '?code=' + this.name)
        .then((response) => response.json())
        .then((data) => {
            this.setState({ // the data.<variable> is just an example and will need to be changed to reflect what the backend returns 
                department: data.department, 
                code: data.code, 
                avgRating: data.avg_rating, 
                reviews: data.reviews, 
                instructors: data.instructors, 
                aliases: data.aliases, 
            });
        }); 
    }

    render() {
        return (
            <div style={pageStyles}>
                <Container fluid="md">
                    <Row> {/* title row, includes course name and reviews*/}
                        <Col sm={4}>
                            <div name="title">
                                <h1 style={{textAlign: 'center'}}>{this.state.name}</h1>
                            </div>  
                            <div style={pageBreak}/> {/* underline */}

                            <div name="avg-rating-container">
                                <div name="avg-rating-title">
                                    <h4 style={{textAlign: 'center'}}>Overall Rating</h4>
                                </div>  
                                <div style={{textAlign: 'center'}} name="avg-rating">
                                    {/* this displays average # of stars*/}
                                    <StarRatings
                                        rating={this.state.avgRating}
                                        starDimension="40px"
                                        starSpacing="10px"
                                        starRatedColor="red"
                                        numberOfStars={5}
                                        name='avgRating'
                                    />
                                </div>
                            </div>

                            <div name="lecture-rating-container" style={{marginTop: '25px'}}>
                                <div name="lecture-rating-title">
                                    <h4 style={{textAlign: 'center'}}>Lecture Rating</h4>
                                </div>  
                                <div style={{textAlign: 'center'}} name="lecture-rating">
                                    {/* this displays average # of stars*/}
                                    <StarRatings
                                        rating={this.state.lectureRating}
                                        starDimension="30px"
                                        starSpacing="10px"
                                        starRatedColor="red"
                                        numberOfStars={5}
                                        name='lectureRating'
                                    />
                                </div>
                            </div>
                            
                            <div name="homework-rating-container" style={{marginTop: '25px'}}>
                                <div name="homework-rating-title">
                                    <h4 style={{textAlign: 'center'}}>Homework Rating</h4>
                                </div>  
                                <div style={{textAlign: 'center'}} name="homework-rating">
                                    {/* this displays average # of stars*/}
                                    <StarRatings
                                        rating={this.state.homeworkRating}
                                        starDimension="30px"
                                        starSpacing="10px"
                                        starRatedColor="red"
                                        numberOfStars={5}
                                        name='homeworkRating'
                                    />
                                </div>
                            </div>
                            
                            <div name="instructor-rating-container" style={{marginTop: '25px'}}>
                                <div name="instructor-rating-title">
                                    <h4 style={{textAlign: 'center'}}>Instructor Rating</h4>
                                </div>  
                                <div style={{textAlign: 'center'}} name="instructor-rating">
                                    {/* this displays average # of stars*/}
                                    <StarRatings
                                        rating={this.state.instructorRating}
                                        starDimension="30px"
                                        starSpacing="10px"
                                        starRatedColor="red"
                                        numberOfStars={5}
                                        name='instructorRating'
                                    />
                                </div>
                            </div>

                            <div style={pageBreak}/> {/* underline */}

                            <div style={{marginTop: '25px'}} name="freq-prof-container">
                                <div name="freq-professor-title">
                                    <h4 style={{textAlign: 'center'}}>Frequent Professors</h4>
                                </div>   
                                <div name="freq-prof-name" style={{textAlign: 'center'}}>
                                    {this.state.instructors.map((item) => 
                                    (<p><Link to={"/professor/" + item}>{item}</Link></p>))}
                                </div>
                            </div>

                            <div style={pageBreak}/> {/* underline */}
                            
                        </Col>
                        <Col sm={7}>
                            <Tabs style={tabStyle} defaultActiveKey="reviews" transition={false}>
                                <Tab eventKey="reviews" title="Reviews">
                                {this.state.reviews.map((item, index) => 
                                            (<ReviewItem id={index} key={"course-review"+index}reviewItem={item}/>)
                                        ) /* generate all the reviews for this page */} 
                                </Tab>
                                <Tab eventKey="forums" title="Forums">
                                    <h6>Nothing to show yet; come back soon!</h6>
                                </Tab>
                                <Tab eventKey="create-review" title="Create Review">
                                {cookie.load('isLoggedIn') === "true" ? 
                                        (<ReviewForm review="course"/>)
                                        : (<div style={{marginLeft: "20px"}}>Please log in or signup to create a review.</div>)
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
