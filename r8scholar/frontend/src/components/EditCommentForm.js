import React from "react";
import { Button, Input, Modal, FormGroup, Label, Form, FormText } from "reactstrap";
import { BsPencil } from "react-icons/bs";
import axiosInstance from "../axiosApi";

function EditCommentForm(props) {
    const [loginModal, setLoginModal] = React.useState(false);
    const [content, setContent] = React.useState("");

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const editComment = async () => {
        try {
            let response = await axiosInstance.post("/edit-comment/", {
                comment_id: props.comment.comment_id,
                comment: content,
            });
            window.location.reload();
            return response.status;
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <BsPencil style={{ height: "24px", width: "24px", marginRight: "5%", color: "#1cac1cf7" }} onClick={() => setLoginModal(true)} />
            <Modal isOpen={loginModal} toggle={() => setLoginModal(false)} modalClassName="modal-register">
                <div className="modal-header no-border-header text-center" id="edit-comment">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => setLoginModal(false)} style={{ padding: "0% 2% 0% 0%" }}>
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body" id="edit-comment" style={{ textAlign: "center" }}>
                    <Form onSubmit={() => editComment()}>
                        <FormGroup>
                            <Label for="exampleText" style={{ marginBottom: "7%" }}>
                                Edit the content
                            </Label>
                            <Input type="textarea" onChange={handleContentChange} name="content" id="content" rows={5} placeholder={props.comment.content} />
                        </FormGroup>
                        <Button className="btn-round" size="md" color="success" type="submit" outline style={{ margin: "5%" }}>
                            Post
                        </Button>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
export default EditCommentForm;
