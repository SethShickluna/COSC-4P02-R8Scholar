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

export default function Pathfinder() {
    const pages = {
        "": Home,
        login: Login,
        professor: Professor,
        professors: Professors,
        course: Course,
        courses: Courses,
        department: Department,
        departments: Departments,
        about: About,
    };
    return (
        <Router>
            <Navbar />
            <Switch>
                {Object.keys(pages).map((e) => {
                    const Page = pages[e];
                    return (
                        <Route
                            path={"/" + e}
                            exact
                            component={(props) => {
                                return <Page {...props} />;
                            }}
                        />
                    );
                })}
            </Switch>
        </Router>
    );
}
