import React from "react";

export default function Search(props) {
    return (
        <div className={props.className}>
            <input type="text" className="Field" placeholder="Search..." />
        </div>
    );
}
