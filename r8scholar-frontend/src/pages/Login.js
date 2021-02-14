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
            <div style={formStyle}>
                <LoginForm/>            
            </div>
        )}
}
