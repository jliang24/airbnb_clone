import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'components/HeaderStyle.css';

class Header extends Component {
  state = { home: false, listing: false };

  determineLocation() {
    if (this.props.location.pathname === '/listings') {
      this.setState({ listing: true, home: false });
    } else if (this.props.location.pathname === '/') {
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

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="right item">
          <Link className="ui inverted button " to="/signout">
            Signout
          </Link>
          <Link
            style={{ marginLeft: '5px' }}
            className="ui inverted button"
            to="/listings/create"
          >
            Create a new listing!
          </Link>
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
            Signin
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
            <Link className={this.state.home ? 'active item' : 'item'} to="/">
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
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(withRouter(Header));
