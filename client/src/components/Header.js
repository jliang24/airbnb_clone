import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'components/HeaderStyle.css';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">Signout</Link>
          <Link to="/listings/create">Create a new listing!</Link>
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
        <div>
          <Link to="/">Home</Link>
          <Link to="/listings">View Listings</Link>
        </div>
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
