import React, { Component } from 'react';

import GuestsCounter from 'utils/Counter';
import OutsideAlerter from 'components/Util/OutsideAlerter';

class GuestsFilter extends Component {
  state = { count: 1 };

  incrementValue = () => {
    return this.setState({ count: (this.state.count += 1) });
  };

  decrementValue = () => {
    if (this.state.count <= 1) return;
    return this.setState({ count: (this.state.count -= 1) });
  };

  render() {
    const { toggleActive, active } = this.props;

    return (
      <div>
        <button onMouseDown={toggleActive} className="ui button danger">
          Guests
        </button>
        {active && (
          <div>
            <GuestsCounter
              detailItem="Guests"
              count={this.state.count}
              incrementValue={this.incrementValue}
              decrementValue={this.decrementValue}
            />
            <button>Apply Changes</button>
          </div>
        )}
      </div>
    );
  }
}

export default OutsideAlerter(GuestsFilter);
