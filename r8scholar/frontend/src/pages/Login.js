import React, { Component } from "react";
import { Button } from "react-bootstrap";
import LoginForm from '../components/LoginForm'


export default class Login extends Component {
    constructor() {
        super();

    }  

    render() {
        return ( 
            <div className="page-header section-dark" style={{backgroundImage:'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrocku.ca%2Fbrock-news%2Fwp-content%2Fuploads%2F2016%2F02%2FBrockAerial1-1600x900.jpg&f=1&nofb=1)'}}> 
                <div className="content-center">
                        <div className="container">
                        <div className="title-brand">
                            <LoginForm/>
                        </div> 
                            <div style={{paddingTop: '25%', textAlign: "center"}}>
                              <Button> <a style={{color:"white", borderColor:"black", border:'10px', fontWeight: "normal", textAlign: "center" }} href="/"> Return Home</a> </Button>
                            </div>
                        </div>
                    </div>
            </div>
        )}
}
