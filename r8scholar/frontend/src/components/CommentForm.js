import React from "react";
import { Button, Input, Modal, FormGroup, Label, Form, FormText} from "reactstrap";
import { IoCreate } from 'react-icons/io';
import { BsPencil } from 'react-icons/bs';
import axiosInstance from "../axiosApi"; 
import CommentItem from "./CommentItem";

//props contains object called review
 
function CommentForm (props){

    const [loginModal, setLoginModal] = React.useState(false);
    const [content, setContent] = React.useState(""); 


    const handleContentChange = e => { 
        setContent(e.target.value); 
    }

    
    const submitComment = async() => { 
        e.preventDefault(); 
        //submit for the edit comment 
        try {
            alert("Tried to add a comment");
            let response = await axiosInstance.post("/create-comment/", {
                email: cookie.load("email"), //get from user login
                review_id: props.review.review_id, //get from props
                content: content, //from the content
            });
            //let user know it worked 
            window.location.reload(); 
            log(response.status);
            return response.status;
        }catch(error){
            //user is not logged in 
        }
    }
    

return(
    <>
      <Button
        className="btn-round"
        color="primary"
        type="button"
        onClick={() => setLoginModal(true)}
      >
        View Comments
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
          <h6 className="modal-title text-center">Comments</h6>
        </div>

        {/**Insert the comment items from the list of*/}
        <CommentItem review ={props.review}></CommentItem> 
        

        <div className="modal-body">
        <Form onSubmit={submitComment}>
                <FormGroup>
                    <Label for="exampleText"><h5>Create Comment</h5></Label>
                    <Input type="textarea" onChange={handleContentChange} name="content" id="content" rows={3}/>
                </FormGroup>
                    <Button className="btn-round" size="lg" color="success" type="submit" outline>Submit</Button>
                </Form>
        </div>
      </Modal>
    </>
  );

}
export default CommentForm; 