//form that is presented to user when they create a review 
import React, {Component} from 'react'; 
import Form from 'react-bootstrap/Form'; 
import {Button, FormText, Row, Container, Col, Spinner} from 'reactstrap'; 
import {Link} from 'react-router-dom';
import cookie from 'react-cookies'; 
import axiosInstance from "../axiosApi"; 

const questions = { 
    "course": [
        "the lectures for this course?", 
        "the homework for this course?", 
        "the midterm/exam,or other evaluations, for this course?"
    ], 
    "instructor" : [
        "the lecturing abilities of the instructor?", 
        "the fairness of the instructor?", 
        "the preparedness of the instructor?"
    ], 
    "department": [
        "the quality of courses in this program?", 
        "the quality of instructors from this department?", 
        "the overall quality of the department?", 
    ],  
}

const formStyle = { 
    marginTop: '5%', 
}

const buttonStyle={ 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
export default class ReviewForm extends Component { 
    constructor(props){
        super(props); 
        this.state = { 
            reviewer : null,
            title: "", 
            content: "", 
            rating1: 0, 
            rating2: 0, 
            rating3: 0, 
        }

        this.handleInput = this.handleInput.bind(this);
        this.submitReview = this.submitReview.bind(this); 
    }

    async componentDidMount(){
        //get the user 
        try {
            let response = await axiosInstance.get("/get-user/" + "?email=" + cookie.load("email"));
            const user = response.data;
            this.setState({reviewer:user});
            console.log(user); 
            return user;
        }catch(error){
            //user is not logged in 
        }
    }

    handleInput(obj){
        this.setState({[obj.target.name]: obj.target.value}); 
    }

    //TODO make this require fields 
    async submitReview (){
        let overallRating = (Number(this.state.rating1) + Number(this.state.rating2) + Number(this.state.rating3)) / 3;
        try { 
            const review = await axiosInstance.post('/create-review/', {
                nickname: this.state.reviewer.nickname, 
                subject: this.props.name,
                title: this.state.title, 
                content: this.state.content, 
                rating: overallRating, 
                review_type: this.props.review, 
            });
            window.location.reload();
            return review;
        }catch(error){
            console.log("oops!"); 
        }              
    }

    render() { 
        return( 
            <div>
            {this.state.reviewer !== null ?
                <div style={formStyle} name="review-form-container">
                    {this.state.reviewer.is_verified ?
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control isInvalid={this.state.title === null} placeholder="Title..."  name="title" onChange={this.handleInput}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <FormText><h4>On a scale of 0-5 rate the following:</h4></FormText>
                            {questions[this.props.review].map((question, index) => 
                            (<div key={index} style={{marginTop: '10px'}}name={"dropdown-question" + index} > 
                            <Form.Label>{question}</Form.Label>
                                <Form.Control name={"rating"+(index+1)} onChange={this.handleInput}as="select">
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control> </div>
                            ))}
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>What did you think of this {this.props.review}? </Form.Label>
                            <Form.Control name="content"onChange={this.handleInput} as="textarea" rows={5} />
                        </Form.Group>
                        <div style={buttonStyle}>
                            <Button onClick={this.submitReview} color="primary" size="lg">
                                Submit Review
                            </Button>
                        </div>
                        
                    </Form>
                    : 
                    <div>
                        <Container fluid>
                            <Row>
                                <Col align="center">
                                    <h4>Please verify your account to leave a review.</h4>
                                    <Link to="/verify"><Button color="danger">Verify Now</Button></Link>
                                </Col>
                            </Row>
                        </Container>
                        
                    </div>}
                </div>
                : 
                <div>
                   <Container fluid>
                            <Row>
                                <Col align="center">
                                    <Spinner color="black"/>
                                </Col>
                            </Row>
                        </Container>
                </div>}
            </div>
        ); 
    }
}