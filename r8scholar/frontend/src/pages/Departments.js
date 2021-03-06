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
           instructors: {}, 
           courses: {},
        };

        console.log(this.state);
    }

    componentDidMount() {
        setTimeout(() => {
            this.getEntries();
        }, 200);
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

    // TODO: GET departs
    getEntries = async() => {//this fetches the courses, implement the same for instructors and departments 
        await fetch("/api/departments").then(
            (res) => {
                res.json().then((data) => {
                    const newEntry = []
                    data.map((item) =>{
                        newEntry.push(item);
                        this.getTopCourse(item.name);
                        this.getTopInstructor(item.name);
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
