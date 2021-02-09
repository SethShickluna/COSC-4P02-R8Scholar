import React, { Component } from "react";

export default class Professor extends Component {
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
            <div className="professor-container">
                Here be a Professor with id of {this.id}.
            </div>
        );
    }
}
