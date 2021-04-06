//form that is presented to user when they create a review 
import React, {Component} from 'react'; 
import {Button, Form, FormText, FormGroup, Label, 
    Input, Row, Container, Col, 
    Spinner
} from 'reactstrap'; 
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

export default class ReviewForm extends Component { 
    constructor(props){
        super(props); 
        this.state = { 
            reviewer : null,
            title: "", 
            content: "", 
            rating1: 1, 
            rating2: 1, 
            rating3: 1, 
            tags: null, 
            difficulty_rating: 1, 
            would_take_again: true, 
            tag_1: "null",
            tag_2: "null",
            tag_3: "null",
        }

        this.handleInput = this.handleInput.bind(this);
        this.submitReview = this.submitReview.bind(this); 
        this.loadTags = this.loadTags.bind(this);
    }

    async componentDidMount(){
        //get the user 
        try {
            let response = await axiosInstance.get("/get-user/" + "?email=" + cookie.load("email"));
            const user = response.data;
            this.setState({reviewer:user});
            return user;
        }catch(error){
            //user is not logged in 
        }
        console.log(props.name);
        this.loadTags(props.name);
    }

    async loadTags(type){ 
        console.log("hi")
        try{
            let response = await axiosInstance.get("/get-tags/?subject="+type); 
            this.setState({tags: response.data});
            return response.status;
        }catch(error){
            throw error; 
        }
    }

    handleInput(obj){
        this.setState({[obj.target.name]: obj.target.value}); 
    }

    //TODO make this require fields 
    async submitReview (e){
        e.preventDefault(); 
        let overallRating = (Number(this.state.rating1) + Number(this.state.rating2) + Number(this.state.rating3)) / 3;
        try { 
            const review = await axiosInstance.post('/create-review/', {
                nickname: this.state.reviewer.nickname,
                subject: this.props.name,
                title: this.state.title, 
                content: this.state.content, 
                rating: overallRating, 
                review_type: this.props.review, 
                difficulty_rating: this.state.difficulty, //implment UI for this, would_take_again, and tags 
                would_take_again: this.state.would_take_again ? "true" : "false",
                tag_1: "this is tag 1", //select from the index of the tags array 
                tag_2: "this is tag 2", //you're left with the task of getting those active indexes (i dont care how) and sending them here
                tag_3: "null", //this is what a tag which has been left empty is sent as 
            });
            window.location.reload();
            return review;
        }catch(error){
            console.log("oops!"); 
        }              
    }

    render() { 
        return( 
            <Container fluid>
            <div style={{maxWidth:"60%"}}>
                {this.state.reviewer !== null ?
                    this.state.reviewer.is_verified ?
                        <Form onSubmit={this.submitReview}>
                            <FormGroup>
                                <Label for="exampleEmail"><h4 className="title">Review Title:</h4></Label>
                                <Input type="text" name="title" id="title" onChange={this.handleInput} placeholder="A Captivating Title" />
                            </FormGroup>
                            <FormGroup>
                                <FormText><h4 className="title">On a scale of 0-5 rate the following:</h4></FormText>
                                {questions[this.props.review].map((question, index) => 
                                (<div key={index} style={{marginTop: '10px'}}name={"dropdown-question" + index} > 
                                <Label><b>{question}</b></Label>
                                    <Input name={"rating"+(index+1)} onChange={this.handleInput} type="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input> </div>
                                ))}
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText"> <h5 className="title">Tell us what you thought about this {this.props.review}</h5></Label>
                                <Input type="textarea" onChange={this.handleInput} name="content" id="content" rows={5}/>
                            </FormGroup>

                            <Button className="btn-round" size="lg" color="success" type="submit" outline>Submit</Button>
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
            <div style={{marginBottom:"15%"}}/>
            </Container>
        ); 
    }
}