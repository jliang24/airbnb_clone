import React, { Component } from 'react';

import { capitalizeFirstLetter } from 'utils/text';

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
          <div className="counters">
            <i
              onClick={this.props.decrementValue}
              className="decrement minus circle icon"
            />
            <i
              onClick={this.props.incrementValue}
              className="increment plus circle icon"
            />
          </div>
        </div>
      </>
    );
  }
}

export default Counter;
