import React, { Component } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Loading from "../components/Loading";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                            STYLES
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const DepartmentsContainer = styled.div`
    padding-top: 80px;
    display: grid;
    grid-auto-flow: row;
    justify-content: center;
`;

const DepartmentContainer = styled.div`
    position: relative;
    text-align: left;
    width: 700px;

    .label {
        grid-area: label;
        font-size: 250%;
        font-weight: 500;
        display: grid;
        grid-auto-flow: column;
    }

    .rating {
        justify-self: right;
    }
`;

const DepartmentInfoContainer = styled.div`
    grid-area: info;
    display: grid;
    grid-template-areas:
        "avgProf topProf buttonProfessors"
        "avgCourse topCourse buttonCourses";
    margin-top: 30px;
    margin-bottom: 50px;
    gap: 15px 0px;
    font-size: 110%;
    width: 100%;

    .professors-button {
        grid-area: buttonProfessors;
        background-color: #d1d1d1;
        justify-self: right;
        max-width: fit-content;
        padding: 0px 10px;
    }

    .courses-button {
        grid-area: buttonCourses;
        background-color: #d1d1d1;
        justify-self: right;
        max-width: fit-content;
        padding: 0px 10px;
    }

    .topProfessor {
        grid-area: topProf;
        text-align: center;
    }

    .avgCourse {
        grid-area: avgCourse;
    }

    .topCourse {
        grid-area: topCourse;
        text-align: center;
    }

    .topProfessor:hover,
    .topCourse:hover,
    .courses-button:hover,
    .professors-button:hover {
        background-color: #989898;
        color: #d1d1d1;
    }
`;

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
            <DepartmentsContainer>
                {this.state.data.map((e) => {
                    return (
                        <DepartmentContainer>
                            <div className="label">
                                <div className="name">{e.name}</div>
                                <div className="rating">{e.rating}</div>
                            </div>
                            <DepartmentInfoContainer>
                                <div className="avgProfessor">
                                    {"Average professor rating " +
                                        e.avgProfessorRating}
                                </div>
                                <Button
                                    id={e.topProfessor}
                                    className="topProfessor"
                                    text={"Top professor " + e.topProfessor}
                                    link={"/Professor/" + e.topProfessor}
                                />
                                <Button
                                    id={e}
                                    className={"professors-button"}
                                    text="View All"
                                    link={{
                                        pathname: "/Professors/",
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
                                    link={"/Course/" + e.topCourse}
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
                            </DepartmentInfoContainer>
                        </DepartmentContainer>
                    );
                })}
            </DepartmentsContainer>
        );
    }
}
