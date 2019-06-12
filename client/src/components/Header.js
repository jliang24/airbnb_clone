import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import 'css/navBar.css';

import * as actions from 'actions';
import { mobileClass } from 'components/Util/Responsive';
import OutsideAlerter from 'components/Util/OutsideAlerter';

class Header extends Component {
  state = { home: false, listing: false, visible: true };

  componentDidMount() {
    this.determineLocation();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    if (document.body.clientWidth < 425) {
      this.toggleMenu();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.determineLocation();
    }

    if (this.state.visible && this.props.clickedOutside) {
      this.setState({ visible: false });
      this.props.resetState();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.props.updateWidth(document.body.clientWidth);
    this.props.updateHeight(document.body.clientHeight);

    //Toggle the menu if in mobile view
    if (document.body.clientWidth < 425 && this.state.visible) {
      this.setState({ visible: false });
    } else if (document.body.clientWidth > 425 && !this.state.visible) {
      this.setState({ visible: true });
    }
  };

  determineLocation() {
    setTimeout(() => this.toggleMenu(), 500);

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
          <Link className="ui inverted button" to="/signin">
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

  mobileButton() {
    if (this.props.deviceWidth > 425) {
      return;
    }

    return (
      <div style={{ marginLeft: '15px' }} onClick={this.toggleMenu}>
        <i style={{ fontSize: '25px' }} className="angle double right icon" />
      </div>
    );
  }

  toggleMenu = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  render() {
    const { header, nav } = this.mobileClasses();
    const { deviceWidth } = this.props;

    return (
      <header
        className={`ui inverted vertical masthead aligned segment ${header}`}
      >
        <div className="ui container">
          {this.mobileButton()}
          <nav
            style={{
              transition: 'all 0.5s',
              height: this.state.visible && deviceWidth < 425 ? 200 : 0
            }}
            className={`ui large secondary inverted pointing menu ${nav}`}
          >
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

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  withRouter,
  OutsideAlerter
)(Header);
