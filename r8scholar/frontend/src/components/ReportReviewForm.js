//form that is presented to user when they report a review 
import React, {Component} from 'react'; 
import Form from 'react-bootstrap/Form'; 
import {Button, FormText} from 'react-bootstrap'; 
import cookie from 'react-cookies'; 

const formStyle = { 
    marginTop: '5%', 
}


export default class ReportReviewForm extends Component { 


    constructor(props){
        super(props); 
        this.state = { 
            reviewer: null, //gets the user from the browser
            description: "", 
        }

        console.log(this.props.review) //checking if the review is being passed
        this.updateDescriptionInput = this.updateDescriptionInput.bind(this); 
        this.submitReport = this.submitReport.bind(this); 
    }


    updateDescriptionInput(obj){
        this.setState({
            description: obj.target.value, 
        }); 
    }

    componentDidMount(){
        fetch('/api/get-user' + '?email=' + cookie.load('email'))//get the info on the user clicking the button
        .then((response) => {
            return response.json(); 
        })
        .then((data) => {
            this.setState({reviewer: data})
        });//this may need to change 
    }

    submitReport = () =>{    
        //yay 
            const request = { 
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    review_id: this.props.review.review_id, //stays the same.
                    report_description: this.state.description,
                }),
            }; 
            console.log(this.props.review.review_id); 
            console.log(this.state.description);//printing out the information being passed
            fetch("/api/report-review", request)
            .then((response) => {
                if(response.ok){
                    //reload page 
                    alert("Review Reported!")
                    window.location.reload();
                }else{
                    alert("Report Sent!"); 
                }
            });
    }

    render() { 
        return(
            <div style={formStyle} name="review-form-container">
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label></Form.Label>
                            <Form.Control onChange={this.updateDescriptionInput} as="select">
                                <option>Uncivil, unneighborly or offensive content.</option>
                                <option>Abusive or inappropriate posts.</option>
                                <option>Irrelevant or annoying.</option>
                            </Form.Control> 
                    </Form.Group>
                    <Button onClick ={this.submitReport} variant="primary" size="sm" color="danger">Confirm!</Button>
                </Form>
            </div>
        ); 
    }

}
