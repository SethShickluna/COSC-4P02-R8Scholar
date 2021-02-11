import React, { Component } from "react";
import {Container, Row, Col, Tab, Button} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 
import ReviewItem from '../components/ReviewItem'; 
import Tabs from 'react-bootstrap/Tabs'

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
            name: this.props.match.params.profName,
            courses: [
                "COSC 2P12", 
                "COSC 3P94",
            ],
            avgRating: "", 
            reviews: [
                {
                    title: "Tough love type prof !",
                    content: "If you put the work in and show that you actually want to be there, Bockus will do everything in his power to help you succeed. Otherwise you're SOL",
                    rating: '3.9', 
                    user: "seth", 
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
        fetch('/api/get-instructor' + '?code=' + this.name)
        .then((response) => response.json())
        .then((data) => {
            this.setState({ // the data.<variable> is just an example and will need to be changed to reflect what the backend returns 
                department: data.department, 
                code: data.code, 
                avgRating: data.avg_rating, 
                reviews: data.reviews, 
                courses: data.courses, 
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
                                    <p>Placeholder for star rating system</p>
                                </div>
                            </div>

                            <div name="lecture-rating-container" style={{marginTop: '25px'}}>
                                <div name="lecture-rating-title">
                                    <h4 style={{textAlign: 'center'}}>Lecture Rating</h4>
                                </div>  
                                <div style={{textAlign: 'center'}} name="lecture-rating">
                                    {/* this displays average # of stars*/}
                                    <p>Placeholder for star rating system</p>
                                </div>
                            </div>
                            
                            <div name="homework-rating-container" style={{marginTop: '25px'}}>
                                <div name="homework-rating-title">
                                    <h4 style={{textAlign: 'center'}}>Homework Rating</h4>
                                </div>  
                                <div style={{textAlign: 'center'}} name="homework-rating">
                                    {/* this displays average # of stars*/}
                                    <p>Placeholder for star rating system</p>
                                </div>
                            </div>
                            
                            <div name="course-rating-container" style={{marginTop: '25px'}}>
                                <div name="course-rating-title">
                                    <h4 style={{textAlign: 'center'}}>Course Rating</h4>
                                </div>  
                                <div style={{textAlign: 'center'}} name="course-rating">
                                    {/* this displays average # of stars*/}
                                    <p>Placeholder for star rating system</p>
                                </div>
                            </div>

                            <div style={pageBreak}/> {/* underline */}

                            <div style={{marginTop: '25px'}} name="freq-course-container">
                                <div name="freq-course-title">
                                    <h4 style={{textAlign: 'center'}}>Frequent Courses</h4>
                                </div>   
                                <div name="freq-course-name" style={{textAlign: 'center'}}>
                                    {this.state.courses.map((item) => 
                                    (<p><Link to={"/course/" + item}>{item}</Link></p>))}
                                </div>
                            </div>

                            <div style={pageBreak}/> {/* underline */}

                            <div style={buttonStyle} name="review-button-container">
                                <Button size="lg" variant="danger">
                                    Review this Instructor
                                </Button>
                            </div>
                            
                        </Col>
                        <Col sm={7}>
                            <Tabs style={tabStyle} defaultActiveKey="reviews" transition={false}>
                                <Tab eventKey="reviews" title="Reviews">
                                {this.state.reviews.map((item, index) => 
                                            (<ReviewItem id={index} reviewItem={item}/>)
                                        ) /* generate all the reviews for this page */} 
                                </Tab>
                                <Tab eventKey="forums" title="Forums">
                                    <h6>Nothing to show yet; come back soon!</h6>
                                </Tab>
                            </Tabs>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
