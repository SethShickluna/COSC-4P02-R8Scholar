//form that is presented to user when they create a review
import React, { Component } from "react";
import { Button, Form, FormText, FormGroup, Label, Input, Row, Container, Col, Spinner, ButtonGroup } from "reactstrap";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import axiosInstance from "../axiosApi";

const questions = {
    course: ["the lectures for this course?", "the homework for this course?", "the midterm/exam,or other evaluations, for this course?"],
    instructor: ["the lecturing abilities of the instructor?", "the fairness of the instructor?", "the preparedness of the instructor?"],
    department: ["the quality of courses in this program?", "the quality of instructors from this department?", "the overall quality of the department?"],
    student: ["the students cooperation and communication?", "the students work efficacy?", "how well did the student adapt to critisism?"],
};

export default class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewer: null,
            title: "",
            content: "",
            rating1: 1,
            rating2: 1,
            rating3: 1,
            //THIS IS TEMP DATA
            tags: ["This is", "where", "different", "tags", "will go"],
            difficulty_rating: 1,
            would_take_again: false,
            tagsSelected: [],
            tag_1: "null",
            tag_2: "null",
            tag_3: "null",
        };
        this.handleTagSelection = this.handleTagSelection.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.submitReview = this.submitReview.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.loadTags = this.loadTags.bind(this);
    }

    async componentDidMount() {
        //get the user
        try {
            let response = await axiosInstance.get("/get-user/" + "?email=" + cookie.load("email"));
            const user = response.data;
            this.setState({ reviewer: user });
            return user;
        } catch (error) {
            //user is not logged in
        }
        // this.loadTags();
    }

    async loadTags() {
        console.log("hi");
        try {
            let response = await axiosInstance.get("/get-tags/?subject=" + "course");
            this.setState({ tags: response.data });
            return response.status;
        } catch (error) {
            throw error;
        }
    }

    handleInput(obj) {
        this.setState({ [obj.target.name]: obj.target.value });
    }

    handleTagSelection(selection) {
        console.log(selection);
        let array = this.state.tagsSelected;
        const index = array.indexOf(selection);
        if (array.length < 3 && index === -1) {
            array.push(selection);
        } else if (array.length === 3 && index === -1) {
            array.shift();
            array.push(selection);
        } else if (index != -1) {
            array.splice(index, 1);
        }
        this.setState({ tagsSelected: array });
    }

    //TODO make this require fields
    async submitReview(e) {
        e.preventDefault();
        let overallRating = (Number(this.state.rating1) + Number(this.state.rating2) + Number(this.state.rating3)) / 3;
        try {
            const review = await axiosInstance.post("/create-review/", {
                nickname: this.state.reviewer.nickname,
                subject: this.props.name,
                title: this.state.title,
                content: this.state.content,
                rating: overallRating,
                review_type: this.props.review,
                //difficulty_rating: this.state.difficulty, //dont uncomment TODO on backend
                would_take_again: this.state.would_take_again ? "true" : "false",
                tag_1: this.state.tagsSelected[0] === undefined ? null : this.state.tagsSelected[0],
                tag_2: this.state.tagsSelected[1] === undefined ? null : this.state.tagsSelected[1],
                tag_3: this.state.tagsSelected[2] === undefined ? null : this.state.tagsSelected[2],
            });
            window.location.reload();
            return review;
        } catch (error) {
            console.log("oops!");
        }
    }

    handleCheckbox = () => {
        this.setState((prev) => ({
            would_take_again: !prev.would_take_again,
        }));
    };

    //This prevents a button being in focus bug
    handleClick(e) {
        e.preventDefault();
    }

    render() {
        console.log("TEST", this.state.would_take_again);
        return (
            <Container fluid>
                <div style={{ maxWidth: "60%" }}>
                    {this.state.reviewer !== null ? (
                        this.state.reviewer.is_verified ? (
                            <Form onSubmit={this.submitReview}>
                                <FormGroup>
                                    <Label for="exampleEmail">
                                        <h4 className="title">Review Title:</h4>
                                    </Label>
                                    <Input type="text" name="title" id="title" onChange={this.handleInput} placeholder="A Captivating Title" />
                                </FormGroup>
                                <FormGroup>
                                    <FormText>
                                        <h4 className="title">On a scale of 0-5 rate the following:</h4>
                                    </FormText>
                                    {questions[this.props.review].map((question, index) => (
                                        <div key={index} style={{ marginTop: "10px" }} name={"dropdown-question" + index}>
                                            <Label>
                                                <b>{question}</b>
                                            </Label>
                                            <Input name={"rating" + (index + 1)} onChange={this.handleInput} type="select">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Input>{" "}
                                        </div>
                                    ))}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleText">
                                        {" "}
                                        {this.props.review === "student" ? (
                                            <h5 className="title">Tell us what you thought about this student and what work they did</h5>
                                        ) : (
                                            <h5 className="title">Tell us what you thought about this {this.props.review}</h5>
                                        )}
                                    </Label>
                                    <Input type="textarea" onChange={this.handleInput} name="content" id="content" rows={5} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleTags" style={{ marginTop: "30px", marginBottom: "10px" }}>
                                        <h5>How would you describe the {this.props.review}?</h5>
                                    </Label>
                                    <ButtonGroup style={{ margin: "0px 0px 30px 0px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                                        {this.state.tags.map((tag) => {
                                            return (
                                                <Button
                                                    color="primary"
                                                    style={{ margin: "10px", maxInlineSize: "fit-content", borderRadius: "10px", height: "30px" }}
                                                    onClick={() => this.handleTagSelection(tag)}
                                                    onMouseDown={this.handleClick}
                                                    active={this.state.tagsSelected.indexOf(tag) != -1}
                                                >
                                                    <p style={{ marginTop: "-5px" }}>{tag}</p>
                                                </Button>
                                            );
                                        })}
                                    </ButtonGroup>
                                    <Label for="exampleTags" style={{ paddingBottom: "30px" }}>
                                        <h5>
                                            {this.state.tagsSelected.length > 0 ? (
                                                <>
                                                    The {this.props.review} is {this.state.tagsSelected.join(", ")}
                                                </>
                                            ) : (
                                                <div>...</div>
                                            )}
                                        </h5>
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label className="form-check-label" style={{ margin: "5% 3%" }}>
                                        <Input onClick={this.handleCheckbox} className="form-check-input" type="checkbox" active={this.state.would_take_again} />
                                        <span className="form-check-sign">
                                            <span className="check" style={{ fontSize: "18px" }}>
                                                I would recommend this {this.props.review}.
                                            </span>
                                        </span>
                                    </Label>
                                </FormGroup>
                                <Button style={{ margin: "50px 0px 100px 0px" }} className="btn-round" size="lg" color="success" type="submit" outline>
                                    Submit
                                </Button>
                            </Form>
                        ) : (
                            <div>
                                <Container fluid>
                                    <Row>
                                        <Col align="center">
                                            <h4>Please verify your account to leave a review.</h4>
                                            <Link to="/verify">
                                                <Button color="danger">Verify Now</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        )
                    ) : (
                        <div>
                            <Container fluid>
                                <Row>
                                    <Col align="center">
                                        <Spinner color="black" />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    )}
                </div>
                <div style={{ marginBottom: "15%" }} />
            </Container>
        );
    }
}
