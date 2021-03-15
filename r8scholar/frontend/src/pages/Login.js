import React, { Component } from "react";
import LoginForm from '../components/LoginForm'

const formStyle = {
    alignItems: 'center', 
    justifyContent: 'center',
    display: 'flex', 
    marginTop: '8%',
}

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
                            <div style={{paddingTop: '25%'}}>
                                <h2 className="presentation-subtitle text-center"><a style={{color:"white", borderColor:"black", border:'10px', fontWeight: "bold" }}href="/">Return Home</a></h2>
                            </div>
                        </div>
                    </div>
            </div>
        )}
}
