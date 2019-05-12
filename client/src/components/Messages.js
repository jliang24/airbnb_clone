import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from 'actions';
import { formatDate } from 'utils/dates';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.columnRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchMessages();
  }

  renderMessages() {
    return this.props.messages.map(message => {
      const {
        checkIn,
        checkOut,
        guestMessage,
        guests,
        listingTitle,
        messageHost,
        name,
        picture
      } = message;

      const domainURL = `https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/`;

      return (
        <div>
          <div className="ui equal width grid">
            <div style={{ height: '275px' }} className="equal width row">
              <img
                className="column"
                style={{
                  maxWidth: '300px',
                  objectFit: 'cover',
                  paddingRight: '0px'
                }}
                src={domainURL + picture}
              />
              <div ref={this.columnRef} className="column">
                <table className="ui attached grey table">
                  <tbody>
                    <tr>
                      <td className="ui segments">
                        <h2 className="ui segment">{name}</h2>
                        <div className="ui horizontal segments equal width">
                          <h3 className="ui segment">Listing</h3>
                          <h3 className="ui segment">Check In</h3>
                          <h3 className="ui segment">Check Out</h3>
                          <h3 className="ui segment">Guests</h3>
                        </div>
                        <div className="ui horizontal segments equal width">
                          <div className="ui segment">{listingTitle}</div>
                          <div className="ui segment">
                            {formatDate(new Date(checkIn))}
                          </div>
                          <div className="ui segment">
                            {formatDate(new Date(checkOut))}
                          </div>
                          <div className="ui segment">{guests}</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="ui icon attached warning message">
                  <i className="user circle icon" />
                  {guestMessage}
                </div>
                <div className="ui bottom attached two item menu">
                  <a className="item">Accept</a>
                  <a className="item">Reject</a>
                </div>
              </div>
            </div>
          </div>
          <div className="ui section divider" />
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderMessages()}</div>;
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
