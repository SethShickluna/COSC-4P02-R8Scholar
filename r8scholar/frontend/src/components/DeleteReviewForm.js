import React from "react";
import { Button, Modal, Form } from "reactstrap";
import { BsFillTrashFill } from "react-icons/bs";
import axiosInstance from "../axiosApi";

function DeleteReviewForm(props) {
    const [loginModal, setLoginModal] = React.useState(false);

    const deleteReview = async () => {
        console.log("props", props.review, props.review.review_id);
        try {
            let response = await axiosInstance.post("/delete-review/", {
                review_id: props.review.review_id,
            });
            return response.status;
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <Button style={{ marginLeft: "5px" }} color="danger" className="btn-round" type="button" onClick={() => setLoginModal(true)}>
                <BsFillTrashFill /> Delete
            </Button>
            <Modal isOpen={loginModal} toggle={() => setLoginModal(false)} modalClassName="modal-register">
                <div className="modal-header no-border-header text-center" id="delete-comment">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => setLoginModal(false)}>
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body" id="delete-comment" style={{ padding: "5%" }}>
                    <Form onSubmit={deleteReview}>
                        <h4 style={{ textAlign: "center" }}>Are you sure you wish to delete your review?</h4>
                        <div style={{ textAlign: "center", margin: "5%" }}>
                            <Button className="btn-round" size="md" color="success" type="submit" style={{ marginRight: "5%" }} outline>
                                Delete
                            </Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
export default DeleteReviewForm;
