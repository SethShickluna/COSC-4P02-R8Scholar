import React, { Component } from "react";
import Post from '../components/Post';

export default class Forum extends Component {
    constructor(props) {
        super(props);

        this.addPost=this.addPost.bind(this); 
        this.onPostEditorInput=this.onPostEditorInput.bind(this); 

        this.state={
            posts:['Old Post 1 - 12 Feb 2021'],
            newPostBody: '',
        }
    }

    addPost(){
        const newState = Object.assign({}, this.state);
        newState.posts.push(this.state.newPostBody);
        newState.newPostBody = ''; 
        this.setState(newState);

    }

    onPostEditorInput(ev){
        this.setState({
            newPostBody: ev.target.value
        })
    }

    render() {
        return (
            <div>
                { 
                this.state.posts.map((postBody, idx) => {
                  return ( 
                  <Post key={idx} postBody ={postBody} />
                )
                  })
                }
                <div className="panel panel-default post-editor">
                    <div className="panel-body">
                        <textarea className="form-control" value ={this.state.newPostBody} onChange ={this.onPostEditorInput} />
                        <button className="btn btn-success post-editor post-editor-button" onClick = {this.addPost}>Post </button>
                    </div>
                </div>
            </div>
        );
    } 
}
