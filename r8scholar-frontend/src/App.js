import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Teachers from "./pages/Teachers";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Departments from "./pages/Departments";
import Home from "./pages/Home";

export default function Pathfinder() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={() => <Home />} />
                <Route path="/Login" exact component={() => <Login />} />
                <Route path="/Teachers" exact component={() => <Teachers />} />
                <Route path="/Courses" exact component={() => <Courses />} />
                <Route
                    path="/Departments"
                    exact
                    component={() => <Departments />}
                />
                <Route path="/About" exact component={() => <About />} />
            </Switch>
        </Router>
    );
}
