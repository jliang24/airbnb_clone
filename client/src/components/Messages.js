import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from 'actions';

class Messages extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    console.log(this.props.messages);
    return <div>Hey there!</div>;
  }
}

const mapStateToProps = state => {
  return {
    messages: Object.values(state.messages)
  };
};

export default connect(
  mapStateToProps,
  actions
)(Messages);
