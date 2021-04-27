//npm modules
import React, { Component } from "react";
import { Container, Row, Col, Button, Nav, NavItem, NavLink, TabContent, TabPane, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import cookie from "react-cookies";

//js stuff
import imageOne from "../assets/images/ben-sweet-2LowviVHZ-E-unsplash.jpg";

//components
import EditNicknameForm from "../components/EditNicknameForm";
import EditPasswordForm from "../components/EditPasswordForm";
import DeleteProfileForm from "../components/DeleteProfileForm";
import ReviewItem from "../components/ReviewItem";
import SecondaryNav from "../components/SecondaryNav";

//axios
import axiosInstance from "../axiosApi";
import ReviewForm from "../components/ReviewForm";

const pageStyles = {
    paddingTop: "3%",
    minHeight: "100%",
};

const imgStyle = {
    width: "350px",
    height: "100%",
};

export default class Profile extends Component {
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way
        this.state = {
            //all the content that is gonna be retrieved from the api stored here locally
            user: {
                email: null,
                nickname: null,
                verified: false,
                reviews: null,
                loaded: false,
            },
            reviews: null,
            activeTab: "1",
            activeSubtab: "1",
        };

        this.authenicateUser = this.authenticateUser.bind(this);
    }

    componentDidMount() {
        this.authenticateUser(); //check their token --otherwise send them off this page
    }

    async authenticateUser() {
        try {
            let response = await axiosInstance.get("/get-user/" + "?email=" + cookie.load("email"));
            const user = response.data;
            this.setState({ user: user });
            this.getReviews();
            return user;
        } catch (error) {
            this.props.history.push("/login"); //redirect to signin if a valid token is not presented
        }
    }

    async getReviews() {
        try {
            let response = await axiosInstance.get("/get-user-reviews/?email=" + cookie.load("email"));
            this.setState({ reviews: response.data, loaded: true });
            return response.status;
        } catch (error) {
            //user is not logged in
        }
        this.setState({ loaded: true });
    }

    render() {
        return (
            <div className="profile-page" style={{ height: "1080px" }}>
                <SecondaryNav />
                {this.state.user ? (
                    <div style={pageStyles}>
                        <Container fluid="md">
                            <Row align="center">
                                <Col>
                                    {!this.state.user.is_verified ? (
                                        <div>
                                            <h2>Your account is not verfied!</h2>
                                            <Link to="/verify">
                                                <Button color="danger" size="lg">
                                                    Verify Now
                                                </Button>
                                            </Link>
                                        </div>
                                    ) : null}
                                </Col>
                            </Row>
                            <Row style={{ justifyContent: "center" }}>
                                <Col sm={4} style={{ minWidth: "max-content" }}>
                                    <div>
                                        {/*insert image edit, accept image and input it */}
                                        <h1 style={{ textAlign: "center" }}>{this.state.user.nickname}</h1>
                                    </div>
                                    <pageBreak /> {/* underline */}
                                    <div name="avg-rating-container">
                                        <div name="avg-rating-title">
                                            <h4 style={{ textAlign: "center" }}>Profile</h4>
                                        </div>
                                        <div style={{ textAlign: "center" }} name="avg-rating"></div>
                                    </div>
                                    <div name="lecture-rating-container" style={{ marginTop: "25px" }}>
                                        {" "}
                                        {/*This container is for profile picture */}
                                        <div name="lecture-rating-title">{/*<h4 style={{ textAlign: 'center' }}> {Date()} </h4>*/}</div>
                                        <div style={{ textAlign: "center" }} name="lecture-rating">
                                            <img className="profile-pic" src={imageOne} style={imgStyle} />
                                        </div>
                                    </div>
                                    <pageBreak /> {/* underline */}
                                </Col>
                                <Col style={{ marginTop: "53px" }} sm={8}>
                                    <div className="nav-tabs-navigation" style={{ minWidth: "max-content" }}>
                                        <div className="nav-tabs-wrapper pointer-nav">
                                            <Nav role="tablist" tabs>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeTab === "1" ? "active" : ""}
                                                        onClick={() => {
                                                            this.setState({
                                                                activeTab: "1",
                                                            });
                                                        }}
                                                    >
                                                        Your Reviews
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={this.state.activeTab === "2" ? "active" : ""}
                                                        onClick={() => {
                                                            this.setState({
                                                                activeTab: "2",
                                                            });
                                                        }}
                                                    >
                                                        Profile Settings
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                    </div>
                                    {/* Tab panes */}
                                    <TabContent className="following" activeTab={this.state.activeTab}>
                                        <TabPane tabId="1" id="follows">
                                            <Row>
                                                <Col className="ml-auto mr-auto" md="12">
                                                    {this.state.loaded ? (
                                                        this.state.reviews !== null ? (
                                                            this.state.reviews
                                                                .reverse()
                                                                .map((item, index) => (
                                                                    <ReviewItem
                                                                        id={index}
                                                                        isOwner={item.nickname === this.state.user.nickname}
                                                                        key={"department-review" + index}
                                                                        reviewItem={item}
                                                                        type="course"
                                                                    />
                                                                ))
                                                        ) : (
                                                            <p>You have not posted any reviews</p>
                                                        )
                                                    ) : (
                                                        <Spinner color="black" />
                                                    )}
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane className="text-center" tabId="2" id="profile-settings">
                                            <EditPasswordForm />
                                            <EditNicknameForm />
                                            <DeleteProfileForm />
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                ) : null}
            </div>
        );
    }
}
