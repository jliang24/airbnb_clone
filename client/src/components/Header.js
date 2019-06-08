import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'css/navBar.css';

import * as actions from 'actions';
import { mobileClass } from 'components/Responsive';

class Header extends Component {
  state = { home: false, listing: false };

  updateWindowDimensions = () => {
    this.props.updateWidth(document.body.clientWidth);
    this.props.updateHeight(document.body.clientHeight);
  };

  componentDidMount() {
    this.determineLocation();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.determineLocation();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

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

  clearInfo = () => {
    this.props.clearDetails();
    this.props.clearPictures();
  };

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="right item">
          {this.props.location.pathname.indexOf('edit') < 0 && (
            <Link
              className="ui inverted button"
              to="/listings/create"
              onClick={this.clearInfo}
            >
              Create a new listing!
            </Link>
          )}
          <Link className="ui inverted button " to="/signout">
            Signout
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
            Log in
          </Link>
        </div>
      );
    }
  }

  mobileClasses() {
    const { deviceWidth } = this.props;
    return {
      header: mobileClass(deviceWidth, 425, '', 'center'),
      nav: mobileClass(deviceWidth, 425, 'vertical', '')
    };
  }

  render() {
    const { header, nav } = this.mobileClasses();

    return (
      <header
        className={`ui inverted vertical masthead aligned segment ${header}`}
      >
        <div className="ui container">
          <nav className={`ui large secondary inverted pointing menu ${nav}`}>
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
          </nav>
        </div>
      </header>
    );
  }
}
const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    details: state.details,
    deviceWidth: state.deviceDims.width
  };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(Header));
