import React from "react";
import { Link } from "react-router-dom";

export default function List(props) {
    const { data, id, link } = { ...props };
    return Object.entries(data).map(([key, entry]) => {
        return (
            <Link className="listEntry" to={{ pathname: link, id: key }}>
                {Object.entries(entry).map(([label, value]) => {
                    return <div key={label}>{value}</div>;
                })}
            </Link>
        );
    });
}
