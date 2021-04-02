import React from "react";
import { Button, Input, Modal, FormGroup, Label, Form, FormText, Container, Row, Col} from "reactstrap";
import cookie from "react-cookies";
import { BsTrash } from 'react-icons/bs';
import axiosInstance from "../axiosApi"; 

//props contains object called review
 
function CommentForm (props){

    const [modal, setModal] = React.useState(false);
    const [content, setContent] = React.useState(""); 
	const [comments, setComments] = React.useState(null);

	const commentContainer = { 
		//backgroundColor: "#f5f6fa", 
		border: "2px solid #dfe6e9",
  		borderRadius: "12px",
		width: "100%", 
		padding: "5px",
		marginTop: "20px",
	}

	React.useEffect(() => {	
		getMyComments();
	}, []);

	
	const getMyComments = async() => { 
		await fetch("/api/get-comments/?review_id="+props.review.review_id)
			.then(response => response.json())
			.then(result => {
				setComments(result.reverse());
			});
	}

    const handleContentChange = e => { 
        setContent(e.target.value); 
    }
    
    const submitComment = async(e) => { 
        e.preventDefault(); 
        //submit for the edit comment 
        try {
            let response = await axiosInstance.post("/create-comment/", {
                email: cookie.load("email"), //get from user login
                review_id: props.review.review_id, //get from props
                content: content, //from the content
            });
            window.location.reload();
            return response.status;
        }catch(error){
          console.log(error);
        }
    }
    
return(
    <>
      <Button
        className="btn-round"
        color="primary"
        type="button"
        onClick={() => setModal(true)}>
        View Comments
      </Button>
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
		className="modal-lg"
        modalClassName="bd-example-modal-lg">
		
        <div className="modal-header">
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>

        <div className="modal-body">
			<Container>
				<Row>
					<Col className="col-md-7">
						<b>{props.review.content}</b>
					</Col>
					<Col className="col-md-5" align="center">
						<Form onSubmit={e => submitComment(e)}>
							<FormGroup>
								<Input type="textarea" placeholder="What do you think of this review?"
								onChange={handleContentChange} name="content" fullWidth={true} id="content" rows={4}/>
							</FormGroup>

							<Button className="btn-round" size="sm" color="info" type="submit" outline>Submit</Button>
						</Form>
					</Col>
				</Row>
				<Row>
					<div className="modal-footer">
						<h3>Comments {comments !== null ? " (" + comments.length + ")" : "(0)"}</h3>
        			</div>
				</Row>
				<Row>
					<div>
						{comments === null || comments.length === 0? 
						<h6>No Comments yet! Be the first to leave one?</h6>
						: 
						comments.map((item, index) =>{
							return(<div key={index}style={commentContainer}>
								<h6>{item.name}</h6>
								<p>{item.content}</p>
							</div>)
						})}
					</div>
				</Row>
			</Container>
			
        </div>
      </Modal>
    </>
  );

}
export default CommentForm; 