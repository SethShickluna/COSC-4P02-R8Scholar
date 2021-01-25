import React, { Component } from 'react';
import  {Link} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button} from 'react-bootstrap';


export default class Navigation extends Component {
    // this could probably be named better, if true it means user is logged in 
    defaultLoginStatus = false; 

    constructor(props){
        super(props); 
        this.state = {
            searchQuery : '', 
            signedIn: this.defaultLoginStatus, 
            username: '', //this will be given by a get request from the back end on load? not sure yet 
            activePage: '',
        }
        
        //bind some methods to our object 
        this.updateSearchQuery = this.updateSearchQuery.bind(this); //done to pass 'this' into function
        this.performSearchOnQuery = this.performSearchOnQuery.bind(this); 
        this.handleLogoutPressed = this.handleLogoutPressed.bind(this); 
    }

    //EVENT HANDELERS
    /**
     @param obj: the object which calls this function (in this case, search button )
    **/
    updateSearchQuery(obj){
        //send query to back end via state
        this.setState({
            searchQuery: obj.target.value, 
        }); 
    }

    //this sends the query to the back end when the search button is pressed 
    performSearchOnQuery = () => {
        //say this for now -- in reality send it to the back end 

        //uhh testing purposes: searching login logs you in 
        if(this.state.searchQuery === "login"){
            this.setState({
                signedIn: true, 
                username: "Tester", // this will be a get reqest from the backend for now just give the user something to see 
            })
        }
    }

    /**
     * logs out the user 
     * @param obj: the object which calls this function (logout button)
    **/
    handleLogoutPressed(obj){
        this.setState({
            signedIn : false, 
        });
    }

    //the JSX that is rendered when this file is imported as a component 
    render() {
        return (
            <div className="App">
                <header>
                    <Navbar sticky="top" expand="lg" variant="dark" bg="dark">
                        <Navbar.Brand >BrockU R8Scholar</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {/* these two are pretty easy -- just show home and about links always*/}
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/about">About</Nav.Link>
                                
                                {/*these are shown only if user is logged out as they are not needed if a user is logged in */}
                                {!this.state.signedIn ? <Nav.Link as={Link} to="/login">Login</Nav.Link> : null}
                                {!this.state.signedIn ? <Nav.Link as={Link} to="/signup">Signup</Nav.Link> : null} 
            
                                {/*these are shown only if user is logged in accesses full features, and gives a drop down menu for */}
                                {this.state.signedIn ? <Nav.Link as={Link} to="/courses">Courses</Nav.Link> : null}
                                {this.state.signedIn ? <Nav.Link as={Link} to="/professors">Professors</Nav.Link>  : null} 
                                {/* user profile drop down menu*/}
                                    
                            </Nav>
                            <Nav> {/* show on the left hand side*/}
                                {this.state.signedIn ? /* once again only showing if user is logged in */
                                    <NavDropdown title={this.state.username} id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/account">Account</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#" onClick={this.handleLogoutPressed}>Logout</NavDropdown.Item>
                                </NavDropdown> 
                                : null}                
                            </Nav>
                            <Form inline>
                            <FormControl type="text" placeholder="Search" 
                            className="mr-sm-2" onChange={this.updateSearchQuery}/>
                            <Button variant="outline-success" onClick={this.performSearchOnQuery}>Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
            </div>
        );
    }
}
  
  