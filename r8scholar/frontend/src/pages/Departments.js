import React, { Component } from "react";
import StarRatings from 'react-star-ratings'; 
import {Spinner, Table, Container, Row, Col} from 'reactstrap';
import SecondaryNav from "../components/SecondaryNav";

const linkStyle = {
    color: 'black',
}





export default class Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {
           entries: [],
        };

        
    }

    componentDidMount() {
        setTimeout(() => {
            this.getEntries();
        }, 200);
    }

    // TODO: GET departs
    getEntries = async() => {//this fetches the courses, implement the same for instructors and departments 
        await fetch("/api/departments").then(
            (res) => {
                res.json().then((data) => {
                    const newEntry = []
                    data.map((item) =>{
                        newEntry.push(item);
                    })
                    this.setState({ entries: newEntry});
                });
            }
        );
    };

    render() {
        return(
            <div className="departments-page">
                <SecondaryNav/>
                <Container fluid>
                    <Row style={{marginTop:'2%'}} align="center">
                        <Col>
                            <div className="title">
                                <h1>Departments</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row align="center"> {/**Filters */}
                        <Col>
                           <h5>Filter Options</h5>
                        </Col>
                    </Row>
                   
                    <Row style={{marginTop:'2%'}} align="center">
                        <Col className="col-md-2"/>
                        <Col className="col-md-8">
                           <Table striped>
                               <thead>
                                    <th>Name</th>
                                    <th>Rating</th>
                                    <th>Top Course</th>
                                    <th>Top Instructor</th>
                               </thead>
                               <tbody>
                                   {!this.state.entries.length ? 
                                   <Spinner color="dark"/>
                                :this.state.entries.map((item, index) =>{ {/**5 courses */}
                                    return(
                                    <tr key={index}>  
                                        <th><a style={linkStyle} href={"/department/"+item.name}>{item.name}</a></th>
                                        <th><StarRatings
                                            rating={item.rating}
                                            starDimension="25px"
                                            starSpacing="5px"
                                            starRatedColor="#3498db"
                                            numberOfStars={5}
                                            name='avgRating'/>
                                        </th>
                                        <th>Top Course</th>
                                        <th>Top Prof</th>
                                    </tr>)
                                })}
                               </tbody>
                           </Table>
                        </Col>
                        <Col className="col-md-2"/>
                    </Row>
                    
                </Container>
                    
            </div>
        )
    }
}
