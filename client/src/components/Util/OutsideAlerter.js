import React, { Component } from 'react';

const OutsideAlerter = WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        clickedOutside: false
      };
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.onOutsideClick);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.onOutsideClick);
    }

    onOutsideClick = event => {
      if (this.node.contains(event.target)) {
        return this.setState({ clickedOutside: false });
      }
      this.setState({ clickedOutside: true });
    };

    resetState = () => {
      this.setState({ clickedOutside: false });
    };

    render() {
      return (
        <div ref={node => (this.node = node)}>
          <WrappedComponent
            clickedOutside={this.state.clickedOutside}
            resetState={() => this.resetState()}
            {...this.props}
          />
        </div>
      );
    }
  };
};

export default OutsideAlerter;
