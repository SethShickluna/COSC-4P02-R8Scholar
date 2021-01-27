import React from 'react'; 
import {Link} from 'react-router-dom';
import LoginForm from './assets/LoginForm'; 

const formStyle = {
    alignItems: 'center', 
    justifyContent: 'center',
    display: 'flex', 
    marginTop: '6%',
}

function Login () {
    return (
        <div>
            <div id="login-form" style={formStyle}>
                <LoginForm />
            </div>
            <div style={formStyle}>
                <p>Don't have an account?<Link to='/signup'> Create one here </Link> (Brock email required).</p>
            </div>
        </div>
    ); 
}

export default Login; 