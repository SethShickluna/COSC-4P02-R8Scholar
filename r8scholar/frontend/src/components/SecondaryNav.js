import React from "react";
import cookie from "react-cookies";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { MdBrightnessMedium } from "react-icons/md";
import { DarkModeToggle } from "./DarkModeToggle";

// reactstrap components
import { Collapse, Button, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container } from "reactstrap";

//axios
import axiosInstance from "../axiosApi";

const navLinkStyles = {
    fontSize: "20px",
};

const separate = {
    paddingRight: "2%",
    paddingLeft: "2%",
};

const title = {
    paddingLeft: "4%",
    paddingRight: "3%",
    fontSize: "28px",
};

async function handleLogout() {
    try {
        const response = await axiosInstance.post("/logout/", {
            refresh_token: localStorage.getItem("refresh_token"),
        });
        cookie.save("isLoggedIn", "false", { path: "/" });
        cookie.save("email", "", { path: "/" });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        axiosInstance.defaults.headers["Authorization"] = null;
        window.location.href = "/";
        return response;
    } catch (e) {
        console.log(e);
    }
}

function SecondaryNav() {
    const [bodyClick, setBodyClick] = React.useState(false);

    return (
        <>
            {bodyClick ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setBodyClick(false);
                    }}
                />
            ) : null}
            <Navbar className="secondary-nav" color="info" expand="lg">
                <Container fluid>
                    <button
                        className="navbar-toggler"
                        id="navbarTogglerDemo01"
                        type="button"
                        onClick={() => {
                            document.documentElement.classList.toggle("nav-open");
                            setBodyClick(true);
                        }}
                    >
                        <span className="navbar-toggler-bar bar1" />
                        <span className="navbar-toggler-bar bar2" />
                        <span className="navbar-toggler-bar bar3" />
                    </button>
                    <Collapse navbar toggler="#navbarTogglerDemo01">
                        <NavbarBrand style={title} href="/">
                            R8Scholar Home
                        </NavbarBrand>
                        <Nav className="mr-auto mt-2 mt-lg-0" navbar>
                            <NavItem style={separate} className="active">
                                <Link to="/courses">
                                    <NavLink style={separate} style={navLinkStyles}>
                                        Courses
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/instructors">
                                    <NavLink style={separate} style={navLinkStyles}>
                                        Instructors
                                    </NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/departments">
                                    <NavLink style={separate} style={navLinkStyles}>
                                        Departments
                                    </NavLink>
                                </Link>
                            </NavItem>
                            {cookie.load("isLoggedIn") === "true" ? (
                                <NavItem>
                                    <Link to="/profile">
                                        <NavLink style={separate} style={navLinkStyles}>
                                            Profile
                                        </NavLink>
                                    </Link>
                                </NavItem>
                            ) : null}
                        </Nav>
                        <SearchBar color="primary" />
                        <Nav style={{ paddingRight: "10%" }} navbar>
                            <NavItem>
                                {" "}
                                {/**signup button */}
                                {cookie.load("isLoggedIn") === "true" ? (
                                    <Button className="btn-round" color="default" type="submit" onClick={handleLogout}>
                                        Sign Out
                                    </Button>
                                ) : (
                                    <Link to="/signup">
                                        <Button className="btn-round" color="danger">
                                            <i className="nc-icon nc-spaceship before"></i>
                                            Sign up Today
                                        </Button>
                                    </Link>
                                )}
                                {cookie.load("isLoggedIn") === "true" ? null : (
                                    <Link to="/login">
                                        <Button className="btn-round lg" color="danger">
                                            Sign In
                                        </Button>
                                    </Link>
                                )}
                            </NavItem>
                        </Nav>
                        <DarkModeToggle />
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default SecondaryNav;
