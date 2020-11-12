import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from 'actions';
import { formatDate } from 'utils/dates';
import { mobileClass } from 'components/Util/Responsive';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.columnHeights = [];
    this.state = { columnHeights: [] };
  }

  componentDidMount() {
    // Set the height of pictures to always match the height of a message div
    this.props.fetchMessages(() => {
      const columnHeights = [];
      for (let column of this.columnHeights) {
        if (column.current === null) continue;
        columnHeights.push(column.current.clientHeight);
      }
      this.setState({ columnHeights: columnHeights });
    });
  }

  componentWillUnmount() {
    this.props.clearMessages();
  }

  renderMessages() {
    return this.props.messages.map((message, idx) => {
      this.messageRef = React.createRef();
      this.columnHeights.push(this.messageRef);
      const {
        checkIn,
        checkOut,
        guestMessage,
        guests,
        listingTitle,
        messageOwner,
        name,
        picture,
        listingId,
        dateSent,
        // hostResponse,
        response,
        _id
      } = message;

      const checkHeight = idx => {
        if (this.state.columnHeights.length > 0) {
          return this.state.columnHeights[idx];
        }
        return '200px';
      };

      const renderOwner = () => {
        const onAccept = () => {
          this.props.changeResponse({ reply: true }, _id);
        };

        const onReject = () => {
          this.props.changeResponse({ reply: false }, _id);
        };

        if (messageOwner && response === undefined)
          return (
            <div className="ui bottom attached two item menu">
              <div onClick={onAccept} className="item accept">
                Accept
              </div>
              <div onClick={onReject} className="item reject">
                Reject
              </div>
            </div>
          );

        const responseContainer = {
          true: {
            color: '#6de07c ',
            text: 'Approved!'
          },
          false: {
            color: '#ff9d9a',
            text: 'Rejected'
          },
          undefined: {
            color: '',
            text: 'Pending response from host...'
          }
        };

        const { color, text } = responseContainer[response];

        return (
          <div
            style={{ backgroundColor: color }}
            className="ui bottom attached block header"
          >
            Status: {text}
          </div>
        );
      };

      const { deviceWidth } = this.props;

      return (
        <div key={guestMessage}>
          <div className="ui equal width grid">
            <div
              style={{
                border: '1px solid #55574e',
                padding: '0px',
                paddingRight: '1px'
              }}
              ref={this.messageRef}
              className={`${mobileClass(
                deviceWidth,
                700,
                '',
                'equal width row'
              )} message`}
            >
              <img
                id="message-img"
                className="column"
                alt="msg img"
                style={{
                  height: checkHeight(idx),
                  maxWidth: '300px',
                  maxHeight: '40vh',
                  objectFit: 'cover',
                  padding: '0px'
                }}
                src={
                  picture
                    ? picture
                    : 'https://loremflickr.com/2000/2000 '
                }
              />
              <div style={{ padding: '0px' }} className="column">
                <table className="ui attached  table">
                  <tbody>
                    <tr>
                      <td className="ui segments">
                        <div className="ui segment header">
                          {name}
                          <div className="ui sub header right floated">
                            {formatDate(new Date(dateSent))}
                          </div>
                        </div>
                        <div className="ui horizontal segments equal width">
                          <h3 className="ui segment">Listing</h3>
                          <h3 className="ui segment">Check In</h3>
                          <h3 className="ui segment">Check Out</h3>
                          <h3 className="ui segment">Guests</h3>
                        </div>
                        <div className="ui horizontal segments equal width">
                          <Link
                            to={`/listings/${listingId}`}
                            className="ui segment"
                          >
                            {listingTitle}
                          </Link>
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
                {renderOwner()}
              </div>
            </div>
          </div>
          <div className="ui section divider" />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="ui container" style={{ marginTop: '30px' }}>
        {this.renderMessages()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: Object.values(state.messages),
    deviceWidth: state.deviceDims.width
  };
};

export default connect(
  mapStateToProps,
  actions
)(Messages);
