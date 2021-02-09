import React, { Component } from "react";

export default class About extends Component {
    constructor() {
        super();
        this.list = ["professors", "courses", "departments"];
    }

    render() {
        return <div className="about-container">Here be the about page.</div>;
    }
}
