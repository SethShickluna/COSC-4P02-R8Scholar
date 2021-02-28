import React, { Component } from "react";
import SignupForm from '../components/SignupForm'

const formStyle = {
    alignItems: 'center', 
    justifyContent: 'center',
    display: 'flex', 
    marginTop: '8%',
}

export default class Signup extends Component {
    constructor() {
        super();
    }

    render() {
        return ( 
            <div style={formStyle}>
                <SignupForm/>            
            </div>
    )}
}
