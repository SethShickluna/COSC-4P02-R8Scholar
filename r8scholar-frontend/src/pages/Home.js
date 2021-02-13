import React, { Component } from "react";
import List from "../components/List";
import Rating from "../components/Rating";
import Button from "../components/Button";
import { Icon } from "react-icons-kit";
import { spinner } from "react-icons-kit/fa/spinner";
import mockCourses from "../data/courses.json";
import mockProfessors from "../data/professors.json";
import mockDepartments from "../data/departments.json";
import HomePageCarosel from '../components/HomeCarosel.js'; 


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ["professors", "courses", "departments"],
            professors: [],
            courses: [],
            departments: [],
        };
    }

    // TODO: GET top 5 profs, courses and departs
    getEntries = async (type) => {
        await fetch("http://localhost:3000/data/" + type + ".json").then(
            (res) => {
                res.json().then((data) => {
                    data.data.sort((a, b) => {
                        return b.rating - a.rating;
                    });
                    this.setState({ [type]: data.data.slice(0, 5) });
                });
            }
        );
    };

  
    render() {

        return (
            <div className="home-page">
                <div className="brock-images">
                   <HomePageCarosel/> 
                </div>
                <div className="home-container">
                    //Three top 5 lists
                    this.state.list.map((e, index) => {
                        setTimeout(() => {
                            this.getEntries(e);
                        }, 200);
                        return (
                            <div className="list-container">
                                <h1>{"Top 5 " + e}</h1>
                                {!this.state[e] ? (
                                    <Icon
                                        className="loading"
                                        size="30"
                                        icon={spinner}
                                    />
                                ) : (
                                    <>
                                        <List
                                            data={this.state[e]}
                                            columns={["name", "rating"]}
                                            key={index}
                                            link={
                                                "/" + e.slice(0, e.length - 1)
                                            }
                                        />
                                        <Button
                                            id={e}
                                            className="list-button"
                                            text={"View all " + e}
                                            link={"/" + e}
                                        />
                                    </>
                                )}
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
            </div>
        );
    }
}
