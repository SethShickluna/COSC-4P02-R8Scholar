import React, { Component } from "react";
import styled from "styled-components";
import List from "../components/List";
import Button from "../components/Button";
import HomePageCarosel from "../components/HomeCarosel.js";
import Loading from "../components/Loading";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                            STYLES
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const ListContainer = styled.div`
    padding: 0px;
    width: 400px;
    .label {
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        margin: 100px 0px 50px 0px;
    }

    .listEntry {
        margin-bottom: 10px;
        background-color: #d1d1d1;
        display: grid;
        grid-template-columns: 6fr 1fr;
        grid-template-areas: "Name" "Rating";
    }

    .listEntry:hover {
        background-color: #989898;
        color: #e5e5e5;
        cursor: pointer;
    }

    .name {
        text-align: left;
        padding-left: 10px;
    }

    .rating {
        text-align: right;
        padding-right: 10px;
    }
`;

const ViewAllContainer = styled.div`
    text-align: -webkit-center;
    margin-top: 50px;
    .view-all {
        display: grid;
        width: 175px;
        background-color: #989898;
        padding: 7px;
    }

    .view-all:hover {
        color: #e5e5e5;
    }
`;

const ListsContainer = styled.div`
    grid-area: Lists;
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    gap: 0px 100px;
`;

const AverageRatingContainer = styled.div`
    grid-area: Rating;
    display: grid;
    grid-auto-flow: row;
    .label {
        font-size: 45px;
        font-weight: bold;
        text-align: center;
    }
`;

const HomeContainer = styled.div`
    display: grid;
    grid-template-rows: 3fr 1fr;
    grid-template-areas:
        "Lists"
        "Rating";
    width: auto;
`;

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

    componentDidMount() {
        this.state.list.map((e) => {
            this.getEntries(e);
        });
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

    ifDataLoading = () => {
        return (
            !this.state.courses.length &&
            !this.state.departments.length &&
            !this.state.professors.length
        );
    };

    render() {
        return (
            <>
                <div className="brock-images">
                    <HomePageCarosel />
                </div>
                {this.ifDataLoading() ? (
                    <Loading size="75" />
                ) : (
                    <HomeContainer>
                        <ListsContainer>
                            {this.state.list.map((e, index) => {
                                return (
                                    <ListContainer>
                                        <h1 className="label">
                                            {"Top 5 " + e}
                                        </h1>
                                        <List
                                            data={this.state[e]}
                                            className="list-entry"
                                            columns={["name", "rating"]}
                                            key={index}
                                            link={
                                                "/" +
                                                e.slice(0, e.length - 1) +
                                                "/"
                                            }
                                        />
                                        <ViewAllContainer>
                                            <Button
                                                id={e}
                                                className="view-all"
                                                text={"View all " + e}
                                                link={"/" + e}
                                            />
                                        </ViewAllContainer>
                                    </ListContainer>
                                );
                            })}
                        </ListsContainer>
                        <AverageRatingContainer>
                            {this.state.list.map((e) => {
                                return (
                                    <div className={"average-" + e}>
                                        <div className="label">
                                            {"Average " +
                                                e.slice(0, e.length - 1) +
                                                " Rating 4.7"}
                                        </div>
                                    </div>
                                );
                            })}
                        </AverageRatingContainer>
                        ;
                    </HomeContainer>
                )}
            </>
        );
    }
}
