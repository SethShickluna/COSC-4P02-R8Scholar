import React from "react";

export default function Button(props) {
    return (
        <div
            name="button"
            id="NavButton"
            className={props.className}
            onClick={props.onClick}
        >
            <div className="label">{props.className}</div>
        </div>
    );
}
