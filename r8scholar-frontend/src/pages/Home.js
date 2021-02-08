import React, { Component } from "react";
import List from "../components/List";
import Rating from "../components/Rating";
import Button from "../components/Button";

export default class Home extends Component {
    constructor() {
        super();
        this.list = ["professors", "courses", "departments"];
    }

    render() {
        return (
            <div className="home-container">
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
