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
                data = mockProfessors.data;
                break;
            case "courses":
                data = mockCourses.data;
                break;
            case "departments":
                data = mockDepartments.data;
                break;
        }
        data.sort((a, b) => {
            return b.rating - a.rating;
        });
        return data.slice(0, 5);
    }

    render() {
        return (
            //Body
            <div className="home-container">
                {
                    //Three top 5 lists
                    this.list.map((e, index) => {
                        return (
                            <div className="list-container">
                                <h1>{"Top 5 " + e}</h1>
                                <List
                                    data={this.getEntries(e)}
                                    columns={["name", "rating"]}
                                    key={index}
                                    link={"/" + e.slice(0, e.length - 1)}
                                />
                                <Button
                                    id={e}
                                    className="list-button"
                                    text={"View all " + e}
                                    link={"/" + e}
                                />
                            </div>
                        );
                    })
                }
                {
                    //Average ratings
                    this.list.map((e, index) => {
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
                    })
                }
            </div>
        );
    }
}
