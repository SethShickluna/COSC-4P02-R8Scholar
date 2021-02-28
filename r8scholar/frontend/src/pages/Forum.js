import React, { Component } from "react";
import Post from '../components/Post';

export default class Forum extends Component {
    constructor(props) {
        super(props);

        this.addPost = this.addPost.bind(this);
        this.onPostEditorInput = this.onPostEditorInput.bind(this);

        this.state = {
            posts: ['Old Post 1 - 18 Feb 2021'],
            newPostBody: '',
            postScore: 0
        }
    }

    addPost() {
        const newState = Object.assign({}, this.state);
        newState.posts.push(this.state.newPostBody);
        newState.newPostBody = '';
        this.setState(newState);
    } // adds a post to the state in this 

    onPostEditorInput(ev) {
        this.setState({
            newPostBody: ev.target.value
        })
    } //adds newPost body to be added to the posts.

    incrementScore() {
        const newState = Object.assign({}, this.state);
        newState.postScore.push(this.state.newScore);
        newState.postScore = ''
        this.setState(newState);
    }
    //beginnning of the forum structures
    render() {
        return (
            <div className="container ">

                <div className="row">
                    <div className="col-lg-12 paginationBar forumModule forumPad ">
                        <a href="Forum"> Forum Home </a> <i className="fa fa-chevron-circle-right paginationArrow"> </i><a href="#"> Category </a> <i class="fa fa-chevron-circle-right paginationArrow"> </i><a href="#"> Discussions </a> <i class="fa fa-chevron-circle-right paginationArrow"> </i>
                    </div>
                </div>


                <div className="row categoryModule ">
                    <div className="col-lg-12 columnPad">
                        <div className="pull-left">
                            <h1 className="customH1">Category Name</h1>
                        </div>
                        <div className="pull-right">
                            <a className="btn btn-primary themeButton pull-left" href="#"> START THREAD </a>
                        </div>
                    </div>
                </div>


                <div id="category_discussions_1" className="row forumPad " >
                    <table className="forumTable ">
                        <thead>
                            <th>
                                Thread,
                        </th>
                            <th>
                                Author,
                        </th>
                            <th classnName="pull-right">
                                Replies
                        </th>
                        </thead>

                        <tr classnName="forumModule">
                            <td>
                                <a href="#"> Thread name</a>
                            </td>
                            <td>
                                <a href="#"> Username </a>
                            </td>
                            <td className="pull-right">
                                12
                        </td>
                        </tr>
                    </table>
                </div>



                <div className="row categoryModule">
                    <div className="col-lg-12 columnPad">
                        <div className="pull-left">
                            <h1 className="customH1">Category Name</h1>
                        </div>
                        <div class="pull-right">
                            123 Threads 
                        </div>

                    </div>

                </div>


                <div id="category_discussions2" className="row forumPad " >
                    <table className="forumTable ">
                        <thead>
                            <th>
                                Thread </th>
                            <th>
                                Author, </th>
                            <th classnName="pull-right">
                                Replies
                                </th>
                        </thead>

                        <tr classnName="forumModule">
                            <td>
                                <a href="#"> Thread name  </a>
                            </td>
                            <td>
                                <a href="#"> Username  </a>
                            </td>
                            <td className="pull-right">
                                12
                             </td>
                        </tr>

                    </table>
                    <div className ="col-lg-12">
                        <div className="pull-right">
                            <a className="btn btn-primary themeButton pull-left" href="#"> START THREAD </a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
