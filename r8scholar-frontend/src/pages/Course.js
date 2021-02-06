import React, { Component } from "react";
import List from "../components/List";
import Rating from "../components/Rating";
import Button from "../components/Button";

export default class Course extends Component {
    constructor() {
        super();
        this.list = ["professors", "courses", "departments"];
    }

    viewAllEntries(e) {
        console.log("Navigate to page of all " + e.target.id);
    }

    render() {
        return (
            <div className="home-container">
                {this.list.map((e, index) => {
                    return (
                        <div className={"top-" + e}>
                            <h1>{"Top 5 " + e}</h1>
                            <List size="5" id={e} key={index} />
                            <Button
                                id={e}
                                className="listButton"
                                text={"View all " + e}
                                onClick={this.viewAllEntries}
                            />
                        </div>
                    );
                })}
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
