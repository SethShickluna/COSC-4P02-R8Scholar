import React, { Component } from "react";

export default class Department extends Component {
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
            <div className="department-container">
                Here be a Departmnet with id of {this.id}.
            </div>
        );
    }
}
