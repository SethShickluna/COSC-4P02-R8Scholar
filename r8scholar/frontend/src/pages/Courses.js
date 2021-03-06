import React, { Component } from "react";
import StarRatings from 'react-star-ratings'; 
import {Spinner, Table, Container, Row, Col} from 'reactstrap';
import SecondaryNav from "../components/SecondaryNav";

const linkStyle = {
    color: 'black',
}


export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            unfilteredData: [],
            filters: ["Rating", "Department", "Show per page"],
            options: { Rating: [], Department: [], "Show per page": [] },
            Rating: null,
            Department: null,
            "Show per page": null,
            sortButtons: ["Name", "Rating", "Department", "Courses"],
            sortIndex: "",
            accending: true,
            perPage: 10,
            currentPage: 1,
            maxPage: 0,
            departmentRatings:{}
        };
        console.log(this.state); 
    }

    componentDidMount() {
        this.getOptions();
        this.getEntries().then(() => {
            this.getDepartmentRatings(); 
        }); 
    }

    // TODO: GET profs
    getEntries = async() => {//this fetches the courses, implement the same for instructors and departments 
        await fetch("/api/courses").then((response) => {
                response.json().then((data) => {
                    const newEntry = []
                    data.map((item) =>{
                        newEntry.push(item);
                        this.getDepartmentRatings(item.department);
                    })
                    this.setState({ entries: newEntry});
                });
            }
        );
    };

    getDepartmentRatings = async(name) => { 
        await fetch("/api/get-department?name="+name).then((response) => {
            if(response.ok){ //yay
                return response.json(); 
            }else{//nay 
                return null
            }
        })
        .then((data) =>{
            console.log(data);
            const deptRatings = this.state.departmentRatings;
            if(data !== null){
                deptRatings[name]=data.rating;
            }else{
                deptRatings[name]=0;
            }
            this.setState({
                departmentRatings: deptRatings,
            });
        }
    );
    }

    getOptions = () => {
        var options = {
            Rating: [
                "4.0 and higher",
                "3.0 and higher",
                "2.0 and higher",
                "1.0 and higher",
                "All Ratings",
            ],
            Department: [
                "Humanities",
                "Math and Computer Science",
                "Social Sciences",
                "Visual and Performance Arts",
                "Goodman School of Business",
                "Applied Health Sciences",
                "Education",
                "All Departments",
            ],
            "Show per page": ["10", "20", "50", "100", "All"],
        };
        this.setState({ options: options });
    };

    getCurrentPage = () => {
        if (this.state.perPage === "All") {
            return this.state.data;
        } else {
            var minIndex = (this.state.currentPage - 1) * this.state.perPage;
            var maxIndex = this.state.currentPage * this.state.perPage;
            return this.state.data.slice(minIndex, maxIndex);
        }
    };

    handleNavigate = (e) => {
        if (e.target.id === "navigate-back" && this.state.currentPage > 1) {
            this.setState((old) => {
                return { currentPage: old.currentPage - 1 };
            });
        }
        if (
            e.target.id === "navigate-forward" &&
            this.state.currentPage < this.state.maxPage
        ) {
            this.setState((old) => {
                return { currentPage: old.currentPage + 1 };
            });
        }
    };

    handleSort = (e) => {
        const newSortIndex = e.target.id.toLowerCase();
        if (newSortIndex === this.state.sortIndex) {
            const accending = !this.state.accending;
            this.setState({ accending: accending }, () =>
                this.sortData(newSortIndex)
            );
        } else {
            this.setState({ sortIndex: newSortIndex }, () =>
                this.sortData(newSortIndex)
            );
        }
    };

    handleFilter = (field, value) => {
        if (field === "Show per page") {
            this.setState({ perPage: value });
        }
        console.log(this.state.data, this.state.unfilteredData);
        this.setState({ [field]: value }, () => {
            this.setState({ data: this.state.unfilteredData }, () => {
                console.log(this.state.data, this.state.unfilteredData);
                var filteredData = [];
                this.state.data.forEach((e) => {
                    if (
                        (e.department === this.state.Department) |
                            ((this.state.Department === "All Departments") |
                                !this.state.Department) &&
                        (e.rating >= parseFloat(this.state.Rating)) |
                            ((this.state.Rating === "All Ratings") |
                                !this.state.Rating)
                    ) {
                        filteredData.push(e);
                    }
                });
                var newMaxPage = Math.ceil(
                    filteredData.length / this.state.perPage
                );
                this.setState(
                    { data: filteredData, maxPage: newMaxPage },
                    () => {
                        this.sortData(this.state.sortIndex);
                    }
                );
            });
        });
    };

    sortData = (sortIndex) => {
        this.setState({
            entries: this.state.entries.sort((a, b) => {
                if ((sortIndex === "name") | (sortIndex === "department")) {
                    if (this.state.accending) {
                        return a[sortIndex].localeCompare(b[sortIndex]);
                    } else {
                        return b[sortIndex].localeCompare(a[sortIndex]);
                    }
                } else {
                    if (this.state.accending) {
                        return a[sortIndex] - b[sortIndex];
                    } else {
                        return b[sortIndex] - a[sortIndex];
                    }
                }
            }),
            currentPage: 1,
        });
    };

    render() {
        return(
        <div className="departments-page">
                <SecondaryNav/>
                <Container fluid>
                    <Row style={{marginTop:'2%'}} align="center">
                        <Col>
                            <div className="title">
                                <h1>Courses</h1>
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
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Rating</th>
                                    <th>Department</th>
                                    <th>Department Rating</th>
                               </thead>
                               <tbody>
                                   {!this.state.entries.length ? 
                                   <Spinner color="dark"/>
                                :this.state.entries.map((item, index) =>{ {/**5 courses */}
                                    return(
                                    <tr key={index}>  
                                        <th>{index + 1}</th>
                                        <th><a style={linkStyle} href={"/course/"+item.name}>{item.name}</a></th>
                                        <th><StarRatings
                                            rating={item.rating}
                                            starDimension="25px"
                                            starSpacing="5px"
                                            starRatedColor="#3498db"
                                            numberOfStars={5}
                                            name='avgRating'/>
                                        </th>
                                        <th><a style={linkStyle} href={"/department/"+item.name}>{item.department}</a></th>
                                        <th><StarRatings
                                            rating={this.state.departmentRatings[item.department]}
                                            starDimension="25px"
                                            starSpacing="5px"
                                            starRatedColor="#3498db"
                                            numberOfStars={5}
                                            name='avgRating'/>
                                        </th>
                                    </tr>)
                                })}
                               </tbody>
                           </Table>
                        </Col>
                        <Col className="col-md-2"/>
                    </Row>
                    
                </Container>
                    
            </div>
        )}
}
