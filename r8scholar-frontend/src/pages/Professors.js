import React, { Component } from "react";
import List from "../components/List";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import mockProfessors from "../data/professors.json";
import { chevronDown } from "react-icons-kit/fa/chevronDown";
import { chevronUp } from "react-icons-kit/fa/chevronUp";
import { chevronLeft } from "react-icons-kit/fa/chevronLeft";
import { chevronRight } from "react-icons-kit/fa/chevronRight";
import { minus } from "react-icons-kit/fa/minus";

export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: mockProfessors.data,
            filters: ["Rating", "Department"],
            options: { Rating: [], Department: [] },
            Rating: null,
            Department: null,
            sortButtons: ["Name", "Rating", "Department", "Courses"],
            sortIndex: "",
            accending: true,
            currentPage: 1,
            maxPage: 10,
        };
    }

    componentDidMount() {
        this.getOptions();
    }

    componentWillUnmount() {
        this.setState({ sortIndex: "", accending: true });
    }

    // TODO: GET profs, courses and departs
    getEntries() {}

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
        };
        this.setState({ options: options });
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
        this.setState({ [field]: value }, () => {
            this.filterData();
        });
    };

    filterData = () => {
        var newData = mockProfessors.data;
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
            this.setState({ data: filteredData }, () => {
                this.sortData(this.state.sortIndex);
            });
        });
    };

    sortData = (sortIndex) => {
        this.setState({
            data: this.state.data.sort((a, b) => {
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
        });
    };

    render() {
        return (
            //Body
            <div className="professors-container">
                {
                    //Filter Buttons
                    <div className="filter-buttons">
                        <div className="filter-label">Filters</div>
                        {this.state.filters.map((e) => {
                            return (
                                <Dropdown
                                    id={e}
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
                }
                {
                    //Navigation Buttons
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
                            {this.state.currentPage + "/" + this.state.maxPage}
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
                }
                {
                    //Sort Buttons
                    <div className="sort-buttons">
                        {this.state.sortButtons.map((e) => {
                            var arrow = minus;
                            if (this.state.sortIndex === e.toLowerCase()) {
                                arrow = this.state.accending
                                    ? (arrow = chevronDown)
                                    : (arrow = chevronUp);
                            }
                            return (
                                <Button
                                    id={e}
                                    className="sort-button"
                                    text={e}
                                    onClick={this.handleClick}
                                    icon={arrow}
                                    iconSize="10"
                                />
                            );
                        })}
                    </div>
                }
                {
                    //List
                    <div className="list-container">
                        <List
                            data={this.state.data}
                            columns={[
                                "name",
                                "courses",
                                "department",
                                "rating",
                            ]}
                            link={"/course"}
                        />
                    </div>
                }
            </div>
        );
    }
}
