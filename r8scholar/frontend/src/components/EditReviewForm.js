//form that is presented to user when they edit a review 
import React, {Component} from 'react'; 
import Form from 'react-bootstrap/Form'; 
import {Button, FormText} from 'react-bootstrap'; 
import cookie from 'react-cookies'; 


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
    //height: '100vh',  
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'5px',
}

export default class EditReviewForm extends Component { 
    constructor(props){
        super(props); 
        this.state = { 
            reviewer : null,
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
        
        this.editReview = this.editReview.bind(this); 
    }

    componentDidMount(){
        fetch('/api/get-user' + '?email=' + cookie.load('email'))//get the info on the user clicking the button
        .then((response) => {
            return response.json(); 
        })
        .then((data) => {
            this.setState({reviewer: data})
        });//this may need to change 
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

    deleteReview = () =>{
        if(this.state.reviewer.nickname == this.props.review.nickname){
        const request = { 
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                review_id: this.props.review.review_id, //stays the same.
            }),
        }; 
        fetch("/api/delete-review", request)
        .then((response) => {
            if(response.ok){
                //reload page 
                alert("Review Deleted!")
                window.location.reload();
            }else{
                alert("Bad Request"); 
            }
        });

    }else{
        alert("Please verify your account before deleting reviews, this may not be your review"); 
    }
}
   


     //TODO make this require fields 
     //this form recieves a review model object 
     editReview = () =>{
        
        if(this.state.reviewer.nickname == this.props.review.nickname){//yay //check if the user is allowed to edit this review
            let overallRating = (this.state.rating1 + this.state.rating2 + this.state.rating3) / 3; 
            
            const request = { 
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    review_id: this.props.review.review_id, //stays the same.
                    subject: this.props.review.subject, //stays the same 
                    title: this.state.title, 
                    content: this.state.content, 
                    rating: overallRating, 
                    review_type: this.props.review.review_type, //stays the same
                }),
            }; 
            fetch("/api/edit-review", request)
            .then((response) => {
                if(response.ok){
                    //reload page 
                    alert("Review Edited!")
                    window.location.reload();
                    
                }else{
                    alert("Unable to post response make sure both the title and content fields are filled in"); 
                }
            });
        }else{ //nay 
            alert("Please verify your account before editing reviews, this may not be your review"); 
        }
    }

    render() { 
        return(
            <div style={formStyle} name="review-form-container">
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label> New Title</Form.Label>
                        <Form.Control isInvalid={this.state.title === null} placeholder="Title..." onChange={this.updateTitleInput}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <FormText><h4>On a scale of 0-5 rate the following:</h4></FormText>
                        {questions[this.props.review.review_type].map((question, index) => 
                        (<div key={index} style={{marginTop: '10px'}}name={"dropdown-question" + index} > 
                        <Form.Label>{question}</Form.Label>
                            <Form.Control onChange={index === 1 ?this.updateRating1 : index === 2 ? this.updateRating2 : this.updateRating3} as="select">
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
                        <Form.Label>What did you think of this {this.props.review.review_type}? </Form.Label>
                        <Form.Control onChange={this.updateContentInput} as="textarea" rows={5} />
                    </Form.Group>
                    <div style={buttonStyle}>
                        {/*Add a chek for if the nickname of the review and the nickname of the user are the same */}
                        <Button onClick={this.editReview} variant="primary" size="lg">
                            Edit Review
                        </Button>
                    </div>
                    <div style={buttonStyle}>
                        <Button onClick={this.deleteReview} variant="primary" size="lg" color="danger"> {/*Add a delete button for the review*/}
                            Delete Review
                        </Button>
                    </div>
                    
                </Form>
            </div>
        ); 
    }
}