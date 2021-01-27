import React from 'react'; 
import {Form, Button} from 'react-bootstrap'; 
import SignupForm from './assets/SignupForm';



const formStyle = {
    alignItems: 'center', 
    justifyContent: 'center',
    display: 'flex', 
    marginTop: '6%',
}

function Signup () {
    return (
        <div>
            <div id="signup-form" style={formStyle}>
                <SignupForm />
            </div>
            
        </div>
    ); 
}

export default Signup; 