import React, { Component } from "react";
import Navbar from "../components/Navbar";
import StarRatings from "react-star-ratings";
import { Container, Button, Row, Col, Table, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import PageBreak from "../components/PageBreak";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instructors: [],
            courses: [],
            departments: [],
        };
    }

    componentDidMount() {
        this.getTopCourses();
        this.getTopDepartments();
        this.getTopInstructors();
    }

    getTopInstructors = async () => {
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: "department",
                department: "any",
                amount: 5,
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
                this.setState({
                    instructors: data,
                });
            });
    };

    getTopCourses = async () => {
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: "department",
                department: "any",
                amount: 5,
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
                this.setState({
                    courses: data,
                });
            });
    };

    getTopDepartments = async () => {
        await fetch("/api/get-top-departments/?amount=5")
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
                this.setState({
                    departments: data,
                });
            });
    };

    render() {
        return (
            <div className="home-page">
                <Navbar />
                <div className="page-header section-dark" style={{ backgroundImage: "url(https://brocku.ca/brock-news/wp-content/uploads/2019/05/Cairns-at-night-1600x1056.jpg?x68208)" }}>
                    <div className="content-center">
                        <div className="container">
                            <div className="title-brand">
                                <h1
                                    style={{
                                        userSelect: "none",
                                        webkitUseSelect: "none",
                                        khtmlUserSelect: "none",
                                        mozUserSelect: "none",
                                        msUserSelect: "none",
                                    }}
                                    className="presentation-title"
                                >
                                    Brock University R8Scholar
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "2%" }}></div>
                <Container fluid>
                    <div name="center-content">
                        <Row id="lists">
                            <Col style={{ textAlign: "-webkit-center", textAlignLast: "center" }}>
                                <div className="course-title">
                                    <h1>Top 5 Courses</h1>
                                </div>
                                <div className="course-list" style={{ width: "95%", margin: "100px 0% 100px 0%" }}>
                                    <Table striped>
                                        <thead>
                                            <th>Rank</th>
                                            <th>Name</th>
                                            <th>Rating</th>
                                        </thead>
                                        <tbody>
                                            {this.state.courses.length ? (
                                                this.state.courses.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{index + 1}</th>
                                                            <th>
                                                                <a href={"/course/" + item.name}>{item.name}</a>
                                                            </th>
                                                            <th style={{ minWidth: "100px" }}>
                                                                <StarRatings rating={item.rating} starDimension="25px" starSpacing="5px" starRatedColor="#3498db" numberOfStars={5} name="avgRating" />
                                                            </th>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <Spinner color="dark" />
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                                <Link to="/courses">
                                    <Button className="btn-round" size="lg" color="info">
                                        View All Courses
                                    </Button>
                                </Link>
                            </Col>
                            <PageBreak />
                            <Col style={{ textAlign: "-webkit-center", textAlignLast: "center" }}>
                                <div className="instructor-title">
                                    <h1>Top 5 Instructors</h1>
                                </div>
                                <div className="instructor-list" style={{ width: "95%", margin: "100px  0% 100px  0%" }}>
                                    <Table striped>
                                        <thead>
                                            <th>Rank</th>
                                            <th>Name</th>
                                            <th>Rating</th>
                                        </thead>
                                        <tbody>
                                            {this.state.instructors.length ? (
                                                this.state.instructors.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{index + 1}</th>
                                                            <th>
                                                                <a href={"/instructor/" + item.name}>{item.name}</a>
                                                            </th>
                                                            <th>
                                                                <StarRatings rating={item.rating} starDimension="25px" starSpacing="5px" starRatedColor="#3498db" numberOfStars={5} name="avgRating" />
                                                            </th>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <Spinner color="dark" />
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                                <Link to="/instructors">
                                    <Button className="btn-round" size="lg" color="info">
                                        View All Instructors
                                    </Button>
                                </Link>
                            </Col>
                            <PageBreak />
                            <Col style={{ textAlign: "-webkit-center", textAlignLast: "center" }}>
                                <div className="department-title">
                                    <h1>Top 5 Departments</h1>
                                </div>
                                <div className="department-list" style={{ width: "95%", margin: "100px  0% 100px  0%" }}>
                                    <Table striped>
                                        <thead>
                                            <th>Rank</th>
                                            <th>Name</th>
                                            <th>Rating</th>
                                        </thead>
                                        <tbody>
                                            {this.state.departments.length ? (
                                                this.state.departments.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{index + 1}</th>
                                                            <th>
                                                                <a href={"/department/" + item.name}>{item.name}</a>
                                                            </th>
                                                            <th>
                                                                <StarRatings rating={item.rating} starDimension="25px" starSpacing="5px" starRatedColor="#3498db" numberOfStars={5} name="avgRating" />
                                                            </th>
                                                        </tr>
                                                    );
                                                })
                                            ) : (
                                                <Spinner color="dark" />
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                                <Link to="/departments">
                                    <Button className="btn-round" size="lg" color="info">
                                        View All Departments
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                    <PageBreak />
                    <Row align="center" style={{ margin: "3% 0% 3% 0%", justifyContent: "center" }}>
                        <Col className="col-md-8">
                            <div className="about-title">
                                <h1>About Us</h1>
                            </div>
                            <div style={{ margin: "7% 0% 2% 0%" }} className="about-subtitle">
                                <h2>Our Goal</h2>
                            </div>
                            <div className="text">
                                <p>
                                    The goal of this website is to centralize the thoughts and opinions of the Brock University community. We aim to provide a comprehensive an complete experience for
                                    the users on the site, as well as providing visitors an overview of the Universities academic structure. The importance of this project also is derived from the
                                    fact that web development technologies are always growing and expanding so having hands-on experience with these technologies allows us to become increasingly
                                    familiar with developer technologies that are used in the industry{" "}
                                </p>
                            </div>

                            <div style={{ margin: "7% 0% 2% 0%" }} className="about-subtitle">
                                <h2>Your Privacy, Our Priority</h2>
                            </div>
                            <div className="text">
                                <p>The users of the website should be aware of the terms and conditions as well as any community guidlines in order to properly use the site as designed</p>
                            </div>

                            <div style={{ margin: "7% 0% 2% 0%" }} className="about-subtitle">
                                <h2>Project Information</h2>
                            </div>
                            <div className="text">
                                <p>
                                    This website is similar to known websites such as RateMyProfessor.com but with a few modifications. This website would allow students from Brock University to sign
                                    up and contribute, or to view content anonymously. The differences when compared to RateMyProfessor is our site allows not only professors to be rated but also
                                    courses and departments. Furthermore, each opportunity for rating will also come with a place to leave comments as well as forum discussion from verified users. We
                                    have considered the name ‘R8Scholar’ for this project. The objective of this project is to deliver a comprehensive experience for Brock students to be able to
                                    communicate about their experiences and to give advice/information on potential interactions they might have at the school. This project is important in the sense
                                    that Brock University does not have a form of social networking which can bring together and educate the student community on what experiences are common at the
                                    University. This will allow Brock students to have a personalized experience in which they can better understand which programs, resources, or people are best fit
                                    to them as well as give feedback after having that experience in order for other Brock students to benefit as well.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
