import React, { Component } from "react";
import Button from "./Button";
import Search from "./Search";
import Logo from "./Logo";

export default class Navbar extends Component {
    constructor() {
        super();
    }

    handleClick(e) {
        console.log("Navigate to ", e.target.className);
    }

    render() {
        return (
            <div className="navbar-container">
                <Logo className="Logo" />
                <Search className="Search" />
                <Button className="Login" onClick={this.handleClick} />
                <Button className="Teachers" onClick={this.handleClick} />
                <Button className="Courses" onClick={this.handleClick} />
                <Button className="Departments" onClick={this.handleClick} />
                <Button className="About" onClick={this.handleClick} />
            </div>
        );
    }
}
