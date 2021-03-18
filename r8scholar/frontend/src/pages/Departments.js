import React, { Component } from "react";
import StarRatings from 'react-star-ratings'; 
import {Spinner, Table, Container, Row, Col, Pagination, 
    PaginationItem, PaginationLink,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import SecondaryNav from "../components/SecondaryNav";

const linkStyle = {
    color: 'black',
}



export default class Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instructors: {}, 
            courses: {},
            displayedDepartments: null, 
            perPage: 20,
            currentPage: 1,
            maxPage: 0,
            departmentRatings:{}, 
            sortOption: "Alphabetical A-Z",
            droppedDown: false,
        };

        this.changePages = this.changePages.bind(this); 
        this.activateMenu = this.activateMenu.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() {
        this.getEntries(this.state.currentPage); 
    }

    getTopCourse = async(name) => {
        const request = { 
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                department: name, 
                amount: 1, 
            }),
        }; 

        await fetch("/api/get-top-courses", request)
            .then((response) => {
                if(response.ok){ //yay
                    return response.json(); 
                }else{//nay 
                    return null
                }
            })
            .then((data) =>{
                const courses = this.state.courses
                if(data !== null){
                    courses[name]=data[0].name;
                }else{
                    courses[name]="No Data";
                }
                this.setState({
                    courses: courses,
                });
            });
    }

    getTopInstructor = async(name) => { 
        const request = { 
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                department: name, 
                amount: 1, 
            }),
        }; 
        await fetch("/api/get-top-instructors", request)
            .then((response) => {
                if(response.ok){ //yay
                    return response.json(); 
                }else{//nay 
                    return null
                }
            })
            .then((data) =>{
                const instructors = this.state.instructors
                if(data !== null){
                    instructors[name]=data[0].name;
                }else{
                    instructors[name]="no data";
                }
                this.setState({
                    instructors: instructors,
                });
            });
    }   

    getEntries = async() => {

        var requestType = () =>{
            switch(this.state.sortOption){
                case "Rating: High to Low":
                case "rating: Low to High":
                    return "rating_high_low"; 
                default: 
                    return "name";
            }
        }

        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                "filter_by":requestType(),
            }),
        }
        
        await fetch("/api/filter-departmentlist", request)
            .then((response) => { response.json().then((data) => {
                console.log(data);
                if(this.state.sortOption === "Alphabetical: Z-A" || this.state.sortOption === "Rating: Low to High"){ 
                    data = data.reverse(); 
                }   
                var newMax = parseInt(Math.floor(data.length / this.state.perPage) + 1); 
                data.map((item) =>{
                    this.getTopInstructor(item.name); 
                    this.getTopCourse(item.name); 
                });
                this.setState({ 
                    displayedDepartments: data,
                    maxPage: newMax,
                });
            });
        });
        this.setState({
            loaded: true, 
        }); 
    }

    changePages(button){
        this.setState({displayedCourses: null, }); 
        var newPage = button.target.innerHTML; //reads the html of the pressed button 
        switch(newPage){
            case 'First':
                newPage = 1; 
                break;
            case 'Last':
                newPage = this.state.maxPage; 
                break; 
        }
        this.setState({
            currentPage:Number(newPage),
        }); 
       this.getEntries(this.state.currentPage);
       
    }

    activateMenu(){
        console.log(this.state.droppedDown);
        this.setState({
            droppedDown: !this.state.droppedDown,
        })
    }

    setFilter(filter){
        this.setState({
            sortOption: filter.target.innerText, //reads the html of the pressed button 
            loaded: false, 
            displayedCourses: null,
        });
        
        this.getEntries(); 
    }   

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
                        <Col align="center">
                            <div>
                                <h4>Filter Options</h4>
                            </div>  
                            <div>
                            <Dropdown color="primary"isOpen={this.state.droppedDown}>
                                <DropdownToggle onClick={this.activateMenu} caret>
                                        {this.state.sortOption}
                                </DropdownToggle>
                                <DropdownMenu container="body">      
                                    <DropdownItem onClick={this.setFilter}> <a style={linkStyle}>Alphabetical: A-Z</a></DropdownItem>   
                                    <DropdownItem onClick={this.setFilter}> <a style={linkStyle}>Alphabetical: Z-A</a></DropdownItem>
                                    <DropdownItem onClick={this.setFilter}> <a style={linkStyle}>Rating: High to Low</a></DropdownItem>
                                    <DropdownItem onClick={this.setFilter}> <a style={linkStyle}>Rating: Low to High</a></DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
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
                           <Table striped>
                               <thead>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Rating</th>
                                    <th>Top Course</th>
                                    <th>Top Instructor</th>
                               </thead>
                               <tbody>
                                   {this.state.displayedDepartments === null ? 
                                   <Spinner color="dark"/>
                                :this.state.displayedDepartments.slice((this.state.currentPage - 1)*this.state.perPage, 
                                (this.state.currentPage*this.state.perPage)).map((item, index) =>{ {/**5 courses */}
                                    return(
                                    <tr key={index}>  
                                        <th>{(this.state.currentPage - 1)*this.state.perPage + index + 1}</th>
                                        <th><a style={linkStyle} href={"/department/"+item.name}>{item.name}</a></th>
                                        <th style={{minWidth:"100px"}}><StarRatings
                                            rating={item.rating}
                                            starDimension="25px"
                                            starSpacing="5px"
                                            starRatedColor="#3498db"
                                            numberOfStars={5}
                                            name='avgRating'/>
                                        </th>
                                        <th><a style={linkStyle} href={"/course/"+this.state.courses[item.name]}>
                                            {this.state.courses[item.name] !== null?
                                            this.state.courses[item.name]:<Spinner color="dark"/>}</a></th>
                                        <th><a style={linkStyle} href={"/instructor/"+this.state.instructors[item.name]}>{this.state.instructors[item.name]}</a></th>
                                    </tr>)
                                })}
                               </tbody>
                           </Table>
                        </Col>
                        <Col className="col-md-1"/>
                    </Row>
                    
                </Container>
                    
            </div>
        )
    }
}
