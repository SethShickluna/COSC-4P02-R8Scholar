import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";

export default function Button(props) {
    if (props.link == null) {
        return (
            <div
                id={props.id}
                className={props.className}
                onClick={props.onClick}
            >
                {props.text}
                {props.icon == null ? null : (
                    <>
                        {"  "}
                        <Icon size={props.iconSize} icon={props.icon} />
                    </>
                )}
            </div>
        );
    } else {
        return (
            <Link
                id={props.id}
                className={props.className}
                to={props.link}
                onClick={props.onClick}
            >
                {props.text}
            </Link>
        );
    }
}
