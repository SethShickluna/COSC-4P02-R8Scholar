import React from "react";
import { Button, Input, Modal, FormGroup, Label, Form, FormText} from "reactstrap";
import { BsPencil } from 'react-icons/bs';
import axiosInstance from "../axiosApi"; 

function EditForm(props) {
    const [loginModal, setLoginModal] = React.useState(false);
    const [content, setContent] = React.useState(""); 
    const [selected, setSelected] =  React.useState(""); 
    
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


    const handleChange = e => { 
        setContent(e.target.value); 
    }

    const submit = async() => { 
        try {
            let response = await axiosInstance.post("/edit-review/", {
               
            });
            //let user know it worked 
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
          <h3 className="modal-title text-center">Edit Review</h3>
        </div>
        <div className="modal-body">
        
        <Form onSubmit={submit}>
            <FormGroup>
                <Label for="exampleEmail"><h4 className="title">Review Title:</h4></Label>
                <Input type="text" name="title" id="title" onChange={handleChange} placeholder="A Captivating Title" />
            </FormGroup>
            <FormGroup>
            <FormText><h4 className="title">On a scale of 0-5 rate the following:</h4></FormText>
                {questions[props.type].map((question, index) => 
                (<div key={index} style={{marginTop: '10px'}}name={"dropdown-question" + index} > 
                <Label><b>{question}</b></Label>
                <Input name={"rating"+(index+1)} onChange={handleChange} type="select" >
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input> </div>))}
                </FormGroup>
                <FormGroup>
                    <Label for="exampleText"> <h5 className="title">Tell us what you thought about this {props.type}</h5></Label>
                    <Input type="textarea" onChange={handleChange} name="content" id="content" rows={5}/>
                </FormGroup>
                    <Button className="btn-round" size="lg" color="success" type="submit" outline>Submit</Button>
                </Form>
        </div>
      </Modal>
    </>
  );
}

export default EditForm;