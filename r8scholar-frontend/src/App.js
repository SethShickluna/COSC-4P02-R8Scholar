import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import About from "./pages/About";
import Departments from "./pages/Departments";
import Department from "./pages/Department";
import Home from "./pages/Home";
import Professors from "./pages/Professors";
import Professor from "./pages/Professor";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Signup from "./pages/Signup";

/*EXPLAINING HOW SPECIFYING COURSE, DEPARTMENTS, AND PROF NAMES WORK 
the router specifies that a course can include a course name using a route like: /department/:coursename
this is then accessed in the component under 'this.props.match.params.courseName
then using that name we make the API call 
//----------------------------------------------------------------- */

export default function R8Scholar() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/'component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/professors' component={Professors} />
                <Route exact path='/about' component={About} />
                <Route exact path='/courses' component={Courses} />
                <Route exact path='/departments' component={Departments} />
                <Route path = '/course/:courseName' component={Course} /> 
                <Route path = '/professor/:profName' component={Professor} /> 
                <Route path = '/department/:deptName' component={Department} /> 
            </Switch>
        </Router>
    );
}
