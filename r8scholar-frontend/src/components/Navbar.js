import React, { Component } from "react";
import Button from "./Button";
import Search from "./Search";
import { withRouter } from "react-router-dom";
import cookie from "react-cookies";
import styled from "styled-components";
import Logo from "./assets/Logo";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                            STYLES
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const NavbarContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 5fr;
    grid-template-rows: 10fr;
    gap: 0px 0px;
    grid-template-areas: "Logo Search NavButtons";
    width: auto;
    height: 50px;
`;

const NavButtons = styled.div`
    grid-area: NavButtons;
    display: grid;
    grid-auto-flow: column;
    .nav-button {
        background-color: #989898;
        padding: 10px;
        font-style: normal;
        font-size: 20px;
        text-align: center;
        color: #fdfdfd;
        min-width: 170px;
    }

    .nav-button:hover {
        background-color: #888686;
        color: #fdfdfd;
        cursor: pointer;
    }
`;

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.buttons = ["Professors", "Courses", "Departments", "About"];
    }

    render() {
        return (
            <NavbarContainer>
                <Logo />
                <Search className="Search" />
                <NavButtons>
                    <Button
                        id={
                            cookie.load("isLoggedIn") === "true"
                                ? "account"
                                : "login"
                        }
                        className="nav-button"
                        text={
                            cookie.load("isLoggedIn") === "true"
                                ? "Account"
                                : "Login"
                        }
                        key={cookie.load("isLoggedIn") === "true" ? 98 : 97}
                        link={
                            cookie.load("isLoggedIn") === "true"
                                ? "/account"
                                : "/login"
                        }
                    />
                    {this.buttons.map((e, index) => {
                        return (
                            <Button
                                id={e}
                                className="nav-button"
                                text={e}
                                key={index + 1}
                                link={"/" + e}
                            />
                        );
                    })}
                    <Button
                        id={
                            cookie.load("isLoggedIn") === "true"
                                ? "signout"
                                : "signup"
                        }
                        className="nav-button"
                        text={
                            cookie.load("isLoggedIn") === "true"
                                ? "Sign Out"
                                : "Create Account"
                        }
                        key={cookie.load("isLoggedIn") === "true" ? 99 : 100}
                        link={
                            cookie.load("isLoggedIn") === "true"
                                ? "/signout"
                                : "/signup"
                        }
                    ></Button>
                </NavButtons>
            </NavbarContainer>
        );
    }
}

export default withRouter(Navbar);
