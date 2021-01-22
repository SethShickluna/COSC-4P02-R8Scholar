/**
 * 
 * @param {*} email verifies that this email is from brocku.ca
 * @return boolean result of the verification 
 */
function checkEmail(email){ 
    return email.substring(email.length - 10, email.length) === "@brocku.ca"; //determine if the end of an email is within the brocku domain 
}

function determineOutput(email){ 
    if(!checkEmail(email)){ 
        console.log("As of right now only students of Brock University are permitted to sign up. If you have an email address from Brock, please use it. Sorry for the inconvenience."); 
    }else { 
        console.log("Welcome, fellow brock student"); 
    }
    
}


determineOutput("ss16wn@brocku.ca"); 
determineOutput("sethshicklunapiece@gmail.com"); 
