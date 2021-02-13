import React from "react";
import { Link } from "react-router-dom";

export default function List(props) {
    const { data, columns, link } = { ...props };
    return data.map((row) => {
        return (
            <Link className="listEntry" to={link + row.id}>
                {columns.map((col) => {
                    return <div className={col}>{row[col]}</div>;
                })}
            </Link>
        );
    });
}
