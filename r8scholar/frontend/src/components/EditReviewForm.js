import React from "react";
import { Button, Input, Modal, FormGroup, Label, Form, FormText, Col, ButtonGroup } from "reactstrap";
import { BsPencil } from "react-icons/bs";
import axiosInstance from "../axiosApi";

function EditForm(props) {
    const [loginModal, setLoginModal] = React.useState(false);
    const [content, setContent] = React.useState(props.review.content);
    const [title, setTitle] = React.useState(props.review.title);
    const [rating1, setRating1] = React.useState(0);
    const [rating2, setRating2] = React.useState(0);
    const [rating3, setRating3] = React.useState(0);
    const [rating4, setRating4] = React.useState(0);
    const [tags, setTags] = React.useState([]);
    const [would_take_again, setWould_take_again] = React.useState(props.review.would_take_again);
    const [tagsSelected, setTagsSelected] = React.useState([props.review.tag_1, props.review.tag_2, props.review.tag_3]);

    const questions = {
        course: ["the lectures for this course?", "the homework for this course?", "the midterm/exam,or other evaluations, for this course?", "how difficult is this course?"],
        instructor: ["the lecturing abilities of the instructor?", "the fairness of the instructor?", "the preparedness of the instructor?", "how difficulty is this instructor?"],
        department: [
            "the quality of courses in this program?",
            "the quality of instructors from this department?",
            "the overall quality of the department?",
            "the overall difficulty of the department?",
        ],
        student: ["the students cooperation and communication?", "the students work efficacy?", "how well did the student adapt to critisism?"],
    };

    React.useEffect((e) => {
        loadTags(props.type, e);
    }, []);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const changeRating = (e) => {
        if (e.target.name === "rating1") {
            setRating1(e.target.value);
        } else if (e.target.name === "rating2") {
            setRating2(e.target.value);
        } else if (e.target.name === "rating3") {
            setRating3(e.target.value);
        } else {
            setRating4(e.target.value);
        }
    };

    const handleCheckbox = () => {
        setWould_take_again(!would_take_again);
    };

    const handleTagSelection = (selection) => {
        let array = tagsSelected;
        const index = array.indexOf(selection);
        if (array.length < 3 && index === -1) {
            array.push(selection);
        } else if (array.length === 3 && index === -1) {
            array.shift();
            array.push(selection);
        } else if (index != -1) {
            array.splice(index, 1);
        }
        setWould_take_again(!would_take_again);
        setWould_take_again(!would_take_again);
        setTagsSelected(array);
    };

    const editReview = async () => {
        let rating = (rating1 + rating2 + rating3) / 3;
        try {
            let response = await axiosInstance.post("/edit-review/", {
                review_id: props.review.review_id,
                subject: props.review.subject,
                title: title,
                content: content,
                rating: rating,
                review_type: props.review.review_type,
                would_take_again: would_take_again ? true : false,
                tag_1: tagsSelected[0] === undefined ? null : tagsSelected[0],
                tag_2: tagsSelected[1] === undefined ? null : tagsSelected[1],
                tag_3: tagsSelected[2] === undefined ? null : tagsSelected[2],
                diff_rating: rating4,
            });
            window.location.reload();
            return response.status;
        } catch (error) {
            throw error;
        }
    };

    const loadTags = async (type) => {
        try {
            let response = await axiosInstance.get("/get-tags/?subject=" + type.charAt(0).toUpperCase() + type.slice(1));
            if (response.data.length === 0) {
                setTags([{ description: "These" }, { description: "are some" }, { description: "meaningless" }, { description: "sample" }, { description: "tags for testing" }]);
            } else {
                setTags(response.data);
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <Button className="btn-round" color="default" type="button" onClick={() => setLoginModal(true)}>
                <BsPencil /> Edit
            </Button>
            <Modal isOpen={loginModal} toggle={() => setLoginModal(false)} modalClassName="modal-register">
                <div className="modal-header no-border-header text-center" id="edit-review">
                    <button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={() => setLoginModal(false)}>
                        <span aria-hidden={true}>×</span>
                    </button>
                    <h6 className="modal-title text-center">Edit Review</h6>
                </div>
                <div className="modal-body" id="edit-review">
                    <Form style={{ textAlign: "center" }} onSubmit={() => editReview()}>
                        <FormGroup>
                            <Label for="exampleEmail">
                                <p>Review Title:</p>
                            </Label>
                            <Input type="text" name="title" id="title" onChange={(e) => handleTitleChange(e)} value={title} />
                        </FormGroup>
                        <FormGroup>
                            <FormText>On a scale of 1-5 rate the following:</FormText>
                            {questions[props.type].map((question, index) => (
                                <div key={index} style={{ marginTop: "10px" }} name={"dropdown-question" + index}>
                                    <Label>
                                        <b>{question}</b>
                                    </Label>
                                    <Input name={"rating" + (index + 1)} onChange={(e) => changeRating(e)} type="select">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>{" "}
                                </div>
                            ))}
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Tell us what you thought about this {props.type}</Label>
                            <Input type="textarea" value={content} onChange={(e) => handleContentChange(e)} name="content" id="content" rows={5} />
                        </FormGroup>
                        <FormGroup check>
                            <Label className="form-check-label" style={{ margin: "5% 3%" }}>
                                <Input onClick={() => handleCheckbox()} className="form-check-input" type="checkbox" active={would_take_again} />
                                <span className="form-check-sign">
                                    <span className="check" style={{ fontSize: "18px" }}>
                                        I would recommend this {props.review.review_type}.
                                    </span>
                                </span>
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleTags" style={{ marginTop: "30px", marginBottom: "10px" }}>
                                <h5>How would you describe the {props.review.review_type}?</h5>
                            </Label>
                            <ButtonGroup style={{ margin: "0px 0px 30px 0px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                                {tags.map((tag) => {
                                    return (
                                        <Button
                                            className="tag"
                                            color="primary"
                                            style={{ margin: "10px", maxInlineSize: "fit-content", borderRadius: "10px", height: "30px" }}
                                            onClick={() => handleTagSelection(tag.description)}
                                            active={tagsSelected.indexOf(tag.description) != -1}
                                        >
                                            <p style={{ marginTop: "-5px" }}>{tag.description}</p>
                                        </Button>
                                    );
                                })}
                            </ButtonGroup>
                            <Label for="exampleTags">
                                <h5>{tagsSelected.length > 0 ? tagsSelected.join(", ") : <div style={{ height: "20px" }}></div>}</h5>
                            </Label>
                        </FormGroup>
                        <Col align="center">
                            <Button className="btn-round" size="md" color="success" type="submit" outline>
                                Submit
                            </Button>
                        </Col>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default EditForm;
