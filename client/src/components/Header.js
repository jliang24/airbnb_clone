import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Signout</Link>
          <Link to="/listing/create">Create a new listing!</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">Signup</Link>
          <Link to="/signin">Signin</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="header">
        <Link to="/">Home</Link>
        {this.renderLinks()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Header);
