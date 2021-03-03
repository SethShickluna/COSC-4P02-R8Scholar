//node_modules
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, {Component} from "react";
import {render} from 'react-dom'; 

//css
import "./style.css"; 
//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signout from "./components/assets/Signout";

//pages
import Login from "./pages/Login";
import About from "./pages/About";
import Departments from "./pages/Departments";
import Department from "./pages/Department";
import Home from "./pages/Home";
import Instructors from "./pages/Instructors";
import Instructor from "./pages/Instructor";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Signup from "./pages/Signup";
import Forum from "./pages/Forum";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile"; 
import Settings from "./pages/Settings"; 


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
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} history={history} />
                    <Route exact path="/signup" component={Signup} />
                    <Route path="/instructors" component={Instructors} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/courses" component={Courses} />
                    <Route exact path="/forum" component={Forum} />
                    <Route exact path="/account" component={Profile} />
                    <Route exact path="/settings" component={Settings} />   
                    <Route exact path="/signout" component={Signout} />
                    <Route exact path="/departments" component={Departments} />
                    <Route path="/course/:courseName" component={Course} />
                    <Route path="/instructor/:profName" component={Instructor} />
                    <Route path="/department/:deptName" component={Department} />
                    <Route path="*" component={PageNotFound} />
                </Switch>
                <Footer />
            </Router>
        );
    }
}

render(<App/>, document.getElementById("root")); 