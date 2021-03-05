import React from "react";
import cookie from 'react-cookies';

// reactstrap components
import {
  UncontrolledCollapse,
  Button,
  FormGroup,
  Form,
  Input,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";


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
        <Container>
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
            <NavbarBrand href="/">
              R8Scholar Home
            </NavbarBrand>
            <Nav className="mr-auto mt-2 mt-lg-0" navbar>
              <NavItem className="active">
                <NavLink href="/courses">
                  Courses 
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/instructors">
                  Instructors
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/departments"
                >
                  Departments
                </NavLink>
              </NavItem>
              {cookie.load('isLoggedIn') === "true"? 
                <NavItem>
                <NavLink
                  href="/profile">
                  Profile
                </NavLink>
              </NavItem>
            : null
            }
            </Nav>
            <Form className="form-inline ml-auto">
              <FormGroup className="has-white">
                <Input placeholder="Search" type="text" />
              </FormGroup>
            </Form>
            <Nav navbar>
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
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default SecondaryNav