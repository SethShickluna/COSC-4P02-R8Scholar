import React, { Component } from "react";
import List from "../components/List";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import mockCourses from "../data/courses.json";
import { chevronDown } from "react-icons-kit/fa/chevronDown";
import { chevronUp } from "react-icons-kit/fa/chevronUp";
import { chevronLeft } from "react-icons-kit/fa/chevronLeft";
import { chevronRight } from "react-icons-kit/fa/chevronRight";
import { minus } from "react-icons-kit/fa/minus";

export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: mockCourses.data,
            filters: ["Rating", "Department", "Show per page"],
            options: { Rating: [], Department: [], "Show per page": [] },
            Rating: null,
            Department: null,
            "Show per page": null,
            sortButtons: ["Code", "Name", "Rating", "Department"],
            sortIndex: "",
            accending: true,
            perPage: 10,
            currentPage: 1,
            maxPage: 0,
        };
    }

    componentDidMount() {
        this.getOptions();
        this.getEntries();
        if (this.props.location.id) {
            this.handleFilter("Department", this.props.location.id.name);
        }
    }

    componentWillUnmount() {
        this.setState({ sortIndex: "", accending: true });
    }

    // TODO: GET profs, courses and departs
    getEntries() {
        var length = Math.ceil(this.state.data.length / this.state.perPage);
        this.setState({ maxPage: length });
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

    handleClick = (e) => {
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
        this.setState({ [field]: value }, () => {
            this.setState({ currentPage: 1 });
            var newData = mockCourses.data;
            this.setState({ data: newData }, () => {
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

    sortData(sortIndex) {
        this.setState({
            data: this.state.data.sort((a, b) => {
                if (
                    (sortIndex == "name") |
                    (sortIndex == "department") |
                    (sortIndex === "code")
                ) {
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
    }

    render() {
        return (
            //Body
            <div className="courses-container">
                {
                    //Filter Buttons
                    <div className="filter-container">
                        <div className="filter-label">Filters</div>
                        <div className="filter-buttons">
                            {this.state.filters.map((e) => {
                                return (
                                    <Dropdown
                                        id={e}
                                        className="filter-button"
                                        text={e}
                                        options={this.state.options[e]}
                                        icon={chevronDown}
                                        iconSize="12"
                                        handleSelect={this.handleFilter}
                                        selected={this.state[e]}
                                    />
                                );
                            })}
                        </div>
                    </div>
                }
                {
                    //Sort Buttons
                    <div className="sort-buttons">
                        {this.state.sortButtons.map((e) => {
                            var arrow = minus;
                            if (this.state.sortIndex == e.toLowerCase()) {
                                arrow = this.state.accending
                                    ? (arrow = chevronDown)
                                    : (arrow = chevronUp);
                            }
                            return (
                                <>
                                    <Button
                                        id={e}
                                        className="sort-button"
                                        text={e}
                                        onClick={this.handleClick}
                                        icon={arrow}
                                        iconSize="10"
                                    />
                                </>
                            );
                        })}
                    </div>
                }
                {
                    //List
                    <div className="list-container">
                        <List
                            data={this.getCurrentPage()}
                            columns={["code", "rating", "department", "name"]}
                            link={"/course"}
                        />
                    </div>
                }
                {
                    //Navigation Buttons
                    this.state.perPage < this.state.data.length && (
                        <div className="navigation-container">
                            <Button
                                id="navigate-back"
                                className="navigate-button"
                                text=""
                                onClick={this.handleNavigate}
                                icon={chevronLeft}
                                iconSize="12"
                            />
                            <div className="label">
                                {this.state.currentPage +
                                    "/" +
                                    this.state.maxPage}
                            </div>
                            <Button
                                id="navigate-forward"
                                className="navigate-button"
                                text=""
                                onClick={this.handleNavigate}
                                icon={chevronRight}
                                iconSize="12"
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}
