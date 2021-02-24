import React from "react";
import Icon from "react-icons-kit";
import { spinner } from "react-icons-kit/fa";

export default function Loading(props) {
    return (
        <div className="loading">
            <Icon size={props.size} icon={spinner} />
        </div>
    );
}
