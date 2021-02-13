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

        this.state = { 
            loggedIn: false,  
        }

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
                <Button id={this.state.loggedIn? "account" : "login"} 
                    className="NavButton"
                    text={this.state.loggedIn? "Account" : "Login"}
                    key={this.state.loggedIn? 98 : 97} 
                    link={this.state.loggedIn? "/account" : "/login"}
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
                <Button id={this.state.loggedIn ? "signout" : "signup"} 
                    className="NavButton"
                    text={this.state.loggedIn ? "Sign Out" : "Create Account"}
                    key={this.state.loggedIn ? 99 : 100} 
                    link={this.state.loggedIn ? "/" : "/signup"}
                   
                ><button function={this.handleInput}/></Button>
            </div>
        );
    }
}

export default withRouter(Navbar); 
