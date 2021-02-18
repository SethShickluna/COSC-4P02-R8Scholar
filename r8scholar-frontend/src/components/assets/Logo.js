import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Logo() {
    const Logo = styled.div`
        grid-area: Logo;
        height: 50px;
        background: #cc0000;

        &:hover {
            cursor: pointer;
        }

        .label {
            height: auto;
            padding: 0px 10px 0px 10px;
            font-style: normal;
            font-weight: bold;
            font-size: 36px;
            text-align: center;
            color: #e5e5e5;
        }
    `;
    return (
        <Logo className="Logo">
            <Link className="label" to="/">
                R8Scholar
            </Link>
        </Logo>
    );
}
