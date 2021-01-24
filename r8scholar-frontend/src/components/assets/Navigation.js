import React, { Component } from 'react';
import  {Link} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, Table} from 'react-bootstrap';


export default class Navigation extends Component {
  // this could probably be named better, if true it means user is logged in 
  defaultLoginStatus = false; 

  constructor(props){
    super(props); 
    this.state = {
      searchQuery : '', 
      signedIn: this.defaultLoginStatus, 
    }
    
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
    console.log("Preforming Search on: " + this.state.searchQuery);
  }

  //logs out the user 
  handleLogoutPressed(obj){
    this.setState({
      signedIn : false, 
    });
  }



  //the JSX that gets outputted when this file is imported as a component 
  render() {
    return (
      <div className="App">
        <header>
          <Navbar expand="lg" variant="dark" bg="dark">
            <Navbar.Brand href="#home">BrockU R8Scholar</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link to="/about">About</Link></Nav.Link>
                    {/*these are shown only if user is logged out */}
                    <Nav.Link hide={this.state.signedIn}><Link to="/login">Login</Link></Nav.Link> 
                    <Nav.Link hide={this.state.signedIn}><Link to="/signup">Signup</Link></Nav.Link>
                    {/*these are shown only if user is logged in */}
                    <Nav.Link show={this.state.signedIn}><Link to="/login">Courses</Link></Nav.Link> 
                    <Nav.Link show={this.state.signedIn}><Link to="/professors">Professors</Link></Nav.Link> 
                    <Nav.Link show={this.state.signedIn} href="#" onClick={this.handleLogoutPressed}><Link>Logout</Link></Nav.Link>
                    
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
  
  