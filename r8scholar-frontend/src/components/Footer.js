import React from "react";
import styled from "styled-components";
import { Component } from "react";

const FooterContainer = styled.div`
    color: white;
    background: #cc0000;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;

    .row {
        margin-right: 0px;
        margin-left: 0px;
    }

    .footer-link {
        color: white;
        background-color: white;
    }
    .footer-link:hover {
        color: white;
    }
    .copyright-text {
        text-align: right;
        margin-right: 1%;
    }
`;

export default class Footer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <FooterContainer>
                <div className="row">
                    {/*Column 1 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Address </h4>
                        <ul className="footer-list">
                            <li> 1812 Sir Isaac Brock Way,</li>
                            <li> St. Catharines, ON L2S 3A1</li>
                            <li> +1 905 XXX-XXXX</li>
                        </ul>
                    </div>
                    {/*Column 2 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Important Links </h4>
                        <ul className="footer-list">
                            <a
                                className="footer-link"
                                href="https://github.com/SethShickluna/COSC-4P02-R8Scholar"
                            >
                                <li> GitHub</li>
                            </a>
                        </ul>
                    </div>
                    {/*Column 3 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Follow Us </h4>
                        <ul className="footer-list">
                            <a
                                className="footer-link"
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            >
                                <li> Youtube</li>
                            </a>
                        </ul>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="copyright-text">
                        &copy;{new Date().getFullYear()} R8Scholar.com - All
                        Rights Reserved
                    </p>
                </div>
            </FooterContainer>
        );
    }
}
