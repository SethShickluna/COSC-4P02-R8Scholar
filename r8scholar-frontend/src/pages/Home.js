import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import List from "../components/List";
import Rating from "../components/Rating";
import Button from "../components/Button";
import Course from "./Course";
import Courses from "./Courses";
import Teachers from "./Teachers";
import Departments from "./Departments";

export default class Home extends Component {
    constructor() {
        super();
        this.list = ["professors", "courses", "departments"];
    }

    render() {
        return (
            <div className="home-container">
                <Router>
                    {this.list.map((e, index) => {
                        return (
                            <div className={"top-" + e}>
                                <h1>{"Top 5 " + e}</h1>
                                <div className="top-list-container">
                                    <List
                                        size="5"
                                        id={e}
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
                    <Switch>
                        <Router
                            path="/teachers"
                            exact
                            component={() => <Teachers />}
                        />
                        <Router
                            path="/courses"
                            exact
                            component={() => <Courses />}
                        />
                        <Router
                            path="/departments"
                            exact
                            component={() => <Departments />}
                        />
                    </Switch>
                </Router>
                {this.list.map((e, index) => {
                    return (
                        <Rating
                            title={"Average " + e + " Rating"}
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
