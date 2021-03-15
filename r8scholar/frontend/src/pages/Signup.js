import React, { Component } from "react";
import SignupForm from '../components/SignupForm'
import { Button } from "react-bootstrap";
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
                        </div >
                        <div style={{paddingTop: '10%', textAlign: "center"}}>
                              <Button> <a style={{color:"white", borderColor:"black", border:'10px', fontWeight: "bold", textAlign: "center" }} href="/"> Return Home</a> </Button>
                            </div>
                        </div>
                    </div>
            </div>
    )}
}
