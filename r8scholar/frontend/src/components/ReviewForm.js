//form that is presented to user when they create a review 
import React, {Component} from 'react'; 
import {Button, Form, FormText, FormGroup, Label, 
    Input, Row, Container, Col, 
    Spinner
} from 'reactstrap'; 
import {Link} from 'react-router-dom';
import cookie from 'react-cookies'; 
import axiosInstance from "../axiosApi"; 
import { Badge } from 'reactstrap';

const questions = { 
    "course": [
        "the lectures for this course?", 
        "the homework for this course?", 
        "the midterm/exam,or other evaluations, for this course?", 
    ], 
    "instructor" : [
        "the lecturing abilities of the instructor?", 
        "the fairness of the instructor?", 
        "the preparedness of the instructor?", 
    ], 
    "department": [
        "the quality of courses in this program?", 
        "the quality of instructors from this department?", 
        "the overall quality of the department?",
    ],  
}

const difficulty_questions = {
     "course" : [
"How difficult would you consider the course?",
],
"instructor" :
 ["How difficult would you consider the intructor's courses?", 
],
"department" :
 ["How difficult would you consider the department's courses?", 
]
}


//TODO make the tags a variable list rather than static
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
            would_take_again: false, //set to not taking the course again at first.
            tag_1: "null",
            tag_2: "null",
            tag_3: "null",
            tagCounter: 0,
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleTagInput = this.handleTagInput.bind(this);
        this.submitReview = this.submitReview.bind(this); 
        this.loadTags = this.loadTags.bind(this);
        this.handleCheckboxToggle = this.handleCheckboxToggle.bind(this);
        this.handleBadgeToggle = this.handleBadgeToggle.bind(this);


        this.printState= this.printState.bind(this);
        this.print= this.print.bind(this);

    }

    async componentDidMount(){
        //get the user 
        try {
            let response = await axiosInstance.get("/get-user/" + "?email=" + cookie.load("email"));
            const user = response.data;
            this.setState({reviewer:user});
        }catch(error){
            //user is not logged in 
        }
 
        try{
            let mySubject = this.props.review.substring(0, 1).toUpperCase() + this.props.review.substring(1, this.props.review.length);
            let response = await axiosInstance.get("/get-tags/?subject="+mySubject); 
            const list = response.data; 
            this.setState({tags: list});
        }catch(error){
            //tags not found (this should never happen)
        }
    }
    
    async loadTags(){ 
        console.log("hi")
        try{
            let mySubject = this.props.review.substring(0, 1).toUpperCase() + this.props.review.substring(1, this.props.review.length);
            let response = await axiosInstance.get("/get-tags/?subject="+mySubject); 
            console.log(response);
            const tagsList = response.data; 
            this.setState({tags: tagsList});
            
            return response.status;
        }catch(error){
            throw error; 
        }
    }

    handleInput(obj){
        this.setState({[obj.target.name]: obj.target.value}); 
    }

    handleTagInput(obj){
        this.setState({[obj.target.name]: obj.target.value}); 
        console.log("Set : "+[obj.target.name]+" to : "+[obj.target.value])//check what is updated by the dropdown
    }

    handleCheckboxToggle(){ 
        if (this.state.would_take_again == false){ 
            this.setState({would_take_again : true})
            console.log("Set to true ");
        }else{ 
            this.setState({would_take_again : false})
            console.log("Set to false ");
        }
    }//uncomment check state button in the form to check if this works

    handleBadgeToggle(){ 

        if (this.state.tagCounter == 0){ //if no tags, set 1

        if (this.state.tag_1 =="null"){ 
            this.setState({tag_1: obj.target.value}) //set to  the value 
            console.log("Set : "+this.state.tag_1+" to : "+[obj.target.value])//check what is updated by the dropdown
            this.setState({tagCounter: 1}) //set to  the value 
        }

    }
    if (this.state.tagCounter == 1){ //if 1 tag, set 2
        if (this.state.tag_2  == "null"){ 
            this.setState({tag_2: obj.target.value}) //set to  the value 
            console.log("Set : "+this.state.tag_2+" to : "+[obj.target.value])//check what is updated by the dropdown
            this.setState({tagCounter: 2}) //set to  the value 
        }
    }
        
    if (this.state.tagCounter == 2){ //if 2 tags, set 3
        if (this.state.tag_3  == "null"){ 
            this.setState({tag_3: obj.target.value})
            console.log("Set : "+this.state.tag_3+" to : "+[obj.target.value])//check what is updated by the dropdown
            this.setState({tagCounter: 3}) //set to  the value  
        }
    }
    

    if (this.state.tagCounter == 3){ //if max tags. //remove first tag  and replace
        this.setState({tag_1: obj.target.value}) //set to  the value 
        console.log("Set : "+this.state.tag_1+" to : "+[obj.target.value])//check what is updated by the dropdown
        this.setState({tagCounter: 2}) //set to  the value 
    }

    }

    printState(){
        let mySubject = this.props.review.substring(0, 1).toUpperCase() + this.props.review.substring(1, this.props.review.length);
        this.loadTags(); 
        console.log("tag subject: "+mySubject)
    }

    print(){ 
        console.log("nickname : "+this.state.reviewer.nickname);
        console.log("Subject : "+this.props.name);
        console.log("Title : "+this.state.title); 
        console.log("Content: "+this.state.content); 
        console.log("rating1  : "+this.state.rating1); 
        console.log("rating2 : "+this.state.rating2); 
        console.log("rating3 : "+this.state.rating3); 
        console.log("Type : "+this.props.review)
        console.log("Difficulty : "+this.state.difficulty_rating);
        console.log("WTA? : "+this.state.would_take_again);
       console.log("Tag 1 : "+this.state.tag_1);
       console.log("Tag 2 : "+this.state.tag_2);
       console.log("Tag 3 : "+this.state.tag_3);
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
                //implment UI for this, would_take_again, and tags 
                diff_rating: this.state.difficulty_rating, //dont uncomment TODO on backend 
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
                            {/*new dropdown for difficulty */}
                            <FormGroup>
                                <FormText><h4 className="title">On a scale of 0-5 :</h4></FormText>
                                {difficulty_questions[this.props.review].map((question, index) => 
                                (<div key={index} style={{marginTop: '10px'}}name={"dropdown-question" + index} > 
                                <Label><b>{question}</b></Label>
                                    <Input name={"difficulty_rating"} onChange={this.handleInput} type="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input> </div>
                                ))}
                            </FormGroup> 

                            Please select up to 3 tags.
                            
                            <FormGroup>
                                  {/*Form group for tags lists */}
                                  <FormText>Please select a tag. </FormText>
                                  <Input name={"tag_1"} type ="select" bsSize="sm" onClick = {this.handleTagInput} onChange = {this.handleTagInput}> 
                                  { this.state.tags !== null ? (
                                  
                                  this.state.tags.map((item, index) => (
                                       <option key={index}> {item.description}</option> 
                                       
                                       ))
                                  ):(
                                      <option> No tags available...</option> 
                                  )
                                    }
                                    </Input>
                                       </FormGroup>

                                       <FormGroup>
                                  {/*Form group for tags lists */}
                                  <FormText>Please select a tag. </FormText>
                                  <Input name={"tag_2"} type ="select" bsSize="sm" onClick = {this.handleTagInput}  onChange = {this.handleTagInput}> 
                                  { this.state.tags !== null ? (
                                  
                                  this.state.tags.map((item, index) => (
                                       <option key={index}> {item.description}</option> 
                                       
                                       ))
                                  ):(
                                      <option> No tags available...</option> 
                                  )
                                    }
                                    </Input>
                                       </FormGroup>

                                       <FormGroup>
                                  {/*Form group for tags lists */}
                                  <FormText>Please select a tag. </FormText>
                                  <Input name={"tag_3"} type ="select" bsSize="sm" onClick = {this.handleTagInput} onChange = {this.handleTagInput}> 
                                  { this.state.tags !== null ? (

                                  this.state.tags.map((item, index) => (
                                       <option key={index}> {item.description}</option> 
                                       
                                       ))
                                  ):(
                                      <option> No tags available...</option> 
                                  )
                                    }
                                    </Input>
                                       </FormGroup>

                                       <FormGroup >
       
          <Input type="checkbox" onChange={this.handleCheckboxToggle} />
          Would you recommend this {this.props.review}?
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