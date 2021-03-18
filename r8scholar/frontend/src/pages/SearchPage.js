import React, { Component } from "react";
import StarRatings from 'react-star-ratings'; 
import {Spinner, Table, Container, Row, Col, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import SecondaryNav from "../components/SecondaryNav";

const linkStyle = {
    color: 'black',
}


export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query:this.props.match.params.query,
            results:[], 
            currentPage: 1,
        };
    }

    componentDidMount(){
        this.doSearch(); 
    }
    
    doSearch = async() => {
        await fetch('/api/search/?search='+this.state.query)
        .then((response) => {
            return response.json(); 
        }).then((data) => {
            const combinedResults = data.Department.concat(data.Instructor, data.Course)
            this.setState({
                results: combinedResults, 
            })
        }); 
        console.log(this.state.results); 
    }
    
    determineType(item){
        if(item.course_full_name){
            return "course/"+item.name; 
        }else if(item.department){
            return "instructor/"+item.name;  
        }
        return "department/"+item.name; 
    }

    render() {
        return(
        <div className="departments-page">
                <SecondaryNav/>
                <Container fluid>
                    <Row style={{marginTop:'2%'}} align="center">
                        <Col>
                            <div >
                                <h1 className="title lg">Search Results for {this.state.query}</h1>
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
                                        <PaginationItem color="danger">
                                            <PaginationLink onClick={this.changePages}href="#">
                                                First
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem disabled={this.state.currentPage - 1 < 1}>
                                            <PaginationLink onClick={this.changePages} href="#">
                                                {this.state.currentPage - 1}
                                            </PaginationLink>
                                        </PaginationItem >
                                        <PaginationItem className="active">
                                            <PaginationLink onClick={this.changePages} href="#">
                                                {this.state.currentPage}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem disabled={this.state.currentPage + 1 > this.state.maxPage}>
                                            <PaginationLink onClick={this.changePages} href="#">
                                                {this.state.currentPage + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink onClick={this.changePages} href='#'>
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
                            {this.state.results.length == 0 || this.state.results === null?
                            <div>
                                <h3>No matching results found.</h3>
                                <h5><a href="/">Return Home</a></h5>
                            </div>
                           :<Table striped>
                               <thead>
                                    <th>Result</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Rating</th>
                               </thead>
                               <tbody>
                                   {this.state.results.map((item, index) =>{
                                       return(
                                        <tr key={index}>  
                                        <th>{index + 1}</th>                                     
                                        <th><a style={linkStyle} href={"/"+this.determineType(item)}>{item.name}</a></th>
                                        <th>{this.determineType(item).split("/")[0]}</th>
                                        <th style={{minWidth:"100px"}}><StarRatings
                                            rating={item.rating}
                                            starDimension="25px"
                                            starSpacing="5px"
                                            starRatedColor="#3498db"
                                            numberOfStars={5}
                                            name='avgRating'/>
                                        </th>
                                    </tr>
                                       ); 
                                   })}
                                   
                               </tbody>
                           </Table>}
                        </Col>
                        <Col className="col-md-1"/>
                    </Row>
                    
                </Container>
                    
            </div>
        )}
}
