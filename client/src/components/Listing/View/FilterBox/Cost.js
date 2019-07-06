import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { renderField } from 'utils/renderField';
import OutsideAlerter from 'components/Util/OutsideAlerter';
import { modifyCost } from 'actions/searchQuery';
import { fetchListings } from 'actions/listing';

const initialState = { filterApplied: false };

class CostFilter extends Component {
  state = { ...initialState };

  onApplySelected = () => {
    const { maxCost } = this.props.cost.values;
    this.setState({ filterApplied: true });
    this.props.modifyCost(maxCost);
    this.props.fetchListings();
    this.props.toggleActive();
  };

  onClearSelected = () => {
    this.setState(initialState);
    this.props.modifyCost(null);
    this.props.fetchListings();
    this.props.toggleActive();
  };

  modifyDisplay() {
    return this.state.filterApplied
      ? `< $${this.props.cost.values.maxCost}`
      : null;
  }

  limitMinNum = value => {
    if (value < 0) {
      return 0;
    }
    return value;
  };

  render() {
    const { toggleActive, active } = this.props;

    return (
      <div>
        <button onMouseDown={toggleActive} className="ui button danger">
          Cost {this.modifyDisplay()}
        </button>
        {active && (
          <div>
            <Field
              name="maxCost"
              label="Max Cost"
              type="number"
              normalize={this.limitMinNum}
              component={renderField}
            />
            <button className="ui button" onClick={this.onApplySelected}>
              Apply
            </button>
            <button className="ui button" onClick={this.onClearSelected}>
              Clear
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cost: state.form.cost
  };
};

export default compose(
  OutsideAlerter,
  reduxForm({
    form: 'cost'
  }),
  connect(
    mapStateToProps,
    { modifyCost, fetchListings }
  )
)(CostFilter);
