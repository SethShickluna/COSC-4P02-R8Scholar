import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
    Input,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    Form,
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

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: [],
            maxDisplayed: 7,
            dropdownOpen: false,
        };

        this.updateSearch = this.updateSearch.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    updateSearch = (obj) => {
        this.setState({
            dropdownOpen: obj.target.value.length > 0,
            query: obj.target.value,
        });
        if (this.state.query.length >= 1) {
            this.doSearch();
        }
        if (obj.key === "Enter") {
            this.props.history.push("/search/" + this.state.query);
        }
    };

    doSearch = async () => {
        await fetch("/api/search/?search=" + this.state.query)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const combinedResults = data.Department.concat(
                    data.Instructor,
                    data.Course
                );
                this.setState({
                    results: combinedResults,
                });
            });
        console.log(this.state.results);
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
                    color={this.props.color}
                    toggle={false}
                    isOpen={this.state.dropdownOpen}
                >
                    <DropdownToggle color={this.props.color}>
                        <Input
                            color={this.props.color}
                            as="submit"
                            onChange={this.updateSearch}
                            placeholder="Search"
                            type="text"
                        />
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
                                                  style={linkStyle}
                                              >
                                                  {item.name}
                                              </DropdownItem>
                                          </div>
                                      );
                                  })}
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
