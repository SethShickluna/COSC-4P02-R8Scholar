import React, { Component } from "react";
import styled from "styled-components";
import List from "../components/List";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import { chevronDown } from "react-icons-kit/fa/chevronDown";
import { chevronUp } from "react-icons-kit/fa/chevronUp";
import { chevronLeft } from "react-icons-kit/fa/chevronLeft";
import { chevronRight } from "react-icons-kit/fa/chevronRight";
import { minus } from "react-icons-kit/fa/minus";
import Loading from "../components/Loading";

var CoursesContainer = styled.div`
    display: grid;
    grid-auto-flow: row;
    grid-template-areas:
        "Filters"
        "Buttons"
        "List"
        "Navigation";
    width: auto;
    justify-self: center;
    justify-content: center;
`;

const FilterContainer = styled.div`
    display: grid;
    grid-auto-flow: row;
    gap: 20px;
    margin: 50px 0px;

    .filter-buttons {
        display: grid;
        grid-auto-flow: column;
        justify-content: center;
        gap: 50px;
        height: 0px;
    }

    .filter-label {
        font-weight: bolder;
        font-size: larger;
    }

    .filter-buttons .button {
        background-color: #d1d1d1;
        width: 240px;
        text-align: center;
    }

    .dropdown {
        width: 240px;
        z-index: 2;
        background: #fdfdfd;
        box-shadow: 0 16px 24px 10px rgba(0, 0, 0, 0.14);
        padding: 0px 0px;
    }

    .filter-button:hover {
        cursor: pointer;
    }

    .dropdown .dropdown-option {
        font-size: small;
        font-weight: bold;
        text-align: center;
        list-style-type: none;
        padding: 5px 0px;
    }

    .dropdown .dropdown-option:hover {
        background-color: #989898;
        color: #e5e5e5;
        cursor: pointer;
    }
`;

const SortContainer = styled.div`
    grid-area: Buttons;
    display: grid;
    grid-auto-flow: column;
    margin-top: 30px;
    justify-content: space-between;
    .sort-button {
        width: 150px;
        padding: 5px;
        font-weight: bolder;
        font-size: larger;
        text-align: center;
        color: #000000;
    }

    .sort-button:hover {
        cursor: pointer;
    }
`;

const ListContainer = styled.div`
    min-height: 450px;
    grid-area: List;
    width: 900px;
    justify-self: center;
    justify-content: center;
    justify-items: center;

    .listEntry {
        height: 25px;
        min-width: 350px;
        width: 100%;
        background-color: #d1d1d1;
        display: grid;
        grid-template-columns: 1.5fr 4fr 1fr 3.5fr;
        gap: 0px 0px;
        grid-template-areas: "Code Name Rating Department";
        margin-top: 15px;
    }

    .listEntry:hover {
        background-color: #989898;
        color: #d1d1d1;
    }

    .listEntry .code {
        grid-area: Code;
        text-align: left;
        padding-left: 50px;
    }

    .listEntry .department {
        grid-area: Department;
        padding-right: 10px;
        text-align: right;
    }

    .listEntry .rating {
        grid-area: Rating;
        padding-left: 70%;
    }

    .listEntry .name {
        grid-area: Name;
        text-align: center;
    }
`;

const NavigationContainer = styled.div`
    grid-area: Navigation;
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    justify-self: center;
    gap: 5px;

    .label {
        width: 40px;
        text-align: center;
    }

    .navigate-button {
        cursor: pointer;
    }
`;

export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            unfilteredData: [],
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
        this.getEntries(() => {
            if (this.props.location.id) {
                this.handleFilter("Department", this.props.location.id.name);
            }
        });
    }

    // TODO: GET courses
    getEntries = async (callback) => {
        await fetch("http://localhost:3000/data/courses.json").then((res) => {
            res.json().then((data) => {
                this.setState(
                    { data: data.data, unfilteredData: data.data },
                    () => {
                        var length = Math.ceil(
                            this.state.data.length / this.state.perPage
                        );
                        this.setState({ maxPage: length });
                        callback();
                    }
                );
            });
        });
    };

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
            this.setState({ data: this.state.unfilteredData }, () => {
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
    };

    render() {
        return !this.state.data.length ? (
            <Loading size="75" />
        ) : (
            //Body
            <CoursesContainer>
                {
                    //Filter Buttons
                    <FilterContainer>
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
                    </FilterContainer>
                }
                {
                    <SortContainer>
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
                    </SortContainer>
                }
                {
                    <ListContainer>
                        <List
                            data={this.getCurrentPage()}
                            columns={["code", "rating", "department", "name"]}
                            link={"/course/"}
                        />
                    </ListContainer>
                }
                {this.state.perPage < this.state.data.length && (
                    <NavigationContainer>
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
                    </NavigationContainer>
                )}
            </CoursesContainer>
        );
    }
}
