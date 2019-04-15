import React, { Component } from 'react';
import { capitalizeFirstLetter } from '../utils/text';

class Counter extends Component {
  render() {
    return (
      <>
        <div className="column">
          <label>
            {capitalizeFirstLetter(this.props.detailItem)}:
            <h5>{this.props.count}</h5>
          </label>
        </div>
        <div className="column">
          <div className="ui icon buttons">
            <div
              onClick={this.props.decrementValue}
              className="decrement ui basic red button icon"
            >
              <i className="minus icon" />
            </div>
            <div
              onClick={this.props.incrementValue}
              className="increment ui basic green button icon"
            >
              <i className="plus icon" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Counter;
