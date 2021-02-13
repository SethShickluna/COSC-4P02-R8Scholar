import React, { Component } from "react";
import Button from "./Button";
import Search from "./Search";
import Logo from "./Logo";
import { Link, withRouter } from "react-router-dom";
import cookie from 'react-cookies'; 
//import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.buttons = [
            "Professors",
            "Courses",
            "Departments",
            "About",
        ];

        this.handleInput = this.handleInput.bind(this); 
    }


    handleInput = () => { 
        console.log("is this working"); 
        
    }

    render() {
        return (
            <div className="navbar-container">
                <Link className="navbar-home" to="/">
                    <Logo className="Logo" />
                </Link>
                <Search className="Search" />
                <Button id={cookie.load('isLoggedIn') === "true" ? "account" : "login"} 
                    className="NavButton"
                    text={cookie.load('isLoggedIn') === "true"? "Account" : "Login"}
                    key={cookie.load('isLoggedIn') === "true"? 98 : 97} 
                    link={cookie.load('isLoggedIn') === "true"? "/account" : "/login"}
                />
                {this.buttons.map((e, index) => {
                    return (
                        <Button
                            id={e}
                            className={"NavButton"}
                            text={e}
                            key={index+1}
                            link={"/" + e}
                        />
                    );
                })}
                <Button id={cookie.load('isLoggedIn') === "true" ? "signout" : "signup"} 
                    className="NavButton"
                    text={cookie.load('isLoggedIn') === "true" ? "Sign Out" : "Create Account"}
                    key={cookie.load('isLoggedIn') === "true" ? 99 : 100} 
                    link={cookie.load('isLoggedIn') === "true" ? "/signout" : "/signup"}
                   
                ><button function={this.handleInput}/></Button>
            </div>
        );
    }
}

export default withRouter(Navbar); 
