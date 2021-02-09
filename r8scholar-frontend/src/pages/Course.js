import React, { Component } from "react";

export default class Course extends Component {
    constructor(props) {
        super(props);
        this.id = props.location.id;
    }

    //TODO: GET req goes here that fetches data based on uid
    componentDidMount() {
        this.data = [];
    }

    render() {
        return (
            <div className="course-container">
                Here be a Course with id of {this.id}.
            </div>
        );
    }
}
