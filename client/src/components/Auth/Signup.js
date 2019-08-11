import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { compose } from 'redux';
import { renderField } from 'utils/renderField';

class Signup extends Component {
  onSubmit = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push('/listings');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div className="ui form container segment">
          <div className="two fields">
            <div className="field">
              <label>First name</label>
              <Field name="firstName" type="text" component={renderField} />
            </div>
            <div className="field">
              <label>Last name</label>
              <Field name="lastName" type="text" component={renderField} />
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <Field
              name="email"
              type="text"
              component={renderField}
              autoComplete="none"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <Field
              name="password"
              type="password"
              component={renderField}
              autoComplete="none"
            />
          </div>
          <button className="ui button">Sign up!</button>
          {this.props.errorMessage && (
            <div className="ui red basic label">{this.props.errorMessage}</div>
          )}
        </div>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  const fields = ['firstName', 'lastName', 'email', 'password'];

  const changeFieldNames = field => {
    switch (field) {
      case 'firstName':
        return 'first name';
      case 'lastName':
        return 'last name';
      default:
        return '';
    }
  };
  fields.forEach(field => {
    if (!values[field])
      errors[field] = `Please enter a ${changeFieldNames(field)}`;
  });

  return errors;
};

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.errorMessage
  };
};

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: 'signup', validate })
)(Signup);
