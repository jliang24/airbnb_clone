import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'components/HeaderStyle.css';

import * as actions from 'actions';

class Header extends Component {
  state = { home: false, listing: false };

  determineLocation() {
    if (this.props.location.pathname === '/listings') {
      this.setState({ listing: true, home: false });
    } else if (this.props.location.pathname === '/home') {
      this.setState({ home: true, listing: false });
    } else {
      this.setState({
        home: false,
        listing: false
      });
    }
  }

  componentDidMount() {
    this.determineLocation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.determineLocation();
    }
  }

  clearInfo = () => {
    this.props.clearDetails();
    this.props.clearPictures();
  };

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="right item">
          <Link className="ui inverted button " to="/signout">
            Signout
          </Link>
          {this.props.location.pathname.indexOf('edit') < 0 && (
            <Link
              style={{ marginLeft: '5px' }}
              className="ui inverted button"
              to="/listings/create"
              onClick={this.clearInfo}
            >
              Create a new listing!
            </Link>
          )}
        </div>
      );
    } else {
      return (
        <div className="right item">
          <Link className="ui inverted button " to="/signup">
            Signup
          </Link>
          <Link
            style={{ marginLeft: '5px' }}
            className="ui inverted button"
            to="/signin"
          >
            Log in
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui container">
          <div className="ui large secondary inverted pointing menu">
            <Link
              className={this.state.home ? 'active item' : 'item'}
              to="/home"
            >
              Home
            </Link>
            <Link
              className={this.state.listing ? 'active item' : 'item'}
              to="/listings"
            >
              View Listings
            </Link>
            {this.renderLinks()}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    details: state.details
  };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(Header));
