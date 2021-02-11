import React, { Component } from "react";
import List from "../components/List";
import Button from "../components/Button";
import mockCourses from "../data/courses.json";
import { chevronDown } from "react-icons-kit/fa/chevronDown";
import { chevronUp } from "react-icons-kit/fa/chevronUp";
import { minus } from "react-icons-kit/fa/minus";

export default class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: mockCourses.data,
            sortButtons: ["Name", "Rating", "Department", "Courses"],
            sortIndex: "",
            accending: true,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    // TODO: GET profs, courses and departs
    getEntries() {}

    handleClick(e) {
        const newSortIndex = e.target.id.toLowerCase();
        if (newSortIndex == this.state.sortIndex) {
            const accending = !this.state.accending;
            console.log("0", accending, this.state.accending);
            this.setState({ accending: accending }, () =>
                this.sortData(newSortIndex)
            );
        } else {
            this.setState({ sortIndex: newSortIndex }, () =>
                this.sortData(newSortIndex)
            );
            console.log(
                "2",
                newSortIndex,
                this.state.sortIndex,
                this.state.accending
            );
        }
    }

    sortData(sortIndex) {
        this.setState({
            data: this.state.data.sort((a, b) => {
                if ((sortIndex == "name") | (sortIndex == "department")) {
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
    }

    render() {
        return (
            //Body
            <div className="courses-container">
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
