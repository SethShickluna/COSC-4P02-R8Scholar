import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';


const messages = ["Please use your brock email. \n Usernames must be at least 4 characters long. \n Passwords must be at least 10 characters and include an uppercase, lowercase and number",
"Passwords must be at least 10 characters and include an uppercase, lowercase and number"];

class CustomPopover extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      index: props.index, 
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <>
        <Button id="Popover1" onClick={this.toggle}  color="info">
          Help
        </Button>
        <Popover
          placement="right"
          isOpen={this.state.popoverOpen}
          target="Popover1"
          className="popover-primary"
        >
          <PopoverHeader>Requirements</PopoverHeader>
          <PopoverBody>
           {messages[this.state.index]}
          </PopoverBody>
        </Popover>
      </>
    );
  }
}

export default CustomPopover; 