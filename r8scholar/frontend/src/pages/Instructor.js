//npm modules
import React, { Component } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Table } from "reactstrap";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import StarRatings from "react-star-ratings";

//components
import ReviewItem from "../components/ReviewItem";
import ReviewForm from "../components/ReviewForm";
import SecondaryNav from "../components/SecondaryNav";
import PageBreak from "../components/PageBreak";

//axios
import axiosInstance from "../axiosApi";

const subRatingStyle = {
    marginRight: "15px",
    marginLeft: "15px",
    marginTop: "2%",
    border: "2px #7f8c8d",
    textAlign: "center",
};

export default class Course extends Component {
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way
        this.state = {
            //all the content that is gonna be retrieved from the api stored here locally
            name: this.props.match.params.profName,
            department: null,
            rating: 0,
            reviews: [],
            instructors: [],
            courses: [],
            valid: false,
            loaded: false,
            activeTab: "1",
            currentUser: "",
            allInstructorCourses: [],
            would_take_again: null,
        };
    }

    componentDidMount() {
        this.verifyInstructor(this.state.name);
        this.getAllReviews(this.state.name);
        this.checkOwnership();
        this.getPopularChoices();
        this.getAllCourses(this.state.name);
    }

    verifyInstructor = async (myName) => {
        await fetch("/api/get-instructor/" + "?name=" + myName)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then((data) => {
                if (data != null) {
                    this.setState({
                        valid: true,
                        name: data.name,
                        rating: data.rating,
                        department: data.department,
                    });
                }
            });
    };

    getPopularChoices = async () => {
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                department: this.state.department,
                amount: 2,
            }),
        };
        await fetch("/api/get-top-courses/", request)
            .then((response) => {
                if (response.ok) {
                    //yay
                    return response.json();
                } else {
                    //nay
                    return null;
                }
            })
            .then((data) => {
                this.setState({ courses: data });
            });
        await fetch("/api/get-top-instructors/", request)
            .then((response) => {
                if (response.ok) {
                    //yay
                    return response.json();
                } else {
                    //nay
                    return null;
                }
            })
            .then((data) => {
                this.setState({ instructors: data });
            });
    };

    getAllReviews(myName) {
        //this is just to have but will need to be slightly refactored
        //once we talk to the back end people about how their stuff is named such as 'get-course'
        return fetch("/api/get-reviews/" + "?subject=" + myName)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then((data) => {
                this.setState({
                    reviews: data,
                    loaded: true,
                });
            })
            .then(() => {
                let count = 0;
                this.state.reviews.map((review) => {
                    if (review.would_take_again) {
                        count++;
                    }
                });
                this.setState({ would_take_again: count / this.state.reviews.length });
            });
    }

    async checkOwnership() {
        //get the user
        try {
            let response = await axiosInstance.get("/get-user/" + "?email=" + cookie.load("email"));
            const user = response.data;
            this.setState({ currentUser: user.nickname });
            return user;
        } catch (error) {
            //user is not logged in
            console.log(error);
        }
    }

    getAllCourses = async (instructorName) => {
        let time = Date.now();

        const request = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                filter_by: "instructor",
            }),
        };

        await fetch("/api/filter-courselist/", request)
            .then((response) => {
                response.json().then((data) => {
                    let temp = [];
                    data.forEach((course) => {
                        course.instructor === instructorName && temp.push(course);
                    });
                    var newMax = parseInt(Math.floor(data.length / this.state.perPage) + 1);
                    this.setState({
                        displayedCourses: data,
                        maxPage: newMax,
                    });
                    this.state.displayedCourses.slice((this.state.currentPage - 1) * this.state.perPage, this.state.currentPage * this.state.perPage).map((item) => {
                        this.getDepartmentRatings(item.department);
                    });
                });
            })
            .finally(() => {
                console.log(Date.now() - time);
            });

        this.setState({
            loaded: true,
        });
    };
    render() {
        return (
            <div className="instructor-page">
                <SecondaryNav />
                <Container fluid>
                    {this.state.loaded && this.state.valid ? (
                        <div>
                            <Row className="justify-content-md-center">
                                <Col xs lg="3" style={{ minHeight: "90vh", justifyText: "center", backgroundColor: "#f8f8f8", boxShadow: "0px 0px 40px -15px", zIndex: "-1" }}>
                                    {/**Data and stuff */}
                                    <h1 style={{ marginTop: "60px", marginBottom: "60px", textAlign: "center" }} className="title">
                                        {this.state.name}
                                    </h1>
                                    <PageBreak /> {/* underline */}
                                    <div className="star-ratings" style={{ marginTop: "15%", marginBottom: "15%" }}>
                                        <div name="avg-rating-container" style={{ marginBottom: "10%" }}>
                                            <div name="avg-rating-title">
                                                <h4 style={{ textAlign: "center" }}>Overall Rating</h4>
                                            </div>
                                            <div style={{ textAlign: "center" }} name="avg-rating">
                                                {/* this displays average # of stars*/}
                                                <StarRatings rating={this.state.rating} starDimension="40px" starSpacing="10px" starRatedColor="#f1c40f" numberOfStars={5} name="avgRating" />
                                            </div>
                                        </div>
                                        <div name="avg-rating-container">
                                            <div name="avg-rating-title">
                                                <h4 style={{ textAlign: "center" }}>Difficulty Rating</h4>
                                            </div>
                                            <div style={{ textAlign: "center" }} name="avg-rating">
                                                {/* this displays average # of stars*/}
                                                <StarRatings rating={this.state.rating} starDimension="40px" starSpacing="10px" starRatedColor="#f1c40f" numberOfStars={5} name="avgRating" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "center", margin: "40px 0px 60px 0px" }}>
                                        {this.state.reviews === null ? (
                                            <h3 style={{ margin: "0% 5%", fontWeight: "bold" }}>There are no reviews for this Instructor yet</h3>
                                        ) : this.state.would_take_again <= 0 ? (
                                            <h3 style={{ color: "#f5593dcc", margin: "0% 5%", fontWeight: "bold" }}>This Instructor is not recommended by anyone</h3>
                                        ) : this.state.would_take_again <= 0.3 ? (
                                            <h3 style={{ color: "#f5593dcc", margin: "0% 5%", fontWeight: "bold" }}>
                                                This Instructor is only recommend by {Math.floor(this.state.would_take_again * 100)}% of reviewers
                                            </h3>
                                        ) : this.state.would_take_again < 0.6 ? (
                                            <h3 style={{ color: "#e6be1abf", margin: "0% 5%", fontWeight: "bold" }}>
                                                {Math.floor(this.state.would_take_again * 100)}% of reviewers recommend this Instructor
                                            </h3>
                                        ) : (
                                            <h3 style={{ color: "#77dd77cc", margin: "0% 5%", fontWeight: "bold" }}>
                                                {Math.floor(this.state.would_take_again * 100)}% of reviewers recommend this Instructor
                                            </h3>
                                        )}
                                    </div>
                                    <div name="sub-rating-box" style={subRatingStyle}>
                                        {this.state.instructors !== null ? (
                                            <div name="pop-prof-container">
                                                <PageBreak /> {/* underline */}
                                                <div name="pop-professor-title">
                                                    <h3>Popular Instructors</h3>
                                                </div>
                                                <div name="pop-prof-name">
                                                    {this.state.instructors.map((item, index) => (
                                                        <h4 key={index}>
                                                            <a href={"/instructor/" + item.name}>{item.name}</a>
                                                        </h4>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : null}
                                        {this.state.courses !== null ? (
                                            <div name="pop-course-container">
                                                <PageBreak /> {/* underline */}
                                                <div name="pop-course-title">
                                                    <h3>Popular Courses</h3>
                                                </div>
                                                <div name="pop-course-name" style={{ textAlign: "center" }}>
                                                    {this.state.courses.map((item, index) => (
                                                        <h4 key={index}>
                                                            <a href={"/course/" + item.name}>{item.name}</a>
                                                        </h4>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <PageBreak /> {/* underline */}
                                </Col>
                                <Col xs lg="7">
                                    <Row align="center">
                                        <Col style={{ margin: "5%", boxShadow: "7px 5px 36px -15px", backgroundColor: "#f6f6f6" }}>
                                            <h3>
                                                Instructor at the Department of <a href={"/department/" + this.state.department}>{this.state.department}</a>
                                            </h3>
                                            <br />
                                        </Col>
                                    </Row>
                                    {/**Tabbed content */}
                                    <div className="nav-tabs-navigation">
                                        <div className="nav-tabs-wrapper pointer-nav">
                                            <Nav role="tablist" tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeTab === "1" ? "active" : ""}
                                                        onClick={() => {
                                                            this.setState({ activeTab: "1" });
                                                        }}
                                                    >
                                                        Reviews ({this.state.reviews !== null ? this.state.reviews.length : 0})
                                                    </NavLink>
                                                </NavItem>
                                                {cookie.load("isLoggedIn") === "true" ? (
                                                    <NavItem>
                                                        <NavLink
                                                            className={this.state.activeTab === "2" ? "active" : ""}
                                                            onClick={() => {
                                                                this.setState({ activeTab: "2" });
                                                            }}
                                                        >
                                                            Create Review
                                                        </NavLink>
                                                    </NavItem>
                                                ) : null}
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeTab === "3" ? "active" : ""}
                                                        onClick={() => {
                                                            this.setState({ activeTab: "3" });
                                                        }}
                                                    >
                                                        Courses
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </div>
                                    {/* Tab panes */}
                                    <TabContent className="following" activeTab={this.state.activeTab} style={{ paddingLeft: "4%", paddingRight: "4%", marginBottom: "15%" }}>
                                        <TabPane tabId="1" id="follows" style={{ marginLeft: "0px" }}>
                                            <Row align="left">
                                                <Col className="ml-auto mr-auto" md="10">
                                                    {
                                                        this.state.reviews !== null ? (
                                                            this.state.reviews
                                                                .reverse()
                                                                .map((item, index) => (
                                                                    <ReviewItem
                                                                        id={index}
                                                                        isOwner={item.nickname === this.state.currentUser}
                                                                        currentUser={this.state.currentUser}
                                                                        key={"department-review" + index}
                                                                        reviewItem={item}
                                                                        type="instructor"
                                                                    />
                                                                ))
                                                        ) : (
                                                            <Container fluid>
                                                                <Row>
                                                                    <Col align="center">
                                                                        <h4 style={{ display: "inline" }}>Nothing to see here. Would you like to leave a review?</h4>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        ) /* generate all the reviews for this page */
                                                    }
                                                    <Container fluid>
                                                        <Row>
                                                            <Col align="center">
                                                                {cookie.load("isLoggedIn") === "false" ? (
                                                                    <>
                                                                        <h4 style={{ display: "inline" }}>Please </h4>
                                                                        <a style={{ fontSize: "24px" }} href="/login" className="btn-round lg" color="danger">
                                                                            Sign In
                                                                        </a>
                                                                        <h4 style={{ display: "inline" }}> to leave a review!</h4>
                                                                    </>
                                                                ) : null}
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane className="text-center" tabId="2" id="following">
                                            <Row>
                                                <Col align="center">
                                                    <ReviewForm name={this.state.name} review="instructor" />
                                                </Col>
                                            </Row>
                                        </TabPane>

                                        <TabPane className="text-center" tabId="3" id="following">
                                            <Table striped>
                                                <thead>
                                                    <th>Rank</th>
                                                    <th>Course Code</th>
                                                    <th>Name</th>
                                                    <th>Rating</th>
                                                </thead>
                                                <tbody>
                                                    {this.state.allInstructorCourses.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th>{index + 1}</th>
                                                                <th>
                                                                    <Link style={tableEntries} to={"/course/" + item.name}>
                                                                        {item.name}
                                                                    </Link>
                                                                </th>
                                                                <th style={{ maxWidth: "200px" }}>
                                                                    <Link style={tableEntries} to={"/course/" + item.name}>
                                                                        {item.course_full_name}
                                                                    </Link>
                                                                </th>
                                                                <th style={{ minWidth: "100px" }}>
                                                                    <StarRatings
                                                                        rating={item.rating}
                                                                        starDimension="25px"
                                                                        starSpacing="5px"
                                                                        starRatedColor="#3498db"
                                                                        numberOfStars={5}
                                                                        name="avgRating"
                                                                    />
                                                                </th>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <Row align="center">
                            {" "}
                            {/**show message that course isnt found */}
                            <Col>
                                <h1>The instructor "{this.state.name + " "}" was not found.</h1>

                                <h5 style={{ marginTop: "15%" }}>
                                    <Link to="/instructors">Return to Instructors</Link>
                                </h5>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
        );
    }
}
