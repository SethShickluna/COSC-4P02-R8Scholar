import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
    Input,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
} from "reactstrap";

const menuStyle = {
    padding: "0",
    margin: "0",
    borderRadius: "14px",
};

const linkStyle = {
    borderRadius: "0",
    fontSize: "12px",
};
const toggleStyle = { 
    background: "transparent",
    border: "0px solid transparent",
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: [],
            maxDisplayed: 7,
            dropdownOpen: false,
        };
        this.doSearch = this.doSearch.bind(this);
    }

    doSearch = async(e) => { //passed the inputs value 
        if(e.length >= 1){
            await fetch("/api/search/?search=" + e)//get results for entities containing {e} in their names
            .then((response) => {
                return response.json();
            })
            .then((data) => { //concat the 3 types of responses
                const combinedResults = data.Department.concat(
                    data.Instructor,
                    data.Course
                );
                this.setState({
                    results: combinedResults,
                    query: e, //update our query record 
                });
            });
        }
        this.setState({dropdownOpen: e.length >= 1}); //if there is text, drop down the menu 
    };

    determineType(item) {
        if (item.course_full_name) {
            return "course/" + item.name;
        } else if (item.department) {
            return "instructor/" + item.name;
        }
        return "department/" + item.name;
    }

    min(a, b) {
        return a < b ? a : b;
    }

    render() {
        return (
            <div>
                <Dropdown
                    primary
                    onSubmit={this.doFullSearch}
                    isOpen={this.state.dropdownOpen}
                ><DropdownToggle style={toggleStyle}toggle={this.state.dropdownOpen}>
                        <Input
                            onChange={e => this.doSearch(e.target.value)}
                            placeholder="Search"
                            size="md"
                            type="text"
                        ></Input>
                    </DropdownToggle>
                    <DropdownMenu container="body" style={menuStyle}>
                        <DropdownItem color={this.props.color}>
                            Query for {this.state.query} returned:{" "}
                        </DropdownItem>
                        {!this.state.results.length
                            ? null
                            : this.state.results
                                  .slice(
                                      0,
                                      this.min(
                                          this.state.results.length,
                                          this.state.maxDisplayed
                                      )
                                  )
                                  .map((item, index) => {
                                      return (
                                          <div>
                                              <DropdownItem divider />
                                              <DropdownItem
                                                  key={index}
                                                  href={
                                                      "/" +
                                                      this.determineType(item)
                                                  }
                                                  style={linkStyle}>
                                                  {item.course_full_name ? item.name+ " - " + item.course_full_name : item.name}
                                              </DropdownItem>
                                          </div>
                                      );
                                  })}
                        <DropdownItem divider />
                        <DropdownItem href={"/search/" + this.state.query}>
                            <b>View All Results</b>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    }
}

export default withRouter(SearchBar);
