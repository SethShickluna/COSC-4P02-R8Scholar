import React from "react";
import { Button, Modal, Form } from "reactstrap";
import { BsFillTrashFill } from "react-icons/bs";
import axiosInstance from "../axiosApi";
function DeleteCommentForm(props) {
    const [loginModal, setLoginModal] = React.useState(false);

    const deleteComment = async () => {
        try {
            let response = await axiosInstance.post("/delete-comment/", {
                comment_id: props.comment_id,
            });
            return response.status;
        } catch (error) {
            throw error;
        }
    };

    return (
        console.log("comment", props),
        (
            <>
                <BsFillTrashFill style={{ color: "#ff2800bf", height: "23px", width: "23px" }} onClick={() => setLoginModal(true)} />
                <Modal isOpen={loginModal} toggle={() => setLoginModal(false)} modalClassName="modal-register">
                    <div className="modal-header no-border-header text-center" id="delete-comment">
                        <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => setLoginModal(false)}>
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body" id="delete-comment" style={{ padding: "0%" }}>
                        <Form onSubmit={deleteComment}>
                            <h4 style={{ textAlign: "center" }}>Are you sure you wish to delete your comment?</h4>
                            <div style={{ textAlign: "center", margin: "5%" }}>
                                <Button className="btn-round" size="md" color="success" type="submit" style={{ marginRight: "5%" }} outline>
                                    Dedlete
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Modal>
            </>
        )
    );
}
export default DeleteCommentForm;
