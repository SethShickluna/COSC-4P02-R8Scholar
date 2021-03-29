import React from "react";
import { Button, Input, Modal, FormGroup, Label, Form, FormText, Col} from "reactstrap";
import { BsPencil } from 'react-icons/bs';
import axiosInstance from "../axiosApi"; 

function EditForm(props) {
    const [loginModal, setLoginModal] = React.useState(false);
    const [content, setContent] = React.useState(props.review.content); 
    const [title, setTitle] =  React.useState(props.review.title); 
    const [rating1, setRating1] = React.useState(0);
    const [rating2, setRating2] = React.useState(0);
    const [rating3, setRating3] = React.useState(0);
    
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

    const handleContentChange = e => { 
        setContent(e.target.value); 
    }

    const handleTitleChange = e => { 
        setTitle(e.target.value); 
    }

    const changeRating = e => { 
        if(e.target.name === "rating1"){
            setRating1(e.target.value); 
        }else if(e.target.name === "rating2"){
            setRating2(e.target.value); 
        }else{ 
            setRating3(e.target.value); 
        }
        
    }
    
    const submit = async() => { 
        let rating = (rating1 + rating2 + rating3) / 3; 
        try {
            let response = await axiosInstance.post("/edit-review/", {
                review_id: props.review.review_id, 
                subject: props.review.subject,
                title: title, 
                content: content, 
                rating: rating, 
                review_type: "", 
            });
            //let user know it worked 
            window.location.reload(); 
            return response.status;
        }catch(error){
            //user is not logged in 
        }
    }

  return(
    <>
      <Button
        className="btn-round"
        color="default"
        type="button"
        onClick={() => setLoginModal(true)}
      >
        <BsPencil/>{" "}Edit
      </Button>
      <Modal
        isOpen={loginModal}
        toggle={() => setLoginModal(false)}
        modalClassName="modal-register"
      >
        <div className="modal-header no-border-header text-center">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setLoginModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
          <h6 className="modal-title text-center">Edit Review</h6>
        </div>
        <div className="modal-body">
        
        <Form>
            <FormGroup>
                <Label for="exampleEmail"><p>Review Title:</p></Label>
                <Input type="text" name="title" id="title" onChange={e => handleTitleChange(e)} value={title} />
            </FormGroup>
            <FormGroup>
            <FormText>On a scale of 1-5 rate the following:</FormText>
                {questions[props.type].map((question, index) => 
                (<div key={index} style={{marginTop: '10px'}}name={"dropdown-question" + index} > 
                <Label><b>{question}</b></Label>
                <Input name={"rating"+(index+1)} onChange={e => changeRating(e)} type="select" >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input> </div>))}
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText">Tell us what you thought about this {props.type}</Label>
                    <Input type="textarea" value={content} onChange={e => handleContentChange(e)} name="content" id="content" rows={5}/>
                
                </FormGroup>

                <Col align="center">
                  <Button className="btn-round" size="lg" color="success" onClick={submit} outline>Submit</Button>
                </Col>
                   
                </Form>
        </div>
      </Modal>
    </>
  );
}

export default EditForm;