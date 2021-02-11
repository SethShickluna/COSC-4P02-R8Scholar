import React from "react";
import { Link } from "react-router-dom";

export default function List(props) {
    const { data, columns, link } = { ...props };
    return data.map((row) => {
        return (
            <Link className="listEntry" to={{ pathname: link, id: row.id }}>
                {Object.entries(row).map((col) => {
                    if (columns.includes(col[0])) {
                        return <div className={col[0]}>{col[1]}</div>;
                    }
                })}
            </Link>
        );
    });
}
