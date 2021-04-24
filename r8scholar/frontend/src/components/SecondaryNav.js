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
        <Navbar className="secondary-nav" color="info" expand="lg" fixed="top">
            <div style={{ paddingLeft: "4%" }}>
                <NavbarBrand style={title} href="/">
                    R8Scholar
                </NavbarBrand>
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
            </div>
            <Collapse navbar toggler="#navbarTogglerDemo01">
                <Nav className="mr-auto mt-lg-0" navbar style={{ width: "100%" }}>
                    <NavItem style={{ marginLeft: "3%" }}>
                        <Link to="/">
                            <NavLink style={separate} style={navLinkStyles}>
                                Home
                            </NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
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
                    <NavItem id="SearchBar" style={{ width: "35em", minWidth: "200px", marginLeft: "auto", marginRight: "1%" }}>
                        <SearchBar color="transparent" />
                    </NavItem>
                    <NavItem style={{ alignSelf: "center", minWidth: "max-content" }}>
                        {" "}
                        {/**signup button */}
                        {cookie.load("isLoggedIn") === "true" ? (
                            <Button className="btn-round lg outline" color="danger" type="submit" onClick={handleLogout}>
                                Sign Out
                            </Button>
                        ) : (
                            <Button className="btn-round lg" href="/signup" color="danger">
                                <i className="nc-icon nc-spaceship before"></i>
                                Sign up Today
                            </Button>
                        )}
                    </NavItem>
                    <NavItem style={{ alignSelf: "center", marginLeft: "1%", minWidth: "max-content" }}>
                        {cookie.load("isLoggedIn") === "true" ? null : (
                            <Button href="/login" className="btn-round lg" color="danger">
                                Sign In
                            </Button>
                        )}
                    </NavItem>
                    <NavItem style={{ alignSelf: "center", marginLeft: "1%", marginRight: "4%" }}>
                        <DarkModeToggle />
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default SecondaryNav;
