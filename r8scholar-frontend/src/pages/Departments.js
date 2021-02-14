import React, { Component } from "react";
import Button from "../components/Button";
import Loading from "../components/Loading";

export default class Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.getEntries();
        }, 1000);
    }

    // TODO: GET departs
    getEntries = async () => {
        await fetch("http://localhost:3000/data/departments.json").then(
            (res) => {
                res.json().then((data) => {
                    this.setState({ data: data.data });
                });
            }
        );
    };

    render() {
        return !this.state.data.length ? (
            <Loading size="75" />
        ) : (
            <div className="departments-container">
                {this.state.data.map((e) => {
                    return (
                        <div className="department-container">
                            <div className="label">
                                <div className="name">{e.name}</div>
                                <div className="rating">{e.rating}</div>
                            </div>
                            <div className="department-info">
                                <div className="avgProfessor">
                                    {"Average professor rating " +
                                        e.avgProfessorRating}
                                </div>
                                <Button
                                    id={e.topProfessor}
                                    className="topProfessor"
                                    text={"Top professor " + e.topProfessor}
                                    link="/Professor"
                                />
                                <Button
                                    id={e}
                                    className={"professors-button"}
                                    text="View All"
                                    link={{
                                        pathname: "/Professors",
                                        id: e,
                                    }}
                                />
                                <div className="avgCourse">
                                    {"Average course rating " +
                                        e.avgCourseRating}
                                </div>
                                <Button
                                    id={e.topCourse}
                                    className="topCourse"
                                    text={"Top course " + e.topCourse}
                                    link={"/Course"}
                                />
                                <Button
                                    id={e}
                                    className={"courses-button"}
                                    text="View All"
                                    link={{
                                        pathname: "/Courses",
                                        id: e,
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
