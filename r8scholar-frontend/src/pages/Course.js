import React, { Component } from "react";

export default class Course extends Component {6
    constructor(props) {
        super(props);
        //use state because react forces an update when it is modifed in some way 
        this.state = { //all the content that is gonna be retrieved from the api stored here locally
            department: "", 
            code: "", 
            avgRating: "", 
            reviews: null, //reviews would be an object 
            instructors: null, //another object 
            aliases: "", 
        }
       
        this.name = this.props.match.params.courseName; 

        //this.componentDidMount(); 
    }

    //TODO: GET req goes here that fetches data based on uid
    componentDidMount() {
        //this is just to have but will need to be slightly refactored 
        //once we talk to the back end people about how their stuff is named such as 'get-couse'
        fetch('/api/get-course' + '?code=' + this.name)
        .then((response) => response.json())
        .then((data) => {
            this.setState({ // the data.<variable> is just an example and will need to be changed to reflect what the backend returns 
                department: data.department, 
                code: data.code, 
                avgRating: data.avg_rating, 
                reviews: data.reviews, 
                instructors: data.instructors, 
                aliases: data.aliases, 
            });
        }); 
    }

    render() {
        return (
            <div className="course-container">
                Course page for {this.name}.
            </div>
        );
    }
}
