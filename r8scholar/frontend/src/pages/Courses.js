import React, { Component } from "react";
import cookie from "react-cookies";
import StarRatings from 'react-star-ratings'; 
import {Spinner, Table, Container, Row, Col, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import SecondaryNav from "../components/SecondaryNav";

const linkStyle = {
    color: 'black',
}


export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedCourses: null, 
            perPage: 20,
            currentPage: 1,
            maxPage: 0,
            departmentRatings:{}
        };
    }

    componentDidMount() {
        this.getEntriesByAlphabet().then(() => {
           
        }); 
        console.log(this.state.displayedCourses);
    }

    // TODO: GET profs
    getEntriesByAlphabet = async() => {//this fetches the courses, implement the same for instructors and departments 
        await fetch("/api/courses").then((response) => {
                response.json().then((data) => {
                    const displayEntries = []
                    data.slice((this.state.curentPage - 1)*this.state.perPage, 
                    (this.state.currentPage*this.state.perPage))
                    .map((item) =>{
                        displayEntries.push(item);
                    })
                    this.setState({ 
                        displayedCourses: displayEntries,
                    });
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
                            <div >
                                <h1 className="title lg">Courses</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row align="center"> {/**Filters */}
                        <Col align="center">
                            <div>
                                <h4>Filter Options</h4>
                            </div>  
                            <div>
                                Sort: Alphabetically
                            </div>
                            <div style={{marginTop:"3%"}}/>
                            <div>
                                <nav aria-label="Page navigation example">
                                    <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
                                        <PaginationItem color="primary">
                                            <PaginationLink href='#'>
                                                First
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink previous href='#'/>   
                                        </PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink href="#">
                                                {this.state.currentPage}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">
                                                {this.state.currentPage + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink onClick="" href="#">
                                                {this.state.currentPage + 2}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink next href='#'/>   
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href='#'>
                                                Last
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </div>
                        </Col>
                    </Row>
                   
                    <Row style={{marginTop:'2%'}} align="center">
                        <Col className="col-md-1"/>
                        <Col className="col-md-10">
                           <Table striped>
                               <thead>
                                    <th>Rank</th>
                                    <th>Course Code</th>
                                    <th>Name</th>
                                    <th>Rating</th>
                                    <th>Department</th>
                               </thead>
                               <tbody>
                                   {this.state.displayedCourses === null? 
                                   <Spinner color="dark"/>
                                :this.state.displayedCourses.map((item, index) =>{ {/**10 courses */}
                                    return(
                                    <tr key={index}>  
                                        <th>{index + 1}</th>
                                        <th><a style={linkStyle} href={"/course/"+item.name}>{item.name}</a></th>
                                        <th><a style={linkStyle} href={"/course/"+item.name}>{item.course_full_name}</a></th>
                                        <th><StarRatings
                                            rating={item.rating}
                                            starDimension="25px"
                                            starSpacing="5px"
                                            starRatedColor="#3498db"
                                            numberOfStars={5}
                                            name='avgRating'/>
                                        </th>
                                        <th><a style={linkStyle} href={"/department/"+item.name}>{item.department}</a></th>
                                    </tr>)
                                })}
                               </tbody>
                           </Table>
                        </Col>
                        <Col className="col-md-1"/>
                    </Row>
                    
                </Container>
                    
            </div>
        )}
}
