import React from "react";
import styled from "styled-components";

export default function Search() {
    const Search = styled.div`
        grid-area: Search;
        height: 50px;
        background: #989898;
        stroke: none;
        padding-right: 10px;

        .label {
            height: 35px;
            width: 100%;
            max-width: 600px;
            margin-top: 7.5px;
            font-style: normal;
            font-size: 20px;
            line-height: 58px;
            text-align: left;
            background-color: #d1d1d1;
            border: 0;
            margin-left: 1%;
            padding-left: 10px;
        }
    `;
    return (
        <Search className="Search">
            <input type="text" className="label" placeholder="Search..." />
        </Search>
    );
}
