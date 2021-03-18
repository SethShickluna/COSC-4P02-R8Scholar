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
} from "reactstrap";

import cookie from 'react-cookies';

const navLinkStyles = { 
  fontSize: '16px',
}

const separate = { 
  paddingRight: "2%", 
  paddingLeft: "2%",
}

const title={
  paddingLeft:"10%",
  paddingRight: "3%",
  fontSize: '22px',
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
          <div style={{paddingLeft:"5%"}}className="navbar-translate justify-content-left">
            <NavbarBrand style = {title}
              data-placement="bottom"
              href="/"
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
          <Collapse navbar isOpen={navbarCollapse}>
          
          <NavbarBrand  style={title} href="/">
             
            </NavbarBrand>
            <Nav className="mr-auto mt-2 mt-lg-0" navbar>
              <NavItem style={separate}className="active">
                <NavLink href="/courses"style={navLinkStyles}>
                  Courses 
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={separate}href="/instructors"style={navLinkStyles}>
                  Instructors
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={separate}style={navLinkStyles}
                  href="/departments"
                >
                  Departments
                </NavLink>
              </NavItem>
              {cookie.load('isLoggedIn') === "true"? 
                <NavItem>
                <NavLink style={separate} style={navLinkStyles}
                  href="/profile">
                  Profile
                </NavLink>
              </NavItem>
            : null
            }
            </Nav>
            <SearchBar color="transparent"/>
            <Nav style={{marginRight:"10%"}}navbar>
            <NavItem> {/**signup button */}
            {cookie.load('isLoggedIn') === "true"? 
                <Button className="btn-round lg outline" color="info" href="/signout">
                
                    Sign Out
                </Button>

            : <Button className="btn-round lg" href="/signup" color="primary">
            <i className="nc-icon nc-spaceship before"></i>
                Sign up Today
            </Button>}
            {cookie.load('isLoggedIn') === "true"? 
                null

            : <Button href="/login" className="btn-round lg" color="primary">
                Sign In
            </Button>}
            </NavItem>
            </Nav>
        </Collapse>
    </Navbar>
  );
}

export default HomeNavbar;