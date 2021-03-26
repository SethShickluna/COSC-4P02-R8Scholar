//resets all cookies, signs out, redirect to home 
import React from "react";
import { Component } from "react";
import cookie from 'react-cookies'; 
import { withRouter } from "react-router-dom";
import axiosInstance from "../axiosApi"; 
class Signout extends Component{

    constructor(props){ 
        super(props); 
        this.logout(); 
    }
    
    async logout(){ 
        try {
            const response = await axiosInstance.post('/logout/', {
                "refresh_token": localStorage.getItem("refresh_token")
            });
            cookie.save('isLoggedIn', 'false',{path:'/'});
            cookie.save('email', '',{path:'/'});
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;
            this.props.history.push('/'); 
            return response;
        }
        catch (e) {
            console.log(e);
        }
        
        
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
