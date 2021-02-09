import React, { Component } from "react";
import List from "../components/List";
import Rating from "../components/Rating";
import Button from "../components/Button";

export default class Home extends Component {
    constructor() {
        super();
        this.list = ["professors", "courses", "departments"];
    }

    // TODO: GET top 5 profs, courses and departs
    getEntries() {
        return {
            uid1: { name: "Entry1", rating: "4.7" },
            uid2: { name: "Entry2", rating: "4.7" },
            uid3: { name: "Entry3", rating: "4.7" },
            uid4: { name: "Entry4", rating: "4.7" },
            uid5: { name: "Entry5", rating: "4.7" },
        };
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
                                    data={this.getEntries()}
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
