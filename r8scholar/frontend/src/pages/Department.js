import React, { Component } from "react";
import {Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Spinner, Table} from 'reactstrap'; 
import {Link} from "react-router-dom";
import ReviewItem from '../components/ReviewItem'; 
import StarRatings from 'react-star-ratings';
import ReviewForm from '../components/ReviewForm'; 
import cookie from 'react-cookies'; 
import SecondaryNav from "../components/SecondaryNav";

const pageStyles={
    margin: '0 auto', 
    width: '90%', 
}; 

const linkStyle = { 
    color: 'black',
    fontSize: "18", 
}


const pageBreak = {
    //this sets the margin for reviews and draws a line hovering under the titles 
    marginBottom: '2%', 
    height: '1px',
    backgroundColor: '#dedede',
    border: 'none',
}


export default class Course extends Component {6
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way 
        this.state = { //all the content that is gonna be retrieved from the api stored here locally
            name: this.props.match.params.deptName,
            rating: 0,
            instructorRating: 0, 
            courseRating: 0,
            reviews:[],  
            instructors:[],
            courses:[], 
            valid: false,
            loaded: false, 
            activeTab: "1",
            allDeptCourses:[],
        }
    }

    componentDidMount(){
        this.verifyDepartment(this.state.name); 
        this.getPopularChoices(this.state.name); 
        this.getAllReviews(this.state.name);
        this.getAllCourses(this.state.name); 
    }

    verifyDepartment = async (myName) => {
        await fetch('/api/get-department' + '?name=' + myName)
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
                    courseRating: data.courses_rating, 
                    rating: data.rating, 
                    instructorRating: data.instructors_rating,
                });
            }
        });
    }

    getPopularChoices = async(myName) => { 
        const request = { 
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                department: myName, 
                amount: 2, 
            }),
        }; 
        await fetch("/api/get-top-courses/", request)
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
        await fetch("/api/get-top-instructors/", request)
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

    getAllReviews = async (myName) => {
        await fetch('/api/get-reviews/' + '?subject=' + myName)
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

    getAllCourses = async(myName) =>{
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                "department": myName,
            }),
        }
        await fetch("/api/filter-course-department/", request)
            .then((response) => { response.json().then((data) => {
                console.log(data)
                this.setState({ 
                    allDeptCourses: data,
                });
            });
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
                        <Col align="center"sm={4}>
                            <div name="title">
                                <h4>Department of</h4>
                                <h1>{this.state.name}</h1>
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
                            
                            <div name="course-rating-container" style={{marginTop: '25px'}}>
                                <div name="course-rating-title">
                                    <h4 style={{textAlign: 'center'}}>Course Rating</h4>
                                </div>  
                                <div style={{textAlign: 'center'}} name="course-rating">
                                    {/* this displays average # of stars*/}
                                    <StarRatings
                                        rating={this.state.courseRating}
                                        starDimension="30px"
                                        starSpacing="10px"
                                        starRatedColor="#3498db"
                                        numberOfStars={5}
                                        name='courseRating'
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
                                        starRatedColor="#3498db"
                                        numberOfStars={5}
                                        name='instructorRating'
                                    />
                                </div>
                            </div>

                            <div style={pageBreak}/> {/* underline */}

                            <div style={{marginTop: '25px'}} name="pop-prof-container">
                                <div name="pop-professor-title">
                                <h3 style={{textAlign: 'center'}}>Popular Instructors</h3>
                                </div>   
                                <div name="pop-prof-name" style={{textAlign: 'center'}}>
                                    {this.state.instructors !== null ? 
                                    this.state.instructors.map((item) => 
                                    (<h4><a href={"/instructor/" + item.name}>{item.name}</a></h4>)):
                                    <h4>No instructors found</h4>}
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
                                    <h4>No courses found</h4>}
                                </div>
                            </div>

                            <div style={pageBreak}/> {/* underline */}
                            
                        </Col>
                        <Col sm={7}>
                        <div style={{marginTop:"107px"}}/>
                            <div className="nav-tabs-navigation">
                                <div className="nav-tabs-wrapper pointer-nav">
                                    <Nav role="tablist" tabs>
                                        <NavItem>
                                            <NavLink
                                                className={this.state.activeTab === "1" ? "active" : ""}
                                                onClick={() => {
                                                    this.setState({activeTab:"1"});}}>
                                                Reviews
                                            </NavLink>
                                        </NavItem>
                                        {cookie.load('isLoggedIn') === "true" ? 
                                            <NavItem>
                                                <NavLink
                                                    className={this.state.activeTab === "3" ? "active" : ""}
                                                    onClick={() => {
                                                        this.setState({activeTab:"3"});
                                                        }}>
                                                        Create Review
                                                </NavLink>
                                            </NavItem>   
                                        :null}
                                        <NavItem>
                                            <NavLink
                                                className={this.state.activeTab === "2" ? "active" : ""}
                                                onClick={() => {
                                                    this.setState({activeTab:"2"});}}>
                                                Courses
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </div>
                            {/* Tab panes */}
                            <TabContent className="following" activeTab={this.state.activeTab}>
                                <TabPane tabId="1" id="follows">
                                    <Row>
                                        <Col className="ml-auto mr-auto" md="6">
                                            {this.state.reviews !== null ? 
                                            this.state.reviews.reverse().map((item, index) => 
                                            (<ReviewItem id={index} key={"department-review"+index} reviewItem={item}/>)) 
                                            : (<Container fluid>
                                                <Row>
                                                    <Col align="center">
                                                        <h4>Nothing to see here. Would you like to leave a review?</h4>
                                                    </Col>
                                                </Row>
                                            </Container>) /* generate all the reviews for this page */} 
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane className="text-center" tabId="2" id="following">
                                    <Table striped>
                                        <thead>
                                            <th>Rank</th>
                                            <th>Course Code</th>
                                            <th>Name</th>
                                            <th>Rating</th>
                                        </thead>
                                        <tbody>
                                        {this.state.allDeptCourses.map((item, index) =>{
                                            return( 
                                            <tr key={index}>  
                                                <th>{index + 1}</th>
                                                <th><Link to={"/course/"+item.name}>{item.name}</Link></th>
                                                <th style={{maxWidth: "200px"}}><a style={linkStyle} href={"/course/"+item.name}>{item.course_full_name}</a></th>
                                                <th style={{minWidth:"100px"}}><StarRatings
                                                    rating={item.rating}
                                                    starDimension="25px"
                                                    starSpacing="5px"
                                                    starRatedColor="#3498db"
                                                    numberOfStars={5}
                                                    name='avgRating'/>
                                                </th>
                                            </tr>)})}
                                        </tbody>
                                    </Table>
                                </TabPane>
                                <TabPane className="text-center" tabId="3" id="following">
                                    <ReviewForm name={this.state.name} review="department"/>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                :<Row align='center'> {/**show message that course isnt found */}
                    <Col>
                        <h1>The department "{this.state.name + " "}" was not found.</h1>

                        <h5 style={{marginTop:'15%'}}><a href="/departments">Return to Departments</a></h5>
                    </Col>
                </Row>}
                </Container>
            :<Spinner color="dark"/>}
            </div>
            </div>
        );
    }
}
