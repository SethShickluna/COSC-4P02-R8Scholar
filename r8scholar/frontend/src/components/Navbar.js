import React from "react";
import SearchBar from './SearchBar'; 
import classnames from "classnames";

import {

  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Col,
} from "reactstrap";

const navLinkStyles = { 
  fontSize: '16px',
}


const title={
  paddingLeft:"5%",
  paddingRight: "3%",
  fontSize: '18px',
}

import cookie from 'react-cookies';

function HomeNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
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
          <div style={{paddingLeft:"5%"}}className="navbar-translate">
            <NavbarBrand style={{fontSize:"18px"}}
              data-placement="bottom"
              href="/"
              target="_blank"
              title="Landing Page">
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
          <SearchBar color="transparent"/>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}>
          <Nav style={{paddingRight:"10%"}}navbar>
            {/** pages */}
            <NavItem >
              <NavLink style={navLinkStyles} 
                href="/courses">
                Courses
              </NavLink>
            </NavItem>
            <NavItem >
              <NavLink style={navLinkStyles}
                href="/instructors">
                Instructors
              </NavLink>
            </NavItem>
            <NavItem >
              <NavLink style={navLinkStyles} 
                href="/departments">
                Departments
              </NavLink>
            </NavItem>
            {cookie.load('isLoggedIn') === "true"? 
                <NavItem >
                <NavLink style={navLinkStyles} 
                  href="/profile">
                  Profile
                </NavLink>
              </NavItem>
            : null
            }
            <NavItem> {/**youtube icon/link */}
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/CreativeTim?ref=creativetim"
                target="_blank"
                title="Behind the Scenes"
              >
                <i className="fa fa-youtube" />
                <p className="d-lg-none">Youtube</p>
              </NavLink>
            </NavItem>
            <NavItem> {/**github icon/link */}
              <NavLink
                data-placement="bottom"
                href="https://github.com/SethShickluna/COSC-4P02-R8Scholar"
                target="_blank"
                title="Check out our GitHub"
              >
                <i className="fa fa-github" />
                <p className="d-lg-none">GitHub</p>
              </NavLink>
            </NavItem>
            <NavItem> {/**signup button */}
            {cookie.load('isLoggedIn') === "true"? 
                <Button className="btn-round lg" color="primary" href="/signout">
                
                    Sign Out
                </Button>

            : <Button className="btn-round lg" href="/signup" color="primary">
            <i className="nc-icon nc-spaceship before"></i>
                Sign up Today
            </Button>}
            {cookie.load('isLoggedIn') === "true"? 
                null

            : <Button href="/login" className="btn-round lg" color="primary">
                Login
            </Button>}
            </NavItem>
          </Nav>
        </Collapse>
    </Navbar>
  );
}

export default HomeNavbar;