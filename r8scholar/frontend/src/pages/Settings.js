import React, { Component } from "react";
import AdminForm from '../components/assets/AdminForm';
import EditItemForm from '../components/assets/EditItemForm';
import RemoveItemForm from '../components/assets/RemoveItemForm';
import BanUserForm from '../components/assets/BanUserForm';
import SecondaryNav from "../components/SecondaryNav";



export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {} // TODO add the entities we want to do functions on and have the forms check if they exist in the database
    }



    //TODO: Implement custom forms
    //TODO: Use a function to hide and unhide the form elements
    render() {
        return (

            //begin the code for script here 

            //script

            <div className="container ">
                <SecondaryNav/>
                <div className="row">
                    <div className="col-lg-12 paginationBar forumModule forumPad ">
                        <a href="/settings"> Settings </a> <i className="fa fa-chevron-circle-right paginationArrow"> </i>
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

                        <tr className="forumModule">
                            <td>
                                <button onClick={function myFunction() {
                                    var x = document.getElementById("myDIV");
                                    if (x.style.display === "none") {
                                        x.style.display = "block";
                                    } else {
                                        x.style.display = "none";
                                    }
                                }}>  Add Review Item</button>
                                <div id="myDIV" className="hidden">
                                    <AdminForm></AdminForm>
                                </div>

                            </td>
                        </tr>
                        <tr className="forumModule">
                            <td>
                                <button onClick={function myFunction() {
                                    var x = document.getElementById("myDIV2");
                                    if (x.style.display === "none") {
                                        x.style.display = "block";
                                    } else {
                                        x.style.display = "none";
                                    }
                                }}>  Edit Review Item</button>

                                <div id="myDIV2" className="hidden">
                                <EditItemForm></EditItemForm>
                                </div>
                            </td>
                        </tr>
                        <tr className="forumModule">
                            <td>
                            <button onClick={function myFunction() {
                                    var x = document.getElementById("myDIV3");
                                    if (x.style.display === "none") {
                                        x.style.display = "block";
                                    } else {
                                        x.style.display = "none";
                                    }
                                }}>  Remove Review Item</button>

                                <div id="myDIV3" className="hidden">
                                   <RemoveItemForm> </RemoveItemForm>
                                </div>
                            </td>
                        </tr>
                        <tr className="forumModule">
                            <td>
                            <button onClick={function myFunction() {
                                    var x = document.getElementById("myDIV4");
                                    if (x.style.display === "none") {
                                        x.style.display = "block";
                                    } else {
                                        x.style.display = "none";
                                    }
                                }}>  Ban User </button>

                                <div id="myDIV4" className="hidden">
                                    <BanUserForm> </BanUserForm>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        );

    }

}
