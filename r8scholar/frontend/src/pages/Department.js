//npm modules
import React, { Component } from "react";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Table, Button } from "reactstrap";
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

const tableEntries = {
    color: "black",
    fontSize: "18",
};

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
    6;
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way
        this.state = {
            //all the content that is gonna be retrieved from the api stored here locally
            name: this.props.match.params.deptName,
            rating: 0,
            instructorRating: 0,
            courseRating: 0,
            reviews: [],
            instructors: [],
            courses: [],
            valid: false,
            loaded: false,
            activeTab: "1",
            allDeptCourses: [],
            allDeptInstructors: [],
            currentUser: "",
            top_tags: null,
        };
    }

    componentDidMount() {
        this.verifyDepartment(this.state.name);
        this.getPopularChoices(this.state.name);
        this.getAllReviews(this.state.name);
        this.getAllCourses(this.state.name);
        this.getAllInstructors(this.state.name);
        this.checkOwnership();
    }

    verifyDepartment = async (myName) => {
        await fetch("/api/get-department" + "?name=" + myName)
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
                        courseRating: data.courses_rating,
                        rating: data.rating,
                        instructorRating: data.instructors_rating,
                    });
                }
            });
    };

    getPopularChoices = async (myName) => {
        let request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Beatrice Ombuki-Berman",
            }),
        };
        await fetch("/api/get-instructor/'", request)
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
        request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                department: myName,
                amount: 1,
            }),
        };
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

    getAllReviews = async (myName) => {
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
    };

    getAllCourses = async (name) => {
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                department: name,
            }),
        };
        await fetch("/api/filter-course-department/", request).then((response) => {
            response.json().then((data) => {
                this.setState({
                    allDeptCourses: data,
                });
            });
        });
    };

    getAllInstructors = async (name) => {
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                department: name,
            }),
        };
        await fetch("/api/filter-instructor-department/", request).then((response) => {
            response.json().then((data) => {
                this.setState({
                    allDeptInstructors: data,
                });
            });
        });
    };

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
            <div className="department-page">
                <SecondaryNav />
                <Container fluid>
                    {this.state.loaded ? (
                        <div>
                            <Row className="justify-content-md-center">
                                <Col
                                    xs
                                    lg="3"
                                    style={{
                                        minHeight: "100vh",
                                        minWidth: "min-content",
                                        marginTop: "-20px",
                                        justifyText: "center",
                                        backgroundColor: "#f8f8f8",
                                        boxShadow: "0px 0px 40px -15px",
                                    }}
                                >
                                    {/**Data and stuff */}
                                    <h1 style={{ fontSize: "44px", marginTop: "60px", marginBottom: "60px", textAlign: "center" }} className="title">
                                        {this.state.name}
                                    </h1>
                                    <PageBreak /> {/* underline */}
                                    <div className="star-ratings" style={{ marginTop: "15%", marginBottom: "15%", minWidth: "max-content" }}>
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
                                            <h3 style={{ margin: "0% 5%", fontWeight: "bold" }}>There are no reviews for this Department yet</h3>
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
                                    <div name="course-rating-container" style={{ marginTop: "25px" }}>
                                        <div name="course-rating-title">
                                            <h4 style={{ textAlign: "center" }}>Course Rating</h4>
                                        </div>
                                        <div style={{ textAlign: "center" }} name="course-rating">
                                            {/* this displays average # of stars*/}
                                            <StarRatings rating={this.state.courseRating} starDimension="30px" starSpacing="10px" starRatedColor="#3498db" numberOfStars={5} name="courseRating" />
                                        </div>
                                    </div>
                                    <div name="instructor-rating-container" style={{ marginTop: "25px" }}>
                                        <div name="instructor-rating-title">
                                            <h4 style={{ textAlign: "center" }}>Instructor Rating</h4>
                                        </div>
                                        <div style={{ textAlign: "center" }} name="instructor-rating">
                                            {/* this displays average # of stars*/}
                                            <StarRatings
                                                rating={this.state.instructorRating}
                                                starDimension="30px"
                                                starSpacing="10px"
                                                starRatedColor="#3498db"
                                                numberOfStars={5}
                                                name="instructorRating"
                                            />
                                        </div>
                                    </div>
                                    <div name="sub-rating-box" style={subRatingStyle}>
                                        {this.state.instructors !== null ? (
                                            <div name="pop-prof-container">
                                                <PageBreak /> {/* underline */}
                                                <div name="pop-professor-title">
                                                    <h3 style={{ textAlign: "center" }}>Popular Instructors</h3>
                                                </div>
                                                <div name="pop-prof-name" style={{ textAlign: "center" }}>
                                                    {this.state.instructors.map((item) => (
                                                        <h4>
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
                                                    <h3 style={{ textAlign: "center" }}>Popular Courses</h3>
                                                </div>
                                                <div name="pop-course-name" style={{ textAlign: "center" }}>
                                                    {this.state.courses.map((item) => (
                                                        <h4>
                                                            <a href={"/course/" + item.name}>{item.name}</a>
                                                        </h4>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : null}
                                        {this.state.top_tags !== null ? (
                                            <div name="top-tags-container">
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
                                                This department has {this.state.allDeptInstructors.length} instructor and {this.state.allDeptCourses.length} courses
                                            </h3>
                                            <br />
                                        </Col>
                                    </Row>
                                    {/**Tabbed content */}
                                    <div className="nav-tabs-navigation" style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
                                        <div className="nav-tabs-wrapper pointer-nav">
                                            <Nav role="tablist" tabs style={{ flexWrap: "nowrap" }}>
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
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeTab === "4" ? "active" : ""}
                                                        onClick={() => {
                                                            this.setState({ activeTab: "4" });
                                                        }}
                                                    >
                                                        Instructors
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
                                                                        type="department"
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
                                                    <ReviewForm name={this.state.name} review="department" />
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane className="text-center" tabId="3" id="following">
                                            <Table striped style={{ textAlign: "center" }}>
                                                <thead>
                                                    <th>Rank</th>
                                                    <th>Course Code</th>
                                                    <th>Name</th>
                                                    <th>Rating</th>
                                                </thead>
                                                <tbody>
                                                    {this.state.allDeptCourses.map((item, index) => {
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
                                        <TabPane className="text-center" tabId="4" id="following">
                                            <Table striped>
                                                <thead>
                                                    <th>Rank</th>
                                                    <th>Name</th>
                                                    <th>Top Course</th>
                                                    <th>Rating</th>
                                                </thead>
                                                <tbody>
                                                    {this.state.allDeptInstructors.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th>{index + 1}</th>
                                                                <th>
                                                                    <Link style={tableEntries} to={"/instructor/" + item.name}>
                                                                        {item.name}
                                                                    </Link>
                                                                </th>
                                                                <th style={{ maxWidth: "200px" }}>
                                                                    <Link style={tableEntries} to={"/instructor/" + item.name}>
                                                                        {"TOP COURSE"}
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
                                <h1>The department "{this.state.name + " "}" was not found.</h1>

                                <h5 style={{ marginTop: "15%" }}>
                                    <Link to="/departments">Return to Deparments</Link>
                                </h5>
                            </Col>
                        </Row>
                    )}
                </Container>
            </div>
        );
    }
}
