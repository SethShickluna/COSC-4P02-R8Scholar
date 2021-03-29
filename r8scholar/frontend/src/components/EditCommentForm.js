import React from "react";
import { Button, Input, Modal, FormGroup, Label, Form, FormText} from "reactstrap";
import { BsPencil } from 'react-icons/bs';
import axiosInstance from "../axiosApi"; 

function EditCommentForm (props){ 
    const [loginModal, setLoginModal] = React.useState(false);
    const [content, setContent] = React.useState(""); 

    const handleContentChange = e => { 
        setContent(e.target.value); 
    }

    const submit = async() => { 
        e.preventDefault(); 
        //submit for the edit comment 
        try {
            let response = await axiosInstance.post("/edit-comment/", {
                comment_id: 1 , 
                content: content, 
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
              <h6 className="modal-title text-center">Edit Comment</h6>
            </div>

            <div className="modal-body">
            <Form onSubmit={submit}>
                    <FormGroup>
                        <Label for="exampleText">Edit the content</Label>
                        <Input type="textarea"  onChange={handleContentChange} name="content" id="content" rows={5}/>
                    </FormGroup>
                        <Button className="btn-round" size="lg" color="success" type="submit" outline>Submit</Button>
                    </Form>
            </div>
          </Modal>
        </>
      );
}
export default EditCommentForm;