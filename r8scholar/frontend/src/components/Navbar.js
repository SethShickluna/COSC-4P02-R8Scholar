import React from "react";
import SearchBar from "./SearchBar";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Button, Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav } from "reactstrap";
import axiosInstance from "../axiosApi";
import { MdAirlineSeatIndividualSuite, MdBrightnessMedium } from "react-icons/md";
import cookie from "react-cookies";
import { DarkModeToggle } from "./DarkModeToggle";

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

function HomeNavbar() {
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [navbarCollapse, setNavbarCollapse] = React.useState(false);

    const toggleNavbarCollapse = () => {
        setNavbarCollapse(!navbarCollapse);
        document.documentElement.classList.toggle("nav-open");
    };

    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (document.documentElement.scrollTop > 299 || document.body.scrollTop > 299) {
                setNavbarColor("");
            } else if (document.documentElement.scrollTop < 300 || document.body.scrollTop < 300) {
                setNavbarColor("navbar-transparent");
            }
        };

        window.addEventListener("scroll", updateNavbarColor);

        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });

    return (
        <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
            <div style={{ paddingLeft: "5%" }} className="navbar-translate justify-content-left">
                <NavbarBrand style={title} data-placement="bottom" href="/" title="Landing Page">
                    R8Scholar
                </NavbarBrand>
                <button
                    aria-expanded={navbarCollapse}
                    className={classnames("navbar-toggler navbar-toggler", {
                        toggled: navbarCollapse,
                    })}
                    onClick={toggleNavbarCollapse}
                >
                    <span className="navbar-toggler-bar bar1" />
                    <span className="navbar-toggler-bar bar2" />
                    <span className="navbar-toggler-bar bar3" />
                </button>
            </div>
            <Collapse navbar isOpen={navbarCollapse}>
                <Nav className="mr-auto mt-2 mt-lg-0" navbar>
                    <NavItem style={{ paddingLeft: "100px" }}>
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
                <SearchBar color="transparent" />
                <Nav style={{ marginRight: "10%" }} navbar>
                    <NavItem>
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
                        {cookie.load("isLoggedIn") === "true" ? null : (
                            <Button href="/login" className="btn-round lg" color="danger">
                                Sign In
                            </Button>
                        )}
                    </NavItem>
                </Nav>
                <DarkModeToggle />
            </Collapse>
        </Navbar>
    );
}

export default HomeNavbar;
