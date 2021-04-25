import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { Spinner, Table, Container, Row, Col, Pagination, PaginationItem, PaginationLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import SecondaryNav from "../components/SecondaryNav";

const linkStyle = {
    color: "black",
};

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: this.props.match.params.query,
            results: [],
            currentPage: 1,
            sortOption: "Alphabetical: A-Z",
            loaded: false,
            perPage: 20, //50 results per page
            maxPage: 1, //DEFAULT MAX 1 PAGE
        };
        this.changePages = this.changePages.bind(this);
    }

    componentDidMount() {
        this.doSearch();
    }

    doSearch = async () => {
        await fetch("/api/search/?search=" + this.state.query).then((response) => {
            response.json().then((data) => {
                var newMax = parseInt(Math.floor(data.length / this.state.perPage) + 1);
                let combinedResults = data.Department.concat(data.Instructor, data.Course); //check this
                if (this.state.sortOption === "Alphabetical: Z-A" || this.state.sortOption === "Rating: Low to High") {
                    combinedResults = combinedResults.reverse();
                }
                var newMax = parseInt(Math.floor(combinedResults.length / this.state.perPage) + 1);
                this.setState({
                    results: combinedResults,
                    maxPage: newMax,
                });
            });
        });

        this.setState({ loaded: true });
    };

    determineType(item) {
        if (item.course_full_name) {
            return "course/" + item.name;
        } else if (item.department) {
            return "instructor/" + item.name;
        }
        return "department/" + item.name;
    }

    getName(item) {
        if (item.course_full_name) {
            return item.course_full_name;
        } else if (item.department) {
            return "Instructor";
        }
        return "Department";
    }

    changePages(button) {
        button.preventDefault();
        var newPage = button.target.id; //reads the id of the pressed button
        this.setState({
            // results : null,//maybe this line is out to not set null
            currentPage: Number(newPage),
        });
    }

    setFilter = (filter) => {
        this.setState({
            sortOption: filter.target.innerText,
            loaded: false,
        });

        this.doSearch();
    };

    render() {
        return (
            <div className="departments-page">
                <SecondaryNav />
                <Container fluid style={{ paddingBottom: "100px" }}>
                    <Row style={{ marginTop: "2%" }} align="center">
                        <Col>
                            <div>
                                <h1 className="title lg">Search Results for {this.state.query}</h1>
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
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>

                            <div style={{ marginTop: "3%" }} />
                            <div>
                                <nav aria-label="Page navigation example">
                                    <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
                                        <PaginationItem disabled={this.state.results === null || this.state.currentPage === 1} color="danger">
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
                                            <PaginationLink href="#" style={{ width: "55px" }} disabled>
                                                {this.state.currentPage}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem disabled={this.state.currentPage + 1 > this.state.maxPage}>
                                            <PaginationLink onClick={this.changePages} href="#" id={this.state.currentPage + 1}>
                                                {">"}
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem disabled={this.state.results === null || this.state.currentPage == this.state.maxPage}>
                                            <PaginationLink onClick={this.changePages} href="#" id={this.state.maxPage}>
                                                Last
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>
                            </div>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: "3%", marginBottom: "3%" }} align="center">
                        <Col className="col-md-1" />
                        <Col className="col-md-10">
                            <Table striped style={{ textAlign: "center" }}>
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
                                                    <th>
                                                        <a style={linkStyle} href={"/" + this.determineType(item)}>
                                                            {item.name}
                                                        </a>
                                                    </th>

                                                    <th>{this.getName(item)}</th>

                                                    <th style={{ minWidth: "100px" }}>
                                                        <StarRatings rating={item.rating} starDimension="25px" starSpacing="5px" starRatedColor="#3498db" numberOfStars={5} name="avgRating" />
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
                    <div>
                        <nav aria-label="Page navigation example">
                            <Pagination className="pagination justify-content-center" listClassName="justify-content-center">
                                <PaginationItem disabled={this.state.results === null || this.state.currentPage === 1} color="danger">
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
                                    <PaginationLink href="#" style={{ width: "55px", textAlign: "center" }} disabled="true">
                                        {this.state.currentPage}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem disabled={this.state.currentPage + 1 > this.state.maxPage}>
                                    <PaginationLink onClick={this.changePages} href="#" id={this.state.currentPage + 1}>
                                        {">"}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem disabled={this.state.results === null || this.state.currentPage == this.state.maxPage}>
                                    <PaginationLink onClick={this.changePages} href="#" id={this.state.maxPage}>
                                        Last
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </nav>
                    </div>
                </Container>
            </div>
        );
    }
}
