//form that is presented to user when they create a review 
import {React, Component} from 'react'; 
import Form from 'react-bootstrap/Form'; 
import {Button} from 'react-bootstrap'; 
import cookie from 'react-cookies'; 


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
            subject: props.name, 
            title: "", 
            content: "", 
            rating1: 1, 
            rating2: 1, 
            rating3: 1, 
        }

        this.updateTitleInput = this.updateTitleInput.bind(this); 
        this.updateContentInput = this.updateContentInput.bind(this); 
        this.updateRating1 = this.updateRating1.bind(this); 
        this.updateRating2 = this.updateRating2.bind(this); 
        this.updateRating3 = this.updateRating3.bind(this); 
        
        this.submitReview = this.submitReview.bind(this); 
    }

    updateTitleInput(obj){
        this.setState({
            title: obj.target.value, 
        }); 
    }

    updateContentInput(obj){
        this.setState({
            content: obj.target.value, 
        }); 
    }

    updateRating1(obj){
        this.setState({
            rating1: parseFloat(obj.target.value), 
        }); 
    }

    updateRating2(obj){
        this.setState({
            rating2: parseFloat(obj.target.value), 
        }); 
    }

    updateRating3(obj){
        this.setState({
            rating3: parseFloat(obj.target.value), 
        })
    }

    //TODO make this require fields 
    submitReview = () =>{

        let overallRating = (this.state.rating1 + this.state.rating2 + this.state.rating3) / 3; 
        
        const request = { 
            method: "POST",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "http://localhost:3000"},
            body: JSON.stringify({
                reviewer: cookie.load('email'), 
                subject: this.state.subject,
                title: this.state.title, 
                content: this.state.content, 
                rating: overallRating, 
            }),
        }; 
        fetch("http://localhost:8000/api/create-review", request)
        .then((response) => {
            console.log(response.status); 
            
        });
        
        
      
    }

    render() { 
        return(
            <div style={formStyle} name="review-form-container">
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control isInvalid={this.state.title === null} placeholder="Title..." onChange={this.updateTitleInput}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        {questions[this.state.reviewType].map((question, index) => 
                        (<div key={index} style={{marginTop: '10px'}}name={"dropdown-question" + index} > 
                        <Form.Label>{question}</Form.Label>
                            <Form.Control onChange={index === 1 ?this.updateRating1 : index === 2 ? this.updateRating2 : this.updateRating3} as="select">
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
                        <Form.Control onChange={this.updateContentInput} as="textarea" rows={5} />
                    </Form.Group>
                    <div style={buttonStyle}>
                        <Button onClick={this.submitReview} variant="danger" size="lg">
                            Submit Review
                        </Button>
                    </div>
                    
                </Form>
            </div>
        ); 
    }
}