//npm modules
import React, { Component } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import cookie from "react-cookies";

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

const tagStyle = {
    borderRadius: "15px",
    height: "25px",
    backgroundColor: "#fbfcfc",
    color: "#000",
    width: "max-content",
    marginRight: "3%",
    marginBottom: "5%",
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
            reviews: [],
            instructors: [],
            courses: [],
            valid: false,
            loaded: false,
            activeTab: "1",
            currentUser: "",
            would_take_again: null,
            top_tags: null,
        };
    }

    componentDidMount() {
        this.verifyCourse(this.state.name);
        this.getAllReviews(this.state.name);
        this.checkOwnership();
        this.getPopularChoices();
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
            })
            .then(() => {
                // This counts number of total recomendations and review tags
                let count = 0;
                let totalTags = { tags: [], count: [] };
                this.state.reviews.map((review) => {
                    if (review.would_take_again) {
                        count++;
                    }
                    if (review.tag_1 != null) {
                        if (totalTags.tags.includes(review.tag_1)) {
                            totalTags.count[totalTags.tags.indexOf(review.tag_1)]++;
                        } else {
                            totalTags.tags.push(review.tag_1);
                            totalTags.count[totalTags.tags.indexOf(review.tag_1)] = 1;
                        }
                        if (review.tag_2 != null) {
                            if (totalTags.tags.includes(review.tag_2)) {
                                totalTags.count[totalTags.tags.indexOf(review.tag_2)]++;
                            } else {
                                totalTags.tags.push(review.tag_2);
                                totalTags.count[totalTags.tags.indexOf(review.tag_2)] = 1;
                            }
                            if (review.tag_3 != null) {
                                if (totalTags.tags.includes(review.tag_3)) {
                                    totalTags.count[totalTags.tags.indexOf(review.tag_3)]++;
                                } else {
                                    totalTags.tags.push(review.tag_3);
                                    totalTags.count[totalTags.tags.indexOf(review.tag_3)] = 1;
                                }
                            }
                        }
                    }
                });
                totalTags.count.sort((a, b) => {
                    if (a > b) {
                        [totalTags.tags[totalTags.count.indexOf(a)], totalTags.tags[totalTags.count.indexOf(b)]] = [
                            totalTags.tags[totalTags.count.indexOf(b)],
                            totalTags.tags[totalTags.count.indexOf(a)],
                        ];
                        return -1;
                    }
                });
                totalTags.count.splice(3);
                totalTags.tags.splice(3);
                this.setState({ would_take_again: count / this.state.reviews.length, top_tags: totalTags });
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
                            <Row className="justify-content-md-center" s>
                                <Col
                                    xs
                                    lg="3"
                                    style={{
                                        minHeight: "100vh",
                                        minWidth: "min-content",
                                        marginTop: "-10px",
                                        justifyText: "center",
                                        backgroundColor: "#f8f8f8",
                                        boxShadow: "0px 0px 40px -15px",
                                    }}
                                >
                                    {/**Data and stuff */}
                                    <h1 style={{ fontSize: "44px", marginTop: "60px", marginBottom: "60px", textAlign: "center" }} className="title">
                                        {this.state.name}
                                    </h1>
                                    <h3 style={{ textAlign: "center", margin: "15% 5%" }}>{this.state.fullName}</h3>
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
                                            <h3 style={{ margin: "0% 5%", fontWeight: "bold" }}>There are no reviews for this Course yet</h3>
                                        ) : this.state.would_take_again <= 0 ? (
                                            <h3 style={{ color: "#f5593dcc", margin: "0% 5%", fontWeight: "bold" }}>This Course is not recommended by anyone</h3>
                                        ) : this.state.would_take_again <= 0.3 ? (
                                            <h3 style={{ color: "#f5593dcc", margin: "0% 5%", fontWeight: "bold" }}>
                                                This Course is only recommend by {Math.floor(this.state.would_take_again * 100)}% of reviewers
                                            </h3>
                                        ) : this.state.would_take_again < 0.6 ? (
                                            <h3 style={{ color: "#e6be1abf", margin: "0% 5%", fontWeight: "bold" }}>
                                                {Math.floor(this.state.would_take_again * 100)}% of reviewers recommend this course
                                            </h3>
                                        ) : (
                                            <h3 style={{ color: "#77dd77cc", margin: "0% 5%", fontWeight: "bold" }}>
                                                {Math.floor(this.state.would_take_again * 100)}% of reviewers recommend this course
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
                                        {this.state.top_tags !== null ? (
                                            <div name="pop-prof-container">
                                                <PageBreak /> {/* underline */}
                                                <div name="top-tags-title" style={{ marginBottom: "5%" }}>
                                                    <h3>Top Tags</h3>
                                                </div>
                                                <div name="top-tags">
                                                    {this.state.top_tags.tags.map((item, index) => (
                                                        <Button id={index} style={tagStyle} disabled>
                                                            <p style={{ marginTop: "-7px" }}>{item}</p>
                                                        </Button>
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
                                                Course belongs to the Department of <a href={"/department/" + this.state.department}>{this.state.department}</a>
                                            </h3>
                                            <br />
                                        </Col>
                                    </Row>
                                    {/**Tabbed content */}
                                    <div className="nav-tabs-navigation" style={{ minWidth: "max-content" }}>
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
                                            </Nav>
                                        </div>
                                    </div>
                                    {/* Tab panes */}
                                    <TabContent className="following" activeTab={this.state.activeTab}>
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
                                                                        type="course"
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
                                                                {cookie.load("isLoggedIn") != "true" ? (
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
                                                    <ReviewForm name={this.state.name} review="course" />
                                                </Col>
                                            </Row>
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
