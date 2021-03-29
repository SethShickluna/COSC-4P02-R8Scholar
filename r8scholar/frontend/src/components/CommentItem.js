import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardText, ListGroupItem, Button, Row, Col } from 'reactstrap';
import EditCommentForm from './EditCommentForm';
import ReportCommentForm from './ReportCommentForm';



export default class CommentItem extends Component {

    //props is going to consist of the comment item passed by commentform
    constructor(props){ //props is now working and defined
        super(props); 
        
    }

    edit(){ 
        
    }

    //the JSX that is rendered when this file is imported as a component 
    render() {
        return (
            <div className="App">
                {/* container (card )which includes a title section + rating and a content section + button to see comments */}
                <Card>
                    <CardBody>
                        
                        <CardTitle><h6>Commentor name</h6></CardTitle>

                        <CardText><h5>Example text</h5></CardText>
                    </CardBody>
                    <ListGroupItem>
                        <Row>
                            <Col align="left">
                                   <EditCommentForm></EditCommentForm> 
                            </Col>
                            <Col align="right">
                                <ReportCommentForm></ReportCommentForm> 
                            </Col>
                        </Row>
                    </ListGroupItem>
                </Card>
            </div>
        );
    }
}