import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from 'actions';
import { mobileClass } from 'components/Util/Responsive';
import OutsideAlerter from 'components/Util/OutsideAlerter';

import 'css/navBar.css';

const initialState = { home: false, listing: false, map: false, visible: true };

class Header extends Component {
  state = { ...initialState };

  componentDidMount() {
    this.updateWindowDimensions();
    this.determineLocation();
    window.addEventListener('resize', this.updateWindowDimensions);
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
    if (document.body.clientWidth < 685 && this.state.visible) {
      this.setState({ visible: false });
    } else if (document.body.clientWidth > 685 && !this.state.visible) {
      this.setState({ visible: true });
    }
  };

  determineLocation() {
    setTimeout(() => this.toggleMenu(), 500);

    switch (this.props.location.pathname) {
      case '/listings':
        return this.setState({ ...initialState, listing: true });
      case '/home':
        return this.setState({ ...initialState, home: true });
      case '/listings/map':
        return this.setState({ ...initialState, map: true });
      default:
        return this.setState(initialState);
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
      header: mobileClass(deviceWidth, 685, '', 'center'),
      nav: mobileClass(deviceWidth, 685, 'vertical', '')
    };
  }

  mobileButton() {
    return (
      this.props.deviceWidth > 685 || (
        <div style={{ marginLeft: '15px' }} onClick={this.toggleMenu}>
          <i style={{ fontSize: '25px' }} className="angle double right icon" />
        </div>
      )
    );
  }

  toggleMenu = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  isActiveClass(item) {
    return this.state[item] ? 'active item' : 'item';
  }

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
              transition: deviceWidth > 685 ? '' : 'all 0.5s',
              height: this.state.visible && deviceWidth < 685 ? 200 : 0
            }}
            className={`ui large secondary inverted pointing menu ${nav}`}
          >
            <Link className={this.isActiveClass('home')} to="/home">
              Home
            </Link>
            <Link className={this.isActiveClass('listing')} to="/listings">
              View Listings
            </Link>
            <Link className={this.isActiveClass('map')} to="/listings/map">
              Map Mode
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
