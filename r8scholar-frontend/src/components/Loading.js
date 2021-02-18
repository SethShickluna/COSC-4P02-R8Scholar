import React from "react";
import styled from "styled-components";
import Icon from "react-icons-kit";
import { spinner } from "react-icons-kit/fa";

const LoadingContainer = styled.div`
    animation-name: rotate-loading;
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
    animation-timing-function: steps(8, start);
    margin-top: 10%;
    text-align: center;
    color: #989898;

    @keyframes rotate-loading {
        frp {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

export default function Loading(props) {
    return (
        <LoadingContainer>
            <Icon size={props.size} icon={spinner} />
        </LoadingContainer>
    );
}
