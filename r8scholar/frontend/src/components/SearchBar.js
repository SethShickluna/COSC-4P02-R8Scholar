import React, { Component } from "react";
import {withRouter} from 'react-router-dom'; 
import {Input, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Form} from 'reactstrap'; 


const linkStyle = { 
    color: 'black',
    fontSize: "18", 
}



class SearchBar extends Component { 
    constructor(props){
        super(props); 
        this.state = { 
            query: "", 
            results: [], 
            maxDisplayed: 7, 
            dropdownOpen: false, 
        }

        this.updateSearch = this.updateSearch.bind(this); 
        this.doSearch = this.doSearch.bind(this); 
    }

    updateSearch = (obj) => { 
        this.setState({
            dropdownOpen: (obj.target.value.length > 0),
            query: obj.target.value, 
        });
        if(this.state.query.length >= 1){
            this.doSearch(); 
        }
    }

    doSearch = async() => {
        await fetch('/api/search/?search='+this.state.query)
        .then((response) => {
            return response.json(); 
        }).then((data) => {
            const combinedResults = data.Department.concat(data.Instructor, data.Course)
            this.setState({
                results: combinedResults, 
            })
        }); 
        console.log(this.state.results); 
    }
    
    determineType(item){
        if(item.course_full_name){
            return "course/"+item.name; 
        }else if(item.department){
            return "instructor/"+item.name;  
        }
        return "department/"+item.name; 
    }

    min(a, b){
        return a < b ? a : b; 
    }

    render(){
        return(
            <div>
                <Dropdown color={this.props.color}toggle={false} isOpen={this.state.dropdownOpen}>
                    <DropdownToggle color={this.props.color}>
                        <Input color={this.props.color}as={Form}onChange={this.updateSearch}placeholder="Search" type="text" />
                    </DropdownToggle>
                    <DropdownMenu container="body" >
                        <DropdownItem>Query for {this.state.query} returned: </DropdownItem>
                        {!this.state.results.length? null:
                        this.state.results.slice(0, this.min(this.state.results.length, this.state.maxDisplayed)).map((item, index) => {
                            return(
                                <div>
                                    <DropdownItem divider />
                                    <DropdownItem key={index}><a style={linkStyle} href={"/"+this.determineType(item)}>{item.name}</a></DropdownItem>
                                </div>)
                            })}
                        <DropdownItem><a style={linkStyle}href={"/search/"+this.state.query}><b>View All Results</b></a> </DropdownItem>
                    </DropdownMenu>
                    
                </Dropdown>
                
            </div>
    )}; 

}


export default withRouter(SearchBar); 