import React, { Component } from "react";
import List from "../components/List";
import Rating from "../components/Rating";
import Button from "../components/Button";
import HomePageCarosel from "../components/HomeCarosel.js";
import Loading from "../components/Loading";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ["instructors", "courses", "departments"],
            instructors: [],
            courses: [],
            departments: [],
        };
    }

    componentDidMount(){
        this.state.list.map((e) => {
            this.getEntries(e);
        });
    }

    // TODO: GET top 5 profs, courses and departs
    getEntries = async(type) => {//this fetches the courses, implement the same for instructors and departments 
        await fetch("/api/"+type).then(
            (res) => {
                res.json().then((data) => {
                    const newEntry = []
                    data.map((item) =>{
                        newEntry.push(item);
                    })
                    this.setState({ [type]: newEntry});
                });
            }
        );
    };

    render() {
        return (
            <div className="home-page">
                <div className="brock-images">
                    <HomePageCarosel />
                </div>
                {!this.state.courses.length &&
                !this.state.departments.length &&
                !this.state.instructors.length ? (
                    <Loading size="75" />
                ) : (
                    <div className="home-container">
                        {this.state.list.map((e, index) => {
                            return (
                                <div className="list-container">
                                    <h1>{"Top 5 " + e}</h1>
                                    <List
                                        data={this.state[e]}
                                        columns={["name", "rating"]}
                                        key={index+e}
                                        link={"/" + e.slice(0, e.length - 1) + "/"}
                                    />
                                    <Button
                                        id={e}
                                        className="list-button"
                                        text={"View all " + e}
                                        link={"/" + e}
                                    />
                                </div>
                            );
                        })}
                        {this.state.list.map((e, index) => {
                            return (
                                <Rating
                                    title={
                                        "Average " +
                                        e.slice(0, e.length - 1) +
                                        " rating"
                                    }
                                    className={"average-" + e}
                                    id={e}
                                    key={index+e}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}
