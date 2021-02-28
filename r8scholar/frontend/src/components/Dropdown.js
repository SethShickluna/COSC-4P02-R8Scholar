import React, { Component } from "react";
import Button from "./Button";

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.state = {
            open: false,
        };
    }

    handleOpen = (e) => {
        this.setState((old) => {
            return {
                open: !old.open,
            };
        });
    };

    handleSelect = (field, value) => {
        this.props.handleSelect(field, value);
        this.setState({ open: false });
    };

    handleClickOutside = (e) => {
        if (
            this.container.current &&
            !this.container.current.contains(e.target)
        ) {
            this.setState({ open: false });
        }
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    render() {
        return (
            <div ref={this.container} className={this.props.className}>
                <Button
                    text={
                        this.props.selected
                            ? this.props.selected
                            : this.props.text
                    }
                    className="button"
                    onClick={this.handleOpen}
                    icon={this.props.icon}
                    iconSize={this.props.iconSize}
                />
                {this.state.open && (
                    <div className="dropdown">
                        <ul>
                            {this.props.options.map((e) => {
                                return (
                                    <li
                                        id={e}
                                        className="dropdown-option"
                                        onClick={() =>
                                            this.handleSelect(
                                                this.props.text,
                                                e
                                            )
                                        }
                                    >
                                        {e}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}
