import React, { Component } from "react";
import SignupForm from '../components/SignupForm'
import { Button } from "react-bootstrap";
export default class Signup extends Component {
    constructor() {
        super();

        this.hide = this.hide.bind(this);
    }

    hide = () => {
        var x = document.getElementById("helpDIV");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
      }

    render() {
        return ( 
            <div className="page-header section-dark" style={{backgroundImage:'url(https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcou.on.ca%2Fwp-content%2Fuploads%2F2015%2F04%2FBrock-University-Cairns-after-dusk.jpg&f=1&nofb=1)'}}> 
                <div className="content-center">
                        <div className="container">
                        <div className="title-brand">
                            <SignupForm/>
                        </div >
                        <div><Button onClick={this.hide}>Help?</Button></div> 
                        <div id="helpDIV" style={{display: "none", color: "white", border: '10px', backgroundColor:"DodgerBlue", marginTop: '5%', fontWeight: 'bolder', borderRadius:"10px" 
                    }}>
                        <p style = {{fontWeight: "bold"}}>Email: must be a Brock email.</p>
                        <p style = {{fontWeight: "bold"}}>Username: has minimum 4 characters.</p>
                        <p style = {{fontWeight: "bold"}}>Password: has minimum 10 characters, at least one capital & lowercase letter, and a number.</p>
                        </div>
                        <div style={{paddingTop: '10%', textAlign: "center"}}>
                              <Button> <a style={{color:"white", borderColor:"black", border:'10px', fontWeight: "bold", textAlign: "center" }} href="/"> Return Home</a> </Button>
                            </div>
                        </div>
                    </div>
            </div>
    )}
}
