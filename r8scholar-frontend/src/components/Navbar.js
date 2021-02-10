import React, { Component } from "react";
import Button from "./Button";
import Search from "./Search";
import Logo from "./Logo";
import { Link } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            activeIndex: 0, 
        }

        this.buttons = [
            "Login",
            "Professors",
            "Courses",
            "Departments",
            "About",
        ];
    }

    render() {
        return (
            <div className="navbar-container">
                <Link className="navbar-home" to="/">
                    <Logo className="Logo" />
                </Link>
                <Search className="Search" />
                {this.buttons.map((e, index) => {
                    return (
                        <Button
                            id={e}
                            className={"NavButton"}
                            text={e}
                            key={index}
                            link={"/" + e}
                        />
                    );
                })}
            </div>
        );
    }
}
