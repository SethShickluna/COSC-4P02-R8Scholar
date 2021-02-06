import React, { Component } from "react";
export default class Rating extends Component {
    constructor() {
        super();
    }

    //TODO: GET ratings depending on type
    getRatings() {
        var rating;
        var id = this.props.id;

        rating = 4.7;

        return rating;
    }

    render() {
        return (
            <div className={this.props.className}>
                <h2>
                    {this.props.title} {this.getRatings()}
                </h2>
            </div>
        );
    }
}
