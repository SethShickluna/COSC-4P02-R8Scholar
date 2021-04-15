import React, { Component } from "react";
import StarRatings from 'react-star-ratings'; 
import {Link} from "react-router-dom";
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
            loaded: false, 
            perPage :20,//50 results per page 
            maxPage:1, //DEFAULT MAX 1 PAGE
        };

        this.changePages = this.changePages.bind(this);
    }

    componentDidMount(){
        this.doSearch(); 
    }
    
    doSearch = async() => {
        await fetch('/api/search/?search='+this.state.query)
        .then((response) => {
            return response.json(); 
        }).then((data) => {
            const combinedResults = data.Department.concat(data.Instructor, data.Course) //check this 
            this.setState({
                results: combinedResults, 
                maxPage : newMax, 
            })
        }); 
        this.setState({loaded:true}); 
    }
    
    determineType(item){
        if(item.course_full_name){
            return "course/"+item.name; 
        }else if(item.department){
            return "instructor/"+item.name;  
        }
        return "department/"+item.name; 
    }

    getName(item){
        if(item.course_full_name){
            return item.course_full_name; 
        }else if(item.department){
            return "Instructor";  
        }
        return "Department"; 
    }

    changePages(button) {
        var newPage = button.target.id; //reads the id of the pressed button
        this.setState({
            // results : null,//maybe this line is out to not set null
            currentPage: Number(newPage),
        });
        //removed the this.getEntries
        this.setState({
            loaded: true,
        });
        console.log("Results for this page : "+this.state.results.length)
        console.log("The number of pages : "+this.state.maxPage)
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
                                        <PaginationItem disabled={this.state.displayedCourses === null} color="danger">
                                            <PaginationLink onClick={this.changePages} href="#" id="1">
                                                First
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem disabled={this.state.currentPage - 1 < 1}>
                                            <PaginationLink onClick={this.changePages} href="#" id={this.state.currentPage - 1}>
                                                {"<"}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="active">
                                            <PaginationLink onClick={this.changePages} href="#">
                                                {this.state.currentPage}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem disabled={this.state.currentPage + 1 > this.state.maxPage}>
                                            <PaginationLink onClick={this.changePages} href="#" id={this.state.currentPage + 1}>
                                                {">"}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem disabled={this.state.displayedCourses === null}>
                                            <PaginationLink onClick={this.changePages} href="#" id={this.state.maxPage}>
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
                                    <th>Result</th>
                                    <th>Name</th>
                                    <th>Type / Full Name</th>
                                    <th>Rating</th>
                                </thead>
                                <tbody>
                                    {this.state.results === null ? (
                                        <Spinner color="dark" />
                                    ) : (
                                        this.state.results.slice((this.state.currentPage - 1) * this.state.perPage, this.state.currentPage * this.state.perPage).map((item, index) => {
                                            {
                                                /**5 search results */
                                            }
                                            return (
                                                <tr key={index}>
                                                    <th>{(this.state.currentPage - 1) * this.state.perPage + index + 1}</th>
                                                    <th><a style={linkStyle} href={"/"+this.determineType(item)}>{item.name}</a></th>
                                                    
                                                    <th>{this.getName(item)}</th>

                                                    <th style={{minWidth:"100px"}}>
                                                <StarRatings
                                                rating={item.rating}
                                                starDimension="25px"
                                                starSpacing="5px"
                                                starRatedColor="#3498db"
                                                numberOfStars={5}
                                                name='avgRating'/>
                                            </th>

                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-md-1"/>
                    </Row>
                    <div>
                                <nav aria-label="Page navigation example">
                                    <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
                                        <PaginationItem disabled={this.state.displayedCourses === null} color="danger">
                                            <PaginationLink onClick={this.changePages} href="#" id="1">
                                                First
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem disabled={this.state.currentPage - 1 < 1}>
                                            <PaginationLink onClick={this.changePages} href="#" id={this.state.currentPage - 1}>
                                                {"<"}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="active">
                                            <PaginationLink onClick={this.changePages} href="#">
                                                {this.state.currentPage}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem disabled={this.state.currentPage + 1 > this.state.maxPage}>
                                            <PaginationLink onClick={this.changePages} href="#" id={this.state.currentPage + 1}>
                                                {">"}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem disabled={this.state.displayedCourses === null}>
                                            <PaginationLink onClick={this.changePages} href="#" id={this.state.maxPage}>
                                                Last
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </div>
                    
                </Container>
                    
            </div>
        )}
}
