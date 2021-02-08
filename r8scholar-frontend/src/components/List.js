import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";

export default class List extends Component {
    constructor() {
        super();
        this.list = [
            { text: "Entry1", id: "1" },
            { text: "Entry2", id: "2" },
            { text: "Entry3", id: "3" },
            { text: "Entry4", id: "4" },
            { text: "Entry5", id: "5" },
        ];
    }

    // TODO: GET top 5 profs, courses and departs
    getEntries() {
        return this.list.map((e, index) => (
            <Link className="listEntry" to={this.props.link}>
                {this.props.id + " " + e.text}
            </Link>
        ));
    }

    render() {
        const entries = this.getEntries();
        return entries;
    }
}
