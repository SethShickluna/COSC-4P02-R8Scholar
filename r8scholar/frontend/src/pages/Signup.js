import React, { Component } from "react";
import SignupForm from '../components/SignupForm'
export default class Signup extends Component {
    constructor() {
        super();
    }

    render() {
        return ( 
            <div className="page-header section-dark" style={{backgroundImage:'url(https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcou.on.ca%2Fwp-content%2Fuploads%2F2015%2F04%2FBrock-University-Cairns-after-dusk.jpg&f=1&nofb=1)'}}> 
                <div className="content-center">
                        <div className="container">
                        <div className="title-brand">
                            <SignupForm/>
                        </div>
                           <b> <h2 className="presentation-subtitle text-center"><a style={{marginTop: '20px',color:"white", borderColor:"black", border:'10px', fontWeight: "bold" }}href="/">Return Home</a></h2></b>
                        </div>
                    </div>
            </div>
    )}
}
