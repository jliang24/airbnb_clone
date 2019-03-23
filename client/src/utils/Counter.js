import React, { Component } from 'react';

class Counter extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (
      <>
        <div className="column">
          <label>
            {this.capitalizeFirstLetter(this.props.detailItem)}:
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
