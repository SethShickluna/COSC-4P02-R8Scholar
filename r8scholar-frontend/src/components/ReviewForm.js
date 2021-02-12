//form that is presented to user when they create a review 
import {React, Component} from 'react'; 
import Form from 'react-bootstrap/Form'; 
import {Button} from 'react-bootstrap'; 


const questions = { 
    "course": [
        "On a scale of 1 to 5, how did you find the lectures for this course? ", 
        "On a scale of 1 - 5, was the homework for this course?", 
        "On a scale of 1 - 5, how was the instructor for this course?"
    ], 
    "instructor" : [
        "On a scale of 1 to 5, how were the lecturing abilities of this instructor? ", 
        "On a scale of 1 - 5, how was the homework this instructor assigned?", 
        "On a scale of 1 - 5, how was the course this instructor taught?"
    ], 
    "department": [
        "On a scale of 1 - 5, what is the quality of courses from this department?", 
        "On a scale of 1 - 5, what " 
    ],  
}

const formStyle = { 
    marginTop: '5%', 
}

const buttonStyle={
    //height: '100vh',  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export default class ReviewForm extends Component { 
    constructor(props){
        super(props); 
        this.state = { 
            reviewType: props.review, 
            title: null, 
            content: null, 
            instructorRating: null, 
            homeworkRating: null, 
            lectureRating: null, 
            avgRating: null,
            date: (new Date()).toString(), 
        }
    }


    render() { 
        return(
            <div style={formStyle} name="review-form-container">
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="email" placeholder="Title..." />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        {questions[this.state.reviewType].map((question, index) => 
                        (<div style={{marginTop: '10px'}}name={"dropdown-question" + index} > 
                        <Form.Label>{question}</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control> </div>
                        ))}
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>What did you think of this {this.state.reviewType}? </Form.Label>
                        <Form.Control as="textarea" rows={5} />
                    </Form.Group>
                    <div style={buttonStyle}>
                        <Button variant="danger" size="lg" type="submit">
                            Submit Review
                        </Button>
                    </div>
                    
                </Form>
            </div>
        ); 
    }
}