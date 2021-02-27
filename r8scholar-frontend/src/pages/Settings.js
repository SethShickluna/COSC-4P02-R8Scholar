import React, { Component } from "react";


export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }
//TODO: Implement custom forms
//TODO: Use a function to hide and unhide the form elements
    render() {
        return (
            <div className="container ">

                <div className="row">
                    <div className="col-lg-12 paginationBar forumModule forumPad ">
                        <a href="Settings"> Settings </a> <i className="fa fa-chevron-circle-right paginationArrow"> </i>
                    </div>
                </div>


                <div className="row settingsModule ">
                    <div className="col-lg-12 columnPad">
                        <div className="pull-left">
                            <h1 className="customH1">Admin Settings</h1>
                        </div>
                    </div>
                </div>


                <div id="settings_category" className="row forumPad " >
                    <table className="settings">
                        <thead >
                            <th>
                                List of Settings
                            </th>
                        </thead>

                        <tr classnName="forumModule">
                            <td>
                                <a href="#"> Add Review Item</a> 
                            </td>
                        </tr>
                        <tr classnName="forumModule">
                            <td>
                                <a href="#"> Edit Review Item</a>
                            </td>
                        </tr>
                        <tr classnName="forumModule">
                            <td>
                                <a href="#"> Remove Review Item</a>
                            </td>
                        </tr>
                        <tr classnName="forumModule">
                            <td>
                                <a href="#"> Ban User</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        );
    }
} 