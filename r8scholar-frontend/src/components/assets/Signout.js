//resets all cookies, signs out, redirect to home 
import React from "react";
import { Component } from "react";
import cookie from 'react-cookies'; 
import { withRouter } from "react-router-dom";

class Signout extends Component{

    constructor(props){ 
        super(props); 
        this.logout(); 
    }
    
    logout(){ 
        cookie.save('isLoggedIn', "false", {path: '/'}); 
        this.props.history.push('/'); 
    }

    render() {
        return (
            <div>
                Logging out
            </div>
        );
    }
}

export default withRouter(Signout); 
