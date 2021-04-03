import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { Spinner, Table, Container, Row, Col, Pagination, PaginationItem, PaginationLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import SecondaryNav from "../components/SecondaryNav";

const linkStyle = {
    color: "black",
    fontSize: "18",
};

export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedCourses: null,
            perPage: 20,
            currentPage: 1,
            maxPage: 1,
            departmentRatings: {},
            sortOption: "Alphabetical: A-Z",
            droppedDown: false,
            loaded: false,
        };
        this.changePages = this.changePages.bind(this);
        this.activateMenu = this.activateMenu.bind(this);
        this.setFilter = this.setFilter.bind(this);
    }

    componentDidMount() {
        this.getEntries();
    }

    getDepartmentRatings = async (name) => {
        await fetch("/api/get-department/?name=" + name)
            .then((response) => {
                if (response.ok) {
                    //yay
                    return response.json();
                } else {
                    //nay
                    return null;
                }
            })
            .then((data) => {
                const deptRatings = this.state.departmentRatings;
                if (data !== null) {
                    deptRatings[name] = data.rating;
                } else {
                    deptRatings[name] = 0;
                }
                this.setState({
                    departmentRatings: deptRatings,
                });
            });
    };

    getEntries = async () => {
        var requestType = () => {
            switch (this.state.sortOption) {
                case "Rating: High to Low":
                case "Rating: Low to High":
                    return "rating_high_low";
                case "Department":
                    return "department";
                default:
                    return "name";
            }
        };

        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                filter_by: requestType(),
            }),
        };

        await fetch("/api/filter-instructorlist/", request).then((response) => {
            response.json().then((data) => {
                if (this.state.sortOption === "Alphabetical: Z-A" || this.state.sortOption === "Rating: Low to High") {
                    data = data.reverse();
                }
                var newMax = parseInt(Math.floor(data.length / this.state.perPage) + 1);
                this.setState({
                    displayedCourses: data,
                    maxPage: newMax,
                });
                this.state.displayedCourses.slice((this.state.currentPage - 1) * this.state.perPage, this.state.currentPage * this.state.perPage).map((item) => {
                    this.getDepartmentRatings(item.department);
                });
            });
        });

        this.setState({
            loaded: true,
        });
    };

    changePages(button) {
        var newPage = button.target.id; //reads the html of the pressed button
        switch (newPage) {
            case "First":
                newPage = 1;
                break;
            case "Last":
                newPage = this.state.maxPage;
                break;
        }
        this.setState({
            displayedCourses: null,
            currentPage: Number(newPage),
        });

        this.getEntries();

        this.setState({
            loaded: true,
        });
    }

    activateMenu() {
        console.log(this.state.droppedDown);
        this.setState({
            droppedDown: !this.state.droppedDown,
        });
    }

    setFilter(filter) {
        this.setState({
            displayedCourses: null,
            sortOption: filter.target.innerText,
            loaded: false,
        });

        this.getEntries();

        this.state.displayedCourses.slice((this.state.currentPage - 1) * this.state.perPage, this.state.currentPage * this.state.perPage).map((item) => {
            this.getDepartmentRatings(item.department);
        });
    }

    render() {
        return (
            <div className="departments-page">
                <SecondaryNav />
                <Container fluid>
                    <Row style={{ marginTop: "2%" }} align="center">
                        <Col>
                            <div className="title">
                                <h1>Instructors</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row align="center">
                        {" "}
                        {/**Filters */}
                        <Col align="center">
                            <div>
                                <h4>Filter Options:</h4>
                            </div>
                            <div>
                                <UncontrolledDropdown className="btn-group">
                                    <DropdownToggle aria-expanded={false} aria-haspopup={true} caret color="info" data-toggle="dropdown" type="button">
                                        {this.state.sortOption}
                                    </DropdownToggle>
                                    <DropdownMenu container="body">
                                        <DropdownItem onClick={this.setFilter}>
                                            {" "}
                                            <a style={linkStyle}>Alphabetical: A-Z</a>
                                        </DropdownItem>
                                        <DropdownItem onClick={this.setFilter}>
                                            {" "}
                                            <a style={linkStyle}>Alphabetical: Z-A</a>
                                        </DropdownItem>
                                        <DropdownItem onClick={this.setFilter}>
                                            {" "}
                                            <a style={linkStyle}>Rating: High to Low</a>
                                        </DropdownItem>
                                        <DropdownItem onClick={this.setFilter}>
                                            {" "}
                                            <a style={linkStyle}>Rating: Low to High</a>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                            <div style={{ marginTop: "3%" }} />
                            <div>
                                <nav aria-label="Page navigation example">
                                    <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
                                        <PaginationItem disabled={this.state.displayedInstructors === null} color="danger">
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
                                        <PaginationItem disabled={this.state.displayedInstructors === null}>
                                            <PaginationLink onClick={this.changePages} href="#" id={this.state.maxPage}>
                                                Last
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </div>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "2%" }} align="center">
                        <Col className="col-md-1" />
                        <Col className="col-md-10">
                            <Table striped>
                                <thead>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Rating</th>
                                    <th>Department</th>
                                    <th>Department Rating</th>
                                </thead>
                                <tbody>
                                    {this.state.displayedCourses === null ? (
                                        <Spinner color="dark" />
                                    ) : (
                                        this.state.displayedCourses.slice((this.state.currentPage - 1) * this.state.perPage, this.state.currentPage * this.state.perPage).map((item, index) => {
                                            {
                                                /**5 courses */
                                            }
                                            return (
                                                <tr key={index}>
                                                    <th>{(this.state.currentPage - 1) * this.state.perPage + index + 1}</th>
                                                    <th>
                                                        <a style={linkStyle} href={"/instructor/" + item.name}>
                                                            {item.name}
                                                        </a>
                                                    </th>
                                                    <th style={{ minWidth: "100px" }}>
                                                        <StarRatings rating={item.rating} starDimension="25px" starSpacing="5px" starRatedColor="#3498db" numberOfStars={5} name="avgRating" />
                                                    </th>
                                                    <th style={{ maxWidth: "220px" }}>
                                                        <a style={linkStyle} href={"/department/" + item.department}>
                                                            {item.department}
                                                        </a>
                                                    </th>
                                                    <th style={{ minWidth: "100px" }}>
                                                        <StarRatings
                                                            rating={this.state.departmentRatings[item.department]}
                                                            starDimension="25px"
                                                            starSpacing="5px"
                                                            starRatedColor="#3498db"
                                                            numberOfStars={5}
                                                            name="avgRating"
                                                        />
                                                    </th>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="col-md-1" />
                    </Row>
                    <div style={{ marginBottom: "3%" }} />
                    <nav aria-label="Page navigation example">
                        <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
                            <PaginationItem disabled={this.state.displayedInstructors === null} color="danger">
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
                            <PaginationItem disabled={this.state.displayedInstructors === null}>
                                <PaginationLink onClick={this.changePages} href="#" id={this.state.maxPage}>
                                    Last
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </nav>
                </Container>
            </div>
        );
    }
}
