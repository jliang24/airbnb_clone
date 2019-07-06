import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import OutsideAlerter from 'components/Util/OutsideAlerter';
import { modifyCost } from 'actions/searchQuery';
import { fetchListings } from 'actions/listing';

const initialState = { filterApplied: false };

class CostFilter extends Component {
  state = { ...initialState };

  onApplySelected = () => {
    const { values } = this.props.cost;
    if (!values) return;
    const { maxCost } = values;
    this.setState({ filterApplied: true });
    this.props.modifyCost(maxCost);
    this.props.fetchListings();
    this.props.toggleActive();
  };

  onClearSelected = () => {
    this.setState(initialState);
    this.props.dispatch(change('cost', 'maxCost', null));
    this.props.modifyCost(null);
    this.props.fetchListings();
    this.props.toggleActive();
  };

  modifyDisplay() {
    return this.state.filterApplied ? `< $${this.props.costFilter}` : null;
  }

  limitMinNum = value => {
    if (value < 0) {
      return 0;
    }
    return value;
  };

  renderField = ({ placeholder, input, label, type }) => (
    <>
      <label>{label}</label>
      <div className="ui input">
        <input
          {...input}
          autoComplete="off"
          placeholder={placeholder ? placeholder : label}
          type={type}
        />
      </div>
    </>
  );

  render() {
    const { toggleActive, active } = this.props;

    return (
      <div>
        <button
          onMouseDown={toggleActive}
          className="ui secondary basic button danger"
        >
          Cost {this.modifyDisplay()}
        </button>
        {active && (
          <div className="ui container segment popout cost">
            <Field
              name="maxCost"
              type="number"
              placeholder="Max Cost"
              normalize={this.limitMinNum}
              component={this.renderField}
            />
            <div>
              <button
                className="ui secondary basic button"
                onClick={this.onClearSelected}
              >
                Clear
              </button>
              <button
                className="ui secondary basic right floated button"
                onClick={this.onApplySelected}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cost: state.form.cost,
    costFilter: state.searchQuery.cost
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
