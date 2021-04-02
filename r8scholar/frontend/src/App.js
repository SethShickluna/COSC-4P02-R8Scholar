//node_modules
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, {Component} from "react";
import {render} from 'react-dom'; 

//css
import "./assets/styles/bootstrap.min.css";
import "./assets/styles/paper-kit.css";
import "./assets/styles/demo.css";

//pages
import Login from "./pages/Login";
import Departments from "./pages/Departments";
import Department from "./pages/Department";
import Home from "./pages/Home";
import Instructors from "./pages/Instructors";
import Instructor from "./pages/Instructor";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"; 
import Verification from "./pages/Verify";
import SearchPage from "./pages/SearchPage";

/*EXPLAINING HOW SPECIFYING COURSE, DEPARTMENTS, AND PROF NAMES WORK 
the router specifies that a course can include a course name using a route like: /department/:coursename
this is then accessed in the component under 'this.props.match.params.courseName
then using that name we make the API call 
//----------------------------------------------------------------- */

export default class App extends Component {
    constructor(props){
        super(props); 
        
    }

    render(){
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login/" component={Login} history={history} />
                        <Route exact path="/signup/" component={Signup} />
                        <Route exact path="/instructors/" component={Instructors} />
                        <Route path = "/search/:query/" component={SearchPage}/>
                        <Route path="/verify" component={Verification} />
                        <Route exact path="/courses/" component={Courses} />
                        <Route exact path="/profile/" component={Profile} />
                        <Route exact path="/account/" component={Profile} />
                        <Route exact path="/departments/" component={Departments} />
                        <Route path="/course/:courseName/" component={Course} />
                        <Route path="/instructor/:profName/" component={Instructor} />
                        <Route path="/department/:deptName/" component={Department} />
                    </Switch>
            </Router>
            </div>
            
        );
    }
}

render(<App/>, document.getElementById("root")); 