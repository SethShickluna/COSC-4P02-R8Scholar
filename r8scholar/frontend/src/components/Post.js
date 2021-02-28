import React from "react";
import { Component } from "react";
import { BiUpvote} from "react-icons/bi"
import { BiDownvote} from "react-icons/bi"

const emptyComments = "Nothing here!"

export default function Post(props) {

    return (
        <div className="panel panel-default post-body">
            <div className="panel-body">
                {props.postBody}
            </div>
            <div> 
                   <button onClick = {1} ><BiUpvote color = 'green' ></BiUpvote></button>
                  <button onClick = {1}> <BiDownvote  color = 'red'></BiDownvote> </button>
                   <ul> {props.postScore} </ul>
               </div>
        </div>
    );// end of html  
}




