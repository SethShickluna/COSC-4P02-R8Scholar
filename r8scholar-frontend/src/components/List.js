import React from "react";
import { Link } from "react-router-dom";

export default function List(props) {
    const { data, labels, link } = { ...props };
    // return data.map((e) => {
    //     console.log(e);
    return (
        <Link className="listEntry" to="/courses">
            {/* {e.map(([label, value]) => {
                    return <div key={label}>{value}</div>;
                })} */}
            <div>placeholder</div>
        </Link>
    );
    // return (
    //     <Link className="listEntry" to={{ pathname: link, id: key }}>
    //         {Object.entries(entry).map(([label, value]) => {
    //             return <div key={label}>{value}</div>;
    //         })}
    //     </Link>
    // );
    // });
}
