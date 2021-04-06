//npm modules
import React, { Component } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import cookie from "react-cookies";

//components
import ReviewItem from "../components/ReviewItem";
import ReviewForm from "../components/ReviewForm";
import SecondaryNav from "../components/SecondaryNav";

//axios
import axiosInstance from "../axiosApi";

const pageStyles = {
    margin: "0 auto",
    width: "90%",
};

const subRatingStyle = {
    marginRight: "15px",
    marginLeft: "15px",
    marginTop: "2%",
    border: "2px #7f8c8d",
};

const pageBreak = {
    //this sets the margin for reviews and draws a line hovering under the titles
    marginBottom: "2%",
    marginTop: "2%",
    height: "1px",
    backgroundColor: "#dedede",
    border: "none",
};

export default class Course extends Component {
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way
        this.state = {
            //all the content that is gonna be retrieved from the api stored here locally
            name: this.props.match.params.courseName,
            fullName: null,
            department: null,
            rating: 0,
            reviews: null,
            instructors: [],
            courses: [],
            valid: false,
            loaded: false,
            activeTab: "1",
            currentUser: "",
        };
    }

    componentDidMount() {
        this.verifyCourse(this.state.name);
        this.getAllReviews(this.state.name);
        this.checkOwnership();

        setTimeout(() => {
            this.getPopularChoices();
        }, 200);
    }

    verifyCourse = async (myName) => {
        await fetch("/api/get-course/" + "?name=" + myName)
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
                        fullName: data.course_full_name,
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

    async getAllReviews(myName) {
        await fetch("/api/get-reviews/" + "?subject=" + myName)
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
        }
    }

    render() {
        return (
            <div className="course-page">
                <SecondaryNav />
                <Container fluid>
                    {this.state.loaded ? (
                        <div>
                            <Row align="center">
                                <Col>
                                    <h1 className="title">{this.state.name}</h1>
                                    <small className="text-muted">
                                        <h3>{this.state.fullName}</h3>
                                    </small>
                                    <br />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={1} />
                                <Col md={3}>
                                    {/**Data and stuff */}
                                    <div name="avg-rating-container">
                                        <div name="avg-rating-title">
                                            <h4 style={{ textAlign: "center" }}>Overall Rating</h4>
                                        </div>
                                        <div style={{ textAlign: "center" }} name="avg-rating">
                                            {/* this displays average # of stars*/}
                                            <StarRatings rating={this.state.rating} starDimension="40px" starSpacing="10px" starRatedColor="#f1c40f" numberOfStars={5} name="avgRating" />
                                        </div>
                                    </div>
                                    <div name="sub-rating-box" style={subRatingStyle}>
                                        <div style={pageBreak} /> {/* underline */}
                                        <div style={{ marginTop: "25px" }} name="pop-prof-container">
                                            <div name="pop-professor-title">
                                                <h3 style={{ textAlign: "center" }}>Popular Instructors</h3>
                                            </div>
                                            <div name="pop-prof-name" style={{ textAlign: "center" }}>
                                                {this.state.instructors !== null
                                                    ? this.state.instructors.map((item, index) => (
                                                          <h4 key={index}>
                                                              <a href={"/instructor/" + item.name}>{item.name}</a>
                                                          </h4>
                                                      ))
                                                    : null}
                                            </div>
                                        </div>
                                        <div style={pageBreak} /> {/* underline */}
                                        <div style={{ marginTop: "25px" }} name="pop-course-container">
                                            <div name="pop-course-title">
                                                <h3 style={{ textAlign: "center" }}>Popular Courses</h3>
                                            </div>
                                            <div name="pop-course-name" style={{ textAlign: "center" }}>
                                                {this.state.courses !== null
                                                    ? this.state.courses.map((item, index) => (
                                                          <h4 key={index}>
                                                              <a href={"/course/" + item.name}>{item.name}</a>
                                                          </h4>
                                                      ))
                                                    : null}
                                            </div>
                                        </div>
                                        <div style={pageBreak} /> {/* underline */}
                                        <div style={{ marginTop: "25px" }} name="pop-course-container">
                                            <div name="pop-course-title">
                                                <h3 style={{ textAlign: "center" }}>
                                                    Department of <a href={"/department/" + this.state.department}>{this.state.department}</a>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={pageBreak} /> {/* underline */}
                                    <div style={{ display: "grid", gridAutoFlow: "column", margin: "20px 60px 20px 60px", fontSize: "38px" }}>
                                        <div>Total reviews</div>
                                        <div style={{ justifySelf: "right" }}>0</div>
                                    </div>
                                    <div style={{ display: "grid", gridAutoFlow: "column", margin: "20px 60px 20px 60px", fontSize: "22px" }}>
                                        <div>How many students would take another course?</div>
                                        <div style={{ justifySelf: "right", marginRight: "-30px", fontSize: "38px" }}>0%</div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    {" "}
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
                                                        Reviews
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
                                            </Nav>
                                        </div>
                                    </div>
                                    {/* Tab panes */}
                                    <TabContent className="following" activeTab={this.state.activeTab}>
                                        <TabPane tabId="1" id="follows">
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
                                                                        key={"department-review" + index}
                                                                        reviewItem={item}
                                                                        type="course"
                                                                    />
                                                                ))
                                                        ) : (
                                                            <Container fluid>
                                                                <Row>
                                                                    <Col align="center">
                                                                        <h4>Nothing to see here. Would you like to leave a review?</h4>
                                                                    </Col>
                                                                </Row>
                                                            </Container>
                                                        ) /* generate all the reviews for this page */
                                                    }
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane className="text-center" tabId="2" id="following">
                                            <Row>
                                                <Col align="center">
                                                    <ReviewForm name={this.state.name} review="course" />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                    </TabContent>
                                </Col>
                                <Col md={2} />
                            </Row>
                        </div>
                    ) : (
                        <Row align="center">
                            {" "}
                            {/**show message that course isnt found */}
                            <Col>
                                <h1>The course "{this.state.name + " "}" was not found.</h1>

                                <h5 style={{ marginTop: "15%" }}>
                                    <Link to="/courses">Return to Courses</Link>
                                </h5>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
        );
    }
}
