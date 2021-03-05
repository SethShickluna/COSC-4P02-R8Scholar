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
        const request = { 
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({
                email: cookie.load("email"), 
            }),
        }; 
        fetch("/api/logout", request)
        .then((Response) => {
            if(Response.ok){//clear cookies and logout 
                cookie.save('isLoggedIn', 'false',{path:'/'});
                cookie.save('email', '',{path:'/'});
                this.props.history.push('/'); 
            }else{
                //idk why this would ever go off
            }
        }); 
        
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
