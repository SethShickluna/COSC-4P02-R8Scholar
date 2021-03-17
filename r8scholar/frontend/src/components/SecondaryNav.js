import React from "react";
import cookie from 'react-cookies';
import SearchBar from './SearchBar'; 

// reactstrap components
import {
  UncontrolledCollapse,
  Button,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

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
      <Navbar color="primary" expand="lg">
        <Container fluid >
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
          <UncontrolledCollapse navbar toggler="#navbarTogglerDemo01">
            <NavbarBrand  style={title} href="/">
              R8Scholar Home
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
            <SearchBar color="primary"/>
            <Nav style={{paddingRight:"10%"}}navbar>
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
                Login
            </Button>}
            </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default SecondaryNav