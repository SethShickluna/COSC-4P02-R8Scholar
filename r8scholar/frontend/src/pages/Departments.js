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

    getEntries = async(page) => {//this fetches the courses based on the filter 
        const displayEntries = [];
        switch(this.state.sortOption){
            case "Rating: High to Low":
                const requestHigh = { 
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                        "filter_by":"rating_high_low",
                        "amount": this.state.perPage,
                    }),
                }; 
                await fetch("/api/filter-departmentlist", requestHigh).then((response) => {
                    response.json().then((data) => { //guys im gonna be honest i have no idea what this means just dont touch it 
                        var newMax = parseInt(Math.floor(data.length / this.state.perPage)); 
                        this.setState({ 
                            displayedDepartments: data,
                            maxPage: newMax,
                        });
                    });
                });
                break; 
            case "Rating: High to Low": 
                const requestLow = { 
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({
                        "filter_by":"rating_low_high",
                        "amount": this.state.perPage,
                    }),
                }; 
                await fetch("/api/filter-departmentlist", requestLow).then((response) => {
                    response.json().then((data) => { //guys im gonna be honest i have no idea what this means just dont touch it 
                        var newMax = parseInt(Math.floor(data.length / this.state.perPage)); 
                        this.setState({ 
                            displayedDepartments: data,
                            maxPage: newMax,
                        });
                    });
                });
                break; 
            default:
                await fetch("/api/departments").then((response) => {
                    response.json().then((data) => { //guys im gonna be honest i have no idea what this means just dont touch it 
                        if(this.state.sortOption === "Alphabetical: Z-A"){
                            data = data.reverse(); 
                        }
                        data.slice((page - 1)*this.state.perPage, 
                        (page*this.state.perPage))
                        .map((item) =>{
                            displayEntries.push(item);
                            this.getTopCourse(item.name); 
                            this.getTopInstructor(item.name);
                        }); 
                        var newMax = parseInt(Math.floor(data.length / this.state.perPage)); 
                        this.setState({ 
                            displayedDepartments: displayEntries,
                            maxPage: newMax,
                        });
                    });
                }
            );
                
        }
    };

    changePages(button){
        this.setState({displayedCourses: null, }); 
        var newPage = button.target.innerHTML; 
        switch(newPage){
            case 'First':
                newPage = 1; 
                break;
            case 'Last':
                newPage = this.state.maxPage - 1; 
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
            sortOption: filter.target.innerText,
            displayedCourses: null,
        });
        
        this.getEntries(this.state.currentPage); 
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
                                    <DropdownItem onClick={this.setFilter}> <a style={linkStyle}>Alphabetical: Z-A</a></DropdownItem>
                                    <DropdownItem onClick={this.setFilter}> <a style={linkStyle}>Alphabetical: A-Z</a></DropdownItem>
                                    <DropdownItem onClick={this.setFilter}> <a style={linkStyle}>Rating: High to Low</a></DropdownItem>
                                    <DropdownItem onClick={this.setFilter}> <a style={linkStyle}>Rating: Low to High</a></DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div style={{marginTop:"3%"}}/>
                            <div>
                                <nav aria-label="Page navigation example">
                                    <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
                                        <PaginationItem color="primary">
                                            <PaginationLink onClick={this.changePages} href='#'>
                                                First
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem active>
                                            <PaginationLink onClick={this.changePages} href="#">
                                                {this.state.currentPage}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink onClick={this.changePages} href="#">
                                                {this.state.currentPage + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink onClick={this.changePages} onClick="" href="#">
                                                {this.state.currentPage + 2}
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
                        <Col className="col-md-2"/>
                        <Col className="col-md-8">
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
                                :this.state.displayedDepartments.map((item, index) =>{ {/**5 courses */}
                                    return(
                                    <tr key={index}>  
                                        <th>{(this.state.currentPage - 1)*this.state.perPage + index + 1}</th>
                                        <th><a style={linkStyle} href={"/department/"+item.name}>{item.name}</a></th>
                                        <th><StarRatings
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
                        <Col className="col-md-2"/>
                    </Row>
                    
                </Container>
                    
            </div>
        )
    }
}
