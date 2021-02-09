import React, { Component } from "react";
import List from "../components/List";
import Rating from "../components/Rating";
import Button from "../components/Button";
import mockCourses from "../data/courses.json";
import mockProfessors from "../data/professors.json";
import mockDepartments from "../data/departments.json";

export default class Home extends Component {
    constructor() {
        super();
        this.list = ["professors", "courses", "departments"];
    }

    // TODO: GET top 5 profs, courses and departs
    getEntries(type) {
        var data;
        switch (type) {
            case "professors":
                data = mockProfessors;
                break;
            case "courses":
                data = mockCourses;
                break;
            case "departments":
                data = mockDepartments;
                break;
        }
        var sortIndex = data.cols.indexOf("rating");
        data.data.sort((a, b) => {
            return b[sortIndex] - a[sortIndex];
        });
        data.data = data.data.slice(0, 5);
        return [data.data, data.cols];
    }

    render() {
        return (
            <div className="home-container">
                {this.list.map((e, index) => {
                    var [data, labels] = this.getEntries(e);
                    return (
                        <div className={"top-" + e}>
                            <h1>{"Top 5 " + e}</h1>
                            <div className="top-list-container">
                                <List
                                    data={data}
                                    labels={labels}
                                    key={index}
                                    link={"/" + e.slice(0, e.length - 1)}
                                />
                                <Button
                                    id={e}
                                    className="listButton"
                                    text={"View all " + e}
                                    link={"/" + e}
                                />
                            </div>
                        </div>
                    );
                })}
                {this.list.map((e, index) => {
                    return (
                        <Rating
                            title={
                                "Average " +
                                e.slice(0, e.length - 1) +
                                " rating"
                            }
                            className={"average-" + e}
                            id={e}
                            key={index}
                        />
                    );
                })}
            </div>
        );
    }
}
