import React from "react";
import SearchBar from "./SearchBar";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Button, Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav } from "reactstrap";
import axiosInstance from "../axiosApi";
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
    toggleNavbarCollapse();
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
        <Navbar className={classnames("fixed-top", navbarColor)} expand="lg" align="center">
            <div style={{ paddingLeft: "4%", display: "inline-flex !important" }}>
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
                <Nav className="mr-auto mt-lg-0" navbar style={{ width: "100%" }}>
                    <NavItem style={{ marginLeft: "3%" }}>
                        <Link to="/">
                            <NavLink style={separate} style={navLinkStyles}>
                                Home
                            </NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link onClick={toggleNavbarCollapse} to="/courses">
                            <NavLink style={separate} style={navLinkStyles}>
                                Courses
                            </NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link onClick={toggleNavbarCollapse} to="/instructors">
                            <NavLink style={separate} style={navLinkStyles}>
                                Instructors
                            </NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link onClick={toggleNavbarCollapse} to="/departments">
                            <NavLink style={separate} style={navLinkStyles}>
                                Departments
                            </NavLink>
                        </Link>
                    </NavItem>
                    {cookie.load("isLoggedIn") === "true" ? (
                        <NavItem>
                            <Link onClick={toggleNavbarCollapse} to="/profile">
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
                            <Button onClick={toggleNavbarCollapse} style={{ alignSelf: "center", width: "170px" }} className="btn-round lg" href="/signup" color="danger">
                                <i className="nc-icon nc-spaceship before" style={{ display: "inline", marginRight: "10%" }} />
                                Sign up Today
                            </Button>
                        )}
                    </NavItem>
                    <NavItem style={{ alignSelf: "center", marginLeft: "1%", minWidth: "max-content" }}>
                        {cookie.load("isLoggedIn") === "true" ? null : (
                            <Button onClick={toggleNavbarCollapse} href="/login" className="btn-round lg" color="danger">
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

export default HomeNavbar;
