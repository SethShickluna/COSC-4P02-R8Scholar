import React from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
    return (
        <Link id={props.id} className={props.className} to={props.link}>
            {props.text}
        </Link>
    );
}
