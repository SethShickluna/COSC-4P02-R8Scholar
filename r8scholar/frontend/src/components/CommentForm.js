import React from "react";
import { Button, Input, Modal, FormGroup, Label, Form, FormText, Container, Row, Col } from "reactstrap";
import cookie from "react-cookies";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import axiosInstance from "../axiosApi";
import EditForm from "./EditCommentForm";
import DeleteForm from "./DeleteCommentForm";
import ReportCommentForm from "./ReportCommentForm";

//props contains object called review

function CommentForm(props) {
    const [modal, setModal] = React.useState(false);
    const [content, setContent] = React.useState("");
    const [comments, setComments] = React.useState(null);

    const commentContainer = {
        border: "2px solid #dfe6e9",
        borderRadius: "12px",
        width: "-webkit-fill-available",
        marginTop: "20px",
        padding: "3%",
    };

    React.useEffect(() => {
        getMyComments();
    }, []);

    const getMyComments = async () => {
        await fetch("/api/get-comments/?review_id=" + props.review.review_id)
            .then((response) => response.json())
            .then((result) => {
                setComments(result.reverse());
            });
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const submitComment = async (e) => {
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
        } catch (error) {
            console.log(error);
        }
    };

    const vote = async (up, comment_id) => {
        try {
            response = await axiosInstance.post("/thumbs-comment/", {
                comment_id: comment_id,
                email: cookie.load("email"),
                up_or_down: up ? "up" : "down",
            });
            return response.status;
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <Button className="btn-round" color="primary" type="button" onClick={() => setModal(true)}>
                View Comments
            </Button>
            <Modal isOpen={modal} toggle={() => setModal(false)} className="modal-lg" modalClassName="bd-example-modal-lg">
                <div className="modal-header no-border-header text-center" id="comment-form">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => setModal(false)}>
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body" id="comment-form">
                    <Container>
                        <Row>
                            <Col className="col-md-7">
                                <b>{props.review.content}</b>
                            </Col>
                            <Col className="col-md-5" align="center">
                                <Form onSubmit={(e) => submitComment(e)}>
                                    <FormGroup>
                                        <Input type="textarea" placeholder="What do you think of this review?" onChange={handleContentChange} name="content" fullWidth={true} id="content" rows={4} />
                                    </FormGroup>
                                    <Button className="btn-round" size="sm" color="info" type="submit" outline>
                                        Submit
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row className="modal-footer" style={{ marginTop: "2%", marginBottom: "2%", justifyContent: "center" }}>
                                    <h3 style={{ alignContent: "center" }}>Comments {comments !== null ? " (" + comments.length + ")" : "(0)"}</h3>
                                </Row>
                                <Row align="center" style={{ marginBottom: "5%", justifyContent: "center" }}>
                                    {comments === null || comments.length === 0 ? (
                                        <h6>No Comments yet! Be the first to leave one?</h6>
                                    ) : (
                                        comments.map((item, index) => {
                                            return (
                                                <Row key={index} style={commentContainer} id="comment">
                                                    <Col xs lg="9">
                                                        <Row>
                                                            <Col align="left">
                                                                <h6>{item.name}</h6>
                                                            </Col>
                                                            {props.currentUser === item.name ? (
                                                                <Col align="right">
                                                                    <EditForm comment={item} />
                                                                    <DeleteForm comment={item} />
                                                                </Col>
                                                            ) : null}
                                                        </Row>
                                                        <Row className="modal-footer" style={{ marginTop: "2%", paddingTop: "2%", justifyContent: "left" }}>
                                                            <p style={{ paddingLeft: "2%" }}>{item.content}</p>
                                                        </Row>
                                                    </Col>
                                                    <Col xs lg="2" style={{ alignSelf: "center", marginLeft: "auto" }}>
                                                        <Row>
                                                            <Col>{item.thumbs_up}</Col>
                                                            <Col>{item.thumbs_down}</Col>
                                                        </Row>
                                                        {props.currentUser === item.name ? (
                                                            <Row>
                                                                <Col style={{ padding: "0%" }}>
                                                                    <Button
                                                                        disabled
                                                                        style={{
                                                                            marginLeft: "5px",
                                                                            padding: "0",
                                                                            borderRadius: "45%",
                                                                            borderColor: "#f1f1ee",
                                                                            backgroundColor: "#f1f1ee",
                                                                            color: "#77dd77",
                                                                        }}
                                                                        className="btn-round"
                                                                        type="button"
                                                                        id="upvote"
                                                                    >
                                                                        <MdThumbUp size="20px" />
                                                                    </Button>
                                                                </Col>
                                                                <Col style={{ padding: "0%" }}>
                                                                    <Button
                                                                        disabled
                                                                        style={{
                                                                            marginLeft: "5px",
                                                                            padding: "0",
                                                                            borderRadius: "45%",
                                                                            borderColor: "#f1f1ee",
                                                                            backgroundColor: "#f1f1ee",
                                                                            color: "#f5593d",
                                                                        }}
                                                                        className="btn-round"
                                                                        type="button"
                                                                        id="downvote"
                                                                    >
                                                                        <MdThumbDown size="20px" />
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        ) : (
                                                            <Row>
                                                                <Col style={{ padding: "0%" }}>
                                                                    <Button
                                                                        style={{
                                                                            marginLeft: "5px",
                                                                            padding: "0",
                                                                            borderRadius: "45%",
                                                                            borderColor: "#f1f1ee",
                                                                            backgroundColor: "#f1f1ee",
                                                                            color: "#77dd77",
                                                                        }}
                                                                        className="btn-round"
                                                                        type="button"
                                                                        id="upvote"
                                                                        onClick={() => vote(true, item.comment_id)}
                                                                    >
                                                                        <MdThumbUp size="20px" />
                                                                    </Button>
                                                                </Col>
                                                                <Col style={{ padding: "0%" }}>
                                                                    <Button
                                                                        style={{
                                                                            marginLeft: "5px",
                                                                            padding: "0",
                                                                            borderRadius: "45%",
                                                                            borderColor: "#f1f1ee",
                                                                            backgroundColor: "#f1f1ee",
                                                                            color: "#f5593d",
                                                                        }}
                                                                        className="btn-round"
                                                                        type="button"
                                                                        id="downvote"
                                                                        onClick={() => vote(false, item.comment_id)}
                                                                    >
                                                                        <MdThumbDown size="20px" />
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        )}
                                                        <Row style={{ justifyContent: "center" }}>
                                                            <ReportCommentForm comment_id={item.comment_id} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            );
                                        })
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Modal>
        </>
    );
}
export default CommentForm;
