import React, { Component } from "react";
import {Container, Row, Col} from 'react-bootstrap'; 

const pageStyles={
    margin: '0 auto', 
    marginTop: '3%', 
    width: '80%', 
}; 

const pageBreak = {
    //this sets the margin for reviews and draws a line hovering under the titles 
    marginBottom: '2%', 
    height: '1px',
    backgroundColor: '#ccc',
    border: 'none',
}

export default class Course extends Component {6
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way 
        this.state = { //all the content that is gonna be retrieved from the api stored here locally
            department: "COSC", 
            code: "2P03", 
            avgRating: "", 
            reviews: null, //reviews would be an object 
            instructors: null, //another object 
            aliases: "", 
        }
       
        this.name = this.props.match.params.courseName; 

        //this.componentDidMount(); 
    }

    //TODO: GET req goes here that fetches data based on uid
    componentDidMount() {
        //this is just to have but will need to be slightly refactored 
        //once we talk to the back end people about how their stuff is named such as 'get-couse'
        fetch('/api/get-course' + '?code=' + this.name)
        .then((response) => response.json())
        .then((data) => {
            this.setState({ // the data.<variable> is just an example and will need to be changed to reflect what the backend returns 
                department: data.department, 
                code: data.code, 
                avgRating: data.avg_rating, 
                reviews: data.reviews, 
                instructors: data.instructors, 
                aliases: data.aliases, 
            });
        }); 
    }

    render() {
        return (
            <div style={pageStyles}>
                <Container fluid="md">
                    <Row> {/* title row, includes course name and reviews*/}
                        <Col sm={4}>
                            <div name="title">
                                <h1>{this.state.department + " " + this.state.code}</h1>
                            </div>  
                        </Col>
                        <Col sm={7}>
                            <div>
                                <h1 style={{textAlign: 'center'}}>Reviews</h1>
                            </div>
                        </Col>
                        <Col sm={1}/>
                    </Row>
                    {/*content row */}
                    <Row>
                        <Col>
                            <div style={pageBreak}/>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col sm={4}>
                            <div name="title">
                                <h4 style={{marginLeft: '7%'}}>Overall Ratings</h4>
                            </div>  
                        </Col>
                        <Col sm={8}>
                            <div>
                              
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
